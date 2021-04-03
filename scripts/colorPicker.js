import {
  colors,
  tileW,
  tileH,
  setCol,
  tilesPerCol,
  tilesPerRow,
  glassIcons,
} from "../index.js";
import {
  fill,
  height,
  inArea,
  mousePressed,
  mouseX,
  mouseY,
  rect,
  renderImage,
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
export function resetColorArray() {
  colorArray = undefined;
  tiles = new Array(tilesPerRow * tilesPerCol);
  colorArray = Object.keys(colors);
  for (let i = 0; i < tiles.length; i++) {
    tiles[i] = "black";
  }
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
    try {
      renderImage(
        glassIcons.get(colorArray[i]),
        width - tileW - xcounter * tileW,
        ycounter * tileH,
        tileW,
        tileH
      );
    } catch (err) {
      console.log(err);
      fill(colorArray[i]);
      rect(width - tileW - xcounter * tileW, ycounter * tileH, tileW, tileH);
    }

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
