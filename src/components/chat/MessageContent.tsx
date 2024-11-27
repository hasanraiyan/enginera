import React from 'react';
import ReactMarkdown from 'react-markdown';
import { ChatMarkdownStyles } from './ChatMarkdownStyles';
import { CodeBlock } from './CodeBlock';

interface MessageContentProps {
  content: string;
}

export const MessageContent: React.FC<MessageContentProps> = ({ content }) => {
  return (
    <ChatMarkdownStyles>
      <div className="prose prose-sm dark:prose-invert max-w-none">
        <ReactMarkdown
          components={{
            pre: ({ children, ...props }) => <CodeBlock children={children} {...props} />,
            code: ({ node, ...props }) => (
              <code {...props} className="bg-card px-1.5 py-0.5 rounded-md" />
            ),
            a: ({ node, ...props }) => (
              <a
                {...props}
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              />
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </ChatMarkdownStyles>
  );
};