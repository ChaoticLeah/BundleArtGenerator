import {
  colorPicker,
  resetColorArray,
  setTile,
  setTiles,
  tiles,
} from "./scripts/colorPicker.js";
import { copyCommand } from "./scripts/commandGen.js";
import {
  game,
  text,
  fill,
  renderImage,
  width,
  height,
  resetMousePressed,
  mouseDown,
  mouseX,
  mouseY,
  inArea,
  rect,
  background,
  setTitle,
  setIcon,
  renderNotifications,
} from "./scripts/toolbox.js";

import { fillBucket } from "./scripts/fillBucket.js";

export let states = {
  menu: "menu",
};

export let tools = {
  PENCIL: "PENCIL",
  FILL: "FILL",
};
export let tool = tools.PENCIL;

export let selectColor = undefined;

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

document.getElementById("x8x8").addEventListener("click", function () {
  tilesPerRow = 8;
  tilesPerCol = 8;
  resetColorArray();
});
document.getElementById("x16x16").addEventListener("click", function () {
  tilesPerRow = 16;
  tilesPerCol = 16;
  resetColorArray();
});

document.getElementById("loadAutosave").addEventListener("click", function () {
  let data = JSON.parse(localStorage.getItem("Bundle_Art_Autosave")).data;
  if (!!data) setTiles(data);
  else alert("Error: There is no save data");
  document.getElementById("loadAutosave").remove();
  //console.log(data);
});

document.getElementById("pencil").addEventListener("click", function () {
  tool = tools.PENCIL;
});
document.getElementById("fill").addEventListener("click", function () {
  tool = tools.FILL;
});

let glassPath = "./assets/GlassAssets/";
export let glassIcons = new Map();
glassIcons.set("purple", new Image());
glassIcons.get("purple").src = `${glassPath}Purple.png`;
glassIcons.set("magenta", new Image());
glassIcons.get("magenta").src = `${glassPath}Magenta.png`;
glassIcons.set("pink", new Image());
glassIcons.get("pink").src = `${glassPath}Pink.png`;
glassIcons.set("blue", new Image());
glassIcons.get("blue").src = `${glassPath}Blue.png`;
glassIcons.set("cyan", new Image());
glassIcons.get("cyan").src = `${glassPath}Cyan.png`;
glassIcons.set("#20B2AA", new Image());
glassIcons.get("#20B2AA").src = `${glassPath}LightBlue.png`;
glassIcons.set("green", new Image());
glassIcons.get("green").src = `${glassPath}Green.png`;
glassIcons.set("lime", new Image());
glassIcons.get("lime").src = `${glassPath}Lime.png`;
glassIcons.set("yellow", new Image());
glassIcons.get("yellow").src = `${glassPath}Yellow.png`;
glassIcons.set("orange", new Image());
glassIcons.get("orange").src = `${glassPath}Orange.png`;
glassIcons.set("red", new Image());
glassIcons.get("red").src = `${glassPath}Red.png`;
glassIcons.set("white", new Image());
glassIcons.get("white").src = `${glassPath}White.png`;
glassIcons.set("black", new Image());
glassIcons.get("black").src = `${glassPath}Black.png`;
glassIcons.set("grey", new Image());
glassIcons.get("grey").src = `${glassPath}Grey.png`;

glassIcons.set("rgb(124,113,103)", new Image());
glassIcons.get("rgb(124,113,103)").src = `${glassPath}Brown.png`;

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
        //fill(currentColor);
        renderImage(
          glassIcons.get(currentColor),
          i * tileW + (spaceInBetweenTiles + xOffset),
          j * tileH + (spaceInBetweenTiles + yOffset),
          tileW - spaceInBetweenTiles,
          tileH - spaceInBetweenTiles
        );
        if (mouseDown) {
          //(index/tilesPerRow) + index % tilesPerRow
          //tiles[counter] = currentColor;

          if (tool == tools.FILL) {
            console.log("filling");
            selectColor = tiles[counter];
            fillBucket(counter, currentColor);
          } else setTile(counter, currentColor);

          localStorage.setItem(
            "Bundle_Art_Autosave",
            JSON.stringify({ data: tiles })
          );
        }
      } else {
        if (!!tiles[counter]) {
          try {
            renderImage(
              glassIcons.get(tiles[counter]),
              i * tileW + (spaceInBetweenTiles + xOffset),
              j * tileH + (spaceInBetweenTiles + yOffset),
              tileW - spaceInBetweenTiles,
              tileH - spaceInBetweenTiles
            );
          } catch (err) {
            fill(tiles[counter]);
            rect(
              i * tileW + (spaceInBetweenTiles + xOffset),
              j * tileH + (spaceInBetweenTiles + yOffset),
              tileW - spaceInBetweenTiles,
              tileH - spaceInBetweenTiles
            );
          }
        } else {
          fill("black");
          rect(
            i * tileW + (spaceInBetweenTiles + xOffset),
            j * tileH + (spaceInBetweenTiles + yOffset),
            tileW - spaceInBetweenTiles,
            tileH - spaceInBetweenTiles
          );
        }
      }

      counter++;
    }
  }

  colorPicker();
  renderNotifications();
  resetMousePressed();
}
