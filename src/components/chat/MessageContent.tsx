import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
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
          remarkPlugins={[remarkGfm]} // Enable GFM for table support
          components={{
            pre: ({ children, ...props }) => <CodeBlock {...props}>{children}</CodeBlock>,
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
            table: ({ node, ...props }) => (
              <div className="overflow-x-auto">
                <table {...props} className="table-auto border-collapse border border-gray-300 w-full">
                  {props.children}
                </table>
              </div>
            ),

            th: ({ node, ...props }) => (
              <th {...props} className="border border-gray-300 px-4 py-2 font-semibold text-left">
                {props.children}
              </th>
            ),
            td: ({ node, ...props }) => (
              <td {...props} className="border border-gray-300 px-4 py-2">
                {props.children}
              </td>
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </ChatMarkdownStyles>
  );
};
