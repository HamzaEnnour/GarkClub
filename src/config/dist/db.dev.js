"use strict";

/* eslint-disable no-console */
var mongoose = require('mongoose');

var config = require('.');

var connectDb = function connectDb() {
  var options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true
  };
  mongoose.connect("mongodb://localhost:27017/server_club", options).then(function () {
    return console.log("(DataBase) : Connected to ...");
  })["catch"](function (error) {
    console.log(error);
    console.log('DataBase Connection Error: ', error.message);
    process.exit(1);
  });
  return mongoose.connection;
};

var clearDb = function clearDb() {
  var collections, key, collection;
  return regeneratorRuntime.async(function clearDb$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          collections = mongoose.connection.collections;
          _context.t0 = regeneratorRuntime.keys(collections);

        case 2:
          if ((_context.t1 = _context.t0()).done) {
            _context.next = 9;
            break;
          }

          key = _context.t1.value;
          collection = collections[key];
          _context.next = 7;
          return regeneratorRuntime.awrap(collection.deleteMany());

        case 7:
          _context.next = 2;
          break;

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
};

var closeDb = function closeDb() {
  return regeneratorRuntime.async(function closeDb$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(mongoose.connection.close());

        case 2:
          return _context2.abrupt("return", _context2.sent);

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.connectDb = connectDb;
exports.clearDb = clearDb;
exports.closeDb = closeDb;