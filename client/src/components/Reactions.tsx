import React, { useState } from 'react';
import axios from 'axios';

interface Props {
  userId: number;
  postId: number;
}

const Reactions = ({ userId, postId }: Props) => {
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const emojis = ['❤️', '🤟', '‼️', '😍', '🤮'];

  const handleReaction = (emoji: string) => {
    setSelectedEmoji(emoji);
    axios.post('/api/reactions', {
      emoji,
      userId,
      postId
    })
    .then((response) => {
      console.log('Reaction added:', response.data);
    })
    .catch((err) => {
      console.error('Error adding reaction:', err);
    })
  };

  return (
    <div>
      {emojis.map(emoji => (
        <span
          key={emoji}
          onClick={() => handleReaction(emoji)}
          style={{ cursor: 'pointer', marginRight: 10 }}
        >
          {emoji}
        </span>
      ))}
    </div>
  );
};

export default Reactions;
