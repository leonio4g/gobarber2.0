import { Router } from 'express';
import { getCustomRepository } from  'typeorm';
import AppointmetsRepository from '@modules/appointments/repositories/AppointmetsRepository';
import {parseISO} from 'date-fns';
import CreateApointmentServices from '@modules/appointments/services/CreateAppointmentServices';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (request, response) => {
  const appointmentRepository = getCustomRepository(AppointmetsRepository);
  const appointments = await appointmentRepository.find();

  return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {

    const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  const createAppointment = new CreateApointmentServices();

  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id,
  });

  return response.json(appointment);

});

export default appointmentsRouter;
