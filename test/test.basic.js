var lib = require('allex').lib,
  DeferMapEmptyResolvable,
  theMap,
  emptyPromise,
  promises = [],
  promisesToMake = 5;

describe('Basic Test', function () {
  it ('Load Lib', function () {
    DeferMapEmptyResolvable = require('..')(lib.Map, lib.q, lib.inherit);
  });
  it ('Create a DeferMapEmptyResolvable instance', function () {
    theMap = new DeferMapEmptyResolvable();
  });
  it ('Get an empty promise', function () {
    emptyPromise = theMap.whenEmpty();
  });
  it ('Get some promises', function () {
    var i, defername;
    for (i=0; i<promisesToMake; i++) {
      defername = ''+i;
      theMap.promise(defername);
      promises.push(defername);
    }
  });
  it ('Resolve the promises and wait', function () {
    while (promises.length > 0) {
      theMap.resolve(promises.shift());
    }
    return emptyPromise;
  });
  it ('Get some promises again', function () {
    var i, defername;
    for (i=0; i<promisesToMake; i++) {
      defername = ''+i;
      theMap.promise(defername);
      promises.push(defername);
    }
  });
  it ('Reject the promises and wait', function () {
    while (promises.length > 0) {
      theMap.reject(promises.shift());
    }
    return emptyPromise;
  });
  it ('Get some promises again', function () {
    var i, defername;
    for (i=0; i<promisesToMake; i++) {
      defername = ''+i;
      theMap.promise(defername);
      promises.push(defername);
    }
  });
  it ('Resolve the promises but reject the last one and wait', function () {
    while (promises.length > 1) {
      theMap.resolve(promises.shift());
    }
    theMap.reject(promises.shift());
    return emptyPromise;
  });
});
