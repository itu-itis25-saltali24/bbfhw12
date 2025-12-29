function getAge(dob) {
  let d = new Date(dob);
  let t = new Date();
  let age = t.getFullYear() - d.getFullYear();
  if (t.getMonth() < d.getMonth() || 
     (t.getMonth() === d.getMonth() && t.getDate() < d.getDate())) {
    age--;
  }
  return age;
}

function isValidDOB(dob) {
  let age = getAge(dob);
  return { ok: age > 17 && age < 36, age };
}
