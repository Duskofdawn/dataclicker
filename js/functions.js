// Declare and initialize all global variables
var main = {};
main.dataCur = 0;
main.displayCur = 0;
main.currentAdd = 1;

main.dataMax = 10;
main.displayMax = 0;
main.sep = " || "
main.firstClick = true;

// Initializing upgrade array, cost is current cost, numPurch is how many have been purchased,
// powInc is the power the cost should be raised to. buttonText is the text that appears on the button.
main.upgradeArray = {
	data:{     cost:20,  numPurchased:0, powInc:1.15, buttonText:"dataGen += 1"},
	maximum:{  cost:10,  numPurchased:0, powInc:1.25, buttonText:"dataCap * 2" },
	interval:{ cost:100, numPurchased:0, powInc:1.50, buttonText:"tick * 0.9"  }
};

// Basic tick time, 1 second.
main.runInterval = 1000;

// Initialization of the save file
var save = {
  main: main
};



// Function to update total display
function update() {
  displayCurrency();
  document.getElementById("dataCount").innerHTML = main.displayCur; // Updates the main (binary/hex) counter
  document.getElementById("decCount").innerHTML = "(" + main.dataCur + " / " + main.dataMax + ")" ; // Updates the secondary (decimal) counter.
}

// Function to convert decimal currency to either binary or hex depending on amount
function displayCurrency() {
  if (main.dataCur < Math.pow(2,8)) { // If the value is less than 256 (one binary byte), show in binary 
    main.displayCur = main.dataCur.toString(2); 
  } else if (main.dataCur >= Math.pow(16,2)) { // If the value is more than or equal to 256, show in hex.
    main.displayCur = "0x" + main.dataCur.toString(16);
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
    main: main
  };
  localStorage.setItem("save",JSON.stringify(save));
};

// Load function
function loadGame() {
  var savegame = JSON.parse(localStorage.getItem("save"));
  if (savegame) {
    if (typeof savegame.main !== "undefined") main = savegame.main;
  }
  for (name in main.upgradeArray) {
    document.getElementById(name).innerHTML = main.upgradeArray[name].buttonText + main.sep + main.upgradeArray[name].cost;
  }
  update()
};

// Delete Save Function
function deleteSave() {
  var conf = confirm("Are you sure? This will delete your ENTIRE save file.") // Confirms that they want to delete
  if (conf == true) {
    localStorage.removeItem("save"); // Deletes local storage save

    // The reason values are manually assigned is because trying to deep copy in javascript is like trying to split the atom.
    main.dataCur = 0;
    main.displayCur = 0;
    main.currentAdd = 1;
    main.dataMax = 10;
    main.displayMax = 0;
    main.sep = " || "
    main.firstClick = true;
    main.upgradeArray = {
      data:{     cost:20,  numPurchased:0, powInc:1.15, buttonText:"dataGen += 1"},
      maximum:{  cost:10,  numPurchased:0, powInc:1.25, buttonText:"dataCap * 2" },
      interval:{ cost:100, numPurchased:0, powInc:1.50, buttonText:"tick * 0.9"  }
    };
    main.runInterval = 1000;
    console.log(main);
  }
  for (name in main.upgradeArray) {
    document.getElementById(name).innerHTML = main.upgradeArray[name].buttonText + main.sep + main.upgradeArray[name].cost;
  }
  update();
};
