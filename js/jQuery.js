var currentTab = ""
var buttonTabs = ["upgradesCollapse", "unitsCollapse"];

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
            $("#" + this.id + "Sidebar").toggleClass('active');         // Make this tab visible.
            currentTab = this.id;                                       // Set open tab
        } else {                                                    // If this tab is open
            $(this).toggleClass('active');                          // Close it
            $("#leftSidebar").toggleClass('active');                // Close the sidebar
            $("#" + this.id + "Sidebar").toggleClass('invisible');  // Make the text invisible
            currentTab = "";                                        // Empty open tab
        }
        
    });
  });
  