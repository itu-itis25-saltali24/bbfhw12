function isValidSalary(val) {
  let n = Number(val);
  return !Number.isNaN(n) && n >= 0;
}
