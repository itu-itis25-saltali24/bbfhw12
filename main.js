const form = document.getElementById("applicationForm");

const tcknInput = document.getElementById("tckn");
const fullNameInput = document.getElementById("fullName");
const dobInput = document.getElementById("dob");
const salaryTypeInput = document.getElementById("salaryType");
const salaryAmountInput = document.getElementById("salaryAmount");
const experienceInput = document.getElementById("experience");

const tcknMsg = document.getElementById("tckn_result");
const fullNameMsg = document.getElementById("fullName_result");
const dobMsg = document.getElementById("dob_result");
const salaryMsg = document.getElementById("salary_result");
const expMsg = document.getElementById("experience_result");

const resultMsg = document.getElementById("result");
const previewBox = document.getElementById("previewBox");

function setMsg(el, msg) {
  if (el) el.textContent = msg;
}

function clearPreview() {
  previewBox.value = "";
}

function getSelectedGender() {
  const male = document.getElementById("male");
  const female = document.getElementById("female");
  if (male && male.checked) return "Male";
  if (female && female.checked) return "Female";
  return "";
}

function getSelectedSkills() {
  const checked = document.querySelectorAll('input[name="skills"]:checked');
  if (!checked || checked.length === 0) return "None";
  const arr = [];
  checked.forEach(x => arr.push(x.value));
  return arr.join(", ");
}

tcknInput.addEventListener("blur", function () {
  const v = tcknInput.value.trim();
  if (v === "") return setMsg(tcknMsg, "This field can not be empty!");
  setMsg(tcknMsg, isValidTCKN(v) ? "TCKN is valid." : "Invalid TCKN.");
});

fullNameInput.addEventListener("blur", function () {
  const v = fullNameInput.value;
  if (v.trim() === "") return setMsg(fullNameMsg, "This field can not be empty!");
  setMsg(fullNameMsg, isValidFullName(v) ? "Full name is valid." : "Invalid full name.");
});

dobInput.addEventListener("blur", function () {
  const v = dobInput.value;
  if (v === "") return setMsg(dobMsg, "This field can not be empty!");
  const r = isValidDOB(v);
  setMsg(dobMsg, r.ok ? ("DOB is valid. Age: " + r.age) : "Invalid age.");
});

salaryAmountInput.addEventListener("blur", function () {
  const v = salaryAmountInput.value;
  if (v === "") return setMsg(salaryMsg, "This field can not be empty!");
  setMsg(salaryMsg, isValidSalary(v) ? "Salary is valid." : "Invalid salary.");
});

experienceInput.addEventListener("blur", function () {
  const expV = experienceInput.value;
  if (expV === "") return setMsg(expMsg, "This field can not be empty!");
  const dobR = isValidDOB(dobInput.value);
  if (!dobR.ok) return setMsg(expMsg, "Enter a valid DOB first.");
  setMsg(expMsg, isValidExperience(expV, dobR.age) ? "Experience is valid." : "Invalid experience.");
});

form.addEventListener("submit", function (event) {
  event.preventDefault();

  setMsg(tcknMsg, "");
  setMsg(fullNameMsg, "");
  setMsg(dobMsg, "");
  setMsg(salaryMsg, "");
  setMsg(expMsg, "");
  setMsg(resultMsg, "");
  clearPreview();

  const tcknVal = tcknInput.value.trim();
  if (!isValidTCKN(tcknVal)) {
    setMsg(resultMsg, "Application rejected: Invalid TCKN.");
    tcknInput.focus();
    return;
  }

  if (!isValidFullName(fullNameInput.value)) {
    setMsg(resultMsg, "Application rejected: Invalid Full Name.");
    fullNameInput.focus();
    return;
  }

  const dobR = isValidDOB(dobInput.value);
  if (!dobR.ok) {
    setMsg(resultMsg, "Application rejected: Invalid Date of Birth.");
    dobInput.focus();
    return;
  }

  if (!isValidSalary(salaryAmountInput.value)) {
    setMsg(resultMsg, "Application rejected: Invalid Salary Amount.");
    salaryAmountInput.focus();
    return;
  }

  if (!isValidExperience(experienceInput.value, dobR.age)) {
    setMsg(resultMsg, "Application rejected: Invalid Years of Experience.");
    experienceInput.focus();
    return;
  }

  setMsg(resultMsg, "Application accepted.");

  const gender = getSelectedGender();
  const skills = getSelectedSkills();

  previewBox.value =
`TCKN: ${tcknVal}
Full Name: ${fullNameInput.value.trim()}
Date of Birth: ${dobInput.value}
Age: ${dobR.age}
Gender: ${gender}
Skills: ${skills}
Salary: ${salaryTypeInput.value} ${salaryAmountInput.value}
Experience: ${experienceInput.value}`;
});

