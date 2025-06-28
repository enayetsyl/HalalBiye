"use strict";
/**
 * @module routes/index
 * @description
 * Central application router that mounts all module-specific sub-routers.
 * Iterates over the moduleRoutes array and registers each under its configured path.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../module/User/user.route");
const request_route_1 = require("../module/Request/request.route");
const router = (0, express_1.Router)();
/**
 * Array of modules to be mounted on the main router.
 * @type {Array<{ path: string, route: import('express').Router }>}
 * @property {string} path - Base URL path for the module
 * @property {import('express').Router} route - Express Router instance for that module
 */
const moduleRoutes = [
    {
        path: '/users',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/requests',
        route: request_route_1.RequestRoutes,
    },
];
/**
 * Mount each module's router under its specified path.
 * @example
 * // mounts UserRoutes at /users
 * router.use('/users', UserRoutes);
 * // mounts RequestRoutes at /requests
 * router.use('/requests', RequestRoutes);
 */
moduleRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
exports.default = router;
