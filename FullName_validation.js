function isValidFullName(name) {
  if (!name || name.trim().length < 6) return false;
  for (let c of name) {
    if (c >= "0" && c <= "9") return false;
  }
  return true;
}
