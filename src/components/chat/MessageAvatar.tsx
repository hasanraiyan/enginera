import React from 'react';
import { Bot, User } from 'lucide-react';

interface MessageAvatarProps {
  isBot: boolean;
}

export const MessageAvatar: React.FC<MessageAvatarProps> = ({ isBot }) => {
  return (
    <div
      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        isBot ? 'bg-primary/10' : 'bg-secondary'
      }`}
    >
      {isBot ? (
        <Bot className="w-5 h-5 text-primary" />
      ) : (
        <User className="w-5 h-5 text-secondary-foreground" />
      )}
    </div>
  );
};