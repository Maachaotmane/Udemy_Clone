"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = void 0;

var _express = _interopRequireDefault(require("express"));

var _controllers = require("../controllers");

var router = _express["default"].Router();

exports.router = router;
// import {
//     CreatUserValidator,
//     Auth
// } from "../middlewares"
router.get("/confirmEmail/:id", _controllers.confirmEmail);
router.get("/getAllCustomers", _controllers.getAllCustomers);
router.get("/countCustomers", _controllers.countCustomers);
router.get("/getCustomer/:id", _controllers.getCustomer);
router.post("/createCustomer", _controllers.createCustomer);
router.post("/createOrder", _controllers.createOrder);
router["delete"]("/deleteCustomer/:id", _controllers.deleteCustomer);
router.patch("/updateCustomer/:id", _controllers.updateCustomer);
router.patch("/incrementOwnCourse/:id", _controllers.incrementOwnCourse);