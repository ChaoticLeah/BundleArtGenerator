import { colors } from "../index.js";
import { tiles } from "./colorPicker.js";
import { copyTextToClipboard } from "./toolbox.js";

let commandStart = "give @p bundle{Items:[";
let commandEnd = "]}";

let commandModule = `{id:"minecraft:panecolhere",Count:1b}`;

export function copyCommand() {
  let command = commandStart;

  let counter = 0;

  tiles.forEach((e) => {
    //this line was added as a quickfix. This removes the bottom right pixel.
    if(counter >= tiles.length - 1)return;
    if (counter != 0) command += ",";
    
    command += commandModule.replace("panecolhere", colors[e]);
    counter++;
  });
  command += commandEnd;

  copyTextToClipboard(command);
  console.log(command);
}
