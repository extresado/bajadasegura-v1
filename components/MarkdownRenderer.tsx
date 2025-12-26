
import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const createMarkup = () => {
    let html = content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^- (.*?)(\n|$)/gm, '<li>$1</li>');

    if (html.includes('<li>')) {
      html = `<ul>${html}</ul>`;
    }

    // Wrap in paragraphs if not already structured
    if (!html.startsWith('<ul') && !html.startsWith('<li')) {
        html = html.split('\n\n').map(p => `<p class="mb-4 last:mb-0">${p.trim()}</p>`).join('');
    }

    return { __html: html };
  };

  return (
    <div
      className="prose prose-invert text-base md:text-lg text-slate-100 font-semibold leading-relaxed prose-strong:text-teal-300 prose-strong:font-black prose-li:marker:text-fuchsia-400 prose-li:mb-2 prose-ul:mb-4"
      dangerouslySetInnerHTML={createMarkup()}
    />
  );
};

export default MarkdownRenderer;
