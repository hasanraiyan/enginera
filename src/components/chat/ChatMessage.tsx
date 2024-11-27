import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Message } from '../../types/chat';
import { MessageContent } from './MessageContent';
import { MessageAvatar } from './MessageAvatar';
import { MessageTimestamp } from './MessageTimestamp';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = forwardRef<HTMLDivElement, ChatMessageProps>(
  ({ message }, ref) => {
    const isBot = message.role === 'assistant';

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex gap-4 ${isBot ? 'bg-accent/50' : ''} p-4 rounded-lg`}
      >
        <MessageAvatar isBot={isBot} />
        <div className="flex-1 overflow-hidden">
          <MessageContent content={message.content} />
          <MessageTimestamp timestamp={message.timestamp} />
        </div>
      </motion.div>
    );
  }
);

ChatMessage.displayName = 'ChatMessage';