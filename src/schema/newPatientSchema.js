import Joi from 'joi';

const newPatientSchema = {
  name: Joi.string().min(2).required(),
  email: Joi.string().email({ tlds: { allow: ['com', 'net', 'br'] } }).required(),
  birthdate: Joi.string().length(10).regex(/^([1-9]|0[1-9]|[12][0-9]|3[0-1])\/([1-9]|0[1-9]|1[0-2])\/\d{4}$/).required(),
  address: Joi.string().min(2).required(),
};

export default newPatientSchema;
