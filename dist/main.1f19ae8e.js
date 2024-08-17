// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"drawTree.js":[function(require,module,exports) {
"use strict";

//function to generate random data in a treelike structure.
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drawTree = drawTree;
function generateRandomData(iterations) {
  var randomData = [];
  randomData.push(treeGeneration(iterations));
  return randomData;
}
//function to randomly populate a tree with miscellaneous data and sub-trees.
function treeGeneration(iterations) {
  var creaturePool = ["鬼", "雪女", "河童", "天狗", "狐", "狸", "ぬらりひょん", "からかさ小僧", "酒呑童子", "座敷童子", "一つ目小僧", "絡新婦", "口裂け女", "人魚", "魍魎", "狐火", "鵺", "輪入道", "牛鬼", "天逆毎"];
  var adjPool = ["恐ろしい", "不気味な", "友好的な", "幽玄な", "奇怪な", "邪悪な", "神秘的な", "怖い", "魅惑的な", "妖しい", "呪われた", "怪しい", "凄まじい", "霊的な", "陰湿な", "暗い", "恐怖の", "畏怖の", "幻影的な", "妖艶な"];
  var output = [];
  for (var i = 0; i < iterations; i++) {
    if (Math.random() > 0.5) {
      if (i > 2) {
        output.push(treeGeneration(Math.floor(i / 2)));
      }
    } else {
      if (Math.random() > 0.5) {
        output.push(adjPool[Math.floor(Math.random() * adjPool.length)] + creaturePool[Math.floor(Math.random() * creaturePool.length)]);
      } else {
        output.push(Math.floor(Math.random() * 100));
      }
    }
  }
  return output;
}
//a function that checks if an element is an array, and if so, counts the total number of elements inside it, including nested arrays and the elements inside those nested arrays.
function countElements(arr) {
  var count = 0;
  for (var i = 0; i < arr.length; i++) {
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
  data.sort(function (a, b) {
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
  for (var i = 0; i < data.length; i++) {
    if (Array.isArray(data[i])) {
      data[i] = sortedData(data[i]);
    }
  }
  return data;
}

// An HTML template element for a tree node, representing a clickable folder that can be expanded and collapsed.
var treeNode = document.createElement("template");
treeNode.innerHTML = "\n  <div class=\"tree-node\" style=\"display: flex;\">\n    <div class=\"folder\" style=\"cursor: pointer; width: 20px;\"></div>\n    <div class=\"label\"></div>\n    <div class=\"subtree-container\" style=\"flex-grow: 1;\"></div>\n  </div>\n";

// Greek letter mapping for generations
var greekLetters = ["α", "β", "γ", "δ", "ε", "ζ", "η", "θ", "ι", "κ", "λ", "μ", "ν", "ξ", "ο", "π", "ρ", "σ", "τ", "υ", "φ", "χ", "ψ", "ω"];

// Function to measure the width of the longest label
function measureMaxLabelWidth(data, generation, folderCount) {
  var maxWidth = 0;

  // Create a temporary container for measuring
  var tempContainer = document.createElement("div");
  document.body.appendChild(tempContainer);

  // Measure widths of labels
  for (var i = 0; i < data.length; i++) {
    var tempNode = treeNode.content.cloneNode(true);
    var tempLabel = tempNode.querySelector(".label");
    if (Array.isArray(data[i])) {
      tempLabel.textContent = "".concat(generation, " ").concat(folderCount);
      folderCount++;
    } else {
      tempLabel.textContent = data[i];
    }
    tempContainer.appendChild(tempNode);

    // Update the maximum width if needed
    var labelWidth = tempLabel.offsetWidth;
    if (labelWidth > maxWidth) {
      maxWidth = labelWidth;
    }
  }

  // Clean up the temporary container
  document.body.removeChild(tempContainer);
  return maxWidth;
}
function drawTreeHTML(data, outputDiv, generation, folderCount, number) {
  var inputNumber = number;
  // Measure the maximum width of labels in the current folder
  var maxWidth = measureMaxLabelWidth(data, generation, folderCount);
  // Create the actual nodes
  folderCount = 1; // Reset folder count after measuring
  var _loop = function _loop(i) {
    var node = treeNode.content.cloneNode(true);
    var label = node.querySelector(".label");
    var folder = node.querySelector(".folder");
    var subtreeContainer = node.querySelector(".subtree-container");
    if (Array.isArray(data[i])) {
      // Set the folder name using the Greek letter and count
      label.textContent = "".concat(generation, " ").concat(folderCount);
      folder.textContent = "▶";
      folder.classList.add("folder");
      // Set dynamic styles
      var color = pickColor(data[i], inputNumber); // Assuming pickColor function is defined elsewhere
      folder.style.color = color.text; // Set text color
      folder.style.backgroundColor = color.background; // Set background color
      folder.style.border = "1px solid ".concat(color.border); // Set border color

      folder.addEventListener("click", function () {
        if (folder.classList.contains("folder")) {
          // Handle opening the folder
          folder.classList.remove("folder");
          folder.classList.add("open-folder");
          folder.textContent = "▼";
          label.style.color = "black";
          label.style.fontWeight = "normal";
          subtreeContainer.style.marginLeft = "".concat(maxWidth + 20, "px"); // Set margin based on max width
          //set dynamic styles
          folder.style.color = color.openText; // Set text color
          folder.style.backgroundColor = color.openBackground; // Set background color
          folder.style.border = "1px solid ".concat(color.openBorder); // Set border color
          // Draw the subtree, even if it's empty
          drawTreeHTML(data[i], subtreeContainer, greekLetters[greekLetters.indexOf(generation) + 1], 1, inputNumber);
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
          folder.style.border = "1px solid ".concat(color.border); // Set border color
        }
      });
      folderCount++; // Increment the folder count for the next folder in the same generation
    } else {
      folder.classList.add("not-folder");
      label.textContent = data[i];
    }
    outputDiv.appendChild(node);
  };
  for (var i = 0; i < data.length; i++) {
    _loop(i);
  }
}

//later develop this to display colors based on the #of items in a folder relative to the total size of the tree.
function pickColor(array, seedNumber) {
  // Return an object with color properties based on the index or any other criteria

  return {
    text: "blue",
    // Example color for text
    openText: "white",
    // Example color for text when folder is open
    background: "lightblue",
    // Example color for background
    openBackground: "darkblue",
    // Example color for background when folder is open
    border: "blue",
    // Example color for border
    openBorder: "black" // Example color for border when folder is open
  };
}

// Tree drawing main function.
function drawTreeFromSeed(number) {
  document.getElementById("output").innerHTML = "";
  var data = generateRandomData(number);
  data = sortedData(data); // Sort data
  var totalElementsCount = countElements(data);
  drawTreeHTML(data, document.getElementById("output"), "α", 1, totalElementsCount);
  console.log(data);
}
function drawTree() {
  var html = "";
  html += "<div><p><i>An app that randomly generates data from a seed value and displays it as a treelike file system.</i></p></div>";
  html += "<p></p>";
  html += "<input type=\"number\" id=\"treeSeedNumber\" placeholder=\"Input a number< 500\">";
  html += "<button id=\"drawTreeButton\">Draw Tree</button>";
  document.getElementById("operationsButtons").innerHTML = html;
  document.getElementById("drawTreeButton").addEventListener("click", function () {
    var number = document.getElementById("treeSeedNumber").value;
    if (number < 500) {
      drawTreeFromSeed(number);
    } else {
      alert("Seed number too large : Please enter a number less than 500");
    }
  });
}
},{}],"parseMathlikeString.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseMathlikeString = parseMathlikeString;
function parseMathlikeString() {
  var html = "";
  html += "<div><p><i>An app that parses and calculates a string of #+-/().</i></p></div>";
  html += "<p></p>";
  html += "<form id=\"parseForm\">\n  <label for=\"userInput\">Enter an arithmetic expression:</label>\n  <input type=\"text\" id=\"parseAndCalculateExpression\" placeholder=\"Input arithmetic #+/-()\" name=\"userInput\">\n  <button type=\"button\" id=\"parseAndCalculateButton\">Submit</button>\n</form>";
  document.getElementById("operationsButtons").innerHTML = html;
  document.getElementById("parseAndCalculateButton").addEventListener("click", function () {
    var string = document.getElementById("parseAndCalculateExpression").value;
    console.log("string at buttonpress", string);
    parseAndCalculate(string);
  });
}
function parseAndCalculate(string) {
  document.getElementById("output").innerHTML = "";
  document.getElementById("output").innerHTML += "<h2>You entered: ".concat(string, " </h2>");
  var cleanedString = cleanString(string);
  document.getElementById("output").innerHTML += "<h2>Processing: ".concat(cleanedString, " </h2>");
  var result = evaluateArithmetic(cleanedString);
  document.getElementById("output").innerHTML += "<h2>Result: ".concat(result, " </h2>");
}
function cleanString(inputString) {
  // Remove any characters that are not digits, operators, parentheses, or decimal points
  var noExtraneousCharacterString = inputString.replace(/[^0-9\.\+\-\*\/\(\)]/g, "");

  // Remove operators not followed or preceded by a number or parentheses
  var noHangingOperatorsString = noExtraneousCharacterString.replace(/[\+\-\*\/](?![\d\.\(])/g, "");

  // Remove empty parentheses
  var noEmptyParenthesis = noHangingOperatorsString.replace(/\(\)/g, "");

  // Fix multiplication implied between numbers and parentheses
  var fixedParenthesisMultiplication = noEmptyParenthesis.replace(/(\d+(\.\d+)?)(\()/g, "$1*$3");

  // Remove unnecessary repeated operators
  var noUneccesaryRepeatedString = fixedParenthesisMultiplication.replace(/([\+\-\*\/])\1+/g, "$1");

  // Remove all whitespace
  var cleanedString = noUneccesaryRepeatedString.replace(/\s/g, "");

  // Remove operators that are neither followed nor preceded by a number or parentheses
  cleanedString = cleanedString.replace(/(?<!\d|\))[\+\-\*\/](?!\d|\()/g, "");

  // Count the number of opening and closing brackets
  var openBrackets = (cleanedString.match(/\(/g) || []).length;
  var closeBrackets = (cleanedString.match(/\)/g) || []).length;

  // If there are more closing brackets, remove the excess from the end
  if (closeBrackets > openBrackets) {
    var difference = closeBrackets - openBrackets;
    cleanedString = cleanedString.replace(new RegExp("\\){".concat(difference, "}$")), "");
  }

  // Remove doubled parentheses again
  cleanedString = cleanedString.replace(/\(\)/g, "");

  // Add the difference in closing brackets at the end
  if (openBrackets > closeBrackets) {
    cleanedString += ")".repeat(openBrackets - closeBrackets);
  }

  // Remove any sequences of 2 operators in a row
  cleanedString = cleanedString.replace(/[\+\-\*\/]{2,}/g, "");
  return cleanedString;
}

//topmost function
function evaluateArithmetic(inputString) {
  var string = calculateParentheses(inputString);
  var number = multAndSums(string);
  return number;
}
function calculateParentheses(string) {
  var openParenthesisIndex = string.lastIndexOf("(");
  var closeParenthesisIndex = string.indexOf(")", openParenthesisIndex);
  // Check if parentheses are balanced and exist
  if (openParenthesisIndex === -1 || closeParenthesisIndex === -1 || closeParenthesisIndex < openParenthesisIndex) {
    // No parentheses found, return the original string evaluated
    return multAndSums(string);
  }
  // Extract the innermost expression
  var innerMostString = string.slice(openParenthesisIndex + 1, closeParenthesisIndex);
  // Evaluate the innermost expression
  var evaluatedInnerMostString = multAndSums(innerMostString);
  // Construct the new string by replacing the innermost parenthesis content with its result
  var newString = string.slice(0, openParenthesisIndex) + evaluatedInnerMostString + string.slice(closeParenthesisIndex + 1);
  var parenthesisTest = /[\(\)]/;
  if (parenthesisTest.test(newString)) {
    return calculateParentheses(newString);
  } else {
    return newString;
  }
}

//this function takes a string of numbers and operators and returns the result of the multiplication and addition operations.
function multAndSums(inputString) {
  var string = inputString;
  var multedString = multOut(string); // returns a string with all the * and / operations completed and folded into the original string.
  var addedString = addOut(multedString); // returns a string with all the + and - operations completed and folded into the original string.
  console.log("addedString", addedString);
  //   let numberOutput = numberify(addedString); //final conversion of the string into a number.
  //   console.log("numberOutput at the bottom of multandsums", numberOutput);
  return addedString;
}
function numberify(string) {
  var number = 0;
  var decimalPlace = 0;
  var hasDecimal = false;

  // Iterate over each character in the string
  for (var i = 0; i < string.length; i++) {
    var char = string[i];
    if (char === ".") {
      // Handle the decimal point
      if (hasDecimal) {
        throw new Error("Multiple decimal points found in input string");
      }
      hasDecimal = true;
      decimalPlace = 1;
    } else {
      // Get the numerical value of the current character
      var digit = char.charCodeAt(0) - "0".charCodeAt(0);

      // Check if digit is in valid range (0-9)
      if (digit < 0 || digit > 9) {
        throw new Error("Invalid character '".concat(char, "' in input string"));
      }
      if (hasDecimal) {
        // For fractional part, shift decimal place
        number += digit / Math.pow(10, decimalPlace);
        decimalPlace++;
      } else {
        // For integer part
        number = number * 10 + digit;
      }
    }
  }
  console.log("string at bottom of numberify", number);
  return number;
}
function stringerify(number) {
  if (number === 0) {
    return "0";
  }
  var isNegative = number < 0;
  if (isNegative) {
    number = -number;
  }

  // Extract the integer part
  var integerPart = Math.floor(number);

  // Extract and limit the fractional part to 2 decimal places
  var fractionalPart = number - integerPart;
  fractionalPart = Math.round(fractionalPart * 100); // Round to 2 decimal places

  // Convert integer part to string
  var string = "";
  var tempInt = integerPart;
  do {
    var digit = tempInt % 10;
    string = String.fromCharCode(digit + "0".charCodeAt(0)) + string;
    tempInt = Math.floor(tempInt / 10);
  } while (tempInt > 0);

  // Add the fractional part
  if (fractionalPart > 0) {
    string += ".";
    // Append fractional part digits (ensuring 2 decimal places)
    string += Math.floor(fractionalPart / 10);
    string += fractionalPart % 10;
  } else {
    // Ensure at least 2 decimal places if the fractional part is zero
    string += ".00";
  }

  // Add negative sign if the original number was negative
  if (isNegative) {
    string = "-" + string;
  }
  console.log("stringerified", string);
  return string;
}

//a function that takes a string as an input, and first finds the first instance of the symbol * or /.
//next, the function finds the numbers on either side of the symbol. They will be strings.
//each number is assigned to a variable (var1 and var2), and the starting and ending index of the whole expression are stored as (startIndex and endIndex).
//next, the function applies numberify to var1 and var2, and then applies the appropriate operation to the two numbers, producing result.
//next, the result is transformed back into a string with strigerify(result).
//finally, the new string is reinserted into the original string, replacing the old expression, using the index markers to ensure it's all in the right place.
//the function then returns the new string.  // Find the first occurrence of * or /
function multOut(string) {
  // Regex to find numbers around the first * or / operator
  var regex = /(\d+(\.\d+)?)\s*([*\/])\s*(\d+(\.\d+)?)/;

  // Check if there's any * or / operator in the string
  if (!regex.test(string)) {
    return string; // No * or / found, return the original string
  }

  // Find the first occurrence of the pattern
  var match = regex.exec(string);
  if (!match) {
    return string; // No match found, return the original string
  }

  // Extract numbers and operator from the match
  var var1 = match[1];
  var var2 = match[4];
  var operator = match[3];

  // Convert to numbers
  var num1 = numberify(var1);
  var num2 = numberify(var2);

  // Apply the appropriate operation
  var result;
  if (operator === "*") {
    result = num1 * num2;
  } else if (operator === "/") {
    result = num1 / num2;
  }
  console.log("result", result);
  var resultString = stringerify(result);

  // Replace the old expression with the new result
  var newString = string.replace(regex, resultString);

  // Continue processing the new string recursively
  return multOut(newString);
}
function addOut(string) {
  // Regex to find numbers around the first + or - operator
  var regex = /(-?\d+(\.\d+)?)\s*([+\-])\s*(-?\d+(\.\d+)?)/;
  if (!regex.test(string)) {
    return string; // No + or - found, return the original string
  }

  // Find the first occurrence of the pattern
  var match = regex.exec(string);
  if (!match) {
    return string; // No match found, return the original string
  }

  // Extract numbers and operator from the match
  var var1 = match[1];
  var var2 = match[4];
  var operator = match[3];

  // Convert to numbers
  var num1 = numberify(var1);
  var num2 = numberify(var2);

  // Apply the appropriate operation
  var result;
  if (operator === "+") {
    result = num1 + num2;
  } else if (operator === "-") {
    result = num1 - num2;
  }

  // Convert result back to string
  var resultString = stringerify(result);

  // Replace the old expression with the new result
  var newString = string.replace(regex, resultString);

  // Continue processing the new string recursively
  return addOut(newString);
}
},{}],"main.js":[function(require,module,exports) {
"use strict";

var _drawTree = require("./drawTree");
var _parseMathlikeString = require("./parseMathlikeString");
var displayToggles = {
  drawTree: false,
  parseMathlikeString: false
};
document.getElementById("drawTree").addEventListener("click", function () {
  display("drawTree");
});
document.getElementById("parseMathlikeString").addEventListener("click", function () {
  display("parseMathlikeString");
});

//this should be automatable

function display(id) {
  var outputDisplay = document.getElementById("output");
  var operationsDisplay = document.getElementById("operationsButtons");

  // Clear the screen and reset all toggles
  outputDisplay.innerHTML = "";
  operationsDisplay.innerHTML = "";
  for (var key in displayToggles) {
    if (displayToggles.hasOwnProperty(key)) {
      displayToggles[key] = false;
    }
  }

  // Activate the selected mode
  displayToggles[id] = true;

  // Perform the appropriate action based on the selected mode
  if (id === "drawTree" && displayToggles.drawTree) {
    (0, _drawTree.drawTree)();
  } else if (id === "parseMathlikeString" && displayToggles.parseMathlikeString) {
    (0, _parseMathlikeString.parseMathlikeString)();
  }
}
},{"./drawTree":"drawTree.js","./parseMathlikeString":"parseMathlikeString.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55369" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map