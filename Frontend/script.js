
const form = document.getElementById("contactForm");
const status = document.getElementById("status");
const submitButton = form.querySelector('button[type="submit"]');

form.addEventListener("submit", function (event) {
  // Stop the browser from refreshing the page
  event.preventDefault();

  // Get values from the form
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  // Check whether all fields are filled
  if (!name || !email || !subject || !message) {
    showStatus("Please fill in all fields.", "error");
    return;
  }

  // Check email format
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    showStatus("Please enter a valid email address.", "error");
    return;
  }

  // Show loading effect
  submitButton.disabled = true;
  submitButton.textContent = "Sending...";

  // Demo only: no message is sent to a server
  setTimeout(function () {
    showStatus(
      "Thanks, " + name + "! Your form passed validation. Backend connection is still needed to send your message.",
      "success"
    );

    submitButton.disabled = false;
    submitButton.textContent = "Send message →";
  }, 1000);
});

function showStatus(message, type) {
  status.textContent = message;
  status.style.color = type === "error" ? "#dc2626" : "#15803d";
}

const messageInput = document.getElementById("message");
const charCount = document.getElementById("charCount");

messageInput.addEventListener("input", function () {
  charCount.textContent =
    `${messageInput.value.length} / 3000`;
});
