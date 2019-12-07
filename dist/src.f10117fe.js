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

    this.pause = function () {};

    this.exit = function () {};

    this.handleKeyDown = function (event, engine) {};

    this.handleKeyUp = function (event) {};

    this.mouseDownListener = function (event, engine) {};

    this.mouseEnterListener = function (event) {};

    this.mouseMoveListener = function (event) {};
  }

  return Scene;
}();

exports["default"] = Scene;
},{}],"src/Camera.ts":[function(require,module,exports) {
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

    this.position = 0;
    this.realtPos = 0;
    this.width = 1200;
    this.inside = false;
    this.dir = 0;
    this.padding = 12;

    this.handleKeyDown = function (event) {};

    this.handleKeyUp = function (event) {};

    this.mouseDownListener = function (event, engine) {};

    this.mouseEnterListener = function (event) {
      _this.position = event.offsetX;
    };

    this.mouseMoveListener = function (event) {};
  }

  Camera.prototype.update = function () {
    if (this.position >= 1000 && this.realtPos > -1200) {
      this.dir = -1;
      this.realtPos -= this.padding;
    } else if (this.position <= 200 && this.realtPos < 1200) {
      this.dir = 1;
      this.realtPos += this.padding;
    } else {}
  };

  Camera.prototype.render = function () {
    var context = GameContext_1["default"].context;
    var camaraX = this.position;
    context.restore();
    context.save();
    if (this.dir != 0) context.translate(this.realtPos + this.dir * this.padding, 0);
  };

  return Camera;
}();

exports["default"] = Camera;
},{"./GameContext":"src/GameContext.ts"}],"assets/mountain.png":[function(require,module,exports) {
module.exports = "/mountain.1bd960b8.png";
},{}],"assets/layer.png":[function(require,module,exports) {
module.exports = "/layer.aac5c344.png";
},{}],"assets/back.png":[function(require,module,exports) {
module.exports = "/back.e6f29605.png";
},{}],"src/background.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

exports.__esModule = true;

var GameContext_1 = __importDefault(require("./GameContext"));

var mountain_png_1 = __importDefault(require("../assets/mountain.png"));

var layer_png_1 = __importDefault(require("../assets/layer.png"));

var back_png_1 = __importDefault(require("../assets/back.png"));

var background =
/** @class */
function () {
  function background() {
    this.image = new Array();
    this.image[0] = new Image();
    this.image[0].src = back_png_1["default"];
    this.image[1] = new Image();
    this.image[1].src = layer_png_1["default"];
    this.image[2] = new Image();
    this.image[2].src = mountain_png_1["default"];
  }

  background.prototype.render = function () {
    var Canvas = GameContext_1["default"].context.canvas;
    var height = Canvas.height;
    var width = Canvas.width;
    var Context = GameContext_1["default"].context;
    Context.beginPath();
    var Iheight = this.image[0].naturalHeight;
    var Iwidth = this.image[0].naturalWidth;
    var finalW = Iwidth * height / Iheight;
    var finalH = height;
    Context.drawImage(this.image[0], 300, 0, finalW, finalH);
    Context.drawImage(this.image[0], -1240, 0, finalW, finalH);
    Context.drawImage(this.image[0], 1040, 0, finalW, finalH);
    Context.drawImage(this.image[0], 2000, 0, finalW, finalH);
    Iheight = this.image[2].naturalHeight;
    Iwidth = this.image[2].naturalWidth;
    finalW = Iwidth * height / Iheight;
    finalH = height;
    Context.drawImage(this.image[2], 0, 100, finalW, finalH);
    Context.drawImage(this.image[2], 1240, 100, finalW, finalH);
    Context.drawImage(this.image[2], -1240, 100, finalW, finalH);
    Context.drawImage(this.image[1], 0, 0, finalW, finalH);
    Context.drawImage(this.image[1], 1240, 0, finalW, finalH);
    Context.drawImage(this.image[1], -1240, 0, finalW, finalH);
    Context.closePath();
  };

  return background;
}();

