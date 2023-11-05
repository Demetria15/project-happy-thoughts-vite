import React, { useState } from "react";

const ThoughtForm = ({ addThought }) => {
  const [newThought, setNewThought] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [charCount, setCharCount] = useState(0);

  // Function to handle text input
  const handleTextChange = (text) => {
    setNewThought(text);
    setCharCount(text.length);
  };

  // Function to handle form submission and posting a new thought
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (newThought.length < 5) {
      setErrorMessage("Share more");
      return;
    }

    if (newThought.length > 140) {
      setErrorMessage("Character limit exceeded");
      return;
    }

    setErrorMessage(""); // Clear any previous error message

    const apiUrl = "https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts";
    const thoughtData = {
      message: newThought,
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(thoughtData),
      });

      if (response.ok) {
        const data = await response.json();
        // Update the state with the new thought
        addThought(data);
        setNewThought(""); // Clear the input field
        setCharCount(0); // Reset character count
      } else {
        throw new Error("Failed to post thought");
      }
    } catch (error) {
      console.error("Error posting thought:", error);
    }
  };

  return (
    <div className="center-container">
      <form onSubmit={handleFormSubmit}>
        <div className="thought-form-content">
          <textarea
            className="textarea"
            placeholder="Share your happy thought..."
            value={newThought}
            onChange={(e) => handleTextChange(e.target.value)}
          />
        </div>
        <p className="char-count">{charCount}/140</p>
        <button type="submit" className="sendBtn">
          Send happy thought 💕
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default ThoughtForm;


