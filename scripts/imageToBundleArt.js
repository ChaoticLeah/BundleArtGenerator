import { glassIcons, tilesPerCol, tilesPerRow } from "../index.js";
import { setTile } from "./colorPicker.js";
import { loadImg, renderImage } from "./toolbox.js";

let dropArea = document.getElementById("canvasHolder");
let imageBuffer;

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
  dropArea.addEventListener(eventName, preventDefaults, false);
});

dropArea.addEventListener("drop", dropHandler, false);

function dropHandler(e) {
  let dt = e.dataTransfer;
  let files = dt.files;
  uploadFiles(files);
}

async function getAvrgColor(img) {
  let c = document.createElement("canvas");
  c.width = 1;
  c.height = 1;
  imageBuffer = img;
  //wait for it to load in
  await imageBuffer;
  c.getContext("2d").drawImage(imageBuffer, 0, 0, 1, 1);
  let RGBA = c.getContext("2d").getImageData(0, 0, c.width, c.height).data;
  return await { r: RGBA[0], g: RGBA[1], b: RGBA[2], a: RGBA[3] };
}

function uploadFiles(files) {
  for (let i = 0; i < files.length; i++) {
    //Make sure that its a image
    if (files[i].type.startsWith("image/"))
      readImage(files[i], (dataURL) => {
        let c = document.createElement("canvas");
        c.width = tilesPerRow;
        c.height = tilesPerCol;
        imageBuffer = loadImg(dataURL);
        //document.body.appendChild(c);
        imageBuffer.onload = () => {
          c.getContext("2d").mozImageSmoothingEnabled = false;
          c.getContext("2d").webkitImageSmoothingEnabled = false;
          c.getContext("2d").msImageSmoothingEnabled = false;
          c.getContext("2d").imageSmoothingEnabled = false;
          c.getContext("2d").drawImage(imageBuffer, 0, 0, c.width, c.height);

          let imageData = c
            .getContext("2d")
            .getImageData(0, 0, c.width, c.height);

          //put the pixel data in a nicer way
          let pixelData = [];
          for (
            let i = 0;
            i < imageData.data.length / 4 /*Div by 4 since its RGBA(4 vals) */;
            i++
          ) {
            pixelData.push({
              r: imageData.data[i * 4],
              g: imageData.data[i * 4 + 1],
              b: imageData.data[i * 4 + 2],
              a: imageData.data[i * 4 + 3],
            });
            console.log({
              r: imageData.data[i * 4],
              g: imageData.data[i * 4 + 1],
              b: imageData.data[i * 4 + 2],
              a: imageData.data[i * 4 + 3],
            });
          }

          let glassRGBS = [];
          //console.log(glassIcons.size);

          (async () => {
            var glassKeys = glassIcons.keys();
            for (let glassKey of glassKeys) {
              let json = await getAvrgColor(glassIcons.get(glassKey));

              json.id = glassKey;
              glassRGBS.push(json);
            }
            let lowest = {
              name: "",
              totalDifference: 10000,
            };
            let ce = document.createElement("canvas");
            ce.width = tilesPerRow * 8;
            ce.height = tilesPerCol * 8;
            document.body.appendChild(ce);
            setTimeout(() => {
              document.body.removeChild(ce);
            }, 2000);
            //Place the "pixels"
            for (let i = 0; i < pixelData.length; i++) {
              let pxl = pixelData[i];
              //console.log(glassRGBS[FindNearestColor(glassRGBS, pxl)].id);

              ce.getContext(
                "2d"
              ).fillStyle = `rgb(${pxl.r}, ${pxl.g}, ${pxl.b})`;
              ce.getContext("2d").fillRect(
                (i % c.width) * 8,
                Math.round(i / c.width) * 8,
                8,
                8
              );

              setTile(i, glassRGBS[FindNearestColor(glassRGBS, pxl)].id);
            }
          })();
        };
      });
  }
}

async function readImage(file, callback) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    //console.log(reader.result);
    callback(reader.result);
  };

  //return reader.readAsDataURL(file);
}

function FindNearestColor(map, current) {
  let shortestDistance;
  let index;

  index = -1;
  shortestDistance = 99999999;

  for (let i = 0; i < map.length; i++) {
    let match;
    let distance;

    match = map[i];
    distance = GetDistance(current, match);

    if (distance < shortestDistance) {
      index = i;
      shortestDistance = distance;
    }
  }

  return index;
}

function GetDistance(current, match) {
  let redDifference;
  let greenDifference;
  let blueDifference;
  redDifference = current.r - match.r;
  greenDifference = current.g - match.g;
  blueDifference = current.b - match.b;

  return (
    redDifference * redDifference +
    greenDifference * greenDifference +
    blueDifference * blueDifference
  );
}

function rgbToHsv(r, g, b) {
  var h;
  var s;
  var v;

  var maxColor = Math.max(r, g, b);
  var minColor = Math.min(r, g, b);
  var delta = maxColor - minColor;

  // Calculate hue
  // To simplify the formula, we use 0-6 range.
  if (delta == 0) {
    h = 0;
  } else if (r == maxColor) {
    h = (6 + (g - b) / delta) % 6;
  } else if (g == maxColor) {
    h = 2 + (b - r) / delta;
  } else if (b == maxColor) {
    h = 4 + (r - g) / delta;
  } else {
    h = 0;
  }
  // Then adjust the range to be 0-1
  h = h / 6;

  // Calculate saturation
  if (maxColor != 0) {
    s = delta / maxColor;
  } else {
    s = 0;
  }

  // Calculate value
  v = maxColor / 255;

  return { h: h, s: s, v: v };
}
