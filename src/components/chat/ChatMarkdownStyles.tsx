import React, { forwardRef } from 'react';

interface ChatMarkdownStylesProps {
  children: React.ReactNode;
}

export const ChatMarkdownStyles = forwardRef<HTMLDivElement, ChatMarkdownStylesProps>(
  ({ children }, ref) => {
    return (
      <div ref={ref} className="markdown-content">
        {children}
      </div>
    );
  }
);

ChatMarkdownStyles.displayName = 'ChatMarkdownStyles';