;
exports["default"] = background;
},{"./GameContext":"src/GameContext.ts","../assets/mountain.png":"assets/mountain.png","../assets/layer.png":"assets/layer.png","../assets/back.png":"assets/back.png"}],"assets/HUD.png":[function(require,module,exports) {
module.exports = "/HUD.2e40d58b.png";
},{}],"src/Unit.ts":[function(require,module,exports) {
"use strict";

exports.__esModule = true;

var Unit =
/** @class */
function () {
  function Unit() {}

  return Unit;
}();

;
exports["default"] = Unit;
},{}],"assets/lions.png":[function(require,module,exports) {
module.exports = "/lions.4cb7a812.png";
},{}],"assets/LIONSA.png":[function(require,module,exports) {
module.exports = "/LIONSA.c6feadbd.png";
},{}],"src/Lion.ts":[function(require,module,exports) {
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

var Unit_1 = __importDefault(require("./Unit"));

var lions_png_1 = __importDefault(require("../assets/lions.png"));

var LIONSA_png_1 = __importDefault(require("../assets/LIONSA.png"));

var GameContext_1 = __importDefault(require("./GameContext"));

var State;

(function (State) {
  State[State["Attack"] = -1] = "Attack";
  State[State["Stop"] = 0] = "Stop";
  State[State["Walk"] = 1] = "Walk";
})(State = exports.State || (exports.State = {}));

var Lion =
/** @class */
function (_super) {
  __extends(Lion, _super);

  function Lion() {
    var _this = _super.call(this) || this;

    _this.attack = 5;
    _this.life = 3000;
    _this.State = State.Walk;
    _this.Lion = new Image();
    _this.LionA = new Image();
    _this.frame = 0;
    _this.FrameCounter = 0;
    _this.xCutAnimation = 0;
    _this.speed = 5;
    _this.realx = 0;
    _this.Lion = new Image();
    _this.Lion.src = lions_png_1["default"];
    _this.LionA.src = LIONSA_png_1["default"];
    return _this;
  }

  Lion.prototype.render = function () {
    if (this.State == State.Walk) {
      var sx = 0;
      var sy = 0;
      var sWidth = 580;
      var sHeight = 520;
      var context = GameContext_1["default"].context;
      context.beginPath();
      context.save();

      if (this.Pertenece == 1) {
        context.scale(-1, 1);
      }

      context.drawImage(this.Lion, sx + sWidth * this.frame, sy, sWidth, sHeight, this.xcoord, this.ycoord, 180, 140);
      context.restore();
      context.closePath();
    } else if (this.State == State.Attack) {
      var sx = 0;
      var sy = 0;
      var sWidth = 62;
      var sHeight = 50;
      var context = GameContext_1["default"].context;
      context.beginPath();
      context.save();

      if (this.Pertenece == 1) {
        context.scale(-1, 1);
      }

      context.drawImage(this.LionA, sx + sWidth * this.frame, sy, sWidth, sHeight, this.xcoord, this.ycoord, 230, 160);
      context.restore();
      context.closePath();
    } else {
      var sx = 0;
      var sy = 0;
      var sWidth = 580;
      var sHeight = 520;
      var context = GameContext_1["default"].context;
      context.beginPath();
      context.save();

      if (this.Pertenece == 1) {
        context.scale(-1, 1);
      }

      context.drawImage(this.Lion, sx + sWidth, sy, sWidth, sHeight, this.xcoord, this.ycoord, 180, 140);
      context.restore();
      context.closePath();
    }
  };

  Lion.prototype.update = function () {
    //walk
    if (this.State == State.Walk) {
      this.FrameCounter++;

      if (this.FrameCounter % 10 == 0) {
        this.frame++;
      }

      if (this.frame > 2) {
        this.frame = 0;
      }

      if (this.Pertenece == 1) {
        this.realx -= this.speed;
      } else this.realx += this.speed;

      this.xcoord += this.speed;
    } //attack
    else if (this.State == State.Attack) {
        this.FrameCounter++;

        if (this.FrameCounter % 10 == 0) {
          this.frame++;
        }

        if (this.frame > 2) {
          this.frame = 0;
        }
      } else {}
  };

  return Lion;
}(Unit_1["default"]);

;
exports["default"] = Lion;
},{"./Unit":"src/Unit.ts","../assets/lions.png":"assets/lions.png","../assets/LIONSA.png":"assets/LIONSA.png","./GameContext":"src/GameContext.ts"}],"assets/bat.png":[function(require,module,exports) {
module.exports = "/bat.91fd6996.png";
},{}],"src/bat.ts":[function(require,module,exports) {
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

var Unit_1 = __importDefault(require("../src/Unit"));

var bat_png_1 = __importDefault(require("../assets/bat.png"));

var GameContext_1 = __importDefault(require("./GameContext"));

var State;

(function (State) {
  State[State["Attack"] = -1] = "Attack";
  State[State["Stop"] = 0] = "Stop";
  State[State["Walk"] = 1] = "Walk";
})(State = exports.State || (exports.State = {}));

var bat =
/** @class */
function (_super) {
  __extends(bat, _super);

  function bat() {
    var _this = _super.call(this) || this;

    _this.attack = 20;
    _this.life = 1000;
    _this.State = State.Walk;
    _this.bat = new Image();
    _this.frame = 0;
    _this.FrameCounter = 0;
    _this.xCutAnimation = 0;
    _this.speed = 5;
    _this.realx = 0;
    _this.bat = new Image();
    _this.bat.src = bat_png_1["default"];
    return _this;
  }

  bat.prototype.render = function () {
    var sx = 28;
    var sy = 33;
    var padding = 60;
    var sWidth = 293;
    var sHeight = 330;
    var context = GameContext_1["default"].context;
    context.beginPath();
    context.save();

    if (this.Pertenece == 1) {
      context.scale(-1, 1);
    }

    context.drawImage(this.bat, sx + sWidth * this.frame * 2, sy, sWidth, sHeight, this.xcoord, this.ycoord, 100, 100);
    context.restore();
    context.closePath();
  };

  bat.prototype.update = function () {
    if (this.State == State.Walk) {
      this.FrameCounter++;

      if (this.FrameCounter % 8 == 0) {
        this.frame++;
      }

      if (this.frame > 2) {
        this.frame = 0;
      }

      if (this.Pertenece == 0) {
        this.xcoord += this.speed;
      } else this.xcoord += this.speed;

      if (this.Pertenece == 1) {
        this.realx -= this.speed;
      } else this.realx += this.speed;
    } else if (this.State == State.Attack) {
      this.FrameCounter++;

      if (this.FrameCounter % 8 == 0) {
        this.frame++;
      }

      if (this.frame > 2) {
        this.frame = 0;
      }
    } else {}
  };

  return bat;
}(Unit_1["default"]);

;
exports["default"] = bat;
},{"../src/Unit":"src/Unit.ts","../assets/bat.png":"assets/bat.png","./GameContext":"src/GameContext.ts"}],"assets/Bear.png":[function(require,module,exports) {
module.exports = "/Bear.6a15ee17.png";
},{}],"assets/BearA.png":[function(require,module,exports) {
module.exports = "/BearA.37b7ea95.png";
},{}],"src/Bear.ts":[function(require,module,exports) {
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

var Unit_1 = __importDefault(require("../src/Unit"));

var Bear_png_1 = __importDefault(require("../assets/Bear.png"));

var GameContext_1 = __importDefault(require("./GameContext"));

var BearA_png_1 = __importDefault(require("../assets/BearA.png"));

var State;

(function (State) {
  State[State["Attack"] = -1] = "Attack";
  State[State["Stop"] = 0] = "Stop";
  State[State["Walk"] = 1] = "Walk";
})(State = exports.State || (exports.State = {}));

var Bear =
/** @class */
function (_super) {
  __extends(Bear, _super);

  function Bear() {
    var _this = _super.call(this) || this;

    _this.attack = 20;
    _this.life = 4000;
    _this.State = State.Walk;
    _this.Bear = new Image();
    _this.BearA = new Image();
    _this.frame = 0;
    _this.FrameCounter = 0;
    _this.xCutAnimation = 0;
    _this.speed = 5;
    _this.realx = 0;
    _this.Bear = new Image();
    _this.Bear.src = Bear_png_1["default"];
    _this.BearA.src = BearA_png_1["default"];
    return _this;
  }

  Bear.prototype.render = function () {
    if (this.State == State.Walk) {
      var sx = 0;
      var sy = 0;
      var sWidth = 64;
      var sHeight = 33;
      var context = GameContext_1["default"].context;
      context.beginPath();
      context.save();

      if (this.Pertenece == 0) {
        context.scale(-1, 1);
      }

      context.drawImage(this.Bear, sx + sWidth * this.frame, sy, sWidth, sHeight, this.xcoord, this.ycoord, 200, 100);
      context.restore();
      context.closePath();
    } else if (this.State == State.Attack) {
      var sx = 0;
      var sy = 0;
      var sWidth = 74;
      var sHeight = 48;
      var context = GameContext_1["default"].context;
      context.beginPath();
      context.save();

      if (this.Pertenece == 0) {
        context.scale(-1, 1);
      }

      context.drawImage(this.BearA, sx + sWidth * this.frame, sy, sWidth, sHeight, this.xcoord, this.ycoord, 225, 150);
      context.restore();
      context.closePath();
    } else {
      var sx = 0;
      var sy = 0;
      var sWidth = 64;
      var sHeight = 33;
      var context = GameContext_1["default"].context;
      context.beginPath();
      context.save();

      if (this.Pertenece == 0) {
        context.scale(-1, 1);
      }

      context.drawImage(this.Bear, sx + sWidth * 4, sy, sWidth, sHeight, this.xcoord, this.ycoord, 200, 100);
      context.restore();
      context.closePath();
    }
  };

  Bear.prototype.update = function () {
    if (this.State == State.Walk) {
      this.FrameCounter++;

      if (this.FrameCounter % 10 == 0) {
        this.frame++;
      }

      if (this.frame > 4) {
        this.frame = 0;
      }

      this.xcoord -= this.speed;

      if (this.Pertenece == 1) {
        this.realx -= this.speed;
      } else this.realx += this.speed;
    } else if (this.State == State.Attack) {
      this.FrameCounter++;

      if (this.FrameCounter % 10 == 0) {
        this.frame++;
      }

      if (this.frame > 2) {
        this.frame = 0;
      }
    } else {}
  };

  return Bear;
}(Unit_1["default"]);

;
exports["default"] = Bear;
},{"../src/Unit":"src/Unit.ts","../assets/Bear.png":"assets/Bear.png","./GameContext":"src/GameContext.ts","../assets/BearA.png":"assets/BearA.png"}],"assets/tigers.png":[function(require,module,exports) {
module.exports = "/tigers.6109efd4.png";
},{}],"assets/TIGREA.png":[function(require,module,exports) {
module.exports = "/TIGREA.81809316.png";
},{}],"src/Tiger.ts":[function(require,module,exports) {
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

var Unit_1 = __importDefault(require("../src/Unit"));

var tigers_png_1 = __importDefault(require("../assets/tigers.png"));

var TIGREA_png_1 = __importDefault(require("../assets/TIGREA.png"));

var GameContext_1 = __importDefault(require("./GameContext"));

var State;

(function (State) {
  State[State["Attack"] = -1] = "Attack";
  State[State["Stop"] = 0] = "Stop";
  State[State["Walk"] = 1] = "Walk";
})(State = exports.State || (exports.State = {}));

var Tiger =
/** @class */
function (_super) {
  __extends(Tiger, _super);

  function Tiger() {
    var _this = _super.call(this) || this;

    _this.life = 2000;
    _this.attack = 10;
    _this.State = State.Walk;
    _this.Tiger = new Image();
    _this.TigerA = new Image();
    _this.frame = 0;
    _this.FrameCounter = 0;
    _this.xCutAnimation = 0;
    _this.speed = 5;
    _this.realx = 0;
    _this.Tiger = new Image();
    _this.Tiger.src = tigers_png_1["default"];
    _this.TigerA.src = TIGREA_png_1["default"];
    return _this;
  }

  Tiger.prototype.render = function () {
    if (this.State == State.Walk) {
      var sx = 0;
      var sy = 0;
      var sWidth = 575;
      var sHeight = 552;
      var context = GameContext_1["default"].context;
      context.beginPath();
      context.save();

      if (this.Pertenece == 1) {
        context.scale(-1, 1);
      }

      context.drawImage(this.Tiger, sx + sWidth * this.frame, sy, sWidth, sHeight, this.xcoord, this.ycoord, 180, 140);
      context.restore();
      context.closePath();
    } else if (this.State == State.Attack) {
      var sx = 0;
      var sy = 0;
      var sWidth = 62;
      var sHeight = 50;
      var context = GameContext_1["default"].context;
      context.beginPath();
      context.save();

      if (this.Pertenece == 1) {
        context.scale(-1, 1);
      }

      context.drawImage(this.TigerA, sx + sWidth * this.frame, sy, sWidth, sHeight, this.xcoord, this.ycoord, 230, 160);
      context.restore();
      context.closePath();
    } else {
      var sx = 0;
      var sy = 0;
      var sWidth = 575;
      var sHeight = 552;
      var context = GameContext_1["default"].context;
      context.beginPath();
      context.save();

      if (this.Pertenece == 1) {
        context.scale(-1, 1);
      }

      context.drawImage(this.Tiger, sx + sWidth, sy, sWidth, sHeight, this.xcoord, this.ycoord, 180, 140);
      context.restore();
      context.closePath();
    }
  };

  Tiger.prototype.update = function () {
    if (this.State == State.Walk) {
      this.FrameCounter++;

      if (this.FrameCounter % 8 == 0) {
        this.frame++;
      }

      if (this.frame > 2) {
        this.frame = 0;
      }

      if (this.Pertenece == 1) {
        this.xcoord += this.speed;
      } else {
        this.xcoord += this.speed;
      }

      if (this.Pertenece == 1) {
        this.realx -= this.speed;
      } else this.realx += this.speed;
    } else if (this.State == State.Attack) {
      this.FrameCounter++;

      if (this.FrameCounter % 8 == 0) {
        this.frame++;
      }

      if (this.frame > 2) {
        this.frame = 0;
      } else {}
    }

    ;
  };

  return Tiger;
}(Unit_1["default"]);

;
exports["default"] = Tiger;
},{"../src/Unit":"src/Unit.ts","../assets/tigers.png":"assets/tigers.png","../assets/TIGREA.png":"assets/TIGREA.png","./GameContext":"src/GameContext.ts"}],"assets/base.png":[function(require,module,exports) {
module.exports = "/base.881e12d6.png";
},{}],"assets/HealthBar.png":[function(require,module,exports) {
module.exports = "/HealthBar.90ba5f53.png";
},{}],"src/Base.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

