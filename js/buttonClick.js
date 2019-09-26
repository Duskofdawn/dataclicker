function buttonClick(num) {
  if (dataCur < dataMax) {
    dataCur += num;
    if (dataCur > dataMax) {
      dataCur = dataMax;
    }
  } else {
    flashred("decCount");
    flashred("dataCount");
  }
  update();
}
