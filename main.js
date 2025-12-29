document.getElementById("applicationForm").addEventListener("submit", function(e) {
  e.preventDefault();
  previewBox.value = "";
  result.textContent = "";

  if (!isValidTCKN(tckn.value)) return fail("Invalid TCKN", tckn);
  if (!isValidFullName(fullName.value)) return fail("Invalid Full Name", fullName);

  let dobRes = isValidDOB(dob.value);
  if (!dobRes.ok) return fail("Invalid Date of Birth", dob);

  if (!isValidSalary(salaryAmount.value)) return fail("Invalid Salary", salaryAmount);
  if (!isValidExperience(experience.value, dobRes.age)) return fail("Invalid Experience", experience);

  result.textContent = "Application accepted.";

  previewBox.value =
`TCKN: ${tckn.value}
Full Name: ${fullName.value}
Age: ${dobRes.age}
Salary: ${salaryAmount.value}
Experience: ${experience.value}`;
});

function fail(msg, el) {
  result.textContent = msg;
  el.focus();
}