exports.__esModule = true;

var GameContext_1 = __importDefault(require("./GameContext"));

var base_png_1 = __importDefault(require("../assets/base.png"));

var HealthBar_png_1 = __importDefault(require("../assets/HealthBar.png"));

var Base =
/** @class */
function () {
  function Base() {
    this.vida = 3000;
    this.xcoord = 0;
    this.ycoord = 200;
    this.Base = new Image();
    this.life = new Image();
    this.lifebar = 685;
    this.Base.src = base_png_1["default"];
    this.life.src = HealthBar_png_1["default"];
    this.ycoord = 550;
    this.xcoord = GameContext_1["default"].context.canvas.width / 2 * -1 + -10;
  }

  Base.prototype.getLife = function () {
    return this.vida;
  };

  Base.prototype.subsLife = function (x) {
    this.vida -= x;
  };

  Base.prototype.render = function () {
    var Context = GameContext_1["default"].context;
    Context.beginPath();
    Context.save();
    Context.rect(this.xcoord + 50, this.ycoord - 70, this.lifebar, 50);
    Context.fillStyle = "green";
    Context.fill();
    Context.drawImage(this.life, this.xcoord - 90, this.ycoord - 150);
    Context.drawImage(this.Base, this.xcoord, this.ycoord, 600, 600);
    Context.restore();
    Context.closePath();
  };

  Base.prototype.update = function () {
    this.lifebar = 685 / 3000 * this.vida;
  };

  return Base;
}();

;
exports["default"] = Base;
},{"./GameContext":"src/GameContext.ts","../assets/base.png":"assets/base.png","../assets/HealthBar.png":"assets/HealthBar.png"}],"src/BaseEnemy.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

exports.__esModule = true;

var GameContext_1 = __importDefault(require("./GameContext"));

var base_png_1 = __importDefault(require("../assets/base.png"));

var HealthBar_png_1 = __importDefault(require("../assets/HealthBar.png"));

var BaseEnemy =
/** @class */
function () {
  function BaseEnemy() {
    this.vida = 3000;
    this.xcoord = 0;
    this.ycoord = 200;
    this.Base = new Image();
    this.life = new Image();
    this.lifebar = 685;
    this.Base.src = base_png_1["default"];
    this.ycoord = 550;
    this.xcoord = GameContext_1["default"].context.canvas.width + 1210;
    this.life.src = HealthBar_png_1["default"];
  }

  BaseEnemy.prototype.getLife = function () {
    return this.vida;
  };

  BaseEnemy.prototype.subsLife = function (x) {
    this.vida -= x;
  };

  BaseEnemy.prototype.render = function () {
    var Context = GameContext_1["default"].context;
    Context.beginPath();
    Context.save();
    Context.scale(-1, 1);
    Context.rect(-this.xcoord + 50, this.ycoord - 70, this.lifebar, 50);
    Context.fillStyle = "green";
    Context.fill();
    Context.drawImage(this.Base, -this.xcoord, this.ycoord, 600, 600);
    Context.drawImage(this.life, -this.xcoord - 90, this.ycoord - 150);
    Context.restore();
    Context.closePath();
  };

  BaseEnemy.prototype.update = function () {
    this.lifebar = 685 / 3000 * this.vida;
  };

  return BaseEnemy;
}();

