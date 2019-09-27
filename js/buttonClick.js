function buttonClick() {
  if (main.dataCur < main.dataMax) {
    main.dataCur += main.currentAdd;
    if (main.dataCur > main.dataMax) {
      main.dataCur = main.dataMax;
    }
  } else {
    flashred("decCount");
    flashred("dataCount");
  }
  update();
}
