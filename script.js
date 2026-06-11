let contests=[];

const container = document.getElementById("contest-container");


function displayContests(contestsToShow){

    if(contestsToShow.length === 0){
    container.innerHTML = `<h2 class="error">No contests found</h2>`;
    return;
}

    container.innerHTML="";
     const saved = JSON.parse(localStorage.getItem("savedContests")) || [];

    for(let i=0;i<contestsToShow.length;i++){


        const isSaved = saved.includes(contestsToShow[i].id);

        container.innerHTML += `

    <div class="contest-card" data-id="${contestsToShow[i].id}">
        <h3>${contestsToShow[i].name}</h3>
        <p>${contestsToShow[i].platform}</p>
        <p>${contestsToShow[i].date}</p>

        <button class="register">
        Register
        </button>

         <button class="save ${isSaved ? "saved" : ""}">
       ${isSaved ? "Saved" : "Save"}
       </button>
        
        </div>
        `;
   }
}


container.addEventListener("click",function(e){
    if(e.target.classList.contains("save")){

        const card = e.target.closest(".contest-card");
        const id = Number(card.dataset.id);

        let savedContests = JSON.parse(localStorage.getItem("savedContests"));

        if(savedContests==null){
            savedContests=[];
        }

        if(savedContests.includes(id)){
            savedContests = savedContests.filter(x => x !== id);
            console.log("Removed from saved");
        } 
        else {
            savedContests.push(id);
            console.log("Saved");
        }

        localStorage.setItem(
            "savedContests",
            JSON.stringify(savedContests)
        );

        displayContests(contests);

    }
});

container.addEventListener("click",function(e){

    if(e.target.classList.contains("register")){

        const card = e.target.closest(".contest-card");

        const id = Number(card.dataset.id);

       const contest = contests.find(c => c.id === id);

if(contest){
    window.open(contest.url, "_blank");
}
    }
});


fetch("https://clist.by/api/v4/contest/?limit=100&upcoming=true", {
  headers: {
    Authorization: "ApiKey Yas:aed3273654180869d39c99ee92ce041a25c14321"
  }
})
.then(res => {

    if(!res.ok){
        throw new Error(`HTTP Error ${res.status}`);
    }

    return res.json();
})
.then(data => {

    contests = data.objects
   .filter(contest => {

    const host = (contest.host || "").toLowerCase();

    return (
        host.includes("codeforces") ||
        host.includes("leetcode") ||
        host.includes("atcoder") ||
        host.includes("codechef")
    );
})
    .map(contest => ({
        id: contest.id,
        name: contest.event,
        platform: contest.host,
        date: new Date(contest.start).toISOString().split("T")[0],
        url: contest.href
    }));

    
console.table(
    data.objects.map(x => ({
        event: x.event,
        host: x.host
    }))
);
localStorage.setItem(
    "allContests",
    JSON.stringify(contests)
);

    displayContests(contests);
})
.catch(err => {

    console.error(err);

    contests =
        JSON.parse(localStorage.getItem("allContests")) || [];

    if(contests.length > 0){
        displayContests(contests);
    }
    else{
        container.innerHTML =
        `<h2 class="error">Unable to load contests.</h2>`;
    }
});



const searchInput = document.getElementById("search");

searchInput.addEventListener(
    "input",
    function(){
        let searchText = searchInput.value.toLowerCase();

       let filtered = contests.filter(c =>
    (c.name &&
     c.name.toLowerCase().includes(searchText))
    ||
    (c.platform &&
     c.platform.toLowerCase().includes(searchText))
);

       displayContests(filtered);
    }
);


const filterButtons = document.querySelectorAll(".con");
function setActiveButton(button){

    filterButtons.forEach(btn =>
        btn.classList.remove("active")
    );

    button.classList.add("active");
}

document.getElementById("all")
.addEventListener("click", function() {
    displayContests(contests);

    setActiveButton(this);
    console.log(this.classList.contains("active"));
});

document.getElementById("codeforces")
.addEventListener("click", function() {

    let filtered = contests.filter(c =>
        c.platform.toLowerCase().includes("codeforces")
    );

    displayContests(filtered);

    setActiveButton(this);
    console.log(this.classList.contains("active"));
});

document.getElementById("leetcode")
.addEventListener("click", function() {

    let filtered = contests.filter(c =>
        c.platform.toLowerCase().includes("leetcode")
    );

    displayContests(filtered);

    setActiveButton(this);
    console.log(this.classList.contains("active"));
});

document.getElementById("atcoder")
.addEventListener("click", function() {

    let filtered = contests.filter(c =>
        c.platform.toLowerCase().includes("atcoder")
    );

    displayContests(filtered);

    setActiveButton(this);
    console.log(this.classList.contains("active"));
});


document.getElementById("codechef")
.addEventListener("click", function() {

    let filtered = contests.filter(c =>
        c.platform.toLowerCase().includes("codechef")
    );

    displayContests(filtered);

    setActiveButton(this);
    console.log(this.classList.contains("active"));
});
