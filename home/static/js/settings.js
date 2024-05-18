function opensettings(evt, settingsName) {
  var i, settingsContainer, tablinks;

  // Hide all settings containers
  settingsContainer = document.getElementsByClassName("settings-container");
  for (i = 0; i < settingsContainer.length; i++) {
    settingsContainer[i].style.display = "none";
  }

  // Deactivate all tabs
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the selected settings and mark its tab as active
  document.getElementById(settingsName).style.display = "block";
  evt.currentTarget.className += " active";
}

// Auto-fill the fields with sample data
document.getElementById("name-input").value = "Jahanzaib Baig";
document.getElementById("email-input").value = "jahanzaibbaig@gmail.com";
document.getElementById("phone-input").value = "+ 92 321 7999898";
document.getElementById("password-field").value = "password123";

function editField(editIcon) {
  // Get the parent container of the edit icon
  var inputContainer = editIcon.parentNode;

  // Find the input element within the same container
  var inputElement = inputContainer.querySelector("input");

  // Check if input element was found
  if (inputElement) {
    inputElement.disabled = false;
    inputElement.focus();
  } else {
    console.error("No input element found as a sibling of the edit icon.");
  }
}

function togglePasswordVisibility() {
  var passwordField = document.getElementById("password-field");
  var eyeIcon = document.querySelector(".eye-icon");
  if (passwordField.type === "password") {
    passwordField.type = "text";
    eyeIcon.classList.remove("fa-eye-slash");
    eyeIcon.classList.add("fa-eye");
  } else {
    passwordField.type = "password";
    eyeIcon.classList.remove("fa-eye");
    eyeIcon.classList.add("fa-eye-slash");
  }
}

var validEmailIcon = document.getElementById("email-valid");
var invalidEmailIcon = document.getElementById("email-invalid");
validEmailIcon.style.display = "block";
invalidEmailIcon.style.display = "none";

function validateEmail() {
  var emailInput = document.getElementById("email-input");
  var email = emailInput.value.trim();
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailPattern.test(email)) {
    validEmailIcon.style.display = "block";
    invalidEmailIcon.style.display = "none";
  } else {
    validEmailIcon.style.display = "none";
    invalidEmailIcon.style.display = "block";
  }
}

var validNumberIcon = document.getElementById("phone-valid");
var invalidNumberIcon = document.getElementById("phone-invalid");
validNumberIcon.style.display = "block";
invalidNumberIcon.style.display = "none";

function validatePhoneNumber() {
  var phoneInput = document.getElementById("phone-input");
  var phone = phoneInput.value.trim();
  var phonePattern = /^\+\s?\d{2}\s?\d{3}\s?\d{7}$/;

  if (phonePattern.test(phone)) {
    validNumberIcon.style.display = "block";
    invalidNumberIcon.style.display = "none";
  } else {
    validNumberIcon.style.display = "none";
    invalidNumberIcon.style.display = "block";
  }
}
