import React, { useState, useCallback } from 'react';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps {
  children: React.ReactNode;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ children }) => {
  const [isCopied, setIsCopied] = useState(false);

  const getTextContent = (node: React.ReactNode): string => {
    if (typeof node === 'string') return node;
    if (typeof node === 'number') return node.toString();
    if (Array.isArray(node)) return node.map(getTextContent).join('');
    if (React.isValidElement(node)) {
      return getTextContent(node.props.children);
    }
    return '';
  };

  const handleCopy = useCallback(async () => {
    const code = getTextContent(children);
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
      console.log('Copied code:', code); // For debugging
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  }, [children]);

  return (
    <div className="relative group">
      <pre className="overflow-x-auto p-4 rounded-lg bg-card border text-foreground">
        <code>{children}</code>
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-2 rounded-lg bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary/20 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary"
        aria-label={isCopied ? 'Copied!' : 'Copy code'}
      >
        {isCopied ? (
          <Check className="w-4 h-4 text-primary-foreground" aria-hidden="true" />
        ) : (
          <Copy className="w-4 h-4 text-primary" aria-hidden="true" />
        )}
      </button>
    </div>
  );
};
