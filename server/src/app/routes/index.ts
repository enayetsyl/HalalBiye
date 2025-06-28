/**
 * @module routes/index
 * @description
 * Central application router that mounts all module-specific sub-routers.
 * Iterates over the moduleRoutes array and registers each under its configured path.
 */

import { Router } from 'express';
import { UserRoutes } from '../module/User/user.route';
import { RequestRoutes } from '../module/Request/request.route';

const router = Router();

/**
 * Array of modules to be mounted on the main router.
 * @type {Array<{ path: string, route: import('express').Router }>}
 * @property {string} path - Base URL path for the module
 * @property {import('express').Router} route - Express Router instance for that module
 */
const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/requests',
    route: RequestRoutes,
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

export default router;
