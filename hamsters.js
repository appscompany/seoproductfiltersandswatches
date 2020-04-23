var hamsters =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	/* jshint esversion: 6, curly: true, eqeqeq: true, forin: true */
	
	/*
	 * Title: Hamsters.js
	 * Description: 100% Vanilla Javascript Multithreading & Parallel Execution Library
	 * Author: Austin K. Smith
	 * Contact: austin@asmithdev.com
	 * Copyright: 2015 Austin K. Smith - austin@asmithdev.com
	 * License: Artistic License 2.0
	 */
	
	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _version = __webpack_require__(2);
	
	var _version2 = _interopRequireDefault(_version);
	
	var _habitat = __webpack_require__(3);
	
	var _habitat2 = _interopRequireDefault(_habitat);
	
	var _pool = __webpack_require__(5);
	
	var _pool2 = _interopRequireDefault(_pool);
	
	var _data = __webpack_require__(6);
	
	var _data2 = _interopRequireDefault(_data);
	
	var _tools = __webpack_require__(7);
	
	var _tools2 = _interopRequireDefault(_tools);
	
	var _logger = __webpack_require__(8);
	
	var _logger2 = _interopRequireDefault(_logger);
	
	var _memoizer = __webpack_require__(9);
	
	var _memoizer2 = _interopRequireDefault(_memoizer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var hamstersjs = function () {
	  function hamstersjs() {
	    _classCallCheck(this, hamstersjs);
	
	    this.persistence = true;
	    this.memoize = false;
	    this.atomics = false;
	    this.debug = false;
	    this.version = _version2.default;
	    this.maxThreads = _habitat2.default.logicalThreads;
	    this.tools = _tools2.default;
	    this.habitat = _habitat2.default;
	    this.data = _data2.default;
	    this.pool = _pool2.default;
	    this.logger = _logger2.default;
	    this.memoizer = _memoizer2.default;
	    this.run = this.runHamsters;
	    this.promise = this.hamstersPromise;
	    this.loop = this.hamstersLoop;
	    this.init = this.initializeLibrary;
	  }
	
	  _createClass(hamstersjs, [{
	    key: 'initializeLibrary',
	    value: function initializeLibrary(startOptions) {
	      this.logger.info('Preparing the hamster wheels & readying hamsters');
	      if (typeof startOptions !== 'undefined') {
	        this.processStartOptions(startOptions);
	      }
	      if (this.habitat.browser && !this.habitat.reactNative) {
	        this.setupBrowserSupport();
	      }
	      if (this.habitat.webWorker && typeof this.habitat.SharedWorker !== 'undefined') {
	        this.setupWorkerSupport();
	      }
	      this.greaseHamsterWheel();
	      this.spawnHamsters();
	      this.chewGarbage(startOptions);
	      this.logger.info(this.maxThreads + ' hamsters ready and awaiting instructions');
	    }
	  }, {
	    key: 'greaseHamsterWheel',
	    value: function greaseHamsterWheel() {
	      if (this.habitat.legacy) {
	        this.wheel = this.legacyHamsterWheel;
	      } else {
	        this.wheel = this.hamsterWheel;
	      }
	    }
	  }, {
	    key: 'setupBrowserSupport',
	    value: function setupBrowserSupport() {
	      var isIE10 = this.habitat.isIE(10);
	      var userAgent = navigator.userAgent;
	      var lacksWorkerSupport = typeof this.habitat.Worker === 'undefined';
	      var legacyAgents = ['Kindle/3.0', 'Mobile/8F190', 'IEMobile'];
	      if (lacksWorkerSupport || legacyAgents.indexOf(userAgent) !== -1 || isIE10) {
	        this.habitat.legacy = true;
	      }
	    }
	  }, {
	    key: 'setupWorkerSupport',
	    value: function setupWorkerSupport() {
	      try {
	        var workerBlob = this.generateWorkerBlob();
	        var SharedHamster = new this.habitat.SharedWorker(workerBlob, 'SharedHamsterWheel');
	        this.pool.uri = workerBlob;
	      } catch (e) {
	        this.habitat.legacy = true;
	      }
	    }
	  }, {
	    key: 'processStartOptions',
	    value: function processStartOptions(startOptions) {
	      var habitatKeys = ['worker', 'sharedWorker', 'legacy'];
	      for (var key in startOptions) {
	        if (startOptions.hasOwnProperty(key)) {
	          if (habitatKeys.indexOf(key.toLowerCase()) !== -1) {
	            hamsters.habitat[key] = startOptions[key];
	          } else {
	            hamsters[key] = startOptions[key];
	          }
	        }
	      }
	    }
	  }, {
	    key: 'generateWorkerBlob',
	    value: function generateWorkerBlob(workerLogic) {
	      var functionString = '(' + String(workerLogic) + ')();';
	      var hamsterBlob = this.data.createBlob(functionString);
	      return URL.createObjectURL(hamsterBlob);
	    }
	  }, {
	    key: 'spawnHamsters',
	    value: function spawnHamsters() {
	      if (this.habitat.legacy) {
	        return;
	      }
	      if (this.habitat.browser) {
	        this.pool.uri = this.generateWorkerBlob(this.giveHamsterWork());
	      }
	      if (this.persistence) {
	        var i = this.maxThreads;
	        this.logger.info(i + ' Logical Threads Detected, Spawning ' + i + ' Hamsters');
	        for (i; i > 0; i--) {
	          this.pool.threads.push(this.spawnHamster());
	        }
	      }
	    }
	  }, {
	    key: 'spawnHamster',
	    value: function spawnHamster() {
	      if (this.habitat.ie10) {
	        return new this.habitat.Worker('src/common/wheel.min.js');
	      }
	      if (this.habitat.webWorker) {
	        return new this.habitat.SharedWorker(this.pool.uri, 'SharedHamsterWheel');
	      }
	      if (this.habitat.node) {
	        return new this.habitat.Worker(this.giveHamsterWork());
	      }
	      return new this.habitat.Worker(this.pool.uri);
	    }
	  }, {
	    key: 'giveHamsterWork',
	    value: function giveHamsterWork() {
	      if (this.habitat.webWorker) {
	        return this.workerWorker;
	      }
	      return this.worker;
	    }
	  }, {
	    key: 'workerWorker',
	    value: function workerWorker() {
	      self.addEventListener("connect", function (e) {
	        var port = e.ports[0];
	        port.start();
	        port.addEventListener("message", function (e) {
	          self.params = e.data;
	          self.rtn = {
	            data: [],
	            dataType: params.dataType
	          };
	          var fn = eval("(" + params.fn + ")");
	          if (fn) {
	            fn();
	          }
	          port.postMessage({
	            results: rtn
	          });
	        }, false);
	      }, false);
	    }
	  }, {
	    key: 'worker',
	    value: function worker() {
	      self.typedArrayFromBuffer = function (dataType, buffer) {
	        var types = {
	          'uint32': Uint32Array,
	          'uint16': Uint16Array,
	          'uint8': Uint8Array,
	          'uint8clamped': Uint8ClampedArray,
	          'int32': Int32Array,
	          'int16': Int16Array,
	          'int8': Int8Array,
	          'float32': Float32Array,
	          'float64': Float64Array
	        };
	        if (!types[dataType]) {
	          return buffer;
	        }
	        return new types[dataType](buffer);
	      };
	
	      self.prepareTransferBuffers = function (hamsterFood) {
	        var buffers = [];
	        var key = null;
	        for (key in hamsterFood) {
	          if (hamsterFood.hasOwnProperty(key) && hamsterFood[key]) {
	            if (hamsterFood[key].buffer) {
	              buffers.push(hamsterFood[key].buffer);
	            } else if (Array.isArray(hamsterFood[key]) && typeof ArrayBuffer !== 'undefined') {
	              buffers.push(new ArrayBuffer(hamsterFood[key]));
	            }
	          }
	        }
	        return buffers;
	      };
	
	      self.onmessage = function (e) {
	        self.params = e.data;
	        self.rtn = {
	          data: [],
	          dataType: params.dataType ? params.dataType.toLowerCase() : null
	        };
	        var fn = new Function(params.fn);
	        if (fn) {
	          fn();
	        }
	        if (params.dataType) {
	          rtn.data = self.typedArrayFromBuffer(rtn.dataType, rtn.data);
	        }
	        postMessage(rtn, self.prepareTransferBuffers(rtn));
	      };
	    }
	  }, {
	    key: 'newTask',
	    value: function newTask(taskOptions) {
	      this.pool.tasks.push(taskOptions);
	      return this.pool.tasks[taskOptions.id];
	    }
	  }, {
	    key: 'legacyHamsterWheel',
	    value: function legacyHamsterWheel(thread_id, task, resolve, reject) {
	      // this.trackThread(task, thread_id);
	      var dataArray = this.data.arrayFromIndex(task.input.array, task.indexes[thread_id]);
	      this.legacyProcessor(task, dataArray, resolve, reject);
	      task.count += 1; //Thread finished
	    }
	  }, {
	    key: 'chewGarbage',
	    value: function chewGarbage(startOptions) {
	      delete this.init;
	      startOptions = null;
	    }
	  }, {
	    key: 'hamstersLoop',
	    value: function hamstersLoop(input, onSuccess) {
	      var params = {
	        run: this.prepareFunction(input.operator),
	        init: input.startIndex || 0,
	        limit: input.limit || null,
	        array: input.array,
	        incrementBy: input.incrementBy || 1,
	        dataType: input.dataType || null,
	        worker: this.habitat.webWorker
	      };
	      this.runHamsters(params, function () {
	        var operator = params.run;
	        if (typeof operator === "string") {
	          if (params.worker) {
	            operator = eval("(" + operator + ")");
	          } else {
	            operator = new Function(operator);
	          }
	        }
	        if (!params.limit) {
	          params.limit = params.array.length;
	        }
	        var i = params.init;
	        for (i; i < params.limit; i += params.incrementBy) {
	          rtn.data[i] = operator(params.array[i]);
	        }
	      }, function (rtn) {
	        onSuccess(rtn);
	      }, input.threads, 1, input.dataType);
	    }
	  }, {
	    key: 'prepareFunction',
	    value: function prepareFunction(functionBody) {
	      if (!this.habitat.legacy) {
	        functionBody = String(functionBody);
	        if (!this.habitat.webWorker) {
	          var startingIndex = functionBody.indexOf("{") + 1;
	          var endingIndex = functionBody.length - 1;
	          return functionBody.substring(startingIndex, endingIndex);
	        }
	      }
	      return functionBody;
	    }
	  }, {
	    key: 'hamstersTask',
	    value: function hamstersTask(params, functionToRun, scope) {
	      this.id = scope.pool.tasks.length;
	      this.threads = params.threads || 1;
	      this.count = 0;
	      this.input = params;
	      this.aggregate = params.aggregate || true;
	      this.output = [];
	      this.workers = [];
	      this.operator = scope.prepareFunction(functionToRun);
	      this.memoize = params.memoize || false;
	      this.dataType = params.dataType ? params.dataType.toLowerCase() : null;
	      if (params.array) {
	        this.indexes = scope.data.determineSubArrays(params.array, this.threads);
	      }
	    }
	  }, {
	    key: 'hamstersPromise',
	    value: function hamstersPromise(params, functionToRun) {
	      var _this = this;
	
	      return new Promise(function (resolve, reject) {
	        var task = new _this.hamstersTask(params, functionToRun, _this);
	        var logger = _this.logger;
	        _this.hamstersWork(task).then(function (results) {
	          resolve(results);
	        }).catch(function (error) {
	          logger.error(error.messsage);
	          reject(error);
	        });
	      });
	    }
	  }, {
	    key: 'runHamsters',
	    value: function runHamsters(params, functionToRun, onSuccess, numberOfWorkers, aggregate, dataType, memoize, sortOrder) {
	      // Convert old arguments into new params object
	      params.threads = params.threads || numberOfWorkers;
	      params.aggregate = params.aggregate || aggregate || true;
	      params.dataType = params.dataType || dataType;
	      params.memoize = params.memoize || memoize || false;
	      params.sort = params.sort || sortOrder;
	      // Create new task and execute
	      var task = new this.hamstersTask(params, functionToRun, this);
	      var logger = this.logger;
	      this.hamstersWork(task).then(function (results) {
	        onSuccess(results);
	      }).catch(function (error) {
	        logger.error(error.messsage);
	      });
	    }
	  }, {
	    key: 'hamstersWork',
	    value: function hamstersWork(task) {
	      var _this2 = this;
	
	      return new Promise(function (resolve, reject) {
	        var i = 0;
	        while (i < task.threads) {
	          _this2.wheel(task, resolve, reject);
	          i += 1;
	        }
	      });
	    }
	  }, {
	    key: 'hamsterWheel',
	    value: function hamsterWheel(task, resolve, reject) {
	      var threadId = this.pool.running.length;
	      if (this.maxThreads === threadId) {
	        return this.poolThread(task, threadId, resolve, reject);
	      }
	      var hamster = this.persistence ? this.pool.threads[threadId] : spawnHamster();
	      var hamsterFood = this.prepareHamsterFood(task, threadId);
	      this.trainHamster(threadId, task, hamster, resolve, reject);
	      this.trackThread(task, threadId);
	      this.feedHamster(hamster, hamsterFood);
	      task.count += 1; //Increment count, thread is running
	    }
	  }, {
	    key: 'prepareHamsterFood',
	    value: function prepareHamsterFood(task, threadId) {
	      var hamsterFood = {};
	      for (var key in task.input) {
	        if (task.input.hasOwnProperty(key) && key !== 'array') {
	          hamsterFood[key] = task.input[key];
	        }
	      }
	      if (task.indexes && task.threads !== 1) {
	        hamsterFood.array = this.data.arrayFromIndex(task.input.array, task.indexes[threadId]);
	      } else {
	        hamsterFood.array = task.input.array;
	      }
	      if (task.operator && !hamsterFood.fn) {
	        hamsterFood.fn = task.operator;
	      }
	      return hamsterFood;
	    }
	  }, {
	    key: 'feedHamster',
	    value: function feedHamster(hamster, hamsterFood) {
	      if (this.habitat.webWorker) {
	        return hamster.port.postMessage(hamsterFood);
	      }
	      if (this.habitat.ie10) {
	        return hamster.postMessage(hamsterFood);
	      }
	      return hamster.postMessage(hamsterFood, this.prepareTransferBuffers(hamsterFood));
	    }
	  }, {
	    key: 'prepareTransferBuffers',
	    value: function prepareTransferBuffers(hamsterFood) {
	      var buffers = [];
	      var key = null;
	      if (this.habitat.transferrable) {
	        for (key in hamsterFood) {
	          if (hamsterFood.hasOwnProperty(key) && hamsterFood[key]) {
	            if (hamsterFood[key].buffer) {
	              buffers.push(hamsterFood[key].buffer);
	            } else if (Array.isArray(hamsterFood[key]) && typeof ArrayBuffer !== 'undefined') {
	              buffers.push(new ArrayBuffer(hamsterFood[key]));
	            }
	          }
	        }
	      }
	      return buffers;
	    }
	  }, {
	    key: 'trainHamster',
	    value: function trainHamster(threadId, task, hamster, resolve, reject) {
	      var scope = this;
	      // Handle successful response from a thread
	      var onThreadResponse = function onThreadResponse(e) {
	        var results = e.data;
	        scope.chewThread(task, threadId);
	        task.output[threadId] = results.data;
	        if (task.workers.length === 0 && task.count === task.threads) {
	          var output = scope.data.getOutput(task, scope.habitat.transferrable);
	          if (task.sort) {
	            output = scope.data.sortOutput(output, task.sort);
	          }
	          resolve(output);
	          scope.pool.tasks[task.id] = null; //Clean up our task, not needed any longer
	        }
	        if (scope.pool.pending.length !== 0) {
	          scope.processQueue(hamster, scope.pool.pending.shift());
	        } else if (!scope.persistence && !scope.habitat.webWorker) {
	          hamster.terminate(); //Kill the thread only if no items waiting to run (20-22% performance improvement observed during testing, repurposing threads vs recreating them)
	        }
	      };
	
	      // Handle error response from a thread
	      var onThreadError = function onThreadError(e) {
	        if (!scope.habitat.webWorker) {
	          hamster.terminate(); //Kill the thread
	        }
	        var error = {
	          timeStamp: Date.now(),
	          threadId: threadId,
	          message: 'Line ' + e.lineno + ' in ' + e.filename + ': ' + e.message
	        };
	        scope.pool.errors.push(error);
	        reject(error);
	      };
	
	      if (this.habitat.webWorker) {
	        hamster.port.onmessage = onThreadResponse;
	        hamster.port.onerror = onThreadError;
	      } else {
	        hamster.onmessage = onThreadResponse;
	        hamster.onerror = onThreadError;
	      }
	    }
	  }, {
	    key: 'checkCache',
	    value: function checkCache(fn, input, dataType) {
	      var cachedResult = this.cache[fn];
	      if (cachedResult) {
	        if (cachedResult[0] === input && cachedResult[2] === dataType) {
	          return cachedResult;
	        }
	      }
	    }
	  }, {
	    key: 'memoize',
	    value: function memoize(fn, inputArray, output, dataType) {
	      this.cache[fn] = [inputArray, output, dataType];
	    }
	  }, {
	    key: 'assignOutput',
	    value: function assignOutput(task, inputArray) {
	      if (!task || !inputArray || !this.habitat.atomics) {
	        return;
	      }
	      task.output = new SharedArrayBuffer(inputArray.length);
	    }
	  }, {
	    key: 'trackInput',
	    value: function trackInput(inputArray, thread_id, task, hamsterFood) {
	      task.input.push({
	        input: inputArray,
	        workerid: thread_id,
	        taskid: task.id,
	        params: hamsterFood,
	        start: Date.now()
	      });
	    }
	  }, {
	    key: 'trackThread',
	    value: function trackThread(task, id) {
	      task.startTime = Date.now();
	      task.workers.push(id); //Keep track of threads scoped to current task
	      this.pool.running.push(id); //Keep track of all currently running threads
	    }
	  }, {
	    key: 'poolThread',
	    value: function poolThread(inputArray, hamsterFood, thread_id, cb, task, agg, memoize) {
	      this.pool.pending.push({
	        memoize: memoize,
	        input: inputArray,
	        params: hamsterFood,
	        workerid: thread_id,
	        onSuccess: cb,
	        task: task,
	        aggregate: agg
	      });
	    }
	  }, {
	    key: 'legacyProcessor',
	    value: function legacyProcessor(task, array, resolve, reject) {
	      setTimeout(function () {
	        var rtn = {
	          success: true,
	          data: []
	        };
	        var params = task.input;
	        params.array = array;
	        params.fn();
	        if (params.dataType) {
	          rtn.data = this.data.processDataType(params.dataType, rtn.data, this.habitat.transferable);
	          rtn.dataType = params.dataType;
	        }
	        resolve(rtn);
	      }, 4); //4ms delay (HTML5 spec minimum), simulate threading
	    }
	  }, {
	    key: 'processQueue',
	    value: function processQueue(hamster, item) {
	      if (!item) {
	        return;
	      }
	      this.wheel(item.input, item.params, item.aggregate, item.onSuccess, item.task, item.workerid, hamster, item.memoize); //Assign most recently finished thread to queue item
	    }
	  }, {
	    key: 'chewThread',
	    value: function chewThread(task, id) {
	      this.pool.running.splice(this.pool.running.indexOf(id), 1); //Remove thread from running pool
	      task.workers.splice(task.workers.indexOf(id), 1); //Remove thread from task running pool
	    }
	  }]);
	
	  return hamstersjs;
	}();
	
	var hamsters = new hamstersjs();
	
	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
	  module.exports = hamsters;
	}

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	/*
	* Title: Hamsters.js
	* Description: Javascript library to add multi-threading support to javascript by exploiting concurrent web workers
	* Author: Austin K. Smith
	* Contact: austin@asmithdev.com
	* Copyright: 2015 Austin K. Smith - austin@asmithdev.com
	* License: Artistic License 2.0
	*/
	
	/* jshint esversion: 6 */
	
	'use strict';
	
	var majorVersion = 4;
	var minorVersion = 2;
	var patchVersion = 2;
	var hamstersVersion = majorVersion + '.' + minorVersion + '.' + patchVersion;
	
	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
	  module.exports = hamstersVersion;
	}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, global) {/*
	* Title: Hamsters.js
	* Description: Javascript library to add multi-threading support to javascript by exploiting concurrent web workers
	* Author: Austin K. Smith
	* Contact: austin@asmithdev.com
	* Copyright: 2015 Austin K. Smith - austin@asmithdev.com
	* License: Artistic License 2.0
	*/
	
	/* jshint esversion: 6 */
	
	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var habitat = function () {
	  function habitat() {
	    _classCallCheck(this, habitat);
	
	    this.browser = this.isBrowser();
	    this.webWorker = this.isWebWorker();
	    this.node = this.isNode();
	    this.reactNative = this.isReactNative();
	    this.shell = this.isShell();
	    this.transferrable = this.supportsTransferrableObjects();
	    this.legacy = this.isLegacyEnvironment();
	    this.atomics = this.supportsAtomicOperations();
	    this.proxies = this.supportsProxies();
	    this.isIE = this.isInternetExplorer;
	    this.logicalThreads = this.determineGlobalThreads();
	    this.Worker = this.locateWorkerObject();
	    this.sharedWorker = this.locateSharedWorkerObject();
	  }
	
	  _createClass(habitat, [{
	    key: 'determineGlobalThreads',
	    value: function determineGlobalThreads() {
	      var max = 4;
	      if (typeof navigator !== 'undefined') {
	        if (typeof navigator.hardwareConcurrency !== 'undefined') {
	          max = navigator.hardwareConcurrency;
	        }
	        if (max > 20 && navigator.userAgent.toLowerCase().indexOf('firefox') !== -1) {
	          max = 20;
	        }
	      }
	      if (this.isNode() && typeof os !== 'undefined') {
	        max = os.cpus().length;
	      }
	      return max;
	    }
	  }, {
	    key: 'locateWorkerObject',
	    value: function locateWorkerObject() {
	      return Worker || null;
	    }
	  }, {
	    key: 'locateSharedWorkerObject',
	    value: function locateSharedWorkerObject() {
	      return SharedWorker || null;
	    }
	  }, {
	    key: 'isBrowser',
	    value: function isBrowser() {
	      return (typeof window === 'undefined' ? 'undefined' : _typeof(window)) === "object";
	    }
	  }, {
	    key: 'isInternetExplorer',
	    value: function isInternetExplorer(version) {
	      return new RegExp('msie' + (!isNaN(version) ? '\\s' + version : ''), 'i').test(navigator.userAgent);
	    }
	  }, {
	    key: 'isNode',
	    value: function isNode() {
	      return (typeof process === 'undefined' ? 'undefined' : _typeof(process)) === "object" && "function" === "function" && !this.isBrowser() && !this.isWebWorker();
	    }
	  }, {
	    key: 'isWebWorker',
	    value: function isWebWorker() {
	      return typeof importScripts === "function";
	    }
	  }, {
	    key: 'isReactNative',
	    value: function isReactNative() {
	      return !this.isNode() && (typeof global === 'undefined' ? 'undefined' : _typeof(global)) === 'object';
	    }
	  }, {
	    key: 'isShell',
	    value: function isShell() {
	      return this.isBrowser() && !this.isNode() && !this.isWebWorker() && !this.isReactNative();
	    }
	  }, {
	    key: 'supportsTransferrableObjects',
	    value: function supportsTransferrableObjects() {
	      return typeof Uint8Array !== 'undefined';
	    }
	  }, {
	    key: 'isLegacyEnvironment',
	    value: function isLegacyEnvironment() {
	      return this.isShell() || !this.locateWorkerObject();
	    }
	  }, {
	    key: 'supportsAtomicOperations',
	    value: function supportsAtomicOperations() {
	      return typeof SharedArrayBuffer !== 'undefined';
	    }
	  }, {
	    key: 'supportsProxies',
	    value: function supportsProxies() {
	      return typeof Proxy !== 'undefined';
	    }
	  }]);
	
	  return habitat;
	}();
	
	var hamsterHabitat = new habitat();
	
	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
	  module.exports = hamsterHabitat;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4), (function() { return this; }())))

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;
	
	process.listeners = function (name) { return [] }
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }),
/* 5 */
/***/ (function(module, exports) {

	/*
	* Title: Hamsters.js
	* Description: Javascript library to add multi-threading support to javascript by exploiting concurrent web workers
	* Author: Austin K. Smith
	* Contact: austin@asmithdev.com
	* Copyright: 2015 Austin K. Smith - austin@asmithdev.com
	* License: Artistic License 2.0
	*/
	
	/* jshint esversion: 6 */
	
	'use strict';
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var pool = function pool() {
	  _classCallCheck(this, pool);
	
	  this.uri = null;
	  this.tasks = [];
	  this.errors = [];
	  this.threads = [];
	  this.running = [];
	  this.pending = [];
	};
	
	var hamsterPool = new pool();
	
	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
	  module.exports = hamsterPool;
	}

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	/*
	* Title: Hamsters.js
	* Description: Javascript library to add multi-threading support to javascript by exploiting concurrent web workers
	* Author: Austin K. Smith
	* Contact: austin@asmithdev.com
	* Copyright: 2015 Austin K. Smith - austin@asmithdev.com
	* License: Artistic License 2.0
	*/
	
	/* jshint esversion: 6 */
	
	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var data = function () {
	  function data() {
	    _classCallCheck(this, data);
	
	    this.randomArray = this.randomArray;
	    this.aggregateArrays = this.aggregateThreadOutputs;
	    this.splitArrays = this.splitArrayIntoSubArrays;
	    this.createBlob = this.createDataBlob;
	    this.determineSubArrays = this.determineSubArrayIndexes;
	    this.arrayFromIndex = this.subArrayFromIndex;
	    this.processDataType = this.processDataType;
	    this.sortOutput = this.sortArray;
	    this.getOutput = this.prepareOutput;
	  }
	
	  _createClass(data, [{
	    key: 'processDataType',
	    value: function processDataType(dataType, buffer, transferrable) {
	      if (transferrable) {
	        return this.typedArrayFromBuffer(dataType, buffer);
	      }
	      return buffer;
	    }
	  }, {
	    key: 'prepareOutput',
	    value: function prepareOutput(task, transferrable) {
	      if (task.aggregate && task.threads !== 1) {
	        return this.aggregateThreadOutputs(task.output, task.dataType, transferrable);
	      }
	      return task.output;
	    }
	  }, {
	    key: 'sortArray',
	    value: function sortArray(arr, order) {
	      switch (order) {
	        case 'desc':
	        case 'asc':
	          return Array.prototype.sort.call(arr, function (a, b) {
	            return order === 'asc' ? a - b : b - a;
	          });
	        case 'ascAlpha':
	          return arr.sort();
	        case 'descAlpha':
	          return arr.reverse();
	        default:
	          return arr;
	      }
	    }
	  }, {
	    key: 'typedArrayFromBuffer',
	    value: function typedArrayFromBuffer(dataType, buffer) {
	      var types = {
	        'uint32': Uint32Array,
	        'uint16': Uint16Array,
	        'uint8': Uint8Array,
	        'uint8clamped': Uint8ClampedArray,
	        'int32': Int32Array,
	        'int16': Int16Array,
	        'int8': Int8Array,
	        'float32': Float32Array,
	        'float64': Float64Array
	      };
	      if (!types[dataType]) {
	        return dataType;
	      }
	      return new types[dataType](buffer);
	    }
	  }, {
	    key: 'determineSubArrayIndexes',
	    value: function determineSubArrayIndexes(array, n) {
	      if (n === 1) {
	        return;
	      }
	      var i = 0;
	      var size = Math.ceil(array.length / n);
	      var indexes = [];
	      while (i < array.length) {
	        var start = i;
	        var end = (i += size) - 1;
	        if (end > array.length - 1) {
	          end = array.length;
	        }
	        var index = { start: start, end: end };
	        console.log(start, i, end);
	        indexes.push(index);
	      }
	      console.log(indexes);
	      return indexes;
	    }
	  }, {
	    key: 'subArrayFromIndex',
	    value: function subArrayFromIndex(array, index) {
	      if (array.slice) {
	        return array.slice(index.start, index.end);
	      } else {
	        return array.subarray(index.start, index.end);
	      }
	    }
	  }, {
	    key: 'createDataBlob',
	    value: function createDataBlob(textContent) {
	      if (typeof Blob === 'undefined') {
	        var BlobMaker = BlobBuilder || WebKitBlobBuilder || MozBlobBuilder || MSBlobBuilder;
	        var blob = new BlobMaker();
	        blob.append([textContent], {
	          type: 'application/javascript'
	        });
	        return blob.getBlob();
	      }
	      return new Blob([textContent], {
	        type: 'application/javascript'
	      });
	    }
	  }, {
	    key: 'randomArray',
	    value: function randomArray(count, onSuccess) {
	      var randomArray = [];
	      while (count > 0) {
	        randomArray.push(Math.round(Math.random() * (100 - 1) + 1));
	        count -= 1;
	      }
	      onSuccess(randomArray);
	    }
	  }, {
	    key: 'aggregateThreadOutputs',
	    value: function aggregateThreadOutputs(input, dataType, transferrable) {
	      if (!dataType || !transferrable) {
	        return input.reduce(function (a, b) {
	          return a.concat(b);
	        });
	      }
	      var i = 0;
	      var len = input.length;
	      var bufferLength = 0;
	      for (i; i < len; i += 1) {
	        bufferLength += input[i].length;
	      }
	      var output = this.processDataType(dataType, bufferLength, transferrable);
	      var offset = 0;
	      for (i = 0; i < len; i += 1) {
	        output.set(input[i], offset);
	        offset += input[i].length;
	      }
	      return output;
	    }
	  }, {
	    key: 'splitArrayIntoSubArrays',
	    value: function splitArrayIntoSubArrays(array, n) {
	      var i = 0;
	      var threadArrays = [];
	      var size = Math.ceil(array.length / n);
	      if (array.slice) {
	        while (i < array.length) {
	          threadArrays.push(array.slice(i, i += size));
	        }
	      } else {
	        while (i < array.length) {
	          threadArrays.push(array.subarray(i, i += size));
	        }
	      }
	      return threadArrays;
	    }
	  }]);
	
	  return data;
	}();
	
	var hamsterData = new data();
	
	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
	  module.exports = hamsterData;
	}

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	/*
	* Title: Hamsters.js
	* Description: Javascript library to add multi-threading support to javascript by exploiting concurrent web workers
	* Author: Austin K. Smith
	* Contact: austin@asmithdev.com
	* Copyright: 2015 Austin K. Smith - austin@asmithdev.com
	* License: Artistic License 2.0
	*/
	
	/* jshint esversion: 6 */
	
	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var tools = function () {
	  function tools() {
	    _classCallCheck(this, tools);
	
	    this.randomArray = this.randomArray;
	    this.parseJson = this.parseJsonOnThread;
	    this.stringifyJson = this.stringifyJsonOnThread;
	  }
	
	  _createClass(tools, [{
	    key: 'randomArray',
	    value: function randomArray(inputAmount, onSuccess) {
	      var array = [];
	      while (inputAmount > 0) {
	        array[inputAmount] = Math.round(Math.random() * (100 - 1) + 1);
	        inputAmount -= 1;
	      }
	      onSuccess(array);
	    }
	  }, {
	    key: 'parseJsonOnThread',
	    value: function parseJsonOnThread(string, onSuccess) {
	      this.runHamsters({ input: string }, function () {
	        rtn.data = JSON.parse(params.input);
	      }, function (output) {
	        onSuccess(output[0]);
	      }, 1);
	    }
	  }, {
	    key: 'stringifyJsonOnThread',
	    value: function stringifyJsonOnThread(json, onSuccess) {
	      this.runHamsters({ input: json }, function () {
	        rtn.data = JSON.stringify(params.input);
	      }, function (output) {
	        onSuccess(output[0]);
	      }, 1);
	    }
	  }]);
	
	  return tools;
	}();
	
	var hamsterTools = new tools();
	
	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
	  module.exports = hamsterTools;
	}

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	/*
	* Title: Hamsters.js
	* Description: Javascript library to add multi-threading support to javascript by exploiting concurrent web workers
	* Author: Austin K. Smith
	* Contact: austin@asmithdev.com
	* Copyright: 2015 Austin K. Smith - austin@asmithdev.com
	* License: Artistic License 2.0
	*/
	
	/* jshint esversion: 6 */
	
	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var logger = function () {
	  function logger() {
	    _classCallCheck(this, logger);
	
	    this.logBook = {
	      'error': [],
	      'warning': [],
	      'info': []
	    };
	    this.info = this.infoLog;
	    this.warning = this.warningLog;
	    this.error = this.errorLog;
	    this.saveLogEntry = this.saveToLogBook;
	    this.getLogEntries = this.fetchLogBook;
	    this.searchLogEntries = this.searchLogBook;
	  }
	
	  _createClass(logger, [{
	    key: 'infoLog',
	    value: function infoLog(message) {
	      var timeStamp = Date.now();
	      var timeStampedMessage = 'Hamsters.js Info: ' + message + ' @ ' + timeStamp;
	      this.saveLogEntry('info', timeStampedMessage);
	      console.info(timeStampedMessage);
	    }
	  }, {
	    key: 'warningLog',
	    value: function warningLog(message) {
	      var timeStamp = Date.now();
	      var timeStampedMessage = 'Hamsters.js Warning: ' + message + ' @ ' + timeStamp;
	      this.saveLogEntry('warning', timeStampedMessage);
	      console.warning(timeStampedMessage);
	    }
	  }, {
	    key: 'errorLog',
	    value: function errorLog(message) {
	      var timeStamp = Date.now();
	      var timeStampedMessage = 'Hamsters.js Error: ' + message + ' @ ' + timeStamp;
	      this.saveLogEntry('error', timeStampedMessage);
	      console.error(timeStampedMessage);
	    }
	  }, {
	    key: 'saveToLogBook',
	    value: function saveToLogBook(eventType, message) {
	      this.logBook[eventType].push(message);
	    }
	  }, {
	    key: 'fetchLogBook',
	    value: function fetchLogBook(eventType) {
	      if (eventType) {
	        return this.logBook[eventType];
	      }
	      return this.logBook;
	    }
	  }, {
	    key: 'findStringInArray',
	    value: function findStringInArray(array, string) {
	      var results = [];
	      for (var i = 0; i < array.length; i++) {
	        if (array[i].indexOf(string) !== -1) {
	          results.push(array[i]);
	        }
	      }
	      return results;
	    }
	  }, {
	    key: 'searchLogBook',
	    value: function searchLogBook(string, eventType) {
	      var finalResults = [];
	      var tmpEntries = void 0;
	      var eventTypeResults = void 0;
	      if (eventType) {
	        tmpEntries = this.logBook[eventType];
	        finalResults = this.findStringInArray(tmpEntries, string);
	      } else {
	        for (var key in this.logBook) {
	          if (this.logBook.hasOwnProperty(key)) {
	            tmpEntries = this.logBook[key];
	            eventTypeResults = this.findStringInArray(tmpEntries, string);
	            if (eventTypeResults.length !== 0) {
	              finalResults = [finalResults, eventTypeResults].reduce(function (a, b) {
	                return a.concat(b);
	              });
	            }
	          }
	        }
	      }
	      return {
	        total: finalResults.length,
	        results: finalResults
	      };
	    }
	  }]);
	
	  return logger;
	}();
	
	var hamsterLogger = new logger();
	
	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
	  module.exports = hamsterLogger;
	}

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	/*
	* Title: Hamsters.js
	* Description: Javascript library to add multi-threading support to javascript by exploiting concurrent web workers
	* Author: Austin K. Smith
	* Contact: austin@asmithdev.com
	* Copyright: 2015 Austin K. Smith - austin@asmithdev.com
	* License: Artistic License 2.0
	*/
	
	/* jshint esversion: 6 */
	
	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var memoizer = function () {
	  function memoizer() {
	    _classCallCheck(this, memoizer);
	
	    this.maxCacheEntries = 25;
	    this.cacheEntries = [];
	    this.itemCached = this.isItemCached;
	    this.fetchItem = this.fetchItemFromCache;
	    this.saveItem = this.saveItemToCache;
	  }
	
	  _createClass(memoizer, [{
	    key: 'isItemCached',
	    value: function isItemCached(input, method) {
	      return this.fetchItem({ fn: method, data: input }) || false;
	    }
	  }, {
	    key: 'fetchItemFromCache',
	    value: function fetchItemFromCache(cacheItem) {
	      var cachedResult = null;
	      for (var key in this.cache) {
	        if (this.cache.hasOwnProperty(key)) {
	          if (cacheItem[key].fn === cacheItem.fn) {
	            if (cacheItem[key].input === cacheItem.data) {
	              cachedResult = cacheItem[key].input;
	            }
	          }
	        }
	      }
	      return cachedResult || false;
	    }
	  }, {
	    key: 'saveItemToCache',
	    value: function saveItemToCache(method, data, maxCacheEntries) {
	      var itemToCache = {
	        fn: method,
	        input: data
	      };
	      var cachedItems = this.cacheEntries;
	      if (cachedItems.length < maxCacheEntries) {
	        cachedItems.push(itemToCache);
	      } else {
	        cachedItems.splice(0, 0, itemToCache);
	      }
	      this.cacheEntries = cachedItems;
	    }
	  }]);
	
	  return memoizer;
	}();
	
	var hamsterMemoizer = new memoizer();
	
	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
	  module.exports = hamsterMemoizer;
	}

/***/ })
/******/ ]);
//# sourceMappingURL=hamsters.min.js.map
