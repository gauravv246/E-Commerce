
const contactForm = document.getElementById("contactForm");
const statusMessage = document.getElementById("status");
const submitButton = document.getElementById("submitButton");
const messageInput = document.getElementById("message");
const charCount = document.getElementById("charCount");

// Connect the message character counter
messageInput.addEventListener("input", () => {
  charCount.textContent = `${messageInput.value.length} / 3000`;
});

// Submit the contact form to the backend
contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const contactData = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    subject: document.getElementById("subject").value.trim(),
    message: messageInput.value.trim(),
  };

  // Prevent empty or whitespace-only fields
  if (
    !contactData.name ||
    !contactData.email ||
    !contactData.subject ||
    !contactData.message
  ) {
    statusMessage.textContent = "Please fill in all required fields.";
    statusMessage.style.color = "red";
    return;
  }

  // Show loading state
  const buttonText = submitButton.querySelector("span");
  const originalText = buttonText.textContent;

  submitButton.disabled = true;
  buttonText.textContent = "Sending...";
  statusMessage.textContent = "Submitting your message...";
  statusMessage.style.color = "inherit";
  
  const formData = {
  name: document.getElementById("name").value.trim(),
  email: document.getElementById("email").value.trim(),
  subject: document.getElementById("subject").value.trim(),
  message: document.getElementById("message").value.trim()
};
  try {
    const response = await fetch(
  "http://192.168.0.155:5000/api/contact",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  }
);

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to send your message.");
    }

    statusMessage.textContent =
      "Your message was sent successfully!";
    statusMessage.style.color = "green";

    contactForm.reset();
    charCount.textContent = "0 / 3000";
  } catch (error) {
    console.error("Contact form error:", error);

    statusMessage.textContent =
      error instanceof Error
        ? error.message
        : "Unable to connect to the server. Please try again.";

    statusMessage.style.color = "red";
  } finally {
    submitButton.disabled = false;
    buttonText.textContent = originalText;
  }
});