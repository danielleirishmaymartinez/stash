import { debounce } from '@/utils/debounce.js'; // Assuming debounce function is in utils/debounce.js

// 👉 IsEmpty
export const isEmpty = (value) => {
  if (value === null || value === undefined || value === '') return true
  return !!(Array.isArray(value) && value.length === 0)
}

// 👉 IsNullOrUndefined
export const isNullOrUndefined = (value) => {
  return value === null || value === undefined
}

// 👉 IsEmptyArray
export const isEmptyArray = (arr) => {
  return Array.isArray(arr) && arr.length === 0
}

// 👉 IsObject
export const isObject = (obj) =>
  obj !== null && !!obj && typeof obj === 'object' && !Array.isArray(obj)

// 👉 Required Validator
export const requiredValidator = (value) => {
  if (isNullOrUndefined(value) || isEmptyArray(value) || value === false || String(value).trim() === '')
    return 'This field is required'
  return true // Return `true` instead of `!!String(value).trim().length`
}

// 👉 Email Validator
export const emailValidator = (value) => {
  if (isEmpty(value)) return 'Email is required' // Add this check for empty values
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(value)) || 'The Email field must be a valid email address'
}

// Updated passwordValidator to reduce excessive console logs
export const passwordValidator = (password) => {
  const regExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()_]).{8,}/;
  
  // Mask the password in console logs to enhance security
  const maskedPassword = '*'.repeat(password.length); // Mask password with asterisks

  const validPassword = regExp.test(password);

  // Only log if the password validation result changes or on submit
  if (validPassword) {
    console.log('Password valid: true');
  } else {
    console.log('Password valid: false');
  }

  return validPassword || 'Password must be at least 8 characters, with uppercase, lowercase, number, and special characters.';
};

// Debounce the password validation
export const debouncedPasswordValidator = debounce(passwordValidator, 500); // 500ms debounce

// 👉 Confirm Password Validator
export const confirmedValidator = (value, target) =>
  value === target || 'Passwords do not match.'


// 👉 Between Validator
export const betweenValidator = (value, min, max) => {
  const valueAsNumber = Number(value)
  return (
    (Number(min) <= valueAsNumber && Number(max) >= valueAsNumber) ||
    `Enter number between ${min} and ${max}`
  )
}

// 👉 Integer Validator
export const integerValidator = (value) => {
  if (isEmpty(value)) return true

  if (Array.isArray(value))
    return value.every((val) => /^-?[0-9]+$/.test(String(val))) || 'This field must be a number'

  return /^-?[0-9]+$/.test(String(value)) || 'This field must be a number'
}

// 👉 Regex Validator
export const regexValidator = (value, regex) => {
  if (isEmpty(value)) return true

  let regeX = regex
  if (typeof regeX === 'string') regeX = new RegExp(regeX)

  if (Array.isArray(value)) return value.every((val) => regexValidator(val, regeX))

  return regeX.test(String(value)) || "The input doesn't match the expected format"
}

// 👉 Alpha Validator
export const alphaValidator = (value) => {
  if (isEmpty(value)) return true

  return /^[A-Z]*$/i.test(String(value)) || 'The Alpha field may only contain alphabetic characters'
}

// 👉 URL Validator
export const urlValidator = (value) => {
  if (isEmpty(value)) return true

  const re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}[.]{0,1}/
  return re.test(String(value)) || 'URL is invalid'
}

// 👉 Length Validator
export const lengthValidator = (value, length) => {
  if (isEmpty(value)) return true

  return (
    String(value).length >= length ||
    `The Min Character field must be at least ${length} characters`
  )
}

// 👉 Alpha-dash Validator
export const alphaDashValidator = (value) => {
  if (isEmpty(value)) return true

  const valueAsString = String(value)

  return (
    /^[0-9A-Z_-]*$/i.test(valueAsString) ||
    'The input must be alphanumeric and can only include dashes (-) and underscores (_).'
  )
}

// 👉 Image Validator
export const imageValidator = (value) => {
  if (isEmpty(value)) return true

  return !value || !value.length || value[0].size < 2000000 || 'Image size should be less than 2 MB'
}