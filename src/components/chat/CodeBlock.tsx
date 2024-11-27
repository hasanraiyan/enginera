import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps {
  children: React.ReactNode;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ children }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    const code = React.Children.toArray(children)[0]?.toString() || '';
    await navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <pre className="overflow-x-auto p-4 rounded-lg bg-card border">
        {children}
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-2 rounded-lg bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary/20"
        aria-label={isCopied ? 'Copied!' : 'Copy code'}
      >
        {isCopied ? (
          <Check className="w-4 h-4 text-primary" />
        ) : (
          <Copy className="w-4 h-4 text-primary" />
        )}
      </button>
    </div>
  );
};