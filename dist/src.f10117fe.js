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
})({"src/GameContext.ts":[function(require,module,exports) {
"use strict";

exports.__esModule = true;

var GameContext =
/** @class */
function () {
  function GameContext() {}

  GameContext.scale = 40;
  GameContext.context = null;
  return GameContext;
}();

exports["default"] = GameContext;
},{}],"src/Time.ts":[function(require,module,exports) {
"use strict";

exports.__esModule = true;

var Time =
/** @class */
function () {
  function Time() {}

  Time.update = function () {
    var currentTime = Date.now();
    Time.deltaTime = (currentTime - Time.previousTime) / 1000;
    Time.previousTime = currentTime;
  }; // diferencia de tiempo entre último update y update actual


  Time.deltaTime = 0; // Número de milisegundos que han pasado desde 1970

  Time.previousTime = Date.now();
  return Time;
}();

exports["default"] = Time;
},{}],"src/Scene/Scene.ts":[function(require,module,exports) {
"use strict";

exports.__esModule = true;

var Scene =
/** @class */
function () {
  function Scene() {
    this.enter = function () {};

    this.update = function () {};

    this.render = function () {};

    this.handleKeyDown = function (event, engine) {};

    this.handleKeyUp = function (event) {};
  }

  return Scene;
}();

exports["default"] = Scene;
},{}],"assets/spritesheet.png":[function(require,module,exports) {
module.exports = "/spritesheet.713aba4a.png";
},{}],"src/Character.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

exports.__esModule = true;

var GameContext_1 = __importDefault(require("./GameContext"));

var Time_1 = __importDefault(require("./Time")); // @ts-ignore


var spritesheet_png_1 = __importDefault(require("/assets/spritesheet.png"));

var CharacterDirection;

(function (CharacterDirection) {
  CharacterDirection[CharacterDirection["Left"] = -1] = "Left";
  CharacterDirection[CharacterDirection["None"] = 0] = "None";
  CharacterDirection[CharacterDirection["Right"] = 1] = "Right";
})(CharacterDirection = exports.CharacterDirection || (exports.CharacterDirection = {}));

var Character =
/** @class */
function () {
  function Character() {
    var _this = this;

    this.position = [0, 0];
    this.characterWidth = 80;
    this.characterHeight = 100;
    this.speed = 200;
    this.direction = CharacterDirection.None;
    this.characterImage = new Image();
    this.currentCharacterFrame = 0;
    this.frameCounter = 0;
    this.lastPressedDirection = null;

    this.keydownHandler = function (key) {
      switch (key) {
        case "ArrowRight":
          _this.direction = CharacterDirection.Right;
          _this.lastPressedDirection = _this.direction;
          break;

        case "ArrowLeft":
          _this.direction = CharacterDirection.Left;
          _this.lastPressedDirection = _this.direction;
          break;
      }
    };

    this.keyupHandler = function (key) {
      if (key === "ArrowRight" && _this.direction === 1 || key === "ArrowLeft" && _this.direction === -1) {
        _this.direction = CharacterDirection.None;
      }
    };

    this.update = function () {
      var context = GameContext_1["default"].context;
      var width = context.canvas.width;
      var _a = _this.position,
          xPos = _a[0],
          yPos = _a[1];
      xPos = xPos + _this.speed * _this.direction * Time_1["default"].deltaTime;
      _this.position = [xPos, yPos];
      _this.frameCounter += 1;

      if (_this.frameCounter % 2 === 0 && _this.direction !== CharacterDirection.None) {
        _this.currentCharacterFrame = (_this.currentCharacterFrame + 1) % 15;
      }
    };

    this.render = function () {
      var context = GameContext_1["default"].context;
      var _a = _this.position,
          xPos = _a[0],
          yPos = _a[1];
      var offsetX = 108.8;
      var sy = 0;
      var sWidth = 55;
      var sHeight = 92;
      context.save();

      if (_this.lastPressedDirection === CharacterDirection.Left) {
        context.scale(-1, 1);
        xPos = -xPos - _this.characterWidth;
      }

      context.translate(xPos, yPos);
      context.beginPath();
      context.fillStyle = "lime";
      context.drawImage(_this.characterImage, _this.currentCharacterFrame * offsetX, sy, sWidth, sHeight, 0, 0, _this.characterWidth, _this.characterHeight);
      context.closePath();
      context.restore();
    };

    var context = GameContext_1["default"].context;
    var _a = context.canvas,
        width = _a.width,
        height = _a.height;
    this.characterImage.src = spritesheet_png_1["default"];
    this.position = [(width - this.characterWidth) / 2, height * 0.9 - this.characterHeight];
  }

  Character.prototype.getPosition = function () {
    return this.position;
  };

  Character.prototype.getWidth = function () {
    return this.characterWidth;
  };

  return Character;
}();

exports["default"] = Character;
},{"./GameContext":"src/GameContext.ts","./Time":"src/Time.ts","/assets/spritesheet.png":"assets/spritesheet.png"}],"src/Scene/MainMenu.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