;
exports["default"] = BaseEnemy;
},{"./GameContext":"src/GameContext.ts","../assets/base.png":"assets/base.png","../assets/HealthBar.png":"assets/HealthBar.png"}],"node_modules/linked-list-typescript/lib/src/index.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LinkedList {
    constructor(...values) {
        this._head = this._tail = null;
        this._length = 0;
        if (values.length > 0) {
            values.forEach((value) => {
                this.append(value);
            });
        }
    }
    *iterator() {
        let currentItem = this._head;
        while (currentItem) {
            yield currentItem.value;
            currentItem = currentItem.next;
        }
    }
    [Symbol.iterator]() {
        return this.iterator();
    }
    get head() {
        return this._head ? this._head.value : null;
    }
    get tail() {
        return this._tail ? this._tail.value : null;
    }
    get length() {
        return this._length;
    }
    // Adds the element at a specific position inside the linked list
    insert(val, previousItem, checkDuplicates = false) {
        if (checkDuplicates && this.isDuplicate(val)) {
            return false;
        }
        let newItem = new LinkedListItem(val);
        let currentItem = this._head;
        if (!currentItem) {
            return false;
        }
        else {
            while (true) {
                if (currentItem.value === previousItem) {
                    newItem.next = currentItem.next;
                    newItem.prev = currentItem;
                    currentItem.next = newItem;
                    if (newItem.next) {
                        newItem.next.prev = newItem;
                    }
                    else {
                        this._tail = newItem;
                    }
                    this._length++;
                    return true;
                }
                else {
                    if (currentItem.next) {
                        currentItem = currentItem.next;
                    }
                    else {
                        // can't locate previousItem
                        return false;
                    }
                }
            }
        }
    }
    // Adds the element at the end of the linked list
    append(val, checkDuplicates = false) {
        if (checkDuplicates && this.isDuplicate(val)) {
            return false;
        }
        let newItem = new LinkedListItem(val);
        if (!this._tail) {
            this._head = this._tail = newItem;
        }
        else {
            this._tail.next = newItem;
            newItem.prev = this._tail;
            this._tail = newItem;
        }
        this._length++;
        return true;
    }
    // Add the element at the beginning of the linked list
    prepend(val, checkDuplicates = false) {
        if (checkDuplicates && this.isDuplicate(val)) {
            return false;
        }
        let newItem = new LinkedListItem(val);
        if (!this._head) {
            this._head = this._tail = newItem;
        }
        else {
            newItem.next = this._head;
            this._head.prev = newItem;
            this._head = newItem;
        }
        this._length++;
        return true;
    }
    remove(val) {
        let currentItem = this._head;
        if (!currentItem) {
            return;
        }
        if (currentItem.value === val) {
            this._head = currentItem.next;
            this._head.prev = null;
            currentItem.next = currentItem.prev = null;
            this._length--;
            return currentItem.value;
        }
        else {
            while (true) {
                if (currentItem.value === val) {
                    if (currentItem.next) { // special case for last element
                        currentItem.prev.next = currentItem.next;
                        currentItem.next.prev = currentItem.prev;
                        currentItem.next = currentItem.prev = null;
                    }
                    else {
                        currentItem.prev.next = null;
                        this._tail = currentItem.prev;
                        currentItem.next = currentItem.prev = null;
                    }
                    this._length--;
                    return currentItem.value;
                }
                else {
                    if (currentItem.next) {
                        currentItem = currentItem.next;
                    }
                    else {
                        return;
                    }
                }
            }
        }
    }
    removeHead() {
        let currentItem = this._head;
        // empty list
        if (!currentItem) {
            return;
        }
        // single item list
        if (!this._head.next) {
            this._head = null;
            this._tail = null;
            // full list
        }
        else {
            this._head.next.prev = null;
            this._head = this._head.next;
            currentItem.next = currentItem.prev = null;
        }
        this._length--;
        return currentItem.value;
    }
    removeTail() {
        let currentItem = this._tail;
        // empty list
        if (!currentItem) {
            return;
        }
        // single item list
        if (!this._tail.prev) {
            this._head = null;
            this._tail = null;
            // full list
        }
        else {
            this._tail.prev.next = null;
            this._tail = this._tail.prev;
            currentItem.next = currentItem.prev = null;
        }
        this._length--;
        return currentItem.value;
    }
    first(num) {
        let iter = this.iterator();
        let result = [];
        let n = Math.min(num, this.length);
        for (let i = 0; i < n; i++) {
            let val = iter.next();
            result.push(val.value);
        }
        return result;
    }
    toArray() {
        return [...this];
    }
    isDuplicate(val) {
        let set = new Set(this.toArray());
        return set.has(val);
    }
}
exports.LinkedList = LinkedList;
class LinkedListItem {
    constructor(val) {
        this.value = val;
        this.next = null;
        this.prev = null;
    }
}
exports.LinkedListItem = LinkedListItem;

},{}],"node_modules/queue-typescript/lib/src/index.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const linked_list_typescript_1 = require("linked-list-typescript");
class Queue extends linked_list_typescript_1.LinkedList {
    constructor(...values) {
        super(...values);
    }
    get front() {
        return this.head;
    }
    enqueue(val) {
        this.append(val);
    }
    dequeue() {
        return this.removeHead();
    }
}
exports.Queue = Queue;

},{"linked-list-typescript":"node_modules/linked-list-typescript/lib/src/index.js"}],"src/ControllerMobs.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

exports.__esModule = true;

var Lion_1 = __importDefault(require("./Lion"));

var bat_1 = __importDefault(require("./bat"));

var GameContext_1 = __importDefault(require("./GameContext"));

var Bear_1 = __importDefault(require("./Bear"));

var Tiger_1 = __importDefault(require("./Tiger"));

var Base_1 = __importDefault(require("./Base"));

var BaseEnemy_1 = __importDefault(require("./BaseEnemy"));

var queue_typescript_1 = require("queue-typescript");

var State;

(function (State) {
  State[State["Attack"] = -1] = "Attack";
  State[State["Stop"] = 0] = "Stop";
  State[State["Walk"] = 1] = "Walk";
})(State = exports.State || (exports.State = {}));

