// This function runs through the main var array to grab data that should be added every interval
// It then adds data to the current data, numberPurchased * how much produced (eff).
function cycleUnits() { 
  array = Object.entries(main.unitArray);
  arrayLen = array.length;
  for (var i = 0; i < arrayLen; i++) {
    if (main.dataCur < main.dataMax) {
      main.dataCur += (array[i][1].numPurchased * array[i][1].eff);
      if (main.dataCur >= main.dataMax) {
        main.dataCur = main.dataMax;
      }
    }
  }
}

// Main function
window.setInterval(function(){
  cycleUnits();
  update();
}, main.runInterval);

// Save the game every 30 seconds.
window.setInterval(function() {
  saveGame();
}, 30000);