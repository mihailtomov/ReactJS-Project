const validateEmail = require('validator/lib/isEmail');
const validateLength = require('validator/lib/isLength');
const validateEmpty = require('validator/lib/isEmpty');
const isURL = require('validator/lib/isURL');

function isAlphanumeric(value) {
    return /^[a-zA-Z0-9]+$/.test(value);
}

function isEmail(value) {
    return validateEmail(value);
}

function isLength(value, minLength, maxLength = undefined) {
    return validateLength(value, { min: minLength, max: maxLength });
}

function isNumberLength(number, min, max) {
    return number >= min && number <= max;
}

function isEmpty(value) {
    return validateEmpty(value, { ignore_whitespace: true });
}

function isValidProtocol(value) {
    return isURL(value, { protocols: ['http', 'https'], require_protocol: true });
}

module.exports = {
    isAlphanumeric,
    isEmail,
    isLength,
    isEmpty,
    isValidProtocol,
    isNumberLength,
}