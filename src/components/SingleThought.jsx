import React, { useState } from 'react';

const SingleThought = ({ thought }) => {
  const calculateMinutesAgo = (timestamp) => {
    const postTime = new Date(thought.createdAt);
    const currentTime = new Date();
    const timeDifference = (currentTime - postTime) / 60000;
    return Math.floor(timeDifference);
  };

  const [heartCount, setHeartCount] = useState(thought.hearts);

  const handleHeartClick = () => {
    // Sends a POST request to like the thought
    fetch(`https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts/${thought._id}/like`, {
      method: 'POST',
    })
      .then((response) => {
        if (response.ok) {
          // The request was successful, updates the heart count
          setHeartCount(heartCount + 1);
        } else {
          console.error('Oh no, it seems you can not like the thought.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="thought-card">
      <p className="thought-message">{thought.message}</p>
      <div className="thought-details">
        <button className="thought-hearts" onClick={handleHeartClick}>
          💕 {heartCount}
        </button>
        <span className="thought-timestamp">
          {calculateMinutesAgo(thought.createdAt)} minutes ago
        </span>
      </div>
    </div>
  );
};

export default SingleThought;










