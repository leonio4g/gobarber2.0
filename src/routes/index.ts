import { Router } from "express";
import appointmetsRouter from './appointments.routes';
import usersRouter from './users.routes';

const routes = Router();

routes.use('/appointments', appointmetsRouter);
routes.use('/users', usersRouter)

export default routes;


