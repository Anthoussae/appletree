"use strict";

//function to generate random data in a treelike structure.
function generateRandomData(iterations) {
  let randomData = [];
  randomData.push(treeGeneration(iterations));
  return randomData;
}
//function to randomly populate a tree with miscellaneous data and sub-trees.
function treeGeneration(iterations) {
  const creaturePool = [
    "鬼",
    "雪女",
    "河童",
    "天狗",
    "狐",
    "狸",
    "ぬらりひょん",
    "からかさ小僧",
    "酒呑童子",
    "座敷童子",
    "一つ目小僧",
    "絡新婦",
    "口裂け女",
    "人魚",
    "魍魎",
    "狐火",
    "鵺",
    "輪入道",
    "牛鬼",
    "天逆毎",
  ];
  const adjPool = [
    "恐ろしい",
    "不気味な",
    "友好的な",
    "幽玄な",
    "奇怪な",
    "邪悪な",
    "神秘的な",
    "怖い",
    "魅惑的な",
    "妖しい",
    "呪われた",
    "怪しい",
    "凄まじい",
    "霊的な",
    "陰湿な",
    "暗い",
    "恐怖の",
    "畏怖の",
    "幻影的な",
    "妖艶な",
  ];
  let output = [];
  for (let i = 0; i < iterations; i++) {
    if (Math.random() > 0.5) {
      if (i > 2) {
        output.push(treeGeneration(Math.floor(i / 2)));
      }
    } else {
      if (Math.random() > 0.5) {
        output.push(
          adjPool[Math.floor(Math.random() * adjPool.length)] +
            creaturePool[Math.floor(Math.random() * creaturePool.length)]
        );
      } else {
        output.push(Math.floor(Math.random() * 100));
      }
    }
  }
  return output;
}
//a function that checks if an element is an array, and if so, counts the total number of elements inside it, including nested arrays and the elements inside those nested arrays.
function countElements(arr) {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      count += countElements(arr[i]);
    } else {
      count++;
    }
  }
  return count;
}

//function to sort the tree data in a way that the tree is drawn in a more organized way.
//sorts each array by arrays first, then strings, then numbers, then anything else.
//arrays are sorted by the number of elements they contain, in descending order.
//the strings are sorted by length.
//the numbers are sorted in descending order (largest to smallest).
//everything else is unsorted.
function sortedData(data) {
  data.sort((a, b) => {
    if (Array.isArray(a) && !Array.isArray(b)) {
      return -1;
    } else if (!Array.isArray(a) && Array.isArray(b)) {
      return 1;
    } else if (Array.isArray(a) && Array.isArray(b)) {
      return countElements(b) - countElements(a);
    } else if (typeof a === "string" && typeof b !== "string") {
      return -1;
    } else if (typeof a !== "string" && typeof b === "string") {
      return 1;
    } else if (typeof a === "string" && typeof b === "string") {
      return a.length - b.length;
    } else if (typeof a === "number" && typeof b !== "number") {
      return -1;
    } else if (typeof a !== "number" && typeof b === "number") {
      return 1;
    } else if (typeof a === "number" && typeof b === "number") {
      return b - a;
    } else {
      return 0;
    }
  });
  for (let i = 0; i < data.length; i++) {
    if (Array.isArray(data[i])) {
      data[i] = sortedData(data[i]);
    }
  }
  return data;
}

// Tree drawing main function.
function drawTree(number) {
  let data = generateRandomData(number);
  data = sortedData(data); // Sort data
  let totalElementsCount = countElements(data);
  drawTreeHTML(
    data,
    document.getElementById("output"),
    "α",
    1,
    totalElementsCount
  );
  console.log(data);
}

// An HTML template element for a tree node, representing a clickable folder that can be expanded and collapsed.
const treeNode = document.createElement("template");
treeNode.innerHTML = `
  <div class="tree-node" style="display: flex;">
    <div class="folder" style="cursor: pointer; width: 20px;"></div>
    <div class="label"></div>
    <div class="subtree-container" style="flex-grow: 1;"></div>
  </div>
`;

// Greek letter mapping for generations
const greekLetters = [
  "α",
  "β",
  "γ",
  "δ",
  "ε",
  "ζ",
  "η",
  "θ",
  "ι",
  "κ",
  "λ",
  "μ",
  "ν",
  "ξ",
  "ο",
  "π",
  "ρ",
  "σ",
  "τ",
  "υ",
  "φ",
  "χ",
  "ψ",
  "ω",
];

