//Distance: url downloads plans
const PLANS = {
    "5k_run": "https://www.nike.com/pdf/Nike-Run-Club-5K-Training-Plan-Audio-Guided-Runs.pdf",
    "10k_run": "https://www.nike.com/pdf/Nike-Run-Club-10K-Training-Plan-Audio-Guided-Runs.pdf",
    "Half_marathon": "https://www.nike.com/pdf/Nike-Run-Club-Half-Marathon-Training-Plan-Audio-Guided-Runs.pdf",
    "Marathon": "https://www.nike.com/pdf/Nike-Run-Club-Marathon-Training-Plan-Audio-Guided-Runs.pdf"
}
const KILOMETERS = ["5k", "10k", "21k", "42k"];
//By default the active distance is 5k, 0 is because is the first item in the object
let activeDistance = 0;
const keys = Object.keys(PLANS);
// Render user desire distance
//select the distances buttons
let distances = document.querySelectorAll(".plan");
let distancesContainer = document.querySelector(".plans");
let distance = document.querySelector("#title span");
let description = document.querySelector(".info--details");
let download = document.querySelector(".info--download");
let title = document.querySelector(".info--title");
// Add and remove active element
const active = (clickedElement) => {
    if (clickedElement != activeDistance) {
        distances[clickedElement].classList.add("plan--active");
        distances[activeDistance].classList.remove("plan--active");
        activeDistance = clickedElement;
        //change the 3d text 
        distance.innerText = KILOMETERS[clickedElement];
        download.setAttribute("href", PLANS[keys[clickedElement]]);
        title.innerText = `Get ready for ${KILOMETERS[clickedElement]}`;
        //change the description
        let link = `https://en.wikipedia.org/api/rest_v1/page/summary/${keys[clickedElement]}?redirect=false`;
        fetch(link).then(response => response.json())
            .then(res => {
                description.innerText = res.extract;
            });
    }
}

//Change css class for active distance
//Change description data fetched from wikipedia
//CHange download link plan

//Add event listeners 
distances.forEach((element, index) => {
    element.addEventListener("click", () => {
        active(index);
    })
})