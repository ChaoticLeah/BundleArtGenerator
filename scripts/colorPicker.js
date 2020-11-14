import {
  colors,
  tileW,
  tileH,
  setCol,
  tilesPerCol,
  tilesPerRow,
} from "../index.js";
import {
  fill,
  height,
  inArea,
  mousePressed,
  mouseX,
  mouseY,
  rect,
  setTitle,
  width,
} from "./toolbox.js";

export let tiles = [];

export function setTiles(i) {
  tiles = i;
}
export function setTile(i, colorID) {
  tiles[i] = colorID;
}

let colorArray;
export function resetColorArray(){
  colorArray = undefined;
}
export function colorPicker() {
  if (!colorArray) {
    tiles = new Array(tilesPerRow * tilesPerCol);
    colorArray = Object.keys(colors);
    for (let i = 0; i < tiles.length; i++) {
      tiles[i] = "black";
    }
  }
  let ycounter = 0;
  let xcounter = 0;
  for (let i = 0; i < colorArray.length; i++) {
    fill(colorArray[i]);
    rect(width - tileW - xcounter * tileW, ycounter * tileH, tileW, tileH);

    if (
      mousePressed &&
      inArea(
        mouseX,
        mouseY,
        width - tileW - xcounter * tileW,
        ycounter * tileH,
        tileW,
        tileH
      )
    ) {
      setCol(colorArray[i]);
    }
    if ((ycounter + 2) * tileH > height) {
      xcounter++;
      ycounter = -1;
    }
    ycounter++;
  }
}
