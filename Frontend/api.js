
const API_BASE_URL = "http://localhost:5001";

async function sendContactMessage(contactData) {
  const response = await fetch(
    `${API_BASE_URL}/api/contact`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(contactData)
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to send your message."
    );
  }

  return result;
}
