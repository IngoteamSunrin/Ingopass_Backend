export const discrimMajor = (num: number) => {
  if (num >= 1 && num <= 3) {
    return 'IS'; // InfoSec
  } else if (num >= 4 && num <= 6) {
    return 'SW'; // Software
  } else if (num >= 7 && num <= 9) {
    return 'IB'; // ITBusiness
  } else if (num >= 10 && num <= 12) {
    return 'CD'; // ContentsDesign
  }
};