var unidad =
/** @class */
function () {
  function unidad(x) {
    this.tipo = x;

    if (x == 0) {
      this.Bat = new bat_1["default"]();
      this.life = this.Bat.life;
    } else if (x == 2) {
      this.Bear = new Bear_1["default"]();
      this.life = this.Bear.life;
    } else if (x == 1) {
      this.Lion = new Lion_1["default"]();
      this.life = this.Lion.life;
    } else if (x == 3) {
      this.Tiger = new Tiger_1["default"]();
      this.life = this.Tiger.life;
    }
  }

  unidad.prototype.render = function () {
    if (this.tipo == 0) this.Bat.render();
    if (this.tipo == 2) this.Bear.render();
    if (this.tipo == 1) this.Lion.render();
    if (this.tipo == 3) this.Tiger.render();
  };

  unidad.prototype.accessObject = function () {
    if (this.tipo == 0) return this.Bat;
    if (this.tipo == 2) return this.Bear;
    if (this.tipo == 1) return this.Lion;
    if (this.tipo == 3) return this.Tiger;
  };

  unidad.prototype.update = function () {
    if (this.tipo == 0) this.Bat.update();
    if (this.tipo == 2) this.Bear.update();
    if (this.tipo == 1) this.Lion.update();
    if (this.tipo == 3) this.Tiger.update();
  };

  unidad.prototype.getXcoord = function () {
    if (this.tipo == 0) return this.Bat.realx;
    if (this.tipo == 2) return this.Bear.realx;
    if (this.tipo == 1) return this.Lion.realx;
    if (this.tipo == 3) return this.Tiger.realx;
  };

  unidad.prototype.setState = function (State) {
    if (this.tipo == 0) this.Bat.State = State;
    if (this.tipo == 2) this.Bear.State = State;
    if (this.tipo == 1) this.Lion.State = State;
    if (this.tipo == 3) this.Tiger.State = State;
  };

  return unidad;
}();

var ControllerMobs =
/** @class */
function () {
  function ControllerMobs() {
    var _this = this;

    this.Ally = new queue_typescript_1.Queue();
    this.Enemy = new queue_typescript_1.Queue();
    this.BaseA = null;
    this.BaseB = null;
    this.initial = false;
    this.gameState = State.Walk; // x tipo 0-3 and y 0 || 1  0-> ally 1 ->enemy

    this.addmobs = function (x, y) {
      console.log("mob added");

      if (y == 0) {
        if (x == 0) {
          var uni1 = new unidad(0);
          uni1.Bat.xcoord = -GameContext_1["default"].context.canvas.width / 2 + 300;
          uni1.Bat.ycoord = 900;
          uni1.Bat.Pertenece = y;
          uni1.Bat.State = State.Walk;
          uni1.Bat.realx = 0;

          _this.Ally.enqueue(uni1);
        } else if (x == 2) {
          var uni2 = new unidad(2);
          uni2.Bear.xcoord = GameContext_1["default"].context.canvas.width / 2 - 300;
          uni2.Bear.ycoord = 950;
          uni2.Bear.Pertenece = y;
          uni2.Bear.realx = 0;
          uni2.Bear.State = State.Walk;

          _this.Ally.enqueue(uni2);
        } else if (x == 1) {
          var uni2 = new unidad(1);
          uni2.Lion.xcoord = -GameContext_1["default"].context.canvas.width / 2 + 300;
          uni2.Lion.ycoord = 950;
          uni2.Lion.Pertenece = y;
          uni2.Lion.State = State.Walk;
          uni2.Lion.realx = 0;

          _this.Ally.enqueue(uni2);
        } else if (x == 3) {
          var uni2 = new unidad(3);
          uni2.Tiger.xcoord = -GameContext_1["default"].context.canvas.width / 2 + 300;
          uni2.Tiger.ycoord = 950;
          uni2.Tiger.Pertenece = y;
          uni2.Tiger.realx = 0;
          uni2.Tiger.State = State.Walk;

          _this.Ally.enqueue(uni2);
        } //enemy

      } else {
        if (x == 0) {
          var uni1 = new unidad(0);
          uni1.Bat.xcoord = -GameContext_1["default"].context.canvas.width - 800;
          uni1.Bat.ycoord = 900;
          uni1.Bat.Pertenece = y;
          uni1.Bat.realx = 4200;

          _this.Enemy.enqueue(uni1);
        } else if (x == 2) {
          var uni2 = new unidad(2);
          uni2.Bear.xcoord = GameContext_1["default"].context.canvas.width + 800;
          uni2.Bear.ycoord = 950;
          uni2.Bear.Pertenece = y;
          uni2.Bear.realx = 4200;

          _this.Enemy.enqueue(uni2);
        } else if (x == 1) {
          var uni2 = new unidad(1);
          uni2.Lion.xcoord = -GameContext_1["default"].context.canvas.width - 800;
          ;
          uni2.Lion.ycoord = 950;
          uni2.Lion.Pertenece = y;
          uni2.Lion.realx = 4200;

          _this.Enemy.enqueue(uni2);
        } else if (x == 3) {
          var uni2 = new unidad(3);
          uni2.Tiger.xcoord = -GameContext_1["default"].context.canvas.width - 800;
          uni2.Tiger.ycoord = 950;
          uni2.Tiger.Pertenece = y;
          uni2.Tiger.realx = 4200;

          _this.Enemy.enqueue(uni2);
        }
      }
    };

    this.BaseA = new Base_1["default"]();
    this.BaseB = new BaseEnemy_1["default"]();
  }

  ControllerMobs.prototype.setAttack = function () {};

  ControllerMobs.prototype.subtractLifeAlly = function (attack) {
    this.BaseA.subsLife(attack);
  };

  ControllerMobs.prototype.subtractLifeEnemy = function (attack) {
    this.BaseB.subsLife(attack);
  };

  ControllerMobs.prototype.update = function () {
    this.checkFront();

    for (var _i = 0, _a = this.Enemy.toArray(); _i < _a.length; _i++) {
      var unit = _a[_i];
      unit.update();
    }

    for (var _b = 0, _c = this.Ally.toArray(); _b < _c.length; _b++) {
      var unit = _c[_b];
      unit.update();
    } //deque and take life from enemy base


    if (this.Ally.front != null && this.Ally.front.getXcoord() >= 4000) {
      this.subtractLifeEnemy(this.Ally.front.accessObject().attack);
      this.Ally.dequeue();
    }

    if (this.Enemy.front != null && this.Enemy.front.getXcoord() <= 200) {
      this.subtractLifeAlly(this.Enemy.front.accessObject().attack);
      this.Enemy.dequeue();
    } //check for an attack


    if (this.Ally.front != null && this.Enemy.front != null) {
      if (this.Ally.front.life < 0) this.Ally.dequeue();
      if (this.Enemy.front.life < 0) this.Enemy.dequeue();
    }

    if (this.Ally.front != null && this.Enemy.front != null) this.checkAttack(this.Enemy.front, this.Ally.front);
  };

  ControllerMobs.prototype.checkAttack = function (Ally, Enemy) {
    if (Ally.accessObject().State != State.Attack || Enemy.accessObject().State != State.Attack) {
      if (Math.abs(Ally.getXcoord() - Enemy.getXcoord()) <= 400) {
        Ally.setState(State.Attack);
        Enemy.setState(State.Attack);
        return true;
      } else if (Math.abs(Ally.getXcoord() - Enemy.getXcoord()) >= 500) {
        Ally.setState(State.Walk);
        Enemy.setState(State.Walk);
        return false;
      }
    }

    if (Ally.accessObject().State == State.Attack && Enemy.accessObject().State == State.Attack) {
      Ally.life -= Enemy.accessObject().attack;
      Enemy.life -= Ally.accessObject().attack;
    }
  };

  ControllerMobs.prototype.checkFront = function () {
    if (this.Enemy.front != null) {
      var temp = this.Enemy.toArray();
      var len = temp.length;
      if (this.Enemy.front != null && this.Ally.front == null) this.Enemy.front.setState(State.Walk);

      for (var i = 1; i < len; i++) {
        if (Math.abs(temp[i].getXcoord() - temp[i - 1].getXcoord()) <= 300) {
          temp[i].setState(State.Stop);
        } else {
          temp[i].setState(State.Walk);
        }
      }
    }

    if (this.Ally.front != null) {
      var temp = this.Ally.toArray();
      var len = temp.length;
      if (this.Ally.front != null && this.Enemy.front == null) this.Ally.front.setState(State.Walk);

      for (var i = 1; i < len; i++) {
        if (Math.abs(temp[i].getXcoord() - temp[i - 1].getXcoord()) <= 300) {
          temp[i].setState(State.Stop);
        } else {
          temp[i].setState(State.Walk);
        }
      }
    }

    this.BaseA.update();
    this.BaseB.update();
  };

  ControllerMobs.prototype.render = function () {
    //enemy
    for (var _i = 0, _a = this.Enemy.toArray(); _i < _a.length; _i++) {
      var unit = _a[_i];
      unit.render();
    }

    for (var _b = 0, _c = this.Ally.toArray(); _b < _c.length; _b++) {
      var unit = _c[_b];
      unit.render();
    } //ally


    this.BaseA.render();
    this.BaseB.render();
  };

  return ControllerMobs;
}();

;
exports["default"] = ControllerMobs;
},{"./Lion":"src/Lion.ts","./bat":"src/bat.ts","./GameContext":"src/GameContext.ts","./Bear":"src/Bear.ts","./Tiger":"src/Tiger.ts","./Base":"src/Base.ts","./BaseEnemy":"src/BaseEnemy.ts","queue-typescript":"node_modules/queue-typescript/lib/src/index.js"}],"assets/GoldCoin.png":[function(require,module,exports) {
module.exports = "/GoldCoin.473ee507.png";
},{}],"src/IA.ts":[function(require,module,exports) {
"use strict";

exports.__esModule = true;

var IA =
/** @class */
function () {
  function IA() {
    this.frameCounter = 0;
    this.first = false;
  }

  IA.prototype.update = function () {
    this.frameCounter++;
    var rand = Math.floor(Math.random() * 7);

    if (this.frameCounter % 100 == 0) {
      return rand;
    }

    return -1;
  };

  return IA;
}();

;
exports["default"] = IA;
},{}],"src/HUD.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

exports.__esModule = true;

var GameContext_1 = __importDefault(require("./GameContext"));

var HUD_png_1 = __importDefault(require("../assets/HUD.png"));

var ControllerMobs_1 = __importDefault(require("./ControllerMobs"));

var GoldCoin_png_1 = __importDefault(require("../assets/GoldCoin.png"));

var IA_1 = __importDefault(require("./IA"));

var HUD =
/** @class */
function () {
  function HUD() {
    var _this = this;

    this.HUD = new Image();
    this.positionX = -50;
    this.color = "#A4A5A3";
    this.gold = new Image();
    this.money = 0;
    this.moneyRate = 2;
    this.IAm = 0;
    this.moneyRateIA = 2;
    this.frame = 0;
    this.FrameCounter = 0;
    this.frameX = 0;
    this.frameY = 0;
    this.cont = null;
    this.IA = null;
    this.Play = null;
    this.enemyTimer = 200; ///alphas for each button

    this.a1 = 0;
    this.a2 = 0;
    this.a3 = 0;
    this.a4 = 0;
    this.a5 = 1;
    this.ally = 0;
    this.stateBoton1 = false;
    this.stateBoton2 = false;
    this.stateBoton3 = false;
    this.stateBoton4 = false;
    this.stateBoton5 = true;
    this.backColor = "green";
    this.timer = 200;

    this.mouseDownListener = function (event) {
      if (_this.timer > 200 && event.offsetX > _this.positionX + 214 && event.offsetX < _this.positionX + 214 + 100 && event.offsetY > 230 && event.offsetY < 326) {
        _this.cont.addmobs(0, _this.ally);

        _this.timer = 0;
      }

      if (_this.timer > 200 && event.offsetX > _this.positionX + 214 + 93 * 2 && event.offsetX < _this.positionX + 214 + 100 + 93 * 2 && event.offsetY > 230 && event.offsetY < 326) {
        _this.cont.addmobs(2, _this.ally);

        _this.timer = 0;
      }

      if (_this.timer > 200 && event.offsetX > _this.positionX + 214 + 93 * 4 && event.offsetX < _this.positionX + 214 + 100 + 93 * 4 && event.offsetY > 230 && event.offsetY < 326) {
        _this.cont.addmobs(1, _this.ally);

        _this.timer = 0;
      }

      if (_this.timer > 200 && event.offsetX > _this.positionX + 214 + 93 * 6 && event.offsetX < _this.positionX + 214 + 100 + 93 * 6 && event.offsetY > 230 && event.offsetY < 326) {
        _this.cont.addmobs(3, _this.ally);

        _this.timer = 0;
      }

      if (event.offsetX > _this.positionX + 214 + 93 * 20 && event.offsetX < _this.positionX + 214 + 100 + 93 * 20 && event.offsetY > 230 && event.offsetY < 326) {
        if (_this.stateBoton5) {
          _this.a5 = 0;
          _this.stateBoton5 = false;
        } else {
          _this.a5 = 1;
          _this.stateBoton5 = true;
        }
      }
    };

    this.HUD.src = HUD_png_1["default"];
    this.cont = new ControllerMobs_1["default"]();
    this.gold.src = GoldCoin_png_1["default"];
    this.IA = new IA_1["default"]();
  }

  HUD.prototype.render = function () {
    this.cont.render();
    var Context = GameContext_1["default"].context;
    Context.beginPath();
    Context.restore();
    Context.save();
    Context.drawImage(this.HUD, this.positionX, -Context.canvas.height / 3, Context.canvas.width / 2, Context.canvas.width / 2);
    Context.closePath(); // background rectangles

    Context.beginPath();
    Context.font = "50px Arial";
    Context.fillStyle = "#000000";
    Context.fillText("$50 ", this.positionX + 214, 200);
    Context.rect(this.positionX + 214, 230, 100, 96);
    Context.fillStyle = this.backColor;
    Context.fill();
    Context.closePath();
    Context.beginPath();
    Context.font = "50px Arial";
    Context.fillStyle = "#000000";
    Context.fillText("$50 ", this.positionX + 214 + 93 * 2, 200);
    Context.rect(this.positionX + 214 + 93 * 2, 230, 100, 96);
    Context.fillStyle = this.backColor;
    Context.fill();
    Context.closePath();
    Context.beginPath();
    Context.font = "50px Arial";
    Context.fillStyle = "#000000";
    Context.fillText("$50 ", this.positionX + 214 + 93 * 4, 200);
    Context.rect(this.positionX + 214 + 93 * 4, 230, 100, 96);
    Context.fillStyle = this.backColor;
    Context.fill();
    Context.closePath();
    Context.beginPath();
    Context.font = "50px Arial";
    Context.fillStyle = "#000000";
    Context.fillText("$50 ", this.positionX + 214 + 93 * 6, 200);
    Context.rect(this.positionX + 214 + 93 * 6, 230, 100, 96);
    Context.fillStyle = this.backColor;
    Context.fill();
    Context.closePath();
    Context.beginPath();
    Context.rect(this.positionX + 214 + 93 * 20, 230, 100, 96);
    Context.fillStyle = this.backColor;
    Context.fillStyle = "White";
    Context.globalAlpha = this.a5;
    Context.fill();
    Context.closePath();
    Context.beginPath();
    Context.save();
    Context.globalAlpha = 1;
    Context.font = "100px Arial";
    Context.fillStyle = "BLACK";
    Context.fillText("P", this.positionX + 230 + 93 * 20, 320);
    Context.restore();
    Context.closePath(); //Money HUD

    Context.beginPath();
    Context.save();
    Context.font = "50px Arial";
    Context.fillStyle = "#000000";
    Context.fillText("= " + this.money, this.positionX + 230 + 93 * 11.1, 310);
    Context.drawImage(this.gold, 6 + 32 * this.frameX, 7 + 32 * this.frameY, 25, 25, this.positionX + 230 + 93 * 10, 240, 128, 128); //Context.drawImage(this.gold,6 + 32 * 2,7 + 32 * 0,25,25,this.positionX + 230 + 93*10,240,128,128)

    Context.restore();
    Context.closePath(); //cooldown meshes

    Context.beginPath();
    Context.rect(this.positionX + 214, 230, 100, 96);
    Context.fillStyle = this.color;
    Context.globalAlpha = this.a1;
    Context.fill();
    Context.closePath();
    Context.beginPath();
    Context.rect(this.positionX + 214 + 93 * 2, 230, 100, 96);
    Context.fillStyle = this.color;
    Context.globalAlpha = this.a2;
    Context.fill();
    Context.closePath();
    Context.beginPath();
    Context.rect(this.positionX + 214 + 93 * 4, 230, 100, 96);
    Context.fillStyle = this.color;
    Context.globalAlpha = this.a3;
    Context.fill();
    Context.closePath();
    Context.beginPath();
    Context.rect(this.positionX + 214 + 93 * 6, 230, 100, 96);
    Context.fillStyle = this.color;
    Context.globalAlpha = this.a4;
    Context.fill();
    Context.closePath();
    Context.closePath();
    Context.restore();
  };

  HUD.prototype.update = function () {
    var Canvas = GameContext_1["default"].context.canvas;
    var Context = GameContext_1["default"].context;
    this.positionX = Canvas.scrollLeft;
    this.cont.update();
    this.timer = this.timer + 1;
    this.enemyTimer = this.enemyTimer + 1;

    if (this.timer >= 200) {
      this.a1 = .0;
      this.a2 = .0;
      this.a3 = .0;
      this.a4 = .0;
    } else {
      this.a1 = .6;
      this.a2 = .6;
      this.a3 = .6;
      this.a4 = .6;
    } //money update


    this.FrameCounter++;
    if (this.FrameCounter % 8 == 0) this.frameX++;

    if (this.frameX % 2 == 0 && this.frameX != 0) {
      this.frameX = 0;
      this.frameY++;
    }

    if (this.frameY % 4 == 0 && this.frameY != 0) {
      this.frameX = 0;
      this.frameY = 0;
    }

    if (this.FrameCounter % 25 == 0) {
      this.money += this.moneyRate;
      this.IAm += this.moneyRateIA;
    }

    var rand = this.IA.update();
    if (rand <= 3 && rand >= 0) if (this.enemyTimer >= 200) {
      this.cont.addmobs(rand, 1);
    }
  };

  return HUD;
}();

;
exports["default"] = HUD;
},{"./GameContext":"src/GameContext.ts","../assets/HUD.png":"assets/HUD.png","./ControllerMobs":"src/ControllerMobs.ts","../assets/GoldCoin.png":"assets/GoldCoin.png","./IA":"src/IA.ts"}],"assets/Tears.mp3":[function(require,module,exports) {
module.exports = "/Tears.4a1c11f6.mp3";
},{}],"assets/Forest.png":[function(require,module,exports) {
module.exports = "/Forest.18f49d4c.png";
},{}],"assets/The_Healing.mp3":[function(require,module,exports) {
module.exports = "/The_Healing.e43ec224.mp3";
},{}],"src/Scene/Pause.ts":[function(require,module,exports) {
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

var MainMenu_1 = __importDefault(require("./MainMenu"));

var Forest_png_1 = __importDefault(require("../../assets/Forest.png"));

var The_Healing_mp3_1 = __importDefault(require("../../assets/The_Healing.mp3"));

var sound = new Audio(The_Healing_mp3_1["default"]);
var image = new Image();

var Pause =
/** @class */
function (_super) {
  __extends(Pause, _super);

  function Pause(Play) {
    var _this = _super.call(this) || this;

    _this.Title = "Age Of Animals";
    _this.options = ["Continuar", "Salir"];
    _this.selectedOptionIndex = 0;
    _this.backgroundColorHue = 0;
    _this.skipUpdate = false;
    _this.PScene = null;

    _this.exit = function () {};

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
            sound.pause();
            engine.clearScreen();
            engine.changeScene(_this.PScene);
          } else if (_this.selectedOptionIndex === 1) {
            sound.pause();
            engine.clearScreen();
            engine.changeScene(new MainMenu_1["default"]());
          }

          break;
      }
    };

    _this.pause = function () {};

    _this.handleKeyUp = function (event) {};

    _this.mouseDownListener = function (event) {};

    _this.mouseEnterListener = function (event) {};

    _this.mouseMoveListener = function (event) {};

    _this.enter = function () {
      sound.play();
      image.src = Forest_png_1["default"];
    };

    _this.render = function () {
      var context = GameContext_1["default"].context;
      var _a = context.canvas,
          width = _a.width,
          height = _a.height;
      context.save();
      context.beginPath();
      context.drawImage(image, 0, 0);
      context.closePath();
      /*if (!this.skipUpdate) {
        this.backgroundColorHue = (this.backgroundColorHue + 1) % 360;
      }
      this.skipUpdate = !this.skipUpdate;
      context.fillStyle = `hsl(${this.backgroundColorHue}, 100%, 80%)`;
      context.fillRect(0, 0, width, height);
      context.fillStyle = "black";
      */

      context.font = "160px sans-serif";
      context.fillText(_this.Title, width / 2 - 500, 0 + 400);
      context.closePath();
      context.beginPath();
      context.fillStyle = "black";
      context.strokeStyle = "darkblue";
      context.font = "100px sans-serif";
      context.textAlign = "center";

      for (var i = 0; i < _this.options.length; i++) {
        var xPoint = width / 2;
        var yPoint = height * 0.65 + i * 100;

        if (_this.selectedOptionIndex === i) {
          context.lineWidth = 2;
          context.strokeText(_this.options[i], xPoint, yPoint);
        }

        context.fillText(_this.options[i], xPoint, yPoint);
      }

      context.closePath();
      context.restore();
    };

    _this.PScene = Play;
    return _this;
  }

  return Pause;
}(Scene_1["default"]);

exports["default"] = Pause;
},{"./Scene":"src/Scene/Scene.ts","../GameContext":"src/GameContext.ts","./MainMenu":"src/Scene/MainMenu.ts","../../assets/Forest.png":"assets/Forest.png","../../assets/The_Healing.mp3":"assets/The_Healing.mp3"}],"src/Scene/Playing.ts":[function(require,module,exports) {
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

var Camera_1 = __importDefault(require("../Camera"));

var background_1 = __importDefault(require("../background"));

var HUD_ts_1 = __importDefault(require("../HUD.ts"));

var Base_1 = __importDefault(require("../Base"));

var BaseEnemy_1 = __importDefault(require("../BaseEnemy"));

var Tears_mp3_1 = __importDefault(require("../../assets/Tears.mp3"));

var GameContext_1 = __importDefault(require("../GameContext"));

var Pause_1 = __importDefault(require("./Pause"));

var Playing =
/** @class */
function (_super) {
  __extends(Playing, _super);

  function Playing() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.camera = new Camera_1["default"]();
    _this.background = null;
    _this.HUD = new HUD_ts_1["default"]();
    _this.MobCont = null;
    _this.BackGroundMusic = new Audio(Tears_mp3_1["default"]);

    _this.pause = function () {};

    _this.handleKeyDown = function (event, engine) {
      _this.camera.handleKeyDown(event);

      if (event.key == 'p') {
        _this.BackGroundMusic.pause();

        engine.clearScreen();
        engine.changeScene(new Pause_1["default"](_this));
      }
    };

    _this.handleKeyUp = function (event) {
      _this.camera.handleKeyUp(event);
    };

    _this.mouseDownListener = function (event, engine) {
      _this.camera.mouseDownListener(event, engine);

      _this.HUD.mouseDownListener(event, engine);
    };

    _this.mouseEnterListener = function (event) {
      _this.camera.mouseEnterListener(event);
    };

    _this.mouseMoveListener = function (event) {
      _this.camera.mouseMoveListener(event);
    };

    _this.getCamera = function () {
      return _this.camera;
    };

    _this.exit = function () {
      _this.camera = new Camera_1["default"]();
      _this.background = new background_1["default"]();
      _this.HUD = new HUD_ts_1["default"](Base_1["default"], BaseEnemy_1["default"]);
      var canvas = GameContext_1["default"].context.canvas;
      GameContext_1["default"].context.clearRect(0, 0, canvas.width, canvas.height);
    };

    _this.enter = function () {
      _this.BackGroundMusic.play();

      _this.background = new background_1["default"]();
    };

    _this.update = function () {
      _this.camera.update();

      _this.HUD.update();
    };

    _this.render = function () {
      _this.camera.render();

      _this.background.render();

      _this.HUD.render();
    };

    return _this;
  }

  return Playing;
}(Scene_1["default"]);

exports["default"] = Playing;
},{"./Scene":"src/Scene/Scene.ts","../Camera":"src/Camera.ts","../background":"src/background.ts","../HUD.ts":"src/HUD.ts","../Base":"src/Base.ts","../BaseEnemy":"src/BaseEnemy.ts","../../assets/Tears.mp3":"assets/Tears.mp3","../GameContext":"src/GameContext.ts","./Pause":"src/Scene/Pause.ts"}],"src/Scene/MainMenu.ts":[function(require,module,exports) {
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

var The_Healing_mp3_1 = __importDefault(require("../../assets/The_Healing.mp3"));

var Forest_png_1 = __importDefault(require("../../assets/Forest.png"));

var sound = new Audio(The_Healing_mp3_1["default"]);
var image = new Image();

var MainMenu =
/** @class */
function (_super) {
  __extends(MainMenu, _super);

  function MainMenu() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.Title = "Age of Animals";
    _this.options = ["Jugar", "Config"];
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
            sound.pause();
            engine.clearScreen();
            engine.changeScene(new Playing_1["default"]());
          }

          if (_this.selectedOptionIndex === 1) {
            sound.pause();
            engine.clearScreen();
            engine.changeScene(new Playing_1["default"]());
          }

          break;
      }
    };

    _this.exit = function () {};

    _this.pause = function () {};

    _this.handleKeyUp = function (event) {};

    _this.mouseDownListener = function (event) {};

    _this.mouseEnterListener = function (event) {};

    _this.mouseMoveListener = function (event) {};

    _this.enter = function () {
      sound.play();
      image.src = Forest_png_1["default"];
    };

    _this.render = function () {
      var context = GameContext_1["default"].context;
      var _a = context.canvas,
          width = _a.width,
          height = _a.height;
      context.save();
      context.beginPath();
      context.drawImage(image, 0, 0);
      context.closePath();
      /*if (!this.skipUpdate) {
        this.backgroundColorHue = (this.backgroundColorHue + 1) % 360;
      }
      this.skipUpdate = !this.skipUpdate;
      context.fillStyle = `hsl(${this.backgroundColorHue}, 100%, 80%)`;
      context.fillRect(0, 0, width, height);
      context.fillStyle = "black";
      */

      context.font = "160px sans-serif";
      context.fillText(_this.Title, width / 2 - 500, 0 + 400);
      context.closePath();
      context.beginPath();
      context.fillStyle = "black";
      context.strokeStyle = "darkblue";
      context.font = "100px sans-serif";
      context.textAlign = "center";

      for (var i = 0; i < _this.options.length; i++) {
        var xPoint = width / 2;
        var yPoint = height * 0.65 + i * 100;

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
},{"./Scene":"src/Scene/Scene.ts","../GameContext":"src/GameContext.ts","./Playing":"src/Scene/Playing.ts","../../assets/The_Healing.mp3":"assets/The_Healing.mp3","../../assets/Forest.png":"assets/Forest.png"}],"src/Engine.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

exports.__esModule = true;

var GameContext_1 = __importDefault(require("./GameContext"));

var Time_1 = __importDefault(require("./Time"));

var MainMenu_1 = __importDefault(require("./Scene/MainMenu"));

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

    this.mouseDownListener = function (event, engine) {
      _this.currentScene.mouseDownListener(event, _this);
    };

    this.mouseEnterListener = function (event) {
      _this.currentScene.mouseEnterListener(event);
    };

    this.mouseMoveListener = function (event) {
      _this.currentScene.mouseMoveListener(event);
    };

    this.ScenePause = function (scene) {};

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
      _this.currentScene = new MainMenu_1["default"]();

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
},{"./GameContext":"src/GameContext.ts","./Time":"src/Time.ts","./Scene/MainMenu":"src/Scene/MainMenu.ts"}],"src/index.ts":[function(require,module,exports) {
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
canvas.addEventListener("mousedown", engine.mouseDownListener);
canvas.addEventListener("mouseenter", engine.mouseEnterListener);
canvas.addEventListener("mousemove", engine.mouseEnterListener);
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "54458" + '/');

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