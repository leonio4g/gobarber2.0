import { Router } from 'express';
import { getCustomRepository } from  'typeorm';
import AppointmetsRepository from '../repositories/AppointmetsRepository';
import {parseISO} from 'date-fns';
import CreateApointmentServices from '../services/CreateAppointmentServices';

const appointmentsRouter = Router();

appointmentsRouter.get('/', async (request, response) => {
  const appointmentRepository = getCustomRepository(AppointmetsRepository);
  const appointments = await appointmentRepository.find();

  return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
  try{
    const { provider, date } = request.body;

  const parsedDate = parseISO(date);

  const createAppointment = new CreateApointmentServices();

  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider,
  });

  return response.json(appointment);
  }catch (err){
    return response.status(400).json({ error : err.message });
  }
});

export default appointmentsRouter;
