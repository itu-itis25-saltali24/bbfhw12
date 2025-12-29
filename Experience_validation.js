function isValidExperience(exp, age) {
  let n = Number(exp);
  if (Number.isNaN(n) || n < 0) return false;
  return n <= age - 10;
}
