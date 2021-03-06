import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface RequestDTO {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentRepository;
  }

  public execute({ provider, date }: RequestDTO): Appointment {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSame = this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSame) {
      throw Error('This appoitment is already booked');
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
