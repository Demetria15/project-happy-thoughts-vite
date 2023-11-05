// Thoughts.jsx
import React, { useState, useEffect } from "react";
import ThoughtForm from "./ThoughtForm";
import SingleThought from "./SingleThought";

const Thoughts = () => {
  const [thoughts, setThoughts] = useState([]);
  const apiUrl = "https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts";

  // Fetch thoughts from the API
  const fetchThoughts = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setThoughts(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchThoughts();
  }, []); // Fetch thoughts when the component mounts

  const addThought = (newThought) => {
    setThoughts([newThought, ...thoughts]);
  };

  return (
    <div>
      <ThoughtForm addThought={addThought} />
      <div className="thought-cards">
        {thoughts.map((thought) => (
          <SingleThought key={thought._id} thought={thought} />
        ))}
      </div>
    </div>
  );
};

export default Thoughts;
