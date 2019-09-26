var currentTab = ""
var buttonTabs = ["upgradesCollapse", "unitsCollapse"];
var firstClick = true;

$(document).ready(function () {

    $('.Collapse').on('click', function () {
        if (currentTab == "") {                                    // If no tab is open
            $(this).toggleClass('active');                         // Open this tab
            $("#" + this.id + "Sidebar").toggleClass('invisible'); // Make the bar visible
            $("#leftSidebar").toggleClass('active');               // And the sidebar
            currentTab = this.id;                                  // Set open tab
        } else if (currentTab != this.id && currentTab != "") {         // If a different tab is open
            $("#" + currentTab).toggleClass('active');                  // Close that tab
            $("#" + currentTab + "Sidebar").toggleClass('invisible');   // Make it invisible, but don't close the sidebar.
            $(this).toggleClass('active');                              // Open this tab
            $("#" + this.id + "Sidebar").toggleClass('invisible');      // Make this tab visible.
            currentTab = this.id;                                       // Set open tab
        } else {                                                    // If this tab is open
            $(this).toggleClass('active');                          // Close it
            $("#leftSidebar").toggleClass('active');                // Close the sidebar
            $("#" + this.id + "Sidebar").toggleClass('invisible');  // Make the text invisible
            currentTab = "";                                        // Empty open tab
        }
        
    });
  });
  

$(document).ready(function() {
      setTimeout( function(){
          $('#mainButton').animate({ color: "rgb(199, 199, 199)"}, '3000');
      },6000);
  });

$(document).ready(function() {
    $('.upgrade').on('click', function() {
        var element = this.id;
        var cost = upgradeArray[element].cost;
        if (dataCur >= cost) {
            upgradeArray[element].numPurchased += 1;
            

            dataCur -= cost;
            switch(element) {
                case "data":
                    currentAdd += 1;
                    upgradeArray[element].cost = Math.round(Math.pow(upgradeArray[element].cost, upgradeArray[element].powInc));
                    console.log(upgradeArray[element].cost);
                    break;
                case "maximum":
                    upgradeArray[element].cost = upgradeArray[element].cost * 2;
                    dataMax = dataMax * 2;
                    break;

                case "interval":

                    break;
                
            }
            document.getElementById(this.id).innerHTML = upgradeArray[element].buttonText + sep + upgradeArray[element].cost;
            update();
        } else {
            flashred(this.id);
        }



        // False
            // flashred(this.id)
    })
});

$(document).ready(function() {
    loadGame();
});