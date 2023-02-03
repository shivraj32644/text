export const formatIfNumberIsNotValid = (number?: number | null | string) => {
  let refNumber;
  switch (number) {
    case 0:
    case '0%':
    case 'NaN':
    case undefined:
    case null:
      refNumber = 0;
      break;
  }
  return refNumber;
};
