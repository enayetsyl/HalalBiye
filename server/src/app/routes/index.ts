import { Router } from 'express';
import { UserRoutes } from '../module/User/user.route';
import { RequestRoutes } from '../module/Request/request.route';


const router = Router();

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

moduleRoutes.forEach((route) => router.use(route.path, route.route));  

export default router;