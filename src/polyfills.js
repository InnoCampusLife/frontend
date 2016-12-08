'use strict'

if (!String.prototype.includes) {
	String.prototype.includes = () => {
		return String.prototype.indexOf.apply(this, arguments) !== -1;
	}
}

if (!Array.prototype.includes) {
	Array.prototype.includes = (searchElement /*, fromIndex*/) => {
		if (this == null) {
			throw new TypeError('Array.prototype.includes called on null or undefined');
		}
		var O = Object(this);
		var len = parseInt(O.length, 10) || 0;
		if (len === 0) {
			return false;
		}
		var n = parseInt(arguments[1], 10) || 0;
		var k;
		if (n >= 0) {
			k = n;
		} else {
			k = len + n;
			if (k < 0) {k = 0;}
		}
		var currentElement;
		while (k < len) {
			currentElement = O[k];
			if (searchElement === currentElement ||
		     (searchElement !== searchElement && currentElement !== currentElement)) { // NaN !== NaN
				return true;
			}
			k++;
		}
		return false;
	};
}

if (!Object.prototype.equals)
Object.defineProperty(Object.prototype, "equals", {
    enumerable: false,
    value: function (obj) {
        var p;
        if (this === obj) {
            return true;
        }

        // some checks for native types first

        // function and sring
        if (typeof(this) === "function" || typeof(this) === "string" || this instanceof String) { 
            return this.toString() === obj.toString();
        }

        // number
        if (this instanceof Number || typeof(this) === "number") {
            if (obj instanceof Number || typeof(obj) === "number") {
                return this.valueOf() === obj.valueOf();
            }
            return false;
        }

        // null.equals(null) and undefined.equals(undefined) do not inherit from the 
        // Object.prototype so we can return false when they are passed as obj
        if (typeof(this) !== typeof(obj) || obj === null || typeof(obj) === "undefined") {
            return false;
        }

        function sort (o) {
            var result = {};

            if (typeof o !== "object") {
                return o;
            }

            Object.keys(o).sort().forEach(function (key) {
                result[key] = sort(o[key]);
            });

            return result;
        }

        if (typeof(this) === "object") {
            if (Array.isArray(this)) { // check on arrays
                return JSON.stringify(this) === JSON.stringify(obj);                
            } else { // anyway objects
                for (p in this) {
                    if (typeof(this[p]) !== typeof(obj[p])) {
                        return false;
                    }
                    if ((this[p] === null) !== (obj[p] === null)) {
                        return false;
                    }
                    switch (typeof(this[p])) {
                    case 'undefined':
                        if (typeof(obj[p]) !== 'undefined') {
                            return false;
                        }
                        break;
                    case 'object':
                        if (this[p] !== null 
                                && obj[p] !== null 
                                && (this[p].constructor.toString() !== obj[p].constructor.toString() 
                                        || !this[p].equals(obj[p]))) {
                            return false;
                        }
                        break;
                    case 'function':
                        if (this[p].toString() !== obj[p].toString()) {
                            return false;
                        }
                        break;
                    default:
                        if (this[p] !== obj[p]) {
                            return false;
                        }
                    }
                };

            }
        }

        // at least check them with JSON
        return JSON.stringify(sort(this)) === JSON.stringify(sort(obj));
    }
});
