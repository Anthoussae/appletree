"use strict";
import { drawTree } from "./drawTree";
import { parseMathlikeString } from "./parseMathlikeString";

// const port = process.env.PORT || 8080;
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

let displayToggles = {
  drawTree: false,
  parseMathlikeString: false,
};

document.getElementById("drawTree").addEventListener("click", () => {
  display("drawTree");
});
document.getElementById("parseMathlikeString").addEventListener("click", () => {
  display("parseMathlikeString");
});

//this should be automatable

function display(id) {
  let outputDisplay = document.getElementById("output");
  let operationsDisplay = document.getElementById("operationsButtons");

  // Clear the screen and reset all toggles
  outputDisplay.innerHTML = "";
  operationsDisplay.innerHTML = "";

  for (let key in displayToggles) {
    if (displayToggles.hasOwnProperty(key)) {
      displayToggles[key] = false;
    }
  }

  // Activate the selected mode
  displayToggles[id] = true;

  // Perform the appropriate action based on the selected mode
  if (id === "drawTree" && displayToggles.drawTree) {
    drawTree();
  } else if (
    id === "parseMathlikeString" &&
    displayToggles.parseMathlikeString
  ) {
    parseMathlikeString();
  }
}
