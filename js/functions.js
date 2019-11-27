//--//--//--//--//--//--//--//
//MAIN FUNCTION DECLARATIONS//
//--//--//--//--//--//--//--//

// Declare and initialize all global variables. This is here and not in main.js because this file initializes everything before main.js
var main = {};
main.dataCur = 0;
main.displayCur = 0;
main.currentAdd = 1;

main.dataMax = 10;
main.displayMax = 0;
main.sep = " || "
main.firstClick = true;

main.unitArray = 0;

// Initializing upgrade array, cost is current cost, numPurch is how many have been purchased,
// powInc is the power the cost should be raised to. buttonText is the text that appears on the button.
// If powInc is 1, that means that there's an alternative math method included in the function.
main.upgradeArray = {
	data:{      cost:20,  numPurchased:0, powInc:1.15, eff:"+= 1"},
	maximum:{   cost:10,  numPurchased:0, powInc:1,    eff:"* 2" },
	interval:{  cost:100, numPurchased:0, powInc:1.50, eff:"* 0.9"  }
};

// Unit Array, cost is current cost, numPurchased is how many purchased, powInc is power cost should be raised to,
// name is the name (for button labeling purposes), and eff is how much data is added per tick.
main.unitArray = {
  switch:{    cost:20,  numPurchased:0, powInc:1.15, eff:1},
  transistor:{cost:150, numPurchased:0, powInc:1.15, eff:3},
  byter:{     cost:400, numPurchased:0, powInc:1.15, eff:8}
};



// Basic tick time, starts at 1 second.
main.runInterval = 1000;

// Initialization of the save file
var save = {
  main: main
};



//==//==//==//==//==//==//==//==//==//==//
//FUNCTION INITIALIZATION AND DEFINITION//
//==//==//==//==//==//==//==//==//==//==//

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
  var element = document.getElementById(name); // Gets the element ID
  
  if (element.style.color != "red") { // This is specifically to prevent it changing to red
    var priColor = element.style.color; // Save the prior color
    element.style.color = "red"; // Change to red
    setTimeout(function(){element.style.color = priColor;}, 250); // After 250ms, change back.
  }
};



// Update the button text. Since the buttons themselves have bootstrap in them for organization purposes,
// These functions take the button, go into the first child (row), and then in that go into either the
// prod node or the cost node, and update from the main unitArray.
function updateUnitButtons() {
  for (name in main.unitArray) {
    document.getElementById(name).querySelector(".prod").innerHTML = "+" + main.unitArray[name].eff + "d/t";
    document.getElementById(name).querySelector(".cost").innerHTML = main.unitArray[name].cost;
  }
}

// Function to update the Upgrade button set
function updateUpgradeButtons() {
  for (name in main.upgradeArray) {
    document.getElementById(name).querySelector(".prod").innerHTML = main.upgradeArray[name].eff;
    document.getElementById(name).querySelector(".cost").innerHTML = main.upgradeArray[name].cost;
  }
}

// Save function
function saveGame() {
  save = {
    main: main // Assigns main to save
  };
  localStorage.setItem("save",JSON.stringify(save)); // Takes main.* and saves to local storage
};

// Load save function
function loadGame() {
  var savegame = JSON.parse(localStorage.getItem("save")); // Grabs Save from local storage
  if (savegame) {
    if (typeof savegame.main !== "undefined") main = savegame.main; // Assigns save to main value
  }
  update()
};

// Delete Save Function
function deleteSave() {
  var conf = confirm("Are you sure? This will delete your ENTIRE save file.") // Confirms that they want to delete
  if (conf == true) {
    localStorage.removeItem("save"); // Deletes local storage save

    // The reason values are manually assigned is because trying to deep copy in javascript is like trying to explain metaphysics to a dog.
    main.dataCur = 0;
    main.displayCur = 0;
    main.currentAdd = 1;
    main.dataMax = 10;
    main.displayMax = 0;
    main.sep = " || "
    main.firstClick = true;
    main.upgradeArray = {
      data:{      cost:20,  numPurchased:0, powInc:1.15, eff:"+= 1"},
      maximum:{   cost:10,  numPurchased:0, powInc:1,    eff:"* 2" },
      interval:{  cost:100, numPurchased:0, powInc:1.50, eff:"* 0.9"  }
    };
    main.unitArray = {
      switch:{    cost:20,  numPurchased:0, powInc:1.15, eff:1},
      transistor:{cost:150, numPurchased:0, powInc:1.15, eff:3},
      byter:{     cost:400, numPurchased:0, powInc:1.15, eff:8}
    
    };
    main.runInterval = 1000;
    console.log(main);
  }
  update();
};

// Function to update total display
function update() {
  displayCurrency();
  document.getElementById("dataCount").innerHTML = main.displayCur; // Updates the main (binary/hex) counter
  document.getElementById("decCount").innerHTML = "(" + main.dataCur + " / " + main.dataMax + ")" ; // Updates the secondary (decimal) counter.
  updateUpgradeButtons();
  updateUnitButtons();
}