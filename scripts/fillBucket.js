import { tilesPerCol, tilesPerRow, selectColor } from "../index.js";
import { tiles } from "./colorPicker.js";
import { setTile } from "./colorPicker.js";
export function fillBucket(index, color) {
  if (color == selectColor) return;
  setTile(index, color);

  let checked = [];
  checked.push(index);

  while (checked.length > 0) {
    var index = checked.pop();
    //Fill right tile
    if (
      index + 1 < tilesPerRow * tilesPerCol &&
      index % tilesPerRow != tilesPerRow - 1 &&
      tiles[index + 1] == selectColor
    ) {
      setTile(index + 1, color);
      checked.push(index + 1);
    }

    //Fill left tile
    if (
      index - 1 > 0 &&
      index % tilesPerRow != 0 &&
      tiles[index - 1] == selectColor
    ) {
      setTile(index - 1, color);
      checked.push(index - 1);
    }

    //Fill lower tile
    if (index - tilesPerRow > -1 && tiles[index - tilesPerRow] == selectColor) {
      setTile(index - tilesPerRow, color);
      checked.push(index - tilesPerRow);
    }

    //Fill upper tile
    if (
      index + tilesPerRow < tilesPerRow * tilesPerCol &&
      tiles[index + tilesPerRow] == selectColor
    ) {
      setTile(index + tilesPerRow, color);
      checked.push(index + tilesPerRow);
    }
  }
}
