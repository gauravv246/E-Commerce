

const contactForm = document.getElementById("contactForm");
const statusMessage = document.getElementById("status");
const submitButton = document.getElementById("submitButton");
const messageInput = document.getElementById("message");
const charCount = document.getElementById("charCount");

// Update the message character counter
messageInput.addEventListener("input", () => {
  charCount.textContent = `${messageInput.value.length} / 3000`;
});

// Submit the contact form
contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const contactData = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    subject: document.getElementById("subject").value.trim(),
    message: messageInput.value.trim()
  };

  // Validate required fields
  if (
    !contactData.name ||
    !contactData.email ||
    !contactData.subject ||
    !contactData.message
  ) {
    statusMessage.textContent =
      "Please fill in all required fields.";
    statusMessage.style.color = "red";
    return;
  }

  // Show loading state
  const buttonText = submitButton.querySelector("span");
  const originalText = buttonText
    ? buttonText.textContent
    : submitButton.textContent;

  submitButton.disabled = true;

  if (buttonText) {
    buttonText.textContent = "Sending...";
  } else {
    submitButton.textContent = "Sending...";
  }

  statusMessage.textContent = "Submitting your message...";
  statusMessage.style.color = "inherit";

  try {
    // Send data using api.js
    const result = await sendContactMessage(contactData);

    statusMessage.textContent =
      result.message || "Your message was sent successfully!";
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

    if (buttonText) {
      buttonText.textContent = originalText;
    } else {
      submitButton.textContent = originalText;
    }
  }
});
