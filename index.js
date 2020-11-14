import { colorPicker, resetColorArray, setTile, setTiles, tiles } from "./scripts/colorPicker.js";
import { copyCommand } from "./scripts/commandGen.js";
import {
  game,
  text,
  textWraped,
  fill,
  setFontSize,
  renderImage,
  width,
  height,
  resetMousePressed,
  mousePressed,
  mouseDown,
  mouseX,
  mouseY,
  inArea,
  rect,
  keyPressed,
  keys,
  keyReleased,
  button,
  background,
  setTitle,
  setIcon,
  keyDown,
  keyPushed,
} from "./scripts/toolbox.js";

export let states = {
  game: "game",
  menu: "menu",
  settings: "settings",
};

export let state = states.menu;
export function setState(s) {
  state = s;
}

game.start();
var lastRender = Date.now();
export let fps;

//!Putting stuff here makes it run only once at the start when it loads

setTitle("Minecraft Bundle Art Generator By KevinWho!");
setIcon("./assets/Bundle_Filled.png");

let xOffset = 0;
let yOffset = 0;
let totalWidth = 400;
let totalHeight = 400;
export let tilesPerRow = 8;
export let tilesPerCol = 8;

export let tileW;
export let tileH;

let spaceInBetweenTiles = 2;

export let currentColor = "red";

export function setCol(col) {
  currentColor = col;
}

/*export let colors = {
  purple_stained_glass_pane: "purple",
  magenta_stained_glass_pane: "magenta",
  pink_stained_glass_pane: "pink",
  blue_stained_glass_pane: "blue",
  cyan_stained_glass_pane: "cyan",
  light_blue_stained_glass_pane: "#20B2AA",
  green_stained_glass_pane: "green",
  lime_stained_glass_pane: "lime",
  yellow_stained_glass_pane: "yellow",
  orange_stained_glass_pane: "orange",
  red_stained_glass_pane: "red",
  white_stained_glass_pane: "white",
  black_stained_glass_pane: "black",
  grey_stained_glass_pane: "grey",
  brown_stained_glass_pane: "brown",
};*/

export let colors = {
  purple: "purple_stained_glass_pane",
  magenta: "magenta_stained_glass_pane",
  pink: "pink_stained_glass_pane",
  blue: "blue_stained_glass_pane",
  cyan: "cyan_stained_glass_pane",
  "#20B2AA": "light_blue_stained_glass_pane",
  green: "green_stained_glass_pane",
  lime: "lime_stained_glass_pane",
  yellow: "yellow_stained_glass_pane",
  orange: "orange_stained_glass_pane",
  red: "red_stained_glass_pane",
  white: "white_stained_glass_pane",
  black: "black_stained_glass_pane",
  grey: "grey_stained_glass_pane",
  "rgb(124,113,103)": "brown_stained_glass_pane",
};
document.getElementById("Copy").addEventListener("click", copyCommand);


document.getElementById("x8x8").addEventListener("click", function() {
  tilesPerRow = 8;
  tilesPerCol = 8;
  resetColorArray();
});
document.getElementById("x16x16").addEventListener("click", function() {
  tilesPerRow = 16;
  tilesPerCol = 16;
  resetColorArray();

});



export function updateGameArea() {
  var delta = (Date.now() - lastRender) / 1000;
  lastRender = Date.now();
  fps = Math.round(1 / delta);
  game.clear();
  game.frameNo += 1;

  //!Main code here

  background("#2D3943");

  if (game.frameNo % 4 == 0) {
    let shortest = width > height ? height : width;
    totalHeight = shortest / 1.5;
    totalWidth = shortest / 1.5;
    xOffset = width / 2 - totalWidth / 2;
    yOffset = height / 2 - totalHeight / 2;
  }

  //fps counter below
  fill("black");
  text(`FPS: ${fps}`, 10, 10);

  fill("#CBAA4B");
  rect(xOffset, yOffset, totalWidth, totalHeight);

  tileW = (totalWidth - spaceInBetweenTiles) / tilesPerRow;
  tileH = (totalHeight - spaceInBetweenTiles) / tilesPerCol;

  let counter = 0;
  for (let j = 0; j < tilesPerRow; j++) {
    for (let i = 0; i < tilesPerCol; i++) {
      if (
        inArea(
          mouseX,
          mouseY,
          i * tileW + (spaceInBetweenTiles + xOffset),
          j * tileH + (spaceInBetweenTiles + yOffset),
          tileW - spaceInBetweenTiles,
          tileH - spaceInBetweenTiles
        )
      ) {
        fill(currentColor);

        if (mouseDown) {
          //(index/tilesPerRow) + index % tilesPerRow
          //tiles[counter] = currentColor;
          setTile(counter, currentColor);
        }
      } else {
        if (!!tiles[counter]) fill(tiles[counter]);
        else fill("black");
      }

      rect(
        i * tileW + (spaceInBetweenTiles + xOffset),
        j * tileH + (spaceInBetweenTiles + yOffset),
        tileW - spaceInBetweenTiles,
        tileH - spaceInBetweenTiles
      );
      counter++;
    }
  }

  colorPicker();

  resetMousePressed();
}
