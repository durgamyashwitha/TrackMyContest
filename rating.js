let myChart = null;

/* ---------------- USER INFO ---------------- */
async function getRating(handle) {

    const url = `https://codeforces.com/api/user.info?handles=${handle}`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        if (data.status !== "OK") {
            document.getElementById("output").innerText = "User not found";
            return;
        }

        const user = data.result[0];

        document.getElementById("output").innerHTML = `
            <h2>${user.handle}</h2>
            <p>Rating: ${user.rating || "Unrated"}</p>
            <p>Max Rating: ${user.maxRating || "N/A"}</p>
            <p>Rank: ${user.rank || "N/A"}</p>
        `;
    }
    catch (err) {
        document.getElementById("output").innerText = "Error fetching data";
    }
}

/* ---------------- HISTORY ---------------- */
async function getRatingHistory(handle) {

    const url = `https://codeforces.com/api/user.rating?handle=${handle}`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        if (data.status !== "OK") return [];

        return data.result.map(c => ({
            contest: c.contestName,
            ratingBefore: c.oldRating,
            ratingAfter: c.newRating,
            change: c.newRating - c.oldRating,
            date: new Date(c.ratingUpdateTimeSeconds * 1000)
                .toISOString()
                .split("T")[0]
        }));
    }
    catch (err) {
        return [];
    }
}

/* ---------------- GRAPH ---------------- */
async function drawGraph(handle) {

    const history = await getRatingHistory(handle);

    if (history.length === 0) {
        document.getElementById("output").innerHTML += "<p>No rating history available</p>";
        return;
    }

    const labels = history.map(x => x.date);
    const ratings = history.map(x => x.ratingAfter);

    if (myChart) myChart.destroy();

    myChart = new Chart(document.getElementById("chart"), {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "Codeforces Rating",
                data: ratings,
                borderColor: "blue",
                fill: false,
                tension: 0.3
            }]
        }
    });
}

/* ---------------- CONTROLLER ---------------- */
async function trackUser() {

    const handle = document.getElementById("handle").value.trim();

    if (!handle) {
        alert("Please enter a Codeforces handle");
        return;
    }

    await getRating(handle);
    await drawGraph(handle);
}