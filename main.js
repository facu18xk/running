//Distance: url downloads plans
const PLANS = {
    "5k_run": "https://www.nike.com/pdf/Nike-Run-Club-5K-Training-Plan-Audio-Guided-Runs.pdf",
    "10k_run": "https://www.nike.com/pdf/Nike-Run-Club-10K-Training-Plan-Audio-Guided-Runs.pdf",
    "Half_marathon": "https://www.nike.com/pdf/Nike-Run-Club-Half-Marathon-Training-Plan-Audio-Guided-Runs.pdf",
    "Marathon": "https://www.nike.com/pdf/Nike-Run-Club-Marathon-Training-Plan-Audio-Guided-Runs.pdf"
}
const KILOMETERS = ["5k", "10k", "21k", "42k"];
//By default the active distance is 5k, 0 is because is the first item in the object
const DEFAULT_ACTIVE_DISTANCE = 0;
let activeDistance = DEFAULT_ACTIVE_DISTANCE;
const keys = Object.keys(PLANS);
//select elements
let distances = document.querySelectorAll(".plan");
let distance = document.querySelector("#title span");
let description = document.querySelector(".info--details");
let download = document.querySelector(".info--download");
let title = document.querySelector(".info--title");
/**
 *  Add the styles by adding the classes of the active distance 
 * @param {*} clickedElement 
 */
const updateCurrentDistance = clickedElement => {
    distances[clickedElement].classList.add("plan--active");
    distances[activeDistance].classList.remove("plan--active");
    activeDistance = clickedElement;
}
/**
 * Change the dom's elements details 
 * @param {*} clickedElement 
 */
const updatePlanDetails = clickedElement => {
    //change the 3d text 
    distance.innerText = KILOMETERS[clickedElement];
    //Change the download plan file to its corresponding
    download.setAttribute("href", PLANS[keys[clickedElement]]);
    title.innerText = `Get ready for ${KILOMETERS[clickedElement]}`;
}
/**
 * Update the description by fetching data from the wikipedia api
 * @param {*} clickedElement 
 */
const updateDescription = clickedElement => {
    //change the description
    let link = `https://en.wikipedia.org/api/rest_v1/page/summary/${keys[clickedElement]}?redirect=false`;
    fetch(link).then(response => {
        if (!response.ok)
            throw new Error("Fetching failed");
        return response.json()
    })
        .then(res => {
            description.innerText = res.extract;
        }).catch(err => console.error(err));
}
const updateUi = (clickedElement) => {
    if (clickedElement != activeDistance) {
        updateCurrentDistance(clickedElement);
        updatePlanDetails(clickedElement);
        updateDescription(clickedElement);
    }
}

//Add event listeners 
distances.forEach((element, index) => {
    element.addEventListener("click", () => {
        updateUi(index);
    })
})