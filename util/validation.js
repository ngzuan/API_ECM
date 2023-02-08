const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,12})(\.[a-z]{2})?$/);
};
const validateLength = (text, max, min) => {
  if (text.length > max || text.length < min) {
    return false;
  } else {
    return true;
  }
};

module.exports = { validateEmail, validateLength };
