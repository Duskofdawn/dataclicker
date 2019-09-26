function buttonClick(num) {
  if (dataCur < dataMax) {
    dataCur += num;
  } else {
    flashred("decCount");
    flashred("dataCount");
  }
  update();
}
