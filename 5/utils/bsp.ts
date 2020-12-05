enum POSITION {
  LOWER = 0,
  HIGHER = 1,
}

const bsp = (
  pass: string,
  min: number,
  max: number,
): number => {
  const midpoint = Math.floor((min + max) / 2);

  const char = pass[0];
  const newPass = pass.substring(1);
  const isLower = parseInt(char) === POSITION.LOWER;

  if (!newPass) {
    return isLower ? min : max;
  }

  return bsp(
    newPass,
    (isLower) ? min : midpoint + 1,
    (!isLower) ? max : midpoint,
  );
};

const getBSPValue = (pass: string) => {
  const binaryLimit = new Array(pass.length).fill(1).join("");
  const limit = parseInt(binaryLimit, 2);

  return bsp(pass, 0, limit);
};

export { POSITION };
export default getBSPValue;
