"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roles = void 0;
var __1 = require("..");
var roles = function (roles) { return function (req, res, next) {
    var authorized = false;
    roles.forEach(function (role) {
        if (!authorized) {
            authorized = req.currentUser.role === role;
        }
    });
    if (!authorized) {
        throw new __1.NotAuthorizedError();
    }
    next();
}; };
exports.roles = roles;
