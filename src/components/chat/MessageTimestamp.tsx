import React from 'react';

interface MessageTimestampProps {
  timestamp: number;
}

export const MessageTimestamp: React.FC<MessageTimestampProps> = ({ timestamp }) => {
  return (
    <div className="text-xs text-muted-foreground mt-2">
      {new Date(timestamp).toLocaleTimeString()}
    </div>
  );
};