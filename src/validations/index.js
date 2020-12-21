import { extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';

// TODO(19/12/2020): Implementar dicionário para as palavras do _field_
extend('required', {
  ...required,
  message: '{_field_} é um campo obrigatório.',
});

extend('lengthBetween', {
  validate: (value, { min, max }) => value.length >= min && value.length <= max,
  params: ['min', 'max'],
  message: '{_field_} precisa ter entre {min} e {max} caracteres.',
});

extend('lengthMax', {
  validate: (value, { max }) => value.length <= max,
  params: ['max'],
  message: '{_field_} precisa ter no máximo {max} caracteres.',
});