// Function to measure the width of the longest label
function measureMaxLabelWidth(data, generation, folderCount) {
  let maxWidth = 0;

  // Create a temporary container for measuring
  let tempContainer = document.createElement("div");
  document.body.appendChild(tempContainer);

  // Measure widths of labels
  for (let i = 0; i < data.length; i++) {
    let tempNode = treeNode.content.cloneNode(true);
    let tempLabel = tempNode.querySelector(".label");

    if (Array.isArray(data[i])) {
      tempLabel.textContent = `${generation} ${folderCount}`;
      folderCount++;
    } else {
      tempLabel.textContent = data[i];
    }

    tempContainer.appendChild(tempNode);

    // Update the maximum width if needed
    let labelWidth = tempLabel.offsetWidth;
    if (labelWidth > maxWidth) {
      maxWidth = labelWidth;
    }
  }

  // Clean up the temporary container
  document.body.removeChild(tempContainer);

  return maxWidth;
}

function drawTreeHTML(data, outputDiv, generation, folderCount, number) {
  let inputNumber = number;
  // Measure the maximum width of labels in the current folder
  let maxWidth = measureMaxLabelWidth(data, generation, folderCount);
  // Create the actual nodes
  folderCount = 1; // Reset folder count after measuring
  for (let i = 0; i < data.length; i++) {
    let node = treeNode.content.cloneNode(true);
    let label = node.querySelector(".label");
    let folder = node.querySelector(".folder");
    let subtreeContainer = node.querySelector(".subtree-container");

    if (Array.isArray(data[i])) {
      // Set the folder name using the Greek letter and count
      label.textContent = `${generation} ${folderCount}`;
      folder.textContent = "▶";
      folder.classList.add("folder");
      // Set dynamic styles
      const color = pickColor(data[i], inputNumber); // Assuming pickColor function is defined elsewhere
      folder.style.color = color.text; // Set text color
      folder.style.backgroundColor = color.background; // Set background color
      folder.style.border = `1px solid ${color.border}`; // Set border color

      folder.addEventListener("click", function () {
        if (folder.classList.contains("folder")) {
          // Handle opening the folder
          folder.classList.remove("folder");
          folder.classList.add("open-folder");
          folder.textContent = "▼";
          label.style.color = "black";
          label.style.fontWeight = "normal";
          subtreeContainer.style.marginLeft = `${maxWidth + 20}px`; // Set margin based on max width
          //set dynamic styles
          folder.style.color = color.openText; // Set text color
          folder.style.backgroundColor = color.openBackground; // Set background color
          folder.style.border = `1px solid ${color.openBorder}`; // Set border color
          // Draw the subtree, even if it's empty
          drawTreeHTML(
            data[i],
            subtreeContainer,
            greekLetters[greekLetters.indexOf(generation) + 1],
            1,
            inputNumber
          );
        } else {
          // Handle closing the folder
          folder.classList.remove("open-folder");
          folder.classList.add("folder");
          label.style.color = "blue";
          label.style.fontWeight = "bold";
          folder.textContent = "▶";
          subtreeContainer.innerHTML = ""; // Clear the subtree contents
          // / Set dynamic styles
          folder.style.color = color.text; // Set text color
          folder.style.backgroundColor = color.background; // Set background color
          folder.style.border = `1px solid ${color.border}`; // Set border color
        }
      });

      folderCount++; // Increment the folder count for the next folder in the same generation
    } else {
      folder.classList.add("not-folder");
      label.textContent = data[i];
    }

    outputDiv.appendChild(node);
  }
}

//later develop this to display colors based on the #of items in a folder relative to the total size of the tree.
function pickColor(array, seedNumber) {
  // Return an object with color properties based on the index or any other criteria

  return {
    text: "blue", // Example color for text
    openText: "white", // Example color for text when folder is open
    background: "lightblue", // Example color for background
    openBackground: "darkblue", // Example color for background when folder is open
    border: "blue", // Example color for border
    openBorder: "black", // Example color for border when folder is open
  };
}
//execute code. the number passed determines tree size.
drawTree(100);
