import Appointment from '../models/Appointmet';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../repositories/AppointmetsRepository';
import { startOfHour } from 'date-fns';

interface Request {
  provider : string;
  date : Date;
}

export default class CreateAppointmentServices {


  public async execute({provider, date}: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointmentDate = startOfHour(date);

  const findAppointment = await appointmentsRepository.findByDate(appointmentDate);

    if(findAppointment){
      throw Error('this appointments is already booked');
    }

  const appointment = appointmentsRepository.create({
    provider,
    date : appointmentDate,
  });
  await appointmentsRepository.save(appointment);

    return appointment;
  }
}

