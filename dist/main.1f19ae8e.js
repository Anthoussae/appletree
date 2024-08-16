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
})({"main.js":[function(require,module,exports) {
"use strict";

//function to generate random data in a treelike structure.
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

// Tree drawing main function.
function drawTree(number) {
  var data = generateRandomData(number);
  data = sortedData(data); // Sort data
  var totalElementsCount = countElements(data);
  drawTreeHTML(data, document.getElementById("output"), "α", 1, totalElementsCount);
  console.log(data);
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
//execute code. the number passed determines tree size.
drawTree(100);
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53255" + '/');
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