exports.__esModule = true;

var Scene_1 = __importDefault(require("./Scene"));

var GameContext_1 = __importDefault(require("../GameContext"));

var Playing_1 = __importDefault(require("./Playing"));

var MainMenu =
/** @class */
function (_super) {
  __extends(MainMenu, _super);

  function MainMenu() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.options = ["Jugar", "Salir"];
    _this.selectedOptionIndex = 0;
    _this.backgroundColorHue = 0;
    _this.skipUpdate = false;

    _this.handleKeyDown = function (event, engine) {
      switch (event.key) {
        case "ArrowUp":
          _this.selectedOptionIndex = (_this.selectedOptionIndex - 1 + _this.options.length) % _this.options.length;
          break;

        case "ArrowDown":
          _this.selectedOptionIndex = (_this.selectedOptionIndex + 1) % _this.options.length;
          break;

        case "Enter":
          if (_this.selectedOptionIndex === 0) {
            engine.changeScene(new Playing_1["default"]());
          }

          break;
      }
    };

    _this.handleKeyUp = function (event) {};

    _this.enter = function () {};

    _this.render = function () {
      var context = GameContext_1["default"].context;
      var _a = context.canvas,
          width = _a.width,
          height = _a.height;
      context.save();
      context.beginPath();

      if (!_this.skipUpdate) {
        _this.backgroundColorHue = (_this.backgroundColorHue + 1) % 360;
      }

      _this.skipUpdate = !_this.skipUpdate;
      context.fillStyle = "hsl(" + _this.backgroundColorHue + ", 100%, 80%)";
      context.fillRect(0, 0, width, height);
      context.closePath();
      context.beginPath();
      context.fillStyle = "black";
      context.strokeStyle = "darkblue";
      context.font = "30px sans-serif";
      context.textAlign = "center";

      for (var i = 0; i < _this.options.length; i++) {
        var xPoint = width / 2;
        var yPoint = height * 0.65 + i * 35;

        if (_this.selectedOptionIndex === i) {
          context.lineWidth = 2;
          context.strokeText(_this.options[i], xPoint, yPoint);
        }

        context.fillText(_this.options[i], xPoint, yPoint);
      }

      context.closePath();
      context.restore();
    };

    return _this;
  }

  return MainMenu;
}(Scene_1["default"]);

exports["default"] = MainMenu;
},{"./Scene":"src/Scene/Scene.ts","../GameContext":"src/GameContext.ts","./Playing":"src/Scene/Playing.ts"}],"src/Camera.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

exports.__esModule = true;

var GameContext_1 = __importDefault(require("./GameContext"));

