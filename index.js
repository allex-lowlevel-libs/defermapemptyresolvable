function createlib (Map, q, inherit) {
  'use strict';
  var DeferMap = require('allex_defermaplowlevellib')(Map, q);

  function DeferMapEmptyResolvable () {
    this._emptyDefer = null;
    DeferMap.call(this);
  }
  inherit(DeferMapEmptyResolvable, DeferMap);
  DeferMapEmptyResolvable.prototype.destroy = function () {
    DeferMap.destroy.call(this);
    if (this._emptyDefer) {
      this._emptyDefer.resolve(true);
    }
    this._emptyDefer = null;
  };
  DeferMapEmptyResolvable.prototype.resolve = function (name, result) {
    var ret = DeferMap.prototype.resolve.call(this, name, result);
    this.maybeResolveEmptyDefer();
    return ret;
  };
  DeferMapEmptyResolvable.prototype.reject = function (name, reason) {
    var ret = DeferMap.prototype.reject.call(this, name, reason);
    this.maybeResolveEmptyDefer();
    return ret;
  };
  DeferMapEmptyResolvable.prototype.whenEmpty = function () {
    var ret;
    if (!this._emptyDefer) {
      this._emptyDefer = q.defer();
    }
    ret = this._emptyDefer.promise;
    this.maybeResolveEmptyDefer();
    return ret;
  };
  DeferMapEmptyResolvable.prototype.maybeResolveEmptyDefer = function () {
    var ed;
    if (this._emptyDefer && this._map.count < 1) {
      ed = this._emptyDefer;
      this._emptyDefer =null;
      ed.resolve(true);
    }
  };

  return DeferMapEmptyResolvable;
}

module.exports = createlib;
