/**
 * Slices a string to a specified maximum length if the string's length exceeds a given threshold.
 *
 * @param {string} txt - The text to be sliced.
 * @param {number} maxLength - The maximum length to slice the text to.
 * @returns {string } - The sliced text if the original text length exceeds maxLength characters; otherwise, the original string.
 */
export const textSlice = (txt: string, maxLength: number): string => {
  if (txt.length > maxLength) {
    return txt.slice(0, maxLength);
  } else {
    return txt;
  }
};

/**
 * Adds a comma after every three digits in a numeric string.
 *
 * @param {string} price - The numeric string to format.
 * @returns {string} - The formatted string with commas inserted.
 *
 *
 * */
export const handelPrice = (price: string): string => {
  let x = 0;
  const newText = price.split("");

  for (let i = 1; i <= newText.length; i++) {
    x++;
    if (x === 3 && price.length > 3) {
      newText.splice(i, 0, ",");
      x = 0;
      i++;
    }
  }

  return newText.join("");
};
