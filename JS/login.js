// SVG strings for Eye (Show) and Eye-off (Hide)
const EYE_OPEN_SVG = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
      </svg>
    `;

const EYE_SLASH_SVG = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
        <line x1="1" y1="1" x2="23" y2="23"></line>
      </svg>
    `;

// Interactive Password Show/Hide Toggle
function togglePassword(inputId, triggerBtn) {
  const input = document.getElementById(inputId);
  if (!input) return;

  const isHidden = input.type === "password";
  if (isHidden) {
    input.type = "text";
    triggerBtn.innerHTML = EYE_SLASH_SVG;
    triggerBtn.setAttribute("title", "Hide password");
  } else {
    input.type = "password";
    triggerBtn.innerHTML = EYE_OPEN_SVG;
    triggerBtn.setAttribute("title", "Show password");
  }
}

// Switch between Login and Signup panels
function switchAuthView(viewName) {
  const loginPanel = document.getElementById("loginPanel");
  const signupPanel = document.getElementById("signupPanel");

  if (viewName === "signup") {
    loginPanel.classList.remove("active");
    signupPanel.classList.add("active");
  } else {
    signupPanel.classList.remove("active");
    loginPanel.classList.add("active");
  }
}

// Notification toast trigger
let toastTimer;
function triggerToast(message) {
  const toast = document.getElementById("toastNotification");
  toast.innerText = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// Form submit, loading spinner, and input reset
function handleAuthSubmit(event, type) {
  event.preventDefault();
  const form = event.target;
  const btn =
    type === "login"
      ? document.getElementById("loginBtn")
      : document.getElementById("signupBtn");

  // Start spinning loading state
  btn.classList.add("loading");

  // Simulated network request
  setTimeout(() => {
    // Stop loading spinner
    btn.classList.remove("loading");

    // Reset the form input values
    form.reset();

    // Ensure password input resets back to type 'password' if it was shown
    const passInputs = form.querySelectorAll('input[type="text"].has-icon');
    passInputs.forEach((passInput) => {
      passInput.type = "password";
      const toggleBtn =
        passInput.parentElement.querySelector(".toggle-password");
      if (toggleBtn) toggleBtn.innerHTML = EYE_OPEN_SVG;
    });

    // Show feedback message
    if (type === "login") {
      triggerToast("Login successful! Values cleared.");
    } else {
      triggerToast("Account created successfully! Switching to Login...");
      setTimeout(() => switchAuthView("login"), 1200);
    }
  }, 1500);
}
