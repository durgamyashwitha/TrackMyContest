let contests = JSON.parse(localStorage.getItem("allContests")) || [];

const container = document.getElementById("calendar");
const popup = document.getElementById("popup");
const popupContent = document.getElementById("content");

let saved = JSON.parse(localStorage.getItem("savedContests")) || [];

function getDays(year,month){
    return new Date(year,month+1,0).getDate();
}

function formatDate(y, m, d){
    return `${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
}

function getContests(date){
    return contests.filter(c => c.date ===date);
}

function renderCalendar(year, month){

    let html = "";

    const days = getDays(year, month);

    html += `<div class="calendar-grid">`;

    for(let d=1; d<=days; d++){

        const dateStr = formatDate(year, month, d);
        const dayContests = getContests(dateStr);
        let saved = JSON.parse(localStorage.getItem("savedContests")) || [];

        html += `
        <div class="calendar-cell" data-date="${dateStr}">

            <div class="date">${d}</div>

            ${dayContests.map(c => `
                <div class="event ${saved.includes(c.id) ? "saved" : ""}">
                    ${c.name}
                </div>
            `).join("")}

        </div>
        `;
    }

    html += `</div>`;

    container.innerHTML = html;
}

container.addEventListener("click",function(e){

    const cell = e.target.closest(".calendar-cell");
    if(!cell)return;

    const date = cell.dataset.date;

    const dayContests = getContests(date);

    if(dayContests.length ===0){
        popupContent.innerHTML = `<h3>No contests on this day </h3>`;
    }
    else{
        popupContent.innerHTML=`
           <h3>Contests on ${date}</h3>
           ${dayContests.map(c =>`
               <div class="event">
                  ${c.name}
                  </div>`)
                .join("")}`;
    }
    popup.classList.remove("hidden");
}
);

popup.addEventListener("click",function(){
       popup.classList.add("hidden");
});

let currentYear = 2026;
let currentMonth = 5;

const monthTitle = document.getElementById("month-title");

const monthNames = [
    "January","February","March","April",
    "May","June","July","August",
    "September","October","November","December"
];

monthTitle.textContent =
    `${monthNames[currentMonth]} ${currentYear}`;

    function updateMonthTitle(){
    monthTitle.textContent =
        `${monthNames[currentMonth]} ${currentYear}`;
}


    document
.getElementById("prev-month")
.addEventListener("click", function(){

    currentMonth--;

    if(currentMonth < 0){
        currentMonth = 11;
        currentYear--;
    }

    updateMonthTitle()
    renderCalendar(currentYear, currentMonth);
});


document
.getElementById("next-month")
.addEventListener("click", function(){

    currentMonth++;

    if(currentMonth > 11){
        currentMonth = 0;
        currentYear++;
    }

    updateMonthTitle()
    renderCalendar(currentYear, currentMonth);
});



// INIT (June 2026)
updateMonthTitle();
renderCalendar(currentYear, currentMonth);