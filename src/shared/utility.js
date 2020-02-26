export const checkValidity = (id, value, validation) => {
  let errorsMessage = null;
  if (!validation) {
    return errorsMessage;
  }

  if (validation.isRequired && value.trim() === "") {
    errorsMessage = `${id} field is require`;
  }

  if (validation.minLength && value.length < validation.minLength) {
    errorsMessage = `${id} Required min ${validation.minLength}`;
  }
  if (validation.maxLength && value.length > validation.maxLength) {
    errorsMessage = `${id} Required max length ${validation.maxLength}`;
  }
  if (validation.isString && typeof value !== "string") {
    errorsMessage = `${id} is Not a Text`;
  }
  return errorsMessage;
};
export const formatDateForQuery = date => {
  const testDate = new Date(date);
  return (
    testDate.getFullYear() +
    "-" +
    (testDate.getMonth() + 1) +
    "-" +
    testDate.getDate()
  );
};
