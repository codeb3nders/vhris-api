export const timeFormatChecker = (timeInput: string) => {
  const regex = new RegExp('^(1[0-2]|0?[1-9]):[0-5][0-9] (AM|PM)$');
  const check = regex.test(timeInput.toLocaleUpperCase().trim());
  return check;
};
