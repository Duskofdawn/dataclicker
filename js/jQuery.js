var currentTab = ""
var buttonTabs = ["upgradesCollapse", "unitsCollapse"];


// Function to change tabs/handle sidebar
$(document).ready(function () {

    $('.Collapse').on('click', function () {
        if (currentTab == "") {                                    // If no tab is open

            $(this).toggleClass('active');                         // Attach the tab button to the sidebar
            $("#" + this.id + "Sidebar").toggleClass('invisible'); // Make the contents of the tab visible
            $("#leftSidebar").toggleClass('active');               // Open the sidebar
            currentTab = this.id;                                  // Set open tab

        } else if (currentTab != this.id && currentTab != "") {         // If a different tab is open

            $("#" + currentTab).toggleClass('active');                  // Detatch the tab from the sidebar
            $("#" + currentTab + "Sidebar").toggleClass('invisible');   // Make the contents of the tab invisible
            $(this).toggleClass('active');                              // Attach the new tab
            $("#" + this.id + "Sidebar").toggleClass('invisible');      // Make new contents visible
            currentTab = this.id;                                       // Set open tab

        } else {                                                    // If this tab is open

            $(this).toggleClass('active');                          // Detatch from sidebar
            $("#leftSidebar").toggleClass('active');                // Close the sidebar
            $("#" + this.id + "Sidebar").toggleClass('invisible');  // Make the tab contents invisible
            currentTab = "";                                        // Empty open tab
        }
        
    });
  });
  
// Function makes text on main button red on startup and then fades to grey after a moment
$(document).ready(function() {
    loadGame(); // On game load
    if (main.firstClick == true) { // If this is the first click (set in game vars)
        $('#mainButton').css("color", "red"); // Make the button red
      setTimeout( function(){
          $('#mainButton').animate({ color: "rgb(199, 199, 199)"}, '3000'); // After a moment make it gray
      },6000);
      main.firstClick = false; // Set firstclick to False.
      saveGame(); // Save the game.
    }
  });


  // Function to deal with upgrade purchases
$(document).ready(function() {
    $('.upgrade').on('click', function() {                  // When an upgrade button is clicked
        var element = this.id;                              // Set the ID of the clicked button to a variable
        var cost = main.upgradeArray[element].cost;         // Grab the cost from this element in the upgradeArray

        if (main.dataCur >= cost) {                         // Check to see whether you have enough data
            main.upgradeArray[element].numPurchased += 1;   // If you do, add 1 to amount purchased
            main.dataCur -= cost;                           // Subtract that amount from your current data

            // Updates the cost of the element by function newCost = cost^powInc, rounded to the nearest integer.
            // If powInc is 1, an alternative cost function should be included in the case.
            main.upgradeArray[element].cost = Math.round(Math.pow(main.upgradeArray[element].cost, main.upgradeArray[element].powInc));

            switch(element) {                       // Switch for upgrade types
                case "data":
                    main.currentAdd += 1;           // Add 1 to data added on button click
                    break;

                case "maximum": // Data cap
                    main.upgradeArray[element].cost = main.upgradeArray[element].cost * 2; // Cost goes up by newCost = cost*2
                    main.dataMax = main.dataMax * 2; // Cap goes up by *2
                    break;

                case "interval":
                    main.runInterval = main.runInterval * .9; // Decrease run interval by 10%
                    break;
            }

            update(); // Update the amount of data

        } else { // If you don't have enough data
            flashred(this.id); // Flash the data red
        }
    })
});

// Function to handle unit purchases
$(document).ready(function() {
    $('.unit').on('click', function() {                 // When a unit button is clicked
        var element = this.id;                          // Set the ID of the clicked button to a variable
        var cost = main.unitArray[element].cost;        // Grab the cost from this element in the unitArray


        if (main.dataCur >= cost) {                     // Check to see whether you have enough data
            main.unitArray[element].numPurchased += 1;  // If you do, add 1 to amount purchased
            main.dataCur -= cost;                       // Subtract that amount from your current data
            
            // Increases the cost by the function newCost = cost ^ powInc, rounded to integer.
            main.unitArray[element].cost = Math.round(Math.pow(main.unitArray[element].cost, main.unitArray[element].powInc)); // Cost goes to Cost ^ PowInc, rounded.
            update(); // Update the display
        } else { // If you don't have enough data
            flashred(this.id); // Flash the data display red
        }

    })
});

$(function() {
    $('[data-toggle="tooltip"]').tooltip()
});