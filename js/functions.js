// Declare and initialize all global variables
var dataCur = 0;
var displayCur = 0;
var currentAdd = 1;

var dataMax = 10;
var displayMax = 0;
var sep = " || "

// Initializing upgrade array, cost is current cost, numPurch is how many have been purchased, and powInc is power increase
var upgradeArray = {
	data:{     cost:20,  numPurchased:0, powInc:1.15, buttonText:"dataGen += 1"},
	maximum:{  cost:10,  numPurchased:0, powInc:1.25, buttonText:"dataCap * 2" },
	interval:{ cost:100, numPurchased:0, powInc:1.50, buttonText:"tick * 0.9"  }
};

// Basic tick time, 1 second.
var runInterval = 1000;

var save = {
  dataCur: dataCur,
  displayCur: displayCur,
  currentAdd: currentAdd,
  dataMax: dataMax,
  displayMax: displayMax,
  upgradeArray: upgradeArray,
  runInterval: runInterval,
}




// Function to update total display
function update() {
  displayCurrency();
  document.getElementById("dataCount").innerHTML = displayCur;
  document.getElementById("decCount").innerHTML = "(" + dataCur + " / " + dataMax + ")" ;
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
  
  if (element.style.color != "red") {
    var priColor = element.style.color;
    element.style.color = "red";
    setTimeout(function(){element.style.color = priColor;}, 250);
  }
};

// Function to remove an element by ID
function deleteElement(elementId) {
  var element = document.getElementById(elementId);
  element.parentNode.removeChild(element);
};

// Save function
function saveGame() {
  save = {
    dataCur: dataCur,
    displayCur: displayCur,
    currentAdd: currentAdd,
    dataMax: dataMax,
    displayMax: displayMax,
    upgradeArray: upgradeArray,
    runInterval: runInterval,
  }
  localStorage.setItem("save",JSON.stringify(save));
};

// Load function
function loadGame() {
  var savegame = JSON.parse(localStorage.getItem("save"));
  if (savegame) {
    if (typeof savegame.dataCur !== "undefined") dataCur = savegame.dataCur;
    if (typeof savegame.displayCur !== "undefined") displayCur = savegame.displayCur;
    if (typeof savegame.currentAdd !== "undefined") currentAdd = savegame.currentAdd;
    if (typeof savegame.dataMax !== "undefined") dataMax = savegame.dataMax;
    if (typeof savegame.displayMax !== "undefined") displayMax = savegame.displayMax;
    if (typeof savegame.upgradeArray !== "undefined") upgradeArray = savegame.upgradeArray;
    if (typeof savegame.runInterval !== "undefined") runInterval = savegame.runInterval;
  }
  for (name in upgradeArray) {
    document.getElementById(name).innerHTML = upgradeArray[name].buttonText + sep + upgradeArray[name].cost;
  }
  update()
};

// Delete Save Function
function deleteSave() {
  var conf = confirm("Are you sure? This will delete your ENTIRE save file.")
  if (conf == true) {
    localStorage.removeItem("save");
    dataCur = 0;
    displayCur = 0;
    currentAdd = 1;
    dataMax = 10;
    displayMax = 0;
    upgradeArray = {
      data:{     cost:20,  numPurchased:0, powInc:1.15, buttonText:"dataGen += 1"},
      maximum:{  cost:10,  numPurchased:0, powInc:1.25, buttonText:"dataCap * 2" },
      interval:{ cost:100, numPurchased:0, powInc:1.50, buttonText:"tick * 0.9"  }
    };
    runInterval = 1000;
  }
  for (name in upgradeArray) {
    document.getElementById(name).innerHTML = upgradeArray[name].buttonText + sep + upgradeArray[name].cost;
  }
  update();
};