var Camera =
/** @class */
function () {
  function Camera() {
    var _this = this;

    this.position = [0, 0];
    this.width = 400;
    this.padding = 50;

    this.getLeft = function () {
      return _this.position[0];
    };
  }

  Camera.prototype.update = function (character) {
    var _a;

    var charx = character.getPosition()[0];
    var _b = this.position,
        camx = _b[0],
        camy = _b[1];
    var characterWidth = character.getWidth();

    if (charx < camx + this.padding) {
      this.position = [charx - this.padding, camy];
    }

    if (charx + characterWidth > camx + this.width - this.padding) {
      this.position = [charx + characterWidth - this.width + this.padding, camy];
    }

    _a = this.position, camx = _a[0], camy = _a[1];
    this.position = [camx, camy];
  };

  Camera.prototype.render = function () {
    var context = GameContext_1["default"].context;
    var camaraX = this.position[0];
    context.restore();
    context.save();
    context.translate(-camaraX, 0);
  };

  return Camera;
}();

exports["default"] = Camera;
},{"./GameContext":"src/GameContext.ts"}],"assets/1.png":[function(require,module,exports) {
module.exports = "/1.9be96cb3.png";
},{}],"assets/2.png":[function(require,module,exports) {
module.exports = "/2.2c7fcc9e.png";
},{}],"assets/3.png":[function(require,module,exports) {
module.exports = "/3.8e3e98a2.png";
},{}],"assets/4.png":[function(require,module,exports) {
module.exports = "/4.aec15ad6.png";
},{}],"assets/5.png":[function(require,module,exports) {
module.exports = "/5.a57f67a3.png";
},{}],"assets/6.png":[function(require,module,exports) {
module.exports = "/6.fdb86936.png";
},{}],"src/background.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

exports.__esModule = true;

var GameContext_1 = __importDefault(require("./GameContext"));

var _1_png_1 = __importDefault(require("../assets/1.png"));

var _2_png_1 = __importDefault(require("../assets/2.png"));

var _3_png_1 = __importDefault(require("../assets/3.png"));

var _4_png_1 = __importDefault(require("../assets/4.png"));

var _5_png_1 = __importDefault(require("../assets/5.png"));

var _6_png_1 = __importDefault(require("../assets/6.png"));

var background =
/** @class */
function () {
  function background() {
    this.image = new Array();
    this.image[0] = new Image();
    this.image[0].src = _1_png_1["default"];
    this.image[1] = new Image();
    this.image[1].src = _2_png_1["default"];
    this.image[2] = new Image();
    this.image[2].src = _3_png_1["default"];
    this.image[3] = new Image();
    this.image[3].src = _4_png_1["default"];
    this.image[4] = new Image();
    this.image[4].src = _5_png_1["default"];
    this.image[5] = new Image();
    this.image[5].src = _6_png_1["default"];
  }

  background.prototype.render = function () {
    var Canvas = GameContext_1["default"].context.canvas;
    var height = Canvas.height;
    var width = Canvas.width;
    var Context = GameContext_1["default"].context;

    for (var i = 0; i < 6; i++) {
      Context.beginPath();
      var Iheight = this.image[i].naturalHeight;
      var Iwidth = this.image[i].naturalWidth;
      var finalW = Iwidth * height / Iheight;
      var finalH = height;
      Context.drawImage(this.image[i], 0, 0, finalW, finalH);
      Context.closePath();
    }
  };

  return background;
}();

;
exports["default"] = background;
},{"./GameContext":"src/GameContext.ts","../assets/1.png":"assets/1.png","../assets/2.png":"assets/2.png","../assets/3.png":"assets/3.png","../assets/4.png":"assets/4.png","../assets/5.png":"assets/5.png","../assets/6.png":"assets/6.png"}],"src/Scene/Playing.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

exports.__esModule = true;

var Scene_1 = __importDefault(require("./Scene"));

var Character_1 = __importDefault(require("../Character"));

var MainMenu_1 = __importDefault(require("./MainMenu"));

var Camera_1 = __importDefault(require("../Camera"));

var background_1 = __importDefault(require("../background"));

var Playing =
/** @class */
function (_super) {
  __extends(Playing, _super);

  function Playing() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.character = null;
    _this.camera = null;
    _this.background = null;

    _this.handleKeyDown = function (event, engine) {
      _this.character.keydownHandler(event.key);

      switch (event.key) {
        case "Escape":
          engine.changeScene(new MainMenu_1["default"]());
          break;
      }
    };

    _this.handleKeyUp = function (event) {
      _this.character.keyupHandler(event.key);
    };

    _this.getCamera = function () {
      return _this.camera;
    };

    _this.getCharacter = function () {
      return _this.character;
    };

    _this.enter = function () {
      _this.character = new Character_1["default"]();
      _this.camera = new Camera_1["default"]();
      _this.background = new background_1["default"]();
    };

    _this.update = function () {
      _this.character.update();

      _this.camera.update(_this.character);
    };

    _this.render = function () {
      _this.camera.render();

      _this.background.render();

      _this.character.render();
    };

    return _this;
  }

  return Playing;
}(Scene_1["default"]);

exports["default"] = Playing;
},{"./Scene":"src/Scene/Scene.ts","../Character":"src/Character.ts","./MainMenu":"src/Scene/MainMenu.ts","../Camera":"src/Camera.ts","../background":"src/background.ts"}],"src/Engine.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

exports.__esModule = true;

var GameContext_1 = __importDefault(require("./GameContext"));

var Time_1 = __importDefault(require("./Time"));

var Playing_1 = __importDefault(require("./Scene/Playing"));

var Engine =
/** @class */
function () {
  function Engine() {
    var _this = this;

    this.currentScene = null; // Iniciar el motor del juego.

    this.start = function () {
      _this.init();

      requestAnimationFrame(_this.tick);
    };

    this.keydownEventHandler = function (event) {
      _this.currentScene.handleKeyDown(event, _this);
    };

    this.keyupEventHandler = function (event) {
      _this.currentScene.handleKeyUp(event);
    };

    this.changeScene = function (scene) {
      _this.currentScene = scene;

      _this.currentScene.enter();
    }; // Limpiar pantalla y dibujar fondo.


    this.clearScreen = function () {
      var context = GameContext_1["default"].context;
      var canvas = context.canvas;
      var width = canvas.width;
      var height = canvas.height;
      context.save();
      context.beginPath();
      context.fillStyle = "white";
      context.fillRect(0, 0, width, height);
      context.closePath();
      context.restore();
    };

    this.init = function () {
      _this.currentScene = new Playing_1["default"]();

      _this.currentScene.enter();
    }; // Método que se ejecuta en cada frame del juego.


    this.tick = function () {
      _this.clearScreen();

      Time_1["default"].update();

      _this.currentScene.update();

      _this.currentScene.render();

      requestAnimationFrame(_this.tick);
    };
  }

  return Engine;
}();

exports["default"] = Engine;
},{"./GameContext":"src/GameContext.ts","./Time":"src/Time.ts","./Scene/Playing":"src/Scene/Playing.ts"}],"src/index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

exports.__esModule = true;

var Engine_1 = __importDefault(require("./Engine"));

var GameContext_1 = __importDefault(require("./GameContext")); //  Nota: No es necesario escribir código nuevo en este archivo.


var canvas = document.getElementById("game-area");
var context = canvas.getContext("2d");
GameContext_1["default"].context = context;
var engine = new Engine_1["default"]();
engine.start();
canvas.addEventListener("keydown", engine.keydownEventHandler);
canvas.addEventListener("keyup", engine.keyupEventHandler);
},{"./Engine":"src/Engine.ts","./GameContext":"src/GameContext.ts"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51563" + '/');

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
      }); // Enable HMR for CSS by default.

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
      } else {
        window.location.reload();
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
  overlay.id = OVERLAY_ID; // html encode message and stack trace

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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.ts"], null)
//# sourceMappingURL=/src.f10117fe.js.map