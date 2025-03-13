"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"

interface MarkdownRendererProps {
  content: string
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const [html, setHtml] = useState<string>("")

  useEffect(() => {
    // Enhanced markdown to HTML conversion
    let formattedContent = content
      // Headers
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold mt-6 mb-3">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mt-8 mb-4">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mt-10 mb-5">$1</h1>')
      // Bold
      .replace(/\*\*(.*)\*\*/gim, "<strong>$1</strong>")
      // Italic
      .replace(/\*(.*)\*/gim, "<em>$1</em>")
      // Code blocks
      .replace(/```([^`]+)```/gim, '<pre class="bg-muted p-4 rounded-md my-4 overflow-x-auto"><code>$1</code></pre>')
      // Inline code
      .replace(/`([^`]+)`/gim, '<code class="bg-muted px-1.5 py-0.5 rounded text-sm">$1</code>')
      // Blockquotes
      .replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-primary/30 pl-4 italic my-4">$1</blockquote>')
      // Lists
      .replace(/^\s*\n\* (.*)/gim, '<ul class="list-disc pl-5 my-4"><li>$1</li></ul>')
      .replace(/^\s*\n\d\. (.*)/gim, '<ol class="list-decimal pl-5 my-4"><li>$1</li></ol>')
      // Links
      .replace(/\[([^\]]+)\]$$([^)]+)$$/gim, '<a href="$2" class="text-primary underline hover:text-primary/80">$1</a>')
      // Tables
      .replace(/^\|(.+)\|$/gim, '<table class="w-full border-collapse my-4"><tr>$1</tr></table>')
      .replace(/\|([^|]+)\|/gim, '<td class="border p-2">$1</td>')
      // Horizontal rule
      .replace(/^---+$/gim, '<hr class="my-6 border-t border-muted-foreground/30">')
      // Paragraphs
      .replace(/^\s*\n\n/gim, '</p><p class="my-4">')
      // Line breaks
      .replace(/\n/gim, "<br>")

    // Wrap with paragraph if not already
    if (!formattedContent.startsWith("<h") && !formattedContent.startsWith("<p")) {
      formattedContent = `<p class="my-4">${formattedContent}</p>`
    }

    // Process lists to handle multiple items
    formattedContent = formattedContent
      .replace(/<\/ul><ul class="list-disc pl-5 my-4">/gim, "")
      .replace(/<\/ol><ol class="list-decimal pl-5 my-4">/gim, "")

    setHtml(formattedContent)
  }, [content])

  return (
    <div className="markdown-content">
      <Card className="p-6">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </Card>
    </div>
  )
}

