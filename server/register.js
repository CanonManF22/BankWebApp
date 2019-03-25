const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegisterInput(data) {
  const errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.username = !isEmpty(data.username) ? data.username : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.passwordConfirm = !isEmpty(data.passwordConfirm)
    ? data.passwordConfirm
    : '';
  data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
  data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
  // username checks
  if (Validator.isEmpty(data.username)) {
    errors.username = 'username field is required';
  }
  // First Name check
  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = 'firstName field is required';
  }
  // Last Name check
  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = 'lastName field is required';
  }
  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  } else if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }
  if (Validator.isEmpty(data.passwordConfirm)) {
    errors.passwordConfirm = 'Confirm password field is required';
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters';
  }
  if (!Validator.equals(data.password, data.passwordConfirm)) {
    errors.password2 = 'Passwords must match';
  }
  console.log(errors);
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
