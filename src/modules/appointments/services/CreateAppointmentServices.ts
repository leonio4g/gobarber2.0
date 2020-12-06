import Appointment from '@modules/appointments/infra/typeorm/entities/Appointmet';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../repositories/AppointmetsRepository';
import { startOfHour } from 'date-fns';
import AppError from '@shared/errors/AppError';

interface Request {
  provider_id : string;
  date : Date;
}

export default class CreateAppointmentServices {


  public async execute({provider_id, date}: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointmentDate = startOfHour(date);

  const findAppointment = await appointmentsRepository.findByDate(appointmentDate);

    if(findAppointment){
      throw new AppError('this appointments is already booked');
    }

  const appointment = appointmentsRepository.create({
    provider_id,
    date : appointmentDate,
  });
  await appointmentsRepository.save(appointment);

    return appointment;
  }
}

