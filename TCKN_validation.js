function isValidTCKN(tc) {
  if (!tc || tc.length !== 11) return false;
  if (tc[0] === "0") return false;

  let nums = [];
  for (let i = 0; i < 11; i++) {
    let n = Number(tc[i]);
    if (Number.isNaN(n)) return false;
    nums.push(n);
  }

  let odd = nums[0] + nums[2] + nums[4] + nums[6] + nums[8];
  let even = nums[1] + nums[3] + nums[5] + nums[7];
  if (((7 * odd - even) % 10) !== nums[9]) return false;

  let sum = nums.slice(0, 10).reduce((a, b) => a + b, 0);
  if ((sum % 10) !== nums[10]) return false;

  return true;
}
