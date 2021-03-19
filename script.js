"use script";

window.addEventListener("DOMContentLoaded", start);

function start() {
  console.log("Lets gooooo");

  //Listen for click at burgermenu
  document.querySelector("#menuknap").addEventListener("click", toggleMenu);

  // register toggle-clicks
  document.querySelectorAll(".option").forEach((option) => option.addEventListener("click", toggleOption));

  startFetch();
}

//
//
//THE BURGERMENU CODE

function toggleMenu() {
  console.log("toggleMenu");

  document.querySelector("#menu").classList.toggle("hidden");

  let erskjult = document.querySelector("#menu").classList.contains("hidden");

  if (erskjult == true) {
    document.querySelector("#menuknap").textContent = "☰";
  } else {
    document.querySelector("#menuknap").textContent = "x";
  }
}

//
//
//THE PRODUCT COLOR CONFIGURATOR
//Adding a global variable
let elementToPaint;

async function startFetch() {
  let response = await fetch("/images/case_conf2-01.svg");
  let mySvgData = await response.text();
  document.querySelector("#product-preview").innerHTML = mySvgData;

  startManipulatingTheSvg();
}

function startManipulatingTheSvg() {
  //Add mouse events to relevant g-elements (g_interactive) with querySelectorAll foreach
  document.querySelectorAll(".g_to_interact").forEach((eachG) => {
    console.log(eachG);

    eachG.addEventListener("click", the_click);
    eachG.addEventListener("mouseover", the_mouseover);
    eachG.addEventListener("mouseout", the_mouseout);
  });

  document.querySelectorAll(".color_btn").forEach((each_BTN) => {
    each_BTN.addEventListener("click", colorClick);
  });
}

function the_click() {
  elementToPaint = this;
  this.style.fill = "grey";
}

function the_mouseover() {
  console.log(this);

  this.style.stroke = "blue";
}

function the_mouseout() {
  this.style.stroke = "none";
}

function colorClick() {
  console.log("CLICK", this.getAttribute("fill"));
  if (elementToPaint != undefined) {
    elementToPaint.style.fill = this.getAttribute("fill");
  }
}

//
//
// THE CONFIGURATOR FEATURE CODE
// The model of all features
const features = {
  handle1: false,
  handle2: false,
  lock1: false,
  lock2: false,
};

function toggleOption(event) {
  const target = event.currentTarget;
  const feature = target.dataset.feature;
  console.log("this is also working");

  // TODO: Toggle feature in "model"
  features[feature] = !features[feature];

  if (features[feature] === true) {
    //Select target and add chosen class
    target.classList.add("chosen");

    //Remove the hide class
    document.querySelector(`[data-feature="${feature}"`).classList.remove("hide");

    //Create new featureElement and add it to the list
    const newfeatureElement = createFeatureElement(feature);
    document.querySelector("#selected ul").appendChild(newfeatureElement);
    // feature added

    //FLIP
    const start = target.getBoundingClientRect();
    const end = newfeatureElement.getBoundingClientRect();

    const diffx = start.x - end.x + "px";
    const diffy = start.y - end.y + "px";

    newfeatureElement.style.setProperty("--diffx", diffx);
    newfeatureElement.style.setProperty("--diffy", diffy);

    //Animation feature in
    newfeatureElement.classList = "animate-feature-in";
  } else {
    target.classList.remove("chosen");
    const theFeatureElement = document.querySelector(`#selected [data-feature="${feature}"]`);

    const end = theFeatureElement.getBoundingClientRect();
    const start = target.getBoundingClientRect();

    const diffx = start.x - end.x + "px";
    const diffy = start.y - end.y + "px";

    theFeatureElement.style.setProperty("--diffx", diffx);
    theFeatureElement.style.setProperty("--diffy", diffy);

    theFeatureElement.offsetHeight;

    //Animation feature out
    theFeatureElement.classList = "animate-feature-out";

    //when animation is complete, remove featureElement from the DOM
    theFeatureElement.addEventListener("animationend", function () {
      theFeatureElement.remove();
      //Chose the feature element and hide it
      document.querySelector(`[data-feature=${feature}`).classList.add("hide");
      console.log(`Feature ${feature} is turned off!`);
    });
  }
}

// Create featureElement to be appended to #selected ul - could have used a <template> instead
function createFeatureElement(feature) {
  //Create an li element and add feature img into it
  const li = document.createElement("li");
  li.dataset.feature = feature;

  const img = document.createElement("img");
  img.src = `images/feature_${feature}.png`;
  img.alt = capitalize(feature);

  //Add the li element
  li.append(img);

  return li;
}

function capitalize(text) {
  return text.substring(0, 1).toUpperCase() + text.substring(1).toLowerCase();
}
