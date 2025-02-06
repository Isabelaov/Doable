import * as Yup from 'yup';
import { Frequencies } from '../../../core/enums/frequency.enum';

const habitValidationSchema = Yup.object().shape({
  name: Yup.string().min(3).required('Name is required'),
  description: Yup.string().optional(),
  frequency: Yup.mixed<Frequencies>()
    .oneOf(Object.values(Frequencies))
    .required(),
  reminderTime: Yup.string()
    .matches(
      /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/,
      'Invalid time format (HH:MM AM/PM)',
    )
    .required(),
});

export default habitValidationSchema;
