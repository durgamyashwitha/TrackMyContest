const container = document.getElementById("saved-contests");
let savedIds =
    JSON.parse(localStorage.getItem("savedContests")) || [];

const contests =
    JSON.parse(localStorage.getItem("allContests")) || [];


function render(){

    container.innerHTML = "";

    let saved = contests.filter(c =>
        savedIds.includes(c.id)
    );

    if(saved.length ===0){
        container.innerHTML = `<h3 class="error"> No Saved Contests </h3>`;
        return;
    }

saved.forEach(c  => {

    container.innerHTML += `

    <div class="contest-card">
        <h3>${c.name}</h3>
          <p>${c.platform}</p>
     <p>${c.date}</p>

     <button class="remove" data-id = "${c.id}">
         Remove
          </button>

         <button class="register" data-id="${c.id}">
    Start
</button>
     </div>
     `;
   });

}

function renderFiltered(contestsToShow){

    container.innerHTML = "";

    if(contestsToShow.length === 0){
        container.innerHTML =
            `<h3 class="error">No Saved Contests</h3>`;
        return;
    }

    contestsToShow.forEach(c => {

        container.innerHTML += `
        <div class="contest-card">
            <h3>${c.name}</h3>
            <p>${c.platform}</p>
            <p>${c.date}</p>

            <button class="remove" data-id="${c.id}">
                Remove
            </button>

            <button class="register" data-id="${c.id}">
    Start
</button>
        </div>
        `;
    });
}


container.addEventListener("click", function(e){

    if(e.target.classList.contains("remove")){

        const id = Number(e.target.dataset.id);

        savedIds = savedIds.filter(x => x !== id);

        localStorage.setItem(
            "savedContests",
            JSON.stringify(savedIds)
        );

        render();
    }
});

container.addEventListener("click", function(e){

    if(e.target.classList.contains("register")){

        const id = Number(e.target.dataset.id);

        const contest = contests.find(c => c.id === id);

        if(contest && contest.url){
            window.open(contest.url, "_blank");
        }
    }
});



const filterButtons = document.querySelectorAll(".con");
function setActiveButton(button){

    filterButtons.forEach(btn =>
        btn.classList.remove("active")
    );

    button.classList.add("active");
}

document.getElementById("all")
.addEventListener("click", function(){
    render();
    setActiveButton(this);
});

document.getElementById("codeforces")
.addEventListener("click", function(){

    const filtered = contests.filter(c =>
        savedIds.includes(c.id) &&
        c.platform.toLowerCase().includes("codeforces")
    );

    renderFiltered(filtered);

    setActiveButton(this);
});

document.getElementById("codeforces")
.addEventListener("click", function(){

    const filtered = contests.filter(c =>
        savedIds.includes(c.id) &&
        c.platform.toLowerCase().includes("codeforces")
    );

    renderFiltered(filtered);

    setActiveButton(this);
});

document.getElementById("leetcode")
.addEventListener("click", function(){

    const filtered = contests.filter(c =>
        savedIds.includes(c.id) &&
        c.platform.toLowerCase().includes("leetcode")
    );

    renderFiltered(filtered);

    setActiveButton(this);
});

document.getElementById("atcoder")
.addEventListener("click", function(){

    const filtered = contests.filter(c =>
        savedIds.includes(c.id) &&
        c.platform.toLowerCase().includes("atcoder")
    );

    renderFiltered(filtered);

    setActiveButton(this);
});


document.getElementById("codechef")
.addEventListener("click", function(){

    const filtered = contests.filter(c =>
        savedIds.includes(c.id) &&
        c.platform.toLowerCase().includes("codechef")
    );

    renderFiltered(filtered);

    setActiveButton(this);
});

render();