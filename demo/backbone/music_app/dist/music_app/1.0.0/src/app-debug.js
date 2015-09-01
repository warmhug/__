;(function() {
var underscore_160_underscore_debug, underscore, backbone_112_backbone_debug, music_app_100_src_util_debug, music_app_100_src_model_model_debug, music_app_100_src_views_home_home_debug, music_app_100_src_views_list_list_debug, music_app_100_src_views_detail_detail_debug, music_app_100_src_views_other_other_debug, music_app_100_src_views_other_other1_debug, music_app_100_src_model_collection_debug, music_app_100_src_router_debug, music_app_100_src_app_debug;
underscore_160_underscore_debug = function (exports) {
  //     Underscore.js 1.6.0
  //     http://underscorejs.org
  //     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
  //     Underscore may be freely distributed under the MIT license.
  (function () {
    // Baseline setup
    // --------------
    // Establish the root object, `window` in the browser, or `exports` on the server.
    var root = this;
    // Save the previous value of the `_` variable.
    var previousUnderscore = root._;
    // Establish the object that gets returned to break out of a loop iteration.
    var breaker = {};
    // Save bytes in the minified (but not gzipped) version:
    var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;
    // Create quick reference variables for speed access to core prototypes.
    var push = ArrayProto.push, slice = ArrayProto.slice, concat = ArrayProto.concat, toString = ObjProto.toString, hasOwnProperty = ObjProto.hasOwnProperty;
    // All **ECMAScript 5** native function implementations that we hope to use
    // are declared here.
    var nativeIsArray = Array.isArray, nativeKeys = Object.keys, nativeBind = FuncProto.bind;
    // Create a safe reference to the Underscore object for use below.
    var _ = function (obj) {
      if (obj instanceof _)
        return obj;
      if (!(this instanceof _))
        return new _(obj);
      this._wrapped = obj;
    };
    // Export the Underscore object for **Node.js**, with
    // backwards-compatibility for the old `require()` API. If we're in
    // the browser, add `_` as a global object via a string identifier,
    // for Closure Compiler "advanced" mode.
    if (true) {
      if (true) {
        exports = exports = _;
      }
      exports._ = _;
    } else {
      root._ = _;
    }
    _.VERSION = '1.6.0';
    _.each = _.forEach = function (obj, iterator, context) {
      if (obj == null)
        return obj;
      if (obj.length === +obj.length) {
        for (var i = 0, length = obj.length; i < length; i++) {
          if (iterator.call(context, obj[i], i, obj) === breaker)
            return;
        }
      } else {
        var keys = _.keys(obj);
        for (var i = 0, length = keys.length; i < length; i++) {
          if (iterator.call(context, obj[keys[i]], keys[i], obj) === breaker)
            return;
        }
      }
      return obj;
    };
    _.map = _.collect = function (obj, iterator, context) {
      var results = [];
      if (obj == null)
        return results;
      _.each(obj, function (value, index, list) {
        results.push(iterator.call(context, value, index, list));
      });
      return results;
    };
    var reduceError = 'Reduce of empty array with no initial value';
    _.reduce = _.foldl = _.inject = function (obj, iterator, memo, context) {
      var initial = arguments.length > 2;
      if (obj == null)
        obj = [];
      _.each(obj, function (value, index, list) {
        if (!initial) {
          memo = value;
          initial = true;
        } else {
          memo = iterator.call(context, memo, value, index, list);
        }
      });
      if (!initial)
        throw new TypeError(reduceError);
      return memo;
    };
    _.reduceRight = _.foldr = function (obj, iterator, memo, context) {
      var initial = arguments.length > 2;
      if (obj == null)
        obj = [];
      var length = obj.length;
      if (length !== +length) {
        var keys = _.keys(obj);
        length = keys.length;
      }
      _.each(obj, function (value, index, list) {
        index = keys ? keys[--length] : --length;
        if (!initial) {
          memo = obj[index];
          initial = true;
        } else {
          memo = iterator.call(context, memo, obj[index], index, list);
        }
      });
      if (!initial)
        throw new TypeError(reduceError);
      return memo;
    };
    _.find = _.detect = function (obj, predicate, context) {
      var result;
      _.some(obj, function (value, index, list) {
        if (predicate.call(context, value, index, list)) {
          result = value;
          return true;
        }
      });
      return result;
    };
    _.filter = _.select = function (obj, predicate, context) {
      var results = [];
      if (obj == null)
        return results;
      _.each(obj, function (value, index, list) {
        if (predicate.call(context, value, index, list))
          results.push(value);
      });
      return results;
    };
    _.reject = function (obj, predicate, context) {
      return _.filter(obj, _.negate(predicate), context);
    };
    _.every = _.all = function (obj, predicate, context) {
      predicate || (predicate = _.identity);
      var result = true;
      if (obj == null)
        return result;
      _.each(obj, function (value, index, list) {
        if (!(result = result && predicate.call(context, value, index, list)))
          return breaker;
      });
      return !!result;
    };
    _.some = _.any = function (obj, predicate, context) {
      predicate || (predicate = _.identity);
      var result = false;
      if (obj == null)
        return result;
      _.each(obj, function (value, index, list) {
        if (result || (result = predicate.call(context, value, index, list)))
          return breaker;
      });
      return !!result;
    };
    _.contains = _.include = function (obj, target) {
      if (obj == null)
        return false;
      if (obj.length === +obj.length)
        return _.indexOf(obj, target) >= 0;
      return _.some(obj, function (value) {
        return value === target;
      });
    };
    _.invoke = function (obj, method) {
      var args = slice.call(arguments, 2);
      var isFunc = _.isFunction(method);
      return _.map(obj, function (value) {
        return (isFunc ? method : value[method]).apply(value, args);
      });
    };
    _.pluck = function (obj, key) {
      return _.map(obj, _.property(key));
    };
    _.where = function (obj, attrs) {
      return _.filter(obj, _.matches(attrs));
    };
    _.findWhere = function (obj, attrs) {
      return _.find(obj, _.matches(attrs));
    };
    _.max = function (obj, iterator, context) {
      var result = -Infinity, lastComputed = -Infinity, value, computed;
      if (!iterator && _.isArray(obj)) {
        for (var i = 0, length = obj.length; i < length; i++) {
          value = obj[i];
          if (value > result) {
            result = value;
          }
        }
      } else {
        _.each(obj, function (value, index, list) {
          computed = iterator ? iterator.call(context, value, index, list) : value;
          if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
            result = value;
            lastComputed = computed;
          }
        });
      }
      return result;
    };
    _.min = function (obj, iterator, context) {
      var result = Infinity, lastComputed = Infinity, value, computed;
      if (!iterator && _.isArray(obj)) {
        for (var i = 0, length = obj.length; i < length; i++) {
          value = obj[i];
          if (value < result) {
            result = value;
          }
        }
      } else {
        _.each(obj, function (value, index, list) {
          computed = iterator ? iterator.call(context, value, index, list) : value;
          if (computed < lastComputed || computed === Infinity && result === Infinity) {
            result = value;
            lastComputed = computed;
          }
        });
      }
      return result;
    };
    _.shuffle = function (obj) {
      var rand;
      var index = 0;
      var shuffled = [];
      _.each(obj, function (value) {
        rand = _.random(index++);
        shuffled[index - 1] = shuffled[rand];
        shuffled[rand] = value;
      });
      return shuffled;
    };
    _.sample = function (obj, n, guard) {
      if (n == null || guard) {
        if (obj.length !== +obj.length)
          obj = _.values(obj);
        return obj[_.random(obj.length - 1)];
      }
      return _.shuffle(obj).slice(0, Math.max(0, n));
    };
    var lookupIterator = function (value, context) {
      if (value == null)
        return _.identity;
      if (!_.isFunction(value))
        return _.property(value);
      if (!context)
        return value;
      return function () {
        return value.apply(context, arguments);
      };
    };
    _.sortBy = function (obj, iterator, context) {
      iterator = lookupIterator(iterator, context);
      return _.pluck(_.map(obj, function (value, index, list) {
        return {
          value: value,
          index: index,
          criteria: iterator(value, index, list)
        };
      }).sort(function (left, right) {
        var a = left.criteria;
        var b = right.criteria;
        if (a !== b) {
          if (a > b || a === void 0)
            return 1;
          if (a < b || b === void 0)
            return -1;
        }
        return left.index - right.index;
      }), 'value');
    };
    var group = function (behavior) {
      return function (obj, iterator, context) {
        var result = {};
        iterator = lookupIterator(iterator, context);
        _.each(obj, function (value, index) {
          var key = iterator(value, index, obj);
          behavior(result, value, key);
        });
        return result;
      };
    };
    _.groupBy = group(function (result, value, key) {
      _.has(result, key) ? result[key].push(value) : result[key] = [value];
    });
    _.indexBy = group(function (result, value, key) {
      result[key] = value;
    });
    _.countBy = group(function (result, value, key) {
      _.has(result, key) ? result[key]++ : result[key] = 1;
    });
    _.sortedIndex = function (array, obj, iterator, context) {
      iterator = lookupIterator(iterator, context);
      var value = iterator(obj);
      var low = 0, high = array.length;
      while (low < high) {
        var mid = low + high >>> 1;
        iterator(array[mid]) < value ? low = mid + 1 : high = mid;
      }
      return low;
    };
    _.toArray = function (obj) {
      if (!obj)
        return [];
      if (_.isArray(obj))
        return slice.call(obj);
      if (obj.length === +obj.length)
        return _.map(obj, _.identity);
      return _.values(obj);
    };
    _.size = function (obj) {
      if (obj == null)
        return 0;
      return obj.length === +obj.length ? obj.length : _.keys(obj).length;
    };
    _.first = _.head = _.take = function (array, n, guard) {
      if (array == null)
        return void 0;
      if (n == null || guard)
        return array[0];
      if (n < 0)
        return [];
      return slice.call(array, 0, n);
    };
    _.initial = function (array, n, guard) {
      return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
    };
    _.last = function (array, n, guard) {
      if (array == null)
        return void 0;
      if (n == null || guard)
        return array[array.length - 1];
      return slice.call(array, Math.max(array.length - n, 0));
    };
    _.rest = _.tail = _.drop = function (array, n, guard) {
      return slice.call(array, n == null || guard ? 1 : n);
    };
    _.compact = function (array) {
      return _.filter(array, _.identity);
    };
    var flatten = function (input, shallow, strict, output) {
      if (shallow && _.every(input, _.isArray)) {
        return concat.apply(output, input);
      }
      for (var i = 0, length = input.length; i < length; i++) {
        var value = input[i];
        if (!_.isArray(value) && !_.isArguments(value)) {
          if (!strict)
            output.push(value);
        } else if (shallow) {
          push.apply(output, value);
        } else {
          flatten(value, shallow, strict, output);
        }
      }
      return output;
    };
    _.flatten = function (array, shallow) {
      return flatten(array, shallow, false, []);
    };
    _.without = function (array) {
      return _.difference(array, slice.call(arguments, 1));
    };
    _.partition = function (obj, predicate, context) {
      predicate = lookupIterator(predicate, context);
      var pass = [], fail = [];
      _.each(obj, function (value, key, obj) {
        (predicate(value, key, obj) ? pass : fail).push(value);
      });
      return [
        pass,
        fail
      ];
    };
    _.uniq = _.unique = function (array, isSorted, iterator, context) {
      if (array == null)
        return [];
      if (_.isFunction(isSorted)) {
        context = iterator;
        iterator = isSorted;
        isSorted = false;
      }
      var result = [];
      var seen = [];
      for (var i = 0, length = array.length; i < length; i++) {
        var value = array[i];
        if (iterator)
          value = iterator.call(context, value, i, array);
        if (isSorted ? !i || seen !== value : !_.contains(seen, value)) {
          if (isSorted)
            seen = value;
          else
            seen.push(value);
          result.push(array[i]);
        }
      }
      return result;
    };
    _.union = function () {
      return _.uniq(flatten(arguments, true, true, []));
    };
    _.intersection = function (array) {
      if (array == null)
        return [];
      var result = [];
      var argsLength = arguments.length;
      for (var i = 0, length = array.length; i < length; i++) {
        var item = array[i];
        if (_.contains(result, item))
          continue;
        for (var j = 1; j < argsLength; j++) {
          if (!_.contains(arguments[j], item))
            break;
        }
        if (j === argsLength)
          result.push(item);
      }
      return result;
    };
    _.difference = function (array) {
      var rest = flatten(slice.call(arguments, 1), true, true, []);
      return _.filter(array, function (value) {
        return !_.contains(rest, value);
      });
    };
    _.zip = function () {
      var length = _.max(_.pluck(arguments, 'length').concat(0));
      var results = new Array(length);
      for (var i = 0; i < length; i++) {
        results[i] = _.pluck(arguments, '' + i);
      }
      return results;
    };
    _.object = function (list, values) {
      if (list == null)
        return {};
      var result = {};
      for (var i = 0, length = list.length; i < length; i++) {
        if (values) {
          result[list[i]] = values[i];
        } else {
          result[list[i][0]] = list[i][1];
        }
      }
      return result;
    };
    _.indexOf = function (array, item, isSorted) {
      if (array == null)
        return -1;
      var i = 0, length = array.length;
      if (isSorted) {
        if (typeof isSorted == 'number') {
          i = isSorted < 0 ? Math.max(0, length + isSorted) : isSorted;
        } else {
          i = _.sortedIndex(array, item);
          return array[i] === item ? i : -1;
        }
      }
      for (; i < length; i++)
        if (array[i] === item)
          return i;
      return -1;
    };
    _.lastIndexOf = function (array, item, from) {
      if (array == null)
        return -1;
      var i = from == null ? array.length : from;
      while (i--)
        if (array[i] === item)
          return i;
      return -1;
    };
    _.range = function (start, stop, step) {
      if (arguments.length <= 1) {
        stop = start || 0;
        start = 0;
      }
      step = arguments[2] || 1;
      var length = Math.max(Math.ceil((stop - start) / step), 0);
      var idx = 0;
      var range = new Array(length);
      while (idx < length) {
        range[idx++] = start;
        start += step;
      }
      return range;
    };
    var ctor = function () {
    };
    _.bind = function (func, context) {
      var args, bound;
      if (nativeBind && func.bind === nativeBind)
        return nativeBind.apply(func, slice.call(arguments, 1));
      if (!_.isFunction(func))
        throw new TypeError('Bind must be called on a function');
      args = slice.call(arguments, 2);
      return bound = function () {
        if (!(this instanceof bound))
          return func.apply(context, args.concat(slice.call(arguments)));
        ctor.prototype = func.prototype;
        var self = new ctor();
        ctor.prototype = null;
        var result = func.apply(self, args.concat(slice.call(arguments)));
        if (Object(result) === result)
          return result;
        return self;
      };
    };
    _.partial = function (func) {
      var boundArgs = slice.call(arguments, 1);
      return function () {
        var position = 0;
        var args = boundArgs.slice();
        for (var i = 0, length = args.length; i < length; i++) {
          if (args[i] === _)
            args[i] = arguments[position++];
        }
        while (position < arguments.length)
          args.push(arguments[position++]);
        return func.apply(this, args);
      };
    };
    _.bindAll = function (obj) {
      var funcs = slice.call(arguments, 1);
      if (funcs.length === 0)
        throw new Error('bindAll must be passed function names');
      _.each(funcs, function (f) {
        obj[f] = _.bind(obj[f], obj);
      });
      return obj;
    };
    _.memoize = function (func, hasher) {
      var memo = {};
      hasher || (hasher = _.identity);
      return function () {
        var key = hasher.apply(this, arguments);
        return _.has(memo, key) ? memo[key] : memo[key] = func.apply(this, arguments);
      };
    };
    _.delay = function (func, wait) {
      var args = slice.call(arguments, 2);
      return setTimeout(function () {
        return func.apply(null, args);
      }, wait);
    };
    _.defer = function (func) {
      return _.delay.apply(_, [
        func,
        1
      ].concat(slice.call(arguments, 1)));
    };
    _.throttle = function (func, wait, options) {
      var context, args, result;
      var timeout = null;
      var previous = 0;
      options || (options = {});
      var later = function () {
        previous = options.leading === false ? 0 : _.now();
        timeout = null;
        result = func.apply(context, args);
        context = args = null;
      };
      return function () {
        var now = _.now();
        if (!previous && options.leading === false)
          previous = now;
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
          clearTimeout(timeout);
          timeout = null;
          previous = now;
          result = func.apply(context, args);
          context = args = null;
        } else if (!timeout && options.trailing !== false) {
          timeout = setTimeout(later, remaining);
        }
        return result;
      };
    };
    _.debounce = function (func, wait, immediate) {
      var timeout, args, context, timestamp, result;
      var later = function () {
        var last = _.now() - timestamp;
        if (last < wait && last > 0) {
          timeout = setTimeout(later, wait - last);
        } else {
          timeout = null;
          if (!immediate) {
            result = func.apply(context, args);
            context = args = null;
          }
        }
      };
      return function () {
        context = this;
        args = arguments;
        timestamp = _.now();
        var callNow = immediate && !timeout;
        if (!timeout) {
          timeout = setTimeout(later, wait);
        }
        if (callNow) {
          result = func.apply(context, args);
          context = args = null;
        }
        return result;
      };
    };
    _.once = function (func) {
      var ran = false, memo;
      return function () {
        if (ran)
          return memo;
        ran = true;
        memo = func.apply(this, arguments);
        func = null;
        return memo;
      };
    };
    _.wrap = function (func, wrapper) {
      return _.partial(wrapper, func);
    };
    _.negate = function (predicate) {
      return function () {
        return !predicate.apply(this, arguments);
      };
    };
    _.compose = function () {
      var funcs = arguments;
      return function () {
        var args = arguments;
        for (var i = funcs.length - 1; i >= 0; i--) {
          args = [funcs[i].apply(this, args)];
        }
        return args[0];
      };
    };
    _.after = function (times, func) {
      return function () {
        if (--times < 1) {
          return func.apply(this, arguments);
        }
      };
    };
    _.keys = function (obj) {
      if (!_.isObject(obj))
        return [];
      if (nativeKeys)
        return nativeKeys(obj);
      var keys = [];
      for (var key in obj)
        if (_.has(obj, key))
          keys.push(key);
      return keys;
    };
    _.values = function (obj) {
      var keys = _.keys(obj);
      var length = keys.length;
      var values = new Array(length);
      for (var i = 0; i < length; i++) {
        values[i] = obj[keys[i]];
      }
      return values;
    };
    _.pairs = function (obj) {
      var keys = _.keys(obj);
      var length = keys.length;
      var pairs = new Array(length);
      for (var i = 0; i < length; i++) {
        pairs[i] = [
          keys[i],
          obj[keys[i]]
        ];
      }
      return pairs;
    };
    _.invert = function (obj) {
      var result = {};
      var keys = _.keys(obj);
      for (var i = 0, length = keys.length; i < length; i++) {
        result[obj[keys[i]]] = keys[i];
      }
      return result;
    };
    _.functions = _.methods = function (obj) {
      var names = [];
      for (var key in obj) {
        if (_.isFunction(obj[key]))
          names.push(key);
      }
      return names.sort();
    };
    _.extend = function (obj) {
      if (!_.isObject(obj))
        return obj;
      _.each(slice.call(arguments, 1), function (source) {
        for (var prop in source) {
          obj[prop] = source[prop];
        }
      });
      return obj;
    };
    _.pick = function (obj, iterator, context) {
      var result = {};
      if (_.isFunction(iterator)) {
        for (var key in obj) {
          var value = obj[key];
          if (iterator.call(context, value, key, obj))
            result[key] = value;
        }
      } else {
        var keys = concat.apply([], slice.call(arguments, 1));
        for (var i = 0, length = keys.length; i < length; i++) {
          var key = keys[i];
          if (key in obj)
            result[key] = obj[key];
        }
      }
      return result;
    };
    _.omit = function (obj, iterator, context) {
      var keys;
      if (_.isFunction(iterator)) {
        iterator = _.negate(iterator);
      } else {
        keys = _.map(concat.apply([], slice.call(arguments, 1)), String);
        iterator = function (value, key) {
          return !_.contains(keys, key);
        };
      }
      return _.pick(obj, iterator, context);
    };
    _.defaults = function (obj) {
      if (!_.isObject(obj))
        return obj;
      _.each(slice.call(arguments, 1), function (source) {
        for (var prop in source) {
          if (obj[prop] === void 0)
            obj[prop] = source[prop];
        }
      });
      return obj;
    };
    _.clone = function (obj) {
      if (!_.isObject(obj))
        return obj;
      return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
    };
    _.tap = function (obj, interceptor) {
      interceptor(obj);
      return obj;
    };
    var eq = function (a, b, aStack, bStack) {
      if (a === b)
        return a !== 0 || 1 / a == 1 / b;
      if (a == null || b == null)
        return a === b;
      if (a instanceof _)
        a = a._wrapped;
      if (b instanceof _)
        b = b._wrapped;
      var className = toString.call(a);
      if (className != toString.call(b))
        return false;
      switch (className) {
      case '[object String]':
        return a == String(b);
      case '[object Number]':
        return a != +a ? b != +b : a == 0 ? 1 / a == 1 / b : a == +b;
      case '[object Date]':
      case '[object Boolean]':
        return +a == +b;
      case '[object RegExp]':
        return a.source == b.source && a.global == b.global && a.multiline == b.multiline && a.ignoreCase == b.ignoreCase;
      }
      if (typeof a != 'object' || typeof b != 'object')
        return false;
      var length = aStack.length;
      while (length--) {
        if (aStack[length] == a)
          return bStack[length] == b;
      }
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor && _.isFunction(bCtor) && bCtor instanceof bCtor) && ('constructor' in a && 'constructor' in b)) {
        return false;
      }
      aStack.push(a);
      bStack.push(b);
      var size = 0, result = true;
      if (className == '[object Array]') {
        size = a.length;
        result = size == b.length;
        if (result) {
          while (size--) {
            if (!(result = eq(a[size], b[size], aStack, bStack)))
              break;
          }
        }
      } else {
        for (var key in a) {
          if (_.has(a, key)) {
            size++;
            if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack)))
              break;
          }
        }
        if (result) {
          for (key in b) {
            if (_.has(b, key) && !size--)
              break;
          }
          result = !size;
        }
      }
      aStack.pop();
      bStack.pop();
      return result;
    };
    _.isEqual = function (a, b) {
      return eq(a, b, [], []);
    };
    _.isEmpty = function (obj) {
      if (obj == null)
        return true;
      if (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))
        return obj.length === 0;
      for (var key in obj)
        if (_.has(obj, key))
          return false;
      return true;
    };
    _.isElement = function (obj) {
      return !!(obj && obj.nodeType === 1);
    };
    _.isArray = nativeIsArray || function (obj) {
      return toString.call(obj) == '[object Array]';
    };
    _.isObject = function (obj) {
      return obj === Object(obj);
    };
    _.each([
      'Arguments',
      'Function',
      'String',
      'Number',
      'Date',
      'RegExp'
    ], function (name) {
      _['is' + name] = function (obj) {
        return toString.call(obj) == '[object ' + name + ']';
      };
    });
    if (!_.isArguments(arguments)) {
      _.isArguments = function (obj) {
        return !!(obj && _.has(obj, 'callee'));
      };
    }
    if (typeof /./ !== 'function') {
      _.isFunction = function (obj) {
        return typeof obj === 'function';
      };
    }
    _.isFinite = function (obj) {
      return isFinite(obj) && !isNaN(parseFloat(obj));
    };
    _.isNaN = function (obj) {
      return _.isNumber(obj) && obj != +obj;
    };
    _.isBoolean = function (obj) {
      return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
    };
    _.isNull = function (obj) {
      return obj === null;
    };
    _.isUndefined = function (obj) {
      return obj === void 0;
    };
    _.has = function (obj, key) {
      return hasOwnProperty.call(obj, key);
    };
    _.noConflict = function () {
      root._ = previousUnderscore;
      return this;
    };
    _.identity = function (value) {
      return value;
    };
    _.constant = function (value) {
      return function () {
        return value;
      };
    };
    _.noop = function () {
    };
    _.property = function (key) {
      return function (obj) {
        return obj[key];
      };
    };
    _.matches = function (attrs) {
      return function (obj) {
        if (obj == null)
          return _.isEmpty(attrs);
        if (obj === attrs)
          return true;
        for (var key in attrs)
          if (attrs[key] !== obj[key])
            return false;
        return true;
      };
    };
    _.times = function (n, iterator, context) {
      var accum = Array(Math.max(0, n));
      for (var i = 0; i < n; i++)
        accum[i] = iterator.call(context, i);
      return accum;
    };
    _.random = function (min, max) {
      if (max == null) {
        max = min;
        min = 0;
      }
      return min + Math.floor(Math.random() * (max - min + 1));
    };
    _.now = Date.now || function () {
      return new Date().getTime();
    };
    var entityMap = {
        escape: {
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          '\'': '&#x27;'
        }
      };
    entityMap.unescape = _.invert(entityMap.escape);
    var entityRegexes = {
        escape: new RegExp('[' + _.keys(entityMap.escape).join('') + ']', 'g'),
        unescape: new RegExp('(' + _.keys(entityMap.unescape).join('|') + ')', 'g')
      };
    _.each([
      'escape',
      'unescape'
    ], function (method) {
      _[method] = function (string) {
        if (string == null)
          return '';
        return ('' + string).replace(entityRegexes[method], function (match) {
          return entityMap[method][match];
        });
      };
    });
    _.result = function (object, property) {
      if (object == null)
        return void 0;
      var value = object[property];
      return _.isFunction(value) ? object[property]() : value;
    };
    _.mixin = function (obj) {
      _.each(_.functions(obj), function (name) {
        var func = _[name] = obj[name];
        _.prototype[name] = function () {
          var args = [this._wrapped];
          push.apply(args, arguments);
          return result.call(this, func.apply(_, args));
        };
      });
    };
    var idCounter = 0;
    _.uniqueId = function (prefix) {
      var id = ++idCounter + '';
      return prefix ? prefix + id : id;
    };
    _.templateSettings = {
      evaluate: /<%([\s\S]+?)%>/g,
      interpolate: /<%=([\s\S]+?)%>/g,
      escape: /<%-([\s\S]+?)%>/g
    };
    var noMatch = /(.)^/;
    var escapes = {
        '\'': '\'',
        '\\': '\\',
        '\r': 'r',
        '\n': 'n',
        '\u2028': 'u2028',
        '\u2029': 'u2029'
      };
    var escaper = /\\|'|\r|\n|\u2028|\u2029/g;
    var escapeChar = function (match) {
      return '\\' + escapes[match];
    };
    _.template = function (text, data, settings) {
      settings = _.defaults({}, settings, _.templateSettings);
      var matcher = new RegExp([
          (settings.escape || noMatch).source,
          (settings.interpolate || noMatch).source,
          (settings.evaluate || noMatch).source
        ].join('|') + '|$', 'g');
      var index = 0;
      var source = '__p+=\'';
      text.replace(matcher, function (match, escape, interpolate, evaluate, offset) {
        source += text.slice(index, offset).replace(escaper, escapeChar);
        index = offset + match.length;
        if (escape) {
          source += '\'+\n((__t=(' + escape + '))==null?\'\':_.escape(__t))+\n\'';
        } else if (interpolate) {
          source += '\'+\n((__t=(' + interpolate + '))==null?\'\':__t)+\n\'';
        } else if (evaluate) {
          source += '\';\n' + evaluate + '\n__p+=\'';
        }
        return match;
      });
      source += '\';\n';
      if (!settings.variable)
        source = 'with(obj||{}){\n' + source + '}\n';
      source = 'var __t,__p=\'\',__j=Array.prototype.join,' + 'print=function(){__p+=__j.call(arguments,\'\');};\n' + source + 'return __p;\n';
      try {
        var render = new Function(settings.variable || 'obj', '_', source);
      } catch (e) {
        e.source = source;
        throw e;
      }
      if (data)
        return render(data, _);
      var template = function (data) {
        return render.call(this, data, _);
      };
      var argument = settings.variable || 'obj';
      template.source = 'function(' + argument + '){\n' + source + '}';
      return template;
    };
    _.chain = function (obj) {
      return _(obj).chain();
    };
    var result = function (obj) {
      return this._chain ? _(obj).chain() : obj;
    };
    _.mixin(_);
    _.each([
      'pop',
      'push',
      'reverse',
      'shift',
      'sort',
      'splice',
      'unshift'
    ], function (name) {
      var method = ArrayProto[name];
      _.prototype[name] = function () {
        var obj = this._wrapped;
        method.apply(obj, arguments);
        if ((name == 'shift' || name == 'splice') && obj.length === 0)
          delete obj[0];
        return result.call(this, obj);
      };
    });
    _.each([
      'concat',
      'join',
      'slice'
    ], function (name) {
      var method = ArrayProto[name];
      _.prototype[name] = function () {
        return result.call(this, method.apply(this._wrapped, arguments));
      };
    });
    _.extend(_.prototype, {
      chain: function () {
        this._chain = true;
        return this;
      },
      value: function () {
        return this._wrapped;
      }
    });
    if (typeof define === 'function' && define.amd) {
      underscore = function () {
        return _;
      }();
    }
  }.call(this));
  return exports;
}({});
backbone_112_backbone_debug = function (exports) {
  var root = this;
  var Backbone = exports;
  var _ = underscore_160_underscore_debug;
  var $ = window.$;
  var previousBackbone = root.Backbone;
  var array = [];
  var slice = array.slice;
  Backbone.VERSION = '1.1.2';
  Backbone.$ = $;
  Backbone.noConflict = function () {
    root.Backbone = previousBackbone;
    return this;
  };
  Backbone.emulateHTTP = false;
  Backbone.emulateJSON = false;
  var Events = Backbone.Events = {
      on: function (name, callback, context) {
        if (!eventsApi(this, 'on', name, [
            callback,
            context
          ]) || !callback)
          return this;
        this._events || (this._events = {});
        var events = this._events[name] || (this._events[name] = []);
        events.push({
          callback: callback,
          context: context,
          ctx: context || this
        });
        return this;
      },
      once: function (name, callback, context) {
        if (!eventsApi(this, 'once', name, [
            callback,
            context
          ]) || !callback)
          return this;
        var self = this;
        var once = _.once(function () {
            self.off(name, once);
            callback.apply(this, arguments);
          });
        once._callback = callback;
        return this.on(name, once, context);
      },
      off: function (name, callback, context) {
        if (!this._events || !eventsApi(this, 'off', name, [
            callback,
            context
          ]))
          return this;
        if (!name && !callback && !context) {
          this._events = void 0;
          return this;
        }
        var names = name ? [name] : _.keys(this._events);
        for (var i = 0, length = names.length; i < length; i++) {
          name = names[i];
          var events = this._events[name];
          if (!events)
            continue;
          if (!callback && !context) {
            delete this._events[name];
            continue;
          }
          var remaining = [];
          for (var j = 0, k = events.length; j < k; j++) {
            var event = events[j];
            if (callback && callback !== event.callback && callback !== event.callback._callback || context && context !== event.context) {
              remaining.push(event);
            }
          }
          if (remaining.length) {
            this._events[name] = remaining;
          } else {
            delete this._events[name];
          }
        }
        return this;
      },
      trigger: function (name) {
        if (!this._events)
          return this;
        var args = slice.call(arguments, 1);
        if (!eventsApi(this, 'trigger', name, args))
          return this;
        var events = this._events[name];
        var allEvents = this._events.all;
        if (events)
          triggerEvents(events, args);
        if (allEvents)
          triggerEvents(allEvents, arguments);
        return this;
      },
      stopListening: function (obj, name, callback) {
        var listeningTo = this._listeningTo;
        if (!listeningTo)
          return this;
        var remove = !name && !callback;
        if (!callback && typeof name === 'object')
          callback = this;
        if (obj)
          (listeningTo = {})[obj._listenId] = obj;
        for (var id in listeningTo) {
          obj = listeningTo[id];
          obj.off(name, callback, this);
          if (remove || _.isEmpty(obj._events))
            delete this._listeningTo[id];
        }
        return this;
      }
    };
  var eventSplitter = /\s+/;
  var eventsApi = function (obj, action, name, rest) {
    if (!name)
      return true;
    if (typeof name === 'object') {
      for (var key in name) {
        obj[action].apply(obj, [
          key,
          name[key]
        ].concat(rest));
      }
      return false;
    }
    if (eventSplitter.test(name)) {
      var names = name.split(eventSplitter);
      for (var i = 0, length = names.length; i < length; i++) {
        obj[action].apply(obj, [names[i]].concat(rest));
      }
      return false;
    }
    return true;
  };
  var triggerEvents = function (events, args) {
    var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
    switch (args.length) {
    case 0:
      while (++i < l)
        (ev = events[i]).callback.call(ev.ctx);
      return;
    case 1:
      while (++i < l)
        (ev = events[i]).callback.call(ev.ctx, a1);
      return;
    case 2:
      while (++i < l)
        (ev = events[i]).callback.call(ev.ctx, a1, a2);
      return;
    case 3:
      while (++i < l)
        (ev = events[i]).callback.call(ev.ctx, a1, a2, a3);
      return;
    default:
      while (++i < l)
        (ev = events[i]).callback.apply(ev.ctx, args);
      return;
    }
  };
  var listenMethods = {
      listenTo: 'on',
      listenToOnce: 'once'
    };
  _.each(listenMethods, function (implementation, method) {
    Events[method] = function (obj, name, callback) {
      var listeningTo = this._listeningTo || (this._listeningTo = {});
      var id = obj._listenId || (obj._listenId = _.uniqueId('l'));
      listeningTo[id] = obj;
      if (!callback && typeof name === 'object')
        callback = this;
      obj[implementation](name, callback, this);
      return this;
    };
  });
  Events.bind = Events.on;
  Events.unbind = Events.off;
  _.extend(Backbone, Events);
  var Model = Backbone.Model = function (attributes, options) {
      var attrs = attributes || {};
      options || (options = {});
      this.cid = _.uniqueId('c');
      this.attributes = {};
      if (options.collection)
        this.collection = options.collection;
      if (options.parse)
        attrs = this.parse(attrs, options) || {};
      attrs = _.defaults({}, attrs, _.result(this, 'defaults'));
      this.set(attrs, options);
      this.changed = {};
      this.initialize.apply(this, arguments);
    };
  _.extend(Model.prototype, Events, {
    changed: null,
    validationError: null,
    idAttribute: 'id',
    initialize: function () {
    },
    toJSON: function (options) {
      return _.clone(this.attributes);
    },
    sync: function () {
      return Backbone.sync.apply(this, arguments);
    },
    get: function (attr) {
      return this.attributes[attr];
    },
    escape: function (attr) {
      return _.escape(this.get(attr));
    },
    has: function (attr) {
      return this.get(attr) != null;
    },
    set: function (key, val, options) {
      var attr, attrs, unset, changes, silent, changing, prev, current;
      if (key == null)
        return this;
      if (typeof key === 'object') {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }
      options || (options = {});
      if (!this._validate(attrs, options))
        return false;
      unset = options.unset;
      silent = options.silent;
      changes = [];
      changing = this._changing;
      this._changing = true;
      if (!changing) {
        this._previousAttributes = _.clone(this.attributes);
        this.changed = {};
      }
      current = this.attributes, prev = this._previousAttributes;
      if (this.idAttribute in attrs)
        this.id = attrs[this.idAttribute];
      for (attr in attrs) {
        val = attrs[attr];
        if (!_.isEqual(current[attr], val))
          changes.push(attr);
        if (!_.isEqual(prev[attr], val)) {
          this.changed[attr] = val;
        } else {
          delete this.changed[attr];
        }
        unset ? delete current[attr] : current[attr] = val;
      }
      if (!silent) {
        if (changes.length)
          this._pending = options;
        for (var i = 0, length = changes.length; i < length; i++) {
          this.trigger('change:' + changes[i], this, current[changes[i]], options);
        }
      }
      if (changing)
        return this;
      if (!silent) {
        while (this._pending) {
          options = this._pending;
          this._pending = false;
          this.trigger('change', this, options);
        }
      }
      this._pending = false;
      this._changing = false;
      return this;
    },
    unset: function (attr, options) {
      return this.set(attr, void 0, _.extend({}, options, { unset: true }));
    },
    clear: function (options) {
      var attrs = {};
      for (var key in this.attributes)
        attrs[key] = void 0;
      return this.set(attrs, _.extend({}, options, { unset: true }));
    },
    hasChanged: function (attr) {
      if (attr == null)
        return !_.isEmpty(this.changed);
      return _.has(this.changed, attr);
    },
    changedAttributes: function (diff) {
      if (!diff)
        return this.hasChanged() ? _.clone(this.changed) : false;
      var val, changed = false;
      var old = this._changing ? this._previousAttributes : this.attributes;
      for (var attr in diff) {
        if (_.isEqual(old[attr], val = diff[attr]))
          continue;
        (changed || (changed = {}))[attr] = val;
      }
      return changed;
    },
    previous: function (attr) {
      if (attr == null || !this._previousAttributes)
        return null;
      return this._previousAttributes[attr];
    },
    previousAttributes: function () {
      return _.clone(this._previousAttributes);
    },
    fetch: function (options) {
      options = options ? _.clone(options) : {};
      if (options.parse === void 0)
        options.parse = true;
      var model = this;
      var success = options.success;
      options.success = function (resp) {
        if (!model.set(model.parse(resp, options), options))
          return false;
        if (success)
          success(model, resp, options);
        model.trigger('sync', model, resp, options);
      };
      wrapError(this, options);
      return this.sync('read', this, options);
    },
    save: function (key, val, options) {
      var attrs, method, xhr, attributes = this.attributes;
      if (key == null || typeof key === 'object') {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }
      options = _.extend({ validate: true }, options);
      if (attrs && !options.wait) {
        if (!this.set(attrs, options))
          return false;
      } else {
        if (!this._validate(attrs, options))
          return false;
      }
      if (attrs && options.wait) {
        this.attributes = _.extend({}, attributes, attrs);
      }
      if (options.parse === void 0)
        options.parse = true;
      var model = this;
      var success = options.success;
      options.success = function (resp) {
        model.attributes = attributes;
        var serverAttrs = model.parse(resp, options);
        if (options.wait)
          serverAttrs = _.extend(attrs || {}, serverAttrs);
        if (_.isObject(serverAttrs) && !model.set(serverAttrs, options)) {
          return false;
        }
        if (success)
          success(model, resp, options);
        model.trigger('sync', model, resp, options);
      };
      wrapError(this, options);
      method = this.isNew() ? 'create' : options.patch ? 'patch' : 'update';
      if (method === 'patch')
        options.attrs = attrs;
      xhr = this.sync(method, this, options);
      if (attrs && options.wait)
        this.attributes = attributes;
      return xhr;
    },
    destroy: function (options) {
      options = options ? _.clone(options) : {};
      var model = this;
      var success = options.success;
      var destroy = function () {
        model.trigger('destroy', model, model.collection, options);
      };
      options.success = function (resp) {
        if (options.wait || model.isNew())
          destroy();
        if (success)
          success(model, resp, options);
        if (!model.isNew())
          model.trigger('sync', model, resp, options);
      };
      if (this.isNew()) {
        options.success();
        return false;
      }
      wrapError(this, options);
      var xhr = this.sync('delete', this, options);
      if (!options.wait)
        destroy();
      return xhr;
    },
    url: function () {
      var base = _.result(this, 'urlRoot') || _.result(this.collection, 'url') || urlError();
      if (this.isNew())
        return base;
      return base.replace(/([^\/])$/, '$1/') + encodeURIComponent(this.id);
    },
    parse: function (resp, options) {
      return resp;
    },
    clone: function () {
      return new this.constructor(this.attributes);
    },
    isNew: function () {
      return !this.has(this.idAttribute);
    },
    isValid: function (options) {
      return this._validate({}, _.extend(options || {}, { validate: true }));
    },
    _validate: function (attrs, options) {
      if (!options.validate || !this.validate)
        return true;
      attrs = _.extend({}, this.attributes, attrs);
      var error = this.validationError = this.validate(attrs, options) || null;
      if (!error)
        return true;
      this.trigger('invalid', this, error, _.extend(options, { validationError: error }));
      return false;
    }
  });
  var modelMethods = [
      'keys',
      'values',
      'pairs',
      'invert',
      'pick',
      'omit'
    ];
  _.each(modelMethods, function (method) {
    if (!_[method])
      return;
    Model.prototype[method] = function () {
      var args = slice.call(arguments);
      args.unshift(this.attributes);
      return _[method].apply(_, args);
    };
  });
  var Collection = Backbone.Collection = function (models, options) {
      options || (options = {});
      if (options.model)
        this.model = options.model;
      if (options.comparator !== void 0)
        this.comparator = options.comparator;
      this._reset();
      this.initialize.apply(this, arguments);
      if (models)
        this.reset(models, _.extend({ silent: true }, options));
    };
  var setOptions = {
      add: true,
      remove: true,
      merge: true
    };
  var addOptions = {
      add: true,
      remove: false
    };
  _.extend(Collection.prototype, Events, {
    model: Model,
    initialize: function () {
    },
    toJSON: function (options) {
      return this.map(function (model) {
        return model.toJSON(options);
      });
    },
    sync: function () {
      return Backbone.sync.apply(this, arguments);
    },
    add: function (models, options) {
      return this.set(models, _.extend({ merge: false }, options, addOptions));
    },
    remove: function (models, options) {
      var singular = !_.isArray(models);
      models = singular ? [models] : _.clone(models);
      options || (options = {});
      for (var i = 0, length = models.length; i < length; i++) {
        var model = models[i] = this.get(models[i]);
        if (!model)
          continue;
        delete this._byId[model.id];
        delete this._byId[model.cid];
        var index = this.indexOf(model);
        this.models.splice(index, 1);
        this.length--;
        if (!options.silent) {
          options.index = index;
          model.trigger('remove', model, this, options);
        }
        this._removeReference(model, options);
      }
      return singular ? models[0] : models;
    },
    set: function (models, options) {
      options = _.defaults({}, options, setOptions);
      if (options.parse)
        models = this.parse(models, options);
      var singular = !_.isArray(models);
      models = singular ? models ? [models] : [] : models.slice();
      var id, model, attrs, existing, sort;
      var at = options.at;
      var sortable = this.comparator && at == null && options.sort !== false;
      var sortAttr = _.isString(this.comparator) ? this.comparator : null;
      var toAdd = [], toRemove = [], modelMap = {};
      var add = options.add, merge = options.merge, remove = options.remove;
      var order = !sortable && add && remove ? [] : false;
      for (var i = 0, length = models.length; i < length; i++) {
        attrs = models[i] || {};
        if (this._isModel(attrs)) {
          id = model = attrs;
        } else {
          id = attrs[this.model.prototype.idAttribute || 'id'];
        }
        if (existing = this.get(id)) {
          if (remove)
            modelMap[existing.cid] = true;
          if (merge) {
            attrs = attrs === model ? model.attributes : attrs;
            if (options.parse)
              attrs = existing.parse(attrs, options);
            existing.set(attrs, options);
            if (sortable && !sort && existing.hasChanged(sortAttr))
              sort = true;
          }
          models[i] = existing;
        } else if (add) {
          model = models[i] = this._prepareModel(attrs, options);
          if (!model)
            continue;
          toAdd.push(model);
          this._addReference(model, options);
        }
        model = existing || model;
        if (!model)
          continue;
        if (order && (model.isNew() || !modelMap[model.id]))
          order.push(model);
        modelMap[model.id] = true;
      }
      if (remove) {
        for (var i = 0, length = this.length; i < length; i++) {
          if (!modelMap[(model = this.models[i]).cid])
            toRemove.push(model);
        }
        if (toRemove.length)
          this.remove(toRemove, options);
      }
      if (toAdd.length || order && order.length) {
        if (sortable)
          sort = true;
        this.length += toAdd.length;
        if (at != null) {
          for (var i = 0, length = toAdd.length; i < length; i++) {
            this.models.splice(at + i, 0, toAdd[i]);
          }
        } else {
          if (order)
            this.models.length = 0;
          var orderedModels = order || toAdd;
          for (var i = 0, length = orderedModels.length; i < length; i++) {
            this.models.push(orderedModels[i]);
          }
        }
      }
      if (sort)
        this.sort({ silent: true });
      if (!options.silent) {
        for (var i = 0, length = toAdd.length; i < length; i++) {
          (model = toAdd[i]).trigger('add', model, this, options);
        }
        if (sort || order && order.length)
          this.trigger('sort', this, options);
      }
      return singular ? models[0] : models;
    },
    reset: function (models, options) {
      options || (options = {});
      for (var i = 0, length = this.models.length; i < length; i++) {
        this._removeReference(this.models[i], options);
      }
      options.previousModels = this.models;
      this._reset();
      models = this.add(models, _.extend({ silent: true }, options));
      if (!options.silent)
        this.trigger('reset', this, options);
      return models;
    },
    push: function (model, options) {
      return this.add(model, _.extend({ at: this.length }, options));
    },
    pop: function (options) {
      var model = this.at(this.length - 1);
      this.remove(model, options);
      return model;
    },
    unshift: function (model, options) {
      return this.add(model, _.extend({ at: 0 }, options));
    },
    shift: function (options) {
      var model = this.at(0);
      this.remove(model, options);
      return model;
    },
    slice: function () {
      return slice.apply(this.models, arguments);
    },
    get: function (obj) {
      if (obj == null)
        return void 0;
      return this._byId[obj] || this._byId[obj.id] || this._byId[obj.cid];
    },
    at: function (index) {
      return this.models[index];
    },
    where: function (attrs, first) {
      if (_.isEmpty(attrs))
        return first ? void 0 : [];
      return this[first ? 'find' : 'filter'](function (model) {
        for (var key in attrs) {
          if (attrs[key] !== model.get(key))
            return false;
        }
        return true;
      });
    },
    findWhere: function (attrs) {
      return this.where(attrs, true);
    },
    sort: function (options) {
      if (!this.comparator)
        throw new Error('Cannot sort a set without a comparator');
      options || (options = {});
      if (_.isString(this.comparator) || this.comparator.length === 1) {
        this.models = this.sortBy(this.comparator, this);
      } else {
        this.models.sort(_.bind(this.comparator, this));
      }
      if (!options.silent)
        this.trigger('sort', this, options);
      return this;
    },
    pluck: function (attr) {
      return _.invoke(this.models, 'get', attr);
    },
    fetch: function (options) {
      options = options ? _.clone(options) : {};
      if (options.parse === void 0)
        options.parse = true;
      var success = options.success;
      var collection = this;
      options.success = function (resp) {
        var method = options.reset ? 'reset' : 'set';
        collection[method](resp, options);
        if (success)
          success(collection, resp, options);
        collection.trigger('sync', collection, resp, options);
      };
      wrapError(this, options);
      return this.sync('read', this, options);
    },
    create: function (model, options) {
      options = options ? _.clone(options) : {};
      if (!(model = this._prepareModel(model, options)))
        return false;
      if (!options.wait)
        this.add(model, options);
      var collection = this;
      var success = options.success;
      options.success = function (model, resp) {
        if (options.wait)
          collection.add(model, options);
        if (success)
          success(model, resp, options);
      };
      model.save(null, options);
      return model;
    },
    parse: function (resp, options) {
      return resp;
    },
    clone: function () {
      return new this.constructor(this.models, {
        model: this.model,
        comparator: this.comparator
      });
    },
    _reset: function () {
      this.length = 0;
      this.models = [];
      this._byId = {};
    },
    _prepareModel: function (attrs, options) {
      if (this._isModel(attrs)) {
        if (!attrs.collection)
          attrs.collection = this;
        return attrs;
      }
      options = options ? _.clone(options) : {};
      options.collection = this;
      var model = new this.model(attrs, options);
      if (!model.validationError)
        return model;
      this.trigger('invalid', this, model.validationError, options);
      return false;
    },
    _isModel: function (model) {
      return model instanceof Model;
    },
    _addReference: function (model, options) {
      this._byId[model.cid] = model;
      if (model.id != null)
        this._byId[model.id] = model;
      model.on('all', this._onModelEvent, this);
    },
    _removeReference: function (model, options) {
      if (this === model.collection)
        delete model.collection;
      model.off('all', this._onModelEvent, this);
    },
    _onModelEvent: function (event, model, collection, options) {
      if ((event === 'add' || event === 'remove') && collection !== this)
        return;
      if (event === 'destroy')
        this.remove(model, options);
      if (model && event === 'change:' + model.idAttribute) {
        delete this._byId[model.previous(model.idAttribute)];
        if (model.id != null)
          this._byId[model.id] = model;
      }
      this.trigger.apply(this, arguments);
    }
  });
  var methods = [
      'forEach',
      'each',
      'map',
      'collect',
      'reduce',
      'foldl',
      'inject',
      'reduceRight',
      'foldr',
      'find',
      'detect',
      'filter',
      'select',
      'reject',
      'every',
      'all',
      'some',
      'any',
      'include',
      'contains',
      'invoke',
      'max',
      'min',
      'toArray',
      'size',
      'first',
      'head',
      'take',
      'initial',
      'rest',
      'tail',
      'drop',
      'last',
      'without',
      'difference',
      'indexOf',
      'shuffle',
      'lastIndexOf',
      'isEmpty',
      'chain',
      'sample',
      'partition'
    ];
  _.each(methods, function (method) {
    if (!_[method])
      return;
    Collection.prototype[method] = function () {
      var args = slice.call(arguments);
      args.unshift(this.models);
      return _[method].apply(_, args);
    };
  });
  var attributeMethods = [
      'groupBy',
      'countBy',
      'sortBy',
      'indexBy'
    ];
  _.each(attributeMethods, function (method) {
    if (!_[method])
      return;
    Collection.prototype[method] = function (value, context) {
      var iterator = _.isFunction(value) ? value : function (model) {
          return model.get(value);
        };
      return _[method](this.models, iterator, context);
    };
  });
  var View = Backbone.View = function (options) {
      this.cid = _.uniqueId('view');
      options || (options = {});
      _.extend(this, _.pick(options, viewOptions));
      this._ensureElement();
      this.initialize.apply(this, arguments);
    };
  var delegateEventSplitter = /^(\S+)\s*(.*)$/;
  var viewOptions = [
      'model',
      'collection',
      'el',
      'id',
      'attributes',
      'className',
      'tagName',
      'events'
    ];
  _.extend(View.prototype, Events, {
    tagName: 'div',
    $: function (selector) {
      return this.$el.find(selector);
    },
    initialize: function () {
    },
    render: function () {
      return this;
    },
    remove: function () {
      this._removeElement();
      this.stopListening();
      return this;
    },
    _removeElement: function () {
      this.$el.remove();
    },
    setElement: function (element) {
      this.undelegateEvents();
      this._setElement(element);
      this.delegateEvents();
      return this;
    },
    _setElement: function (el) {
      this.$el = el instanceof Backbone.$ ? el : Backbone.$(el);
      this.el = this.$el[0];
    },
    delegateEvents: function (events) {
      if (!(events || (events = _.result(this, 'events'))))
        return this;
      this.undelegateEvents();
      for (var key in events) {
        var method = events[key];
        if (!_.isFunction(method))
          method = this[events[key]];
        if (!method)
          continue;
        var match = key.match(delegateEventSplitter);
        this.delegate(match[1], match[2], _.bind(method, this));
      }
      return this;
    },
    delegate: function (eventName, selector, listener) {
      this.$el.on(eventName + '.delegateEvents' + this.cid, selector, listener);
    },
    undelegateEvents: function () {
      if (this.$el)
        this.$el.off('.delegateEvents' + this.cid);
      return this;
    },
    undelegate: function (eventName, selector, listener) {
      this.$el.off(eventName + '.delegateEvents' + this.cid, selector, listener);
    },
    _createElement: function (tagName) {
      return document.createElement(tagName);
    },
    _ensureElement: function () {
      if (!this.el) {
        var attrs = _.extend({}, _.result(this, 'attributes'));
        if (this.id)
          attrs.id = _.result(this, 'id');
        if (this.className)
          attrs['class'] = _.result(this, 'className');
        this.setElement(this._createElement(_.result(this, 'tagName')));
        this._setAttributes(attrs);
      } else {
        this.setElement(_.result(this, 'el'));
      }
    },
    _setAttributes: function (attributes) {
      this.$el.attr(attributes);
    }
  });
  Backbone.sync = function (method, model, options) {
    var type = methodMap[method];
    _.defaults(options || (options = {}), {
      emulateHTTP: Backbone.emulateHTTP,
      emulateJSON: Backbone.emulateJSON
    });
    var params = {
        type: type,
        dataType: 'json'
      };
    if (!options.url) {
      params.url = _.result(model, 'url') || urlError();
    }
    if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
      params.contentType = 'application/json';
      params.data = JSON.stringify(options.attrs || model.toJSON(options));
    }
    if (options.emulateJSON) {
      params.contentType = 'application/x-www-form-urlencoded';
      params.data = params.data ? { model: params.data } : {};
    }
    if (options.emulateHTTP && (type === 'PUT' || type === 'DELETE' || type === 'PATCH')) {
      params.type = 'POST';
      if (options.emulateJSON)
        params.data._method = type;
      var beforeSend = options.beforeSend;
      options.beforeSend = function (xhr) {
        xhr.setRequestHeader('X-HTTP-Method-Override', type);
        if (beforeSend)
          return beforeSend.apply(this, arguments);
      };
    }
    if (params.type !== 'GET' && !options.emulateJSON) {
      params.processData = false;
    }
    if (params.type === 'PATCH' && noXhrPatch) {
      params.xhr = function () {
        return new ActiveXObject('Microsoft.XMLHTTP');
      };
    }
    var error = options.error;
    options.error = function (xhr, textStatus, errorThrown) {
      options.textStatus = textStatus;
      options.errorThrown = errorThrown;
      if (error)
        error.apply(this, arguments);
    };
    var xhr = options.xhr = Backbone.ajax(_.extend(params, options));
    model.trigger('request', model, xhr, options);
    return xhr;
  };
  var noXhrPatch = typeof window !== 'undefined' && !!window.ActiveXObject && !(window.XMLHttpRequest && new XMLHttpRequest().dispatchEvent);
  var methodMap = {
      'create': 'POST',
      'update': 'PUT',
      'patch': 'PATCH',
      'delete': 'DELETE',
      'read': 'GET'
    };
  Backbone.ajax = function () {
    return Backbone.$.ajax.apply(Backbone.$, arguments);
  };
  var Router = Backbone.Router = function (options) {
      options || (options = {});
      if (options.routes)
        this.routes = options.routes;
      this._bindRoutes();
      this.initialize.apply(this, arguments);
    };
  var optionalParam = /\((.*?)\)/g;
  var namedParam = /(\(\?)?:\w+/g;
  var splatParam = /\*\w+/g;
  var escapeRegExp = /[\-{}\[\]+?.,\\\^$|#\s]/g;
  _.extend(Router.prototype, Events, {
    initialize: function () {
    },
    route: function (route, name, callback) {
      if (!_.isRegExp(route))
        route = this._routeToRegExp(route);
      if (_.isFunction(name)) {
        callback = name;
        name = '';
      }
      if (!callback)
        callback = this[name];
      var router = this;
      Backbone.history.route(route, function (fragment) {
        var args = router._extractParameters(route, fragment);
        if (router.execute(callback, args, name) !== false) {
          router.trigger.apply(router, ['route:' + name].concat(args));
          router.trigger('route', name, args);
          Backbone.history.trigger('route', router, name, args);
        }
      });
      return this;
    },
    execute: function (callback, args, name) {
      if (callback)
        callback.apply(this, args);
    },
    navigate: function (fragment, options) {
      Backbone.history.navigate(fragment, options);
      return this;
    },
    _bindRoutes: function () {
      if (!this.routes)
        return;
      this.routes = _.result(this, 'routes');
      var route, routes = _.keys(this.routes);
      while ((route = routes.pop()) != null) {
        this.route(route, this.routes[route]);
      }
    },
    _routeToRegExp: function (route) {
      route = route.replace(escapeRegExp, '\\$&').replace(optionalParam, '(?:$1)?').replace(namedParam, function (match, optional) {
        return optional ? match : '([^/?]+)';
      }).replace(splatParam, '([^?]*?)');
      return new RegExp('^' + route + '(?:\\?([\\s\\S]*))?$');
    },
    _extractParameters: function (route, fragment) {
      var params = route.exec(fragment).slice(1);
      return _.map(params, function (param, i) {
        if (i === params.length - 1)
          return param || null;
        return param ? decodeURIComponent(param) : null;
      });
    }
  });
  var History = Backbone.History = function () {
      this.handlers = [];
      _.bindAll(this, 'checkUrl');
      if (typeof window !== 'undefined') {
        this.location = window.location;
        this.history = window.history;
      }
    };
  var routeStripper = /^[#\/]|\s+$/g;
  var rootStripper = /^\/+|\/+$/g;
  var pathStripper = /#.*$/;
  History.started = false;
  _.extend(History.prototype, Events, {
    interval: 50,
    atRoot: function () {
      var path = this.location.pathname.replace(/[^\/]$/, '$&/');
      return path === this.root && !this.location.search;
    },
    getHash: function (window) {
      var match = (window || this).location.href.match(/#(.*)$/);
      return match ? match[1] : '';
    },
    getPath: function () {
      var path = decodeURI(this.location.pathname + this.location.search);
      var root = this.root.slice(0, -1);
      if (!path.indexOf(root))
        path = path.slice(root.length);
      return path.slice(1);
    },
    getFragment: function (fragment) {
      if (fragment == null) {
        if (this._hasPushState || !this._wantsHashChange) {
          fragment = this.getPath();
        } else {
          fragment = this.getHash();
        }
      }
      return fragment.replace(routeStripper, '');
    },
    start: function (options) {
      if (History.started)
        throw new Error('Backbone.history has already been started');
      History.started = true;
      this.options = _.extend({ root: '/' }, this.options, options);
      this.root = this.options.root;
      this._wantsHashChange = this.options.hashChange !== false;
      this._hasHashChange = 'onhashchange' in window;
      this._wantsPushState = !!this.options.pushState;
      this._hasPushState = !!(this.options.pushState && this.history && this.history.pushState);
      this.fragment = this.getFragment();
      var addEventListener = window.addEventListener || function (eventName, listener) {
          return attachEvent('on' + eventName, listener);
        };
      this.root = ('/' + this.root + '/').replace(rootStripper, '/');
      if (!this._hasHashChange && this._wantsHashChange && (!this._wantsPushState || !this._hasPushState)) {
        var iframe = document.createElement('iframe');
        iframe.src = 'javascript:0';
        iframe.style.display = 'none';
        iframe.tabIndex = -1;
        var body = document.body;
        this.iframe = body.insertBefore(iframe, body.firstChild).contentWindow;
        this.navigate(this.fragment);
      }
      if (this._hasPushState) {
        addEventListener('popstate', this.checkUrl, false);
      } else if (this._wantsHashChange && this._hasHashChange && !this.iframe) {
        addEventListener('hashchange', this.checkUrl, false);
      } else if (this._wantsHashChange) {
        this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
      }
      if (this._wantsHashChange && this._wantsPushState) {
        if (!this._hasPushState && !this.atRoot()) {
          this.location.replace(this.root + '#' + this.getPath());
          return true;
        } else if (this._hasPushState && this.atRoot()) {
          this.navigate(this.getHash(), { replace: true });
        }
      }
      if (!this.options.silent)
        return this.loadUrl();
    },
    stop: function () {
      var removeEventListener = window.removeEventListener || function (eventName, listener) {
          return detachEvent('on' + eventName, listener);
        };
      if (this._hasPushState) {
        removeEventListener('popstate', this.checkUrl, false);
      } else if (this._wantsHashChange && this._hasHashChange && !this.iframe) {
        removeEventListener('hashchange', this.checkUrl, false);
      }
      if (this.iframe) {
        document.body.removeChild(this.iframe.frameElement);
        this.iframe = null;
      }
      if (this._checkUrlInterval)
        clearInterval(this._checkUrlInterval);
      History.started = false;
    },
    route: function (route, callback) {
      this.handlers.unshift({
        route: route,
        callback: callback
      });
    },
    checkUrl: function (e) {
      var current = this.getFragment();
      if (current === this.fragment && this.iframe) {
        current = this.getHash(this.iframe);
      }
      if (current === this.fragment)
        return false;
      if (this.iframe)
        this.navigate(current);
      this.loadUrl();
    },
    loadUrl: function (fragment) {
      fragment = this.fragment = this.getFragment(fragment);
      return _.any(this.handlers, function (handler) {
        if (handler.route.test(fragment)) {
          handler.callback(fragment);
          return true;
        }
      });
    },
    navigate: function (fragment, options) {
      if (!History.started)
        return false;
      if (!options || options === true)
        options = { trigger: !!options };
      var url = this.root + (fragment = this.getFragment(fragment || ''));
      fragment = decodeURI(fragment.replace(pathStripper, ''));
      if (this.fragment === fragment)
        return;
      this.fragment = fragment;
      if (fragment === '' && url !== '/')
        url = url.slice(0, -1);
      if (this._hasPushState) {
        this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);
      } else if (this._wantsHashChange) {
        this._updateHash(this.location, fragment, options.replace);
        if (this.iframe && fragment !== this.getHash(this.iframe)) {
          if (!options.replace)
            this.iframe.document.open().close();
          this._updateHash(this.iframe.location, fragment, options.replace);
        }
      } else {
        return this.location.assign(url);
      }
      if (options.trigger)
        return this.loadUrl(fragment);
    },
    _updateHash: function (location, fragment, replace) {
      if (replace) {
        var href = location.href.replace(/(javascript:|#).*$/, '');
        location.replace(href + '#' + fragment);
      } else {
        location.hash = '#' + fragment;
      }
    }
  });
  Backbone.history = new History();
  var extend = function (protoProps, staticProps) {
    var parent = this;
    var child;
    if (protoProps && _.has(protoProps, 'constructor')) {
      child = protoProps.constructor;
    } else {
      child = function () {
        return parent.apply(this, arguments);
      };
    }
    _.extend(child, parent, staticProps);
    var Surrogate = function () {
      this.constructor = child;
    };
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate();
    if (protoProps)
      _.extend(child.prototype, protoProps);
    child.__super__ = parent.prototype;
    return child;
  };
  Model.extend = Collection.extend = Router.extend = View.extend = History.extend = extend;
  var urlError = function () {
    throw new Error('A "url" property or function must be specified');
  };
  var wrapError = function (model, options) {
    var error = options.error;
    options.error = function (resp) {
      if (error)
        error(model, resp, options);
      model.trigger('error', model, resp, options);
    };
  };
  return exports;
}({});
music_app_100_src_util_debug = function (exports) {
  var util;
  util = {
    browser: function (ua) {
      var device = '', version = '', android, ipad, iphone;
      (android = ua.match(/(Android)\s+([\d.]+)/)) && (device = 'android') && (version = android[2]) || (ipad = ua.match(/(iPad).*OS\s([\d_]+)/)) && (device = 'ipad') && (version = ipad[2].replace(/_/g, '.')) || (iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/)) && (device = 'iphone') && (version = iphone[2].replace(/_/g, '.'));
      return {
        device: device,
        version: version.split('.'),
        mainVer: version.replace(/^(\d\.\d).*$/, '$1')
      };
    }(navigator.userAgent),
    log: function (value) {
      var ele = document.getElementById('test_log_element');
      if (ele != null) {
        ele.innerHTML += '<br />' + value;
      } else {
        var span = document.createElement('span');
        span.id = 'test_log_element';
        span.innerHTML = value;
        span.style.cssText = 'position:fixed;left:0;top:0;background:rgba(0,0,0,.5);color:#fff;padding:5px';
        document.body.appendChild(span);
      }
    },
    toDecimal: function (x) {
      var f = parseFloat(x);
      if (isNaN(f))
        return;
      f = Math.round(x * 100) / 100;
      return f;
    }
  };
  exports = util;
  return exports;
}();
music_app_100_src_model_model_debug = function () {
  var $ = window.$;
  var _ = underscore_160_underscore_debug;
  var Backbone = backbone_112_backbone_debug;
  var Music = Backbone.Model.extend({
      defaults: {
        id: '1',
        name: 'k\u6B4C\u4E4B\u738B',
        src: '555',
        singer: 'eason',
        lrc: ''
      },
      fetch: function (id) {
        var self = this;
        var tmpContact;
        $.ajax({
          url: 'data/' + id + '.json',
          type: 'GET',
          dataType: 'json',
          error: function () {
            alert('error');
          },
          success: function (data) {
            self.set({
              id: data.id,
              name: data.name,
              src: data.src,
              singer: data.singer,
              lrc: data.lrc
            });
            self.trigger('fetchCompleted:oneMusic');
          },
          complete: function () {
          }
        });
      }
    });
  return Music;
}();
music_app_100_src_views_home_home_debug = function () {
  var $ = window.$;
  var _ = underscore_160_underscore_debug;
  var Backbone = backbone_112_backbone_debug;
  var homeViewTemplate = '<!--ptpl-text!./homeView.html--><div class="home"><p>\u8FD9\u662F\u4E2A\u97F3\u4E50\u7684web app \uFF0C\u4F7F\u7528 backbone \u6784\u9020\uFF0C\u4F7F\u7528seajs\u7BA1\u7406\u4F9D\u8D56\u3002</p><p><a href="#list">\u97F3\u4E50\u5217\u8868 &gt;</a></p><p><a href="#other">\u5176\u4ED6 &gt;</a></p></div>';
  function createElement(str) {
    var div = document.createElement('div');
    div.innerHTML = str;
    var container = document.createDocumentFragment();
    for (var i = 0; i < div.childNodes.length; i++) {
      var node = div.childNodes[i].cloneNode(true);
      container.appendChild(node);
    }
    return container.childNodes;
  }
  var mainHomeView = Backbone.View.extend({
      el: '.bd',
      render: function () {
        this.html = homeViewTemplate;
        this.domref = createElement(homeViewTemplate);
        return this;
      }
    });
  return mainHomeView;
}();
music_app_100_src_views_list_list_debug = function () {
  var $ = window.$;
  var _ = underscore_160_underscore_debug;
  var Backbone = backbone_112_backbone_debug;
  var listViewTemplate = '<!--ptpl-text!./listView.html--><div class="lists"><ul><% for (var i = 0; i < data.length; i++) { %><% var item = data[i]; %><li><a href="#detail/<%=item.name%>/<%= item.id%>"><%= item.name %></a></li><% } %></ul><p><a href="#other1">\u5176\u4ED6\u89C6\u56FE1 &gt;</a></p></div>';
  var listView = Backbone.View.extend({
      template: _.template(listViewTemplate),
      initialize: function () {
        this.collection.bind('fetchCompleted:allMusics', this.render, this);
      },
      el: '.bd',
      render: function () {
        console.log(this.template);
        this.html = this.template({ data: this.collection.toJSON() });
        this.trigger('renderCompleted:list', this, 'this is list view');
        return this;
      }
    });
  return listView;
}();
music_app_100_src_views_detail_detail_debug = function () {
  var $ = window.$;
  var _ = underscore_160_underscore_debug;
  var Backbone = backbone_112_backbone_debug;
  var util = music_app_100_src_util_debug;
  var detailViewTemplate = '<!--ptpl-text!./detailView.html--><div class="player"><div class="info"><span class="name"><%= name %></span><span class="singer">--<%= singer %></span><span class="lrc-btn">\u6B4C\u8BCD</span><audio class="none" src="<%= src %>"></audio></div><div class="ctrl"><span class="c-btn play"></span><span class="proBar"><b></b></span><span class="time"></span></div><div class="lrc none"><div class="lrc-text"><%= lrc %></div></div></div>';
  var detailView = Backbone.View.extend({
      template: _.template(detailViewTemplate),
      initialize: function () {
        this.model.bind('fetchCompleted:oneMusic', this.render, this);
      },
      el: '.bd',
      render: function () {
        var playerEle = $('.player-box');
        playerEle.removeClass('none');
        playerEle.html(this.template(this.model.toJSON()));
        this.music_player();
        return this;
      },
      music_player: function () {
        var that = this;
        var $contain = $('.player');
        that.audioEle = $contain.find('audio');
        that.ctrlBtn = $contain.find('.c-btn');
        that.proBar = $contain.find('.proBar');
        that.timeEle = $contain.find('.time');
        var ctrlBar = that.ctrlBar = that.proBar.find('b');
        var proBarW = that.proBarW = that.proBar.width() - 2;
        var time = function (s) {
          var min, sec, om = parseInt(s / 60), rs = Math.round(s % 60);
          min = om < 10 ? '0' + om : om;
          sec = rs < 10 ? '0' + rs : rs;
          return {
            'show': min + ':' + sec,
            'ts': parseInt(Math.round(s))
          };
        };
        var timer;
        var play = function () {
          that.audioEle[0].play();
          timer = setInterval(function () {
            timeEle(parseInt(that.timeEle.attr('time')) - 1);
          }, 1000);
          that.ctrlBtn.removeClass('play').addClass('pause');
          if (that.lrcTxt.hasClass('haveloaded'))
            change(that.lrcObj);
        };
        var pause = function () {
          that.audioEle[0].pause();
          clearInterval(timer);
          that.ctrlBtn.removeClass('pause').addClass('play');
        };
        var timeEle = function (t) {
          var tobj = time(t);
          that.timeEle.text(tobj.show);
          that.timeEle.attr('time', tobj.ts);
          if (tobj.ts <= 0)
            clearInterval(timer);
        };
        this.audioEle.on('durationchange', function (e) {
          that.dtime = that.audioEle.attr('duration');
          if (!isNaN(that.dtime)) {
            timeEle(that.dtime);
          }
        });
        this.audioEle.on('canplay', function (e) {
          that.ctrlBtn.on('click', function (e) {
            if (that.ctrlBtn.hasClass('play')) {
              play();
            } else {
              pause();
            }
          }).trigger('click');
        });
        this.audioEle.on('ended', function (e) {
          that.ctrlBtn.removeClass('pause').addClass('play');
          that.timeEle.attr('time', Math.round(that.dtime));
          clearInterval(timer);
        });
        this.audioEle.on('timeupdate', function (e) {
          var curTime = that.audioEle.attr('currentTime');
          ctrlBar.css({ 'left': parseInt(proBarW * curTime / that.dtime) });
        });
        this.proBar.on('click', function (e) {
          var pos = e.offsetX * that.dtime / proBarW;
          that.audioEle[0].currentTime = pos;
          timeEle(that.dtime - pos);
          clearInterval(timer);
          play();
          ctrlBar.css({ 'left': e.offsetX });
          if (that.lrcTxt.hasClass('haveloaded'))
            change(that.lrcObj);
        });
        this.lrcEle = $contain.find('.lrc');
        this.lrcBtn = $contain.find('.lrc-btn');
        this.lrcTxt = $contain.find('.lrc-text');
        var step;
        this.lrcBtn.on('click', function (e) {
          that.lrcEle.toggle();
          !that.lrcTxt.hasClass('haveloaded') && $.ajax({
            url: that.lrcTxt.text(),
            type: 'GET',
            dataType: 'text',
            error: function () {
              alert('\u627E\u4E0D\u5230\u6B4C\u8BCD');
            },
            success: function (json) {
              that.lrcTxt.addClass('haveloaded');
              var obj = that.lrcObj = parse(json);
              that.lrcTxt.html(obj.htmArr.join(''));
              step = parseInt(that.lrcTxt.find('p').height());
              change(obj, true);
            }
          });
        });
        var index;
        var change = function (lrcObj, first) {
          var obj = lrcObj;
          var curTime = parseFloat(that.audioEle.attr('currentTime'));
          var len = obj.timeArr.length;
          if (!isNaN(curTime)) {
            if (curTime >= obj.timeArr[len - 1]) {
              that.lrcTxt.css({ 'top': -(len - 1) * step });
              that.lrcTxt.find('p').removeClass('cur');
              that.lrcTxt.find('p').eq(len).addClass('cur');
              return;
            }
            for (var i = 0; i < len - 1; i++) {
              if (curTime >= obj.timeArr[i] && curTime < obj.timeArr[i + 1]) {
                that.lrcTxt.css({ 'top': -(i - 1) * step });
                that.lrcTxt.find('p').removeClass('cur');
                that.lrcTxt.find('p').eq(i).addClass('cur');
                index = i;
              }
            }
          }
          var handler = function (e) {
            var curTime = that.audioEle.attr('currentTime');
            if (index < len) {
              if (curTime >= obj.timeArr[len - 1]) {
                that.lrcTxt.css({ 'top': -(len - 1) * step });
                that.lrcTxt.find('p').removeClass('cur');
                that.lrcTxt.find('p').eq(len).addClass('cur');
                return;
              }
              if (curTime > obj.timeArr[index] && curTime < obj.timeArr[index + 1]) {
                that.lrcTxt.css({ 'top': -(index - 1) * step });
                that.lrcTxt.find('p').removeClass('cur');
                that.lrcTxt.find('p').eq(index).addClass('cur');
                index += 1;
              }
            }
          };
          first && that.audioEle.on('timeupdate', handler);
        };
        var parse = function (str) {
          var timeArr = [], htmArr = [], preArr = [], items = [], tArr = [];
          str = str.replace(/\n/g, '');
          preArr = str.split('[');
          for (var i = 0; i < preArr.length; i++) {
            items = preArr[i].split(']');
            if (items.length == 2) {
              tArr = items[0].split(':');
              if (tArr.length == 2) {
                var t = 60 * parseInt(tArr[0]) + parseFloat(tArr[1]);
                timeArr.push(t);
              }
              htmArr.push('<p>' + items[1] + '</p>');
            }
          }
          return {
            'timeArr': timeArr,
            'htmArr': htmArr
          };
        };
      }
    });
  return detailView;
}();
music_app_100_src_views_other_other_debug = function () {
  var $ = window.$;
  var _ = underscore_160_underscore_debug;
  var Backbone = backbone_112_backbone_debug;
  var otherViewTemplate = '<!--ptpl-text!./otherView.html--><div class="home"><p>\u5176\u4ED6\u89C6\u56FE\u3002\u3002\u3002</p><p><a href="#list">\u97F3\u4E50\u5217\u8868 &gt;</a></p></div>';
  var otherView = Backbone.View.extend({
      el: '.bd',
      render: function () {
        this.html = otherViewTemplate;
        return this;
      }
    });
  return otherView;
}();
music_app_100_src_views_other_other1_debug = function () {
  var $ = window.$;
  var _ = underscore_160_underscore_debug;
  var Backbone = backbone_112_backbone_debug;
  var otherViewTemplate = '<!--ptpl-text!./otherView1.html--><div class="home"><p>\u5176\u4ED6\u89C6\u56FE1111111111\u3002\u3002\u3002</p></div>';
  var otherView1 = Backbone.View.extend({
      el: '.bd',
      render: function () {
        this.html = otherViewTemplate;
        return this;
      }
    });
  return otherView1;
}();
music_app_100_src_model_collection_debug = function () {
  var $ = window.$;
  var _ = underscore_160_underscore_debug;
  var Backbone = backbone_112_backbone_debug;
  var Music = music_app_100_src_model_model_debug;
  var List = Backbone.Collection.extend({
      model: Music,
      fetch: function () {
        var self = this;
        var tmpContact;
        $.ajax({
          url: 'data/list.json',
          type: 'GET',
          dataType: 'json',
          error: function () {
            alert('error');
          },
          success: function (data) {
            $.each(data, function (i, item) {
              tmpContact = new Music({
                id: item.id,
                name: item.name
              });
              self.add(tmpContact);
            });
            self.trigger('fetchCompleted:allMusics');
          }
        });
      }
    });
  return List;
}();
music_app_100_src_router_debug = function (exports) {
  var $ = window.$;
  var _ = underscore_160_underscore_debug;
  var Backbone = backbone_112_backbone_debug;
  var util = music_app_100_src_util_debug;
  var Collection = music_app_100_src_model_collection_debug;
  var Model = music_app_100_src_model_model_debug;
  var HomeView = music_app_100_src_views_home_home_debug;
  var ListView = music_app_100_src_views_list_list_debug;
  var DetailView = music_app_100_src_views_detail_detail_debug;
  var OtherView = music_app_100_src_views_other_other_debug;
  var OtherView1 = music_app_100_src_views_other_other1_debug;
  var Router = Backbone.Router.extend({
      routes: {
        '': 'showHome',
        'home': 'showHome',
        'list': 'showList',
        'detail/:name/:id': 'showDetail',
        'other': 'showOther',
        'other1': 'showOther1',
        '*actions': 'defaultAction'
      },
      defaultAction: function () {
      },
      showOther: function () {
        var otherView = new OtherView();
        otherView.render();
        this.triggerChangeView(otherView, 'this is other view');
      },
      showOther1: function () {
        var otherView1 = new OtherView1();
        otherView1.render();
        this.triggerChangeView(otherView1, 'this is other1 view');
      },
      showHome: function (actions) {
        var homeView = new HomeView();
        homeView.render();
        this.triggerChangeView(homeView, 'this is home view');
      },
      showList: function () {
        var musicList = new Collection();
        var listView = new ListView({ collection: musicList });
        listView.bind('renderCompleted:list', this.triggerChangeView, this);
        musicList.fetch();
      },
      showDetail: function (name, id) {
        var model = new Model();
        var detailView = new DetailView({ model: model });
        model.fetch(id);
      },
      viewCollect: [],
      showEle: [],
      viewNum: 0,
      curEle: '',
      initialize: function () {
        var that = this, bd = $('.bd');
        bd.on('webkitTransitionEnd', function () {
          bd.attr('style', '');
          var childs = bd.children();
          childs.each(function (i) {
            var self = $(childs[i]), num = self.attr('viewNum');
            self.addClass('none');
            if (num == that.curEle.attr('viewNum')) {
              self.removeClass('none');
            }
          });
        });
      },
      changeView: function (view) {
        var that = this, $el = $(view.el), childs = $el.children(), len = childs.length;
        var transform = function () {
          if (that.showEle.length < 2)
            return;
          if (parseInt(that.showEle[0]) > parseInt(that.showEle[1])) {
            $el.css({
              'width': '200%',
              '-webkit-transform': 'translateX(-50%)'
            });
            setTimeout(function () {
              $el.css({
                '-webkit-transition': '-webkit-transform .5s ease-out',
                '-webkit-transform': 'translateX(0px)'
              });
            }, 10);
          } else {
            $el.css({
              'width': '200%',
              '-webkit-transition': '-webkit-transform .5s ease-out',
              '-webkit-transform': 'translateX(0px)'
            });
            setTimeout(function () {
              $el.css({ '-webkit-transform': 'translateX(-50%)' });
            }, 10);
          }
        };
        if (this.showEle.length > 2) {
          this.showEle.shift();
          childs.each(function (i) {
            var self = $(childs[i]), num = self.attr('viewNum');
            if (num == that.showEle[0] || num == that.showEle[1]) {
              self.removeClass('none');
            }
          });
        }
        transform();
      },
      triggerChangeView: function (view, demoparm) {
        var $el = $(view.el), childs = $el.children(), arr = this.viewCollect, len = arr.length;
        var vnum = this.viewNum + '';
        for (var i = 0; i < len; i++) {
          if (view.html == arr[i]) {
            this.curEle = childs.eq(i);
            vnum = this.curEle.attr('viewNum');
            this.showEle.push(vnum);
            this.changeView(view);
            return;
          }
        }
        var n = $(view.html).attr('viewNum', vnum), html = $('<div></div>').html(n).html();
        arr.push(view.html);
        $el.append(html);
        this.curEle = $(html);
        console.log(this.curEle.attr('viewNum'));
        this.showEle.push(vnum);
        this.changeView(view);
        this.viewNum++;
      }
    });
  exports = Router;
  return exports;
}();
music_app_100_src_app_debug = function () {
  var $ = window.$;
  var _ = underscore_160_underscore_debug;
  var Backbone = backbone_112_backbone_debug;
  var Router = music_app_100_src_router_debug;
  function app() {
    var router = new Router();
    Backbone.history.start();
  }
  app();
}();
}());