"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateCustomer = exports.incrementOwnCourse = exports.getCustomer = exports.getAllCustomers = exports.deleteCustomer = exports.createCustomer = exports.countCustomers = exports.confirmEmail = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _customer = _interopRequireDefault(require("../models/customer"));

var _user2 = _interopRequireDefault(require("../models/user"));

var _email = _interopRequireDefault(require("../helpers/email"));

var createCustomer = function createCustomer(req, res) {
  var _req$body = req.body,
      firstName = _req$body.firstName,
      lastName = _req$body.lastName,
      email = _req$body.email,
      password = _req$body.password,
      address = _req$body.address,
      phone = _req$body.phone;
  var UserData = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    address: address,
    phone: phone,
    password: password,
    role: "CUSTOMER"
  };
  var user = new _user2["default"](UserData);
  user.save(function (err, User) {
    if (err) {
      // logger.error(err);
      return res.status(400).send(err);
    }

    var CostumerData = {
      user: user._id,
      _id: user._id
    };
    var costumer = new _customer["default"](CostumerData);
    costumer.save( /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(err) {
        var _user, id, subj, msg;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!err) {
                  _context.next = 6;
                  break;
                }

                _context.next = 3;
                return User.findById({
                  _id: _user._id
                });

              case 3:
                _user = _context.sent;

                _user.remove(); // logger.error(err);


                return _context.abrupt("return", res.status(400).send(err));

              case 6:
                //Email Verification
                id = user._id.id;
                subj = "Information";
                msg = "confirm_email : http://localhost:3030/api/customer/confirmEmail/".concat(id);

                _email["default"].mail(email, subj, msg);

                user.hashed_password = undefined;
                user.salt = undefined; // logger.info(`Costumer user:${req.body.username} created!`);

                return _context.abrupt("return", res.json({
                  user: user,
                  costumer: costumer
                }));

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
  });
}; //delete customer


exports.createCustomer = createCustomer;

var deleteCustomer = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var id, customer, user;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            id = req.params.id;
            _context2.next = 4;
            return _customer["default"].findById({
              _id: id
            });

          case 4:
            customer = _context2.sent;
            _context2.next = 7;
            return _user2["default"].findById({
              _id: id
            });

          case 7:
            user = _context2.sent;
            customer.remove();
            user.remove();
            return _context2.abrupt("return", res.json({
              message: "Customer deleted successfully!"
            }));

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](0);
            res.status(400).json({
              status: false,
              message: "Customer not found"
            });

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 13]]);
  }));

  return function deleteCustomer(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}(); // update user


exports.deleteCustomer = deleteCustomer;

var updateCustomer = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var id, customer;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            id = req.params.id;
            _context3.next = 4;
            return _user2["default"].findOneAndUpdate({
              _id: id
            }, req.body, {
              "new": true
            });

          case 4:
            customer = _context3.sent;
            return _context3.abrupt("return", res.status(400).json({
              message: "Customer updated successfully!",
              customer: customer
            }));

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](0);
            res.status(400).json({
              status: false,
              message: "Customer not found"
            });

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 8]]);
  }));

  return function updateCustomer(_x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();

exports.updateCustomer = updateCustomer;

var confirmEmail = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var id;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            id = req.params.id;
            _context4.next = 4;
            return _customer["default"].findOneAndUpdate({
              id: id
            }, {
              "isVerified": true
            });

          case 4:
            res.status(200).json({
              status: true,
              message: "Your Account is now Verified"
            });
            _context4.next = 10;
            break;

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);
            res.status(400).json({
              status: false,
              message: _context4.t0.message
            });

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 7]]);
  }));

  return function confirmEmail(_x6, _x7) {
    return _ref4.apply(this, arguments);
  };
}(); //get all customers


exports.confirmEmail = confirmEmail;

var getAllCustomers = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var customers;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return _customer["default"].find({}).populate('user');

          case 3:
            customers = _context5.sent;
            return _context5.abrupt("return", res.json({
              customers: customers
            }));

          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5["catch"](0);
            res.status(400).json({
              status: false,
              message: _context5.t0.message
            });

          case 10:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 7]]);
  }));

  return function getAllCustomers(_x8, _x9) {
    return _ref5.apply(this, arguments);
  };
}(); //get customer


exports.getAllCustomers = getAllCustomers;

var getCustomer = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var id, customer;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            id = req.params.id;
            _context6.next = 4;
            return _customer["default"].find({
              _id: id
            }).populate('user');

          case 4:
            customer = _context6.sent;
            return _context6.abrupt("return", res.json({
              customer: customer
            }));

          case 8:
            _context6.prev = 8;
            _context6.t0 = _context6["catch"](0);
            res.status(400).json({
              status: false,
              message: _context6.t0.message
            });

          case 11:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 8]]);
  }));

  return function getCustomer(_x10, _x11) {
    return _ref6.apply(this, arguments);
  };
}(); //increment owncourse by 1


exports.getCustomer = getCustomer;

var incrementOwnCourse = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var id, customer;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            id = req.params.id;
            _context7.next = 4;
            return _customer["default"].findById({
              _id: id
            });

          case 4:
            customer = _context7.sent;
            customer.owncourse++;
            _context7.next = 8;
            return customer.save();

          case 8:
            return _context7.abrupt("return", res.json({
              customer: customer
            }));

          case 11:
            _context7.prev = 11;
            _context7.t0 = _context7["catch"](0);
            res.status(400).json({
              status: false,
              message: _context7.t0.message
            });

          case 14:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 11]]);
  }));

  return function incrementOwnCourse(_x12, _x13) {
    return _ref7.apply(this, arguments);
  };
}(); //count customers


exports.incrementOwnCourse = incrementOwnCourse;

var countCustomers = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var count;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _context8.next = 3;
            return _customer["default"].countDocuments();

          case 3:
            count = _context8.sent;
            return _context8.abrupt("return", res.json({
              count: count
            }));

          case 7:
            _context8.prev = 7;
            _context8.t0 = _context8["catch"](0);
            res.status(400).json({
              status: false,
              message: _context8.t0.message
            });

          case 10:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 7]]);
  }));

  return function countCustomers(_x14, _x15) {
    return _ref8.apply(this, arguments);
  };
}();

exports.countCustomers = countCustomers;