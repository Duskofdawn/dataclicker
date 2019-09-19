// Declare and initialize all global variables
var dataCur = 100;
var displayCur = 0;
var currentAdd = 1;
var leftPanelIsOpen = false;
var rightPanelIsOpen = false;
var dataMax = 10;
var unitCost = [15,35,50];
var unitCount = [0,0,0];
var unitEff = [1,5,10];
var runInterval = 1000;
var costCountArrayLength = 0;


// Function to update total display
function update() {
  document.getElementById("dataCount").innerHTML = displayCur;
  document.getElementById("decCount").innerHTML = "(" + dataCur + ")";
}

// Function to convert decimal currency to either binary or hex depending on amount
function displayCurrency() {
  if (dataCur < 16) {
    displayCur = dataCur.toString(2);
  } else if (dataCur >= 16) {
    displayCur = "0x" + dataCur.toString(16);
  }
};

// Function to flash an item red background for 1/4 second
function flashred(name) {
  var element = document.getElementById(name);
  element.style.background = "red";
  setTimeout(function(){element.style.background = "black";}, 250);
};

// Function to remove an element by ID
function deleteElement(elementId) {
  var element = document.getElementById(elementId);
  element.parentNode.removeChild(element);
};

function purchaseUpgrade(name) { //Purchases an upgrade based on button name
  var element = document.getElementById(name); //Grabs element by name
  var cost = element.dataset.cost; //Grabs cost by element
  if (dataCur >= cost) {
      switch (name) {
        case "data1":
          currentAdd += 1;
          break;
        case "interval1":
          runInterval = runInterval * .9;
          break;
      }
      dataCur -= cost;
      deleteElement(name);
      displayCurrency();
      update();
  } else {
    flashred(name);
  }
};

function purchaseUnit(name) {
  var element = document.getElementById(name);
  if (dataCur >= unitCost[0]) {
    unitCount[0] += 1;
    dataCur -= unitCost[0];
    unitCost[0] = Math.round(unitCost[0] * 1.15);
      element.innerHTML = "+tickr+1 Cost = " + unitCost[0];
  } else {
    flashred(name);
  }

};



// Main
window.setInterval(function(){
  costCountArrayLength = unitCount.length;
  for (var i = 0; i < costCountArrayLength; i++) {
    buttonClick(unitCount[i]*unitEff[i]);
  }

}, runInterval);
