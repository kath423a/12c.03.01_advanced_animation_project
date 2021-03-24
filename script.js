"use script";

window.addEventListener("DOMContentLoaded", start);

function start() {
  console.log("Lets gooooo");

  //Listen for click at burgermenu
  document.querySelector("#menuknap").addEventListener("click", toggleMenu);

  // register toggle-clicks

  document
    .querySelectorAll(".option")
    .forEach((option) => option.addEventListener("click", toggleOption));

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
  document.querySelector("#defaultcase").innerHTML = mySvgData;

  startManipulatingTheSvg();
}

function startManipulatingTheSvg() {
  //Add mouse events to relevant g-elements (g_interactive) with querySelectorAll foreach
  document.querySelectorAll(".g_to_interact").forEach((eachG) => {
    // console.log(eachG);

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
  // this.style.fill = "grey";
}

function the_mouseover() {
  // console.log(this);
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
  // console.log("this is also working");

  if (feature == "lock1" || feature == "lock2") {
    if ((features.lock1 == false) & (features.lock2 == false)) {
      console.log("lock chosen");
      addFeature();
    } else if (features.lock2 == true || features.lock1 == true) {
      console.log("cant add more locks");
      removeFeature();
    }
  }

  if (feature == "handle1" || feature == "handle2") {
    if ((features.handle1 == false) & (features.handle2 == false)) {
      console.log("handle chosen");
      addFeature();
    } else if (features.handle1 == true || features.handle2 == true) {
      console.log("cant add more handles");
      removeFeature();
    }
  }
  function removeFeature() {
    if ((feature == "handle1") & (features.handle1 == true)) {
      features.handle1 = false;
    }
    if ((feature == "handle2") & (features.handle2 == true)) {
      features.handle2 = false;
    }

    if ((feature == "lock1") & (features.lock1 == true)) {
      features.lock1 = false;
    }
    if ((feature == "lock2") & (features.lock2 == true)) {
      features.lock2 = false;
    }

    target.classList.remove("chosen");
    const theFeatureElement = document.querySelector(
      `#selected [data-feature="${feature}"]`
    );
    // console.log(theFeatureElement);

    if (theFeatureElement != null) {
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
      theFeatureElement.addEventListener("animationstart", function () {
        theFeatureElement.remove();
        //Chose the feature element and hide it
        document
          .querySelector(`[data-feature=${feature}`)
          .classList.add("hide");
        console.log(`Feature ${feature} is turned off!`);
      });
    }
  }

  function addFeature() {
    // TODO: Toggle feature in "model"
    features[feature] = !features[feature];

    if (features[feature] === true) {
      //Select target and add chosen class
      target.classList.add("chosen");

      //Remove the hide class
      document
        .querySelector(`[data-feature="${feature}"`)
        .classList.remove("hide");

      const newfeatureElement = createLockImage(feature);

      //Create new featureElement and add it to the list
      if (newfeatureElement != undefined) {
        console.log(newfeatureElement);
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
      }
    }
  }
}

// Create featureElement to be appended to #selected ul - could have used a <template> instead
function createLockImage(feature) {
  if (
    (document
      .querySelector("#selected")
      .contains(document.querySelector('img[alt="Lock1"]')) ==
      false) &
    (document
      .querySelector("#selected")
      .contains(document.querySelector('img[alt="Lock2"]')) ==
      false)
  ) {
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
}

function createHandleImage(feature) {
  if (
    (document
      .querySelector("#selected")
      .contains(document.querySelector('img[alt="Handle1"]')) ==
      false) &
    (document
      .querySelector("#selected")
      .contains(document.querySelector('img[alt="Handle2"]')) ==
      false)
  ) {
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
}

function capitalize(text) {
  return text.substring(0, 1).toUpperCase() + text.substring(1).toLowerCase();
}
