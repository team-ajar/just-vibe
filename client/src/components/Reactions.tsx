import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Props {
  userId: number;
  postId: number;
}

const Reactions = ({ userId, postId }: Props) => {
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const emojis = ['❤️', '🤟', '‼️', '😍', '🚮'];

  const getUserReaction = () => {
    axios.get(`/api/reactions/${userId}/${postId}`)
      .then((response) => {
        const { emoji } = response.data;
        setSelectedEmoji(emoji);
        setIsLoading(false);
        localStorage.setItem(`reaction_${userId}_${postId}`, emoji);
      })
      .catch((err) => {
        console.error('Error getting user reaction:', err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const storedEmoji = localStorage.getItem(`reaction_${userId}_${postId}`);
    if (storedEmoji) {
      setSelectedEmoji(storedEmoji);
      setIsLoading(false);
    } else {
      getUserReaction();
    }
  }, [userId, postId]);

  const handleReaction = (emoji: string) => {
    if (selectedEmoji === emoji) {
      axios.delete(`/api/reactions/${userId}/${postId}`)
        .then(() => {
          setSelectedEmoji(null);
          localStorage.removeItem(`reaction_${userId}_${postId}`);
        })
        .catch((err) => {
          console.error('Error removing reaction:', err);
        });
    } else {
      setSelectedEmoji(emoji);
      axios.post('/api/reactions', {
        emoji,
        userId,
        postId
      })
      .then(() => {
        localStorage.setItem(`reaction_${userId}_${postId}`, emoji);
      })
      .catch((err) => {
        console.error('Error adding reaction:', err);
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {emojis.map(emoji => (
        <span
          key={emoji}
          onClick={() => handleReaction(emoji)}
          style={{ cursor: 'pointer', marginRight: 10, opacity: selectedEmoji === emoji ? 1 : 0.25, fontWeight: selectedEmoji === emoji ? 'bold' : 'normal' }}
        >
          {emoji}
        </span>
      ))}
    </div>
  );
};

export default Reactions;
