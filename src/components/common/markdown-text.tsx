import { Code, Link } from '@heroui/react';
import { Children } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { escapeRegExp } from '@utils/escape-regex';

export const MarkdownText = ({
  content,
  searchQuery = '',
}: {
  content: string;
  searchQuery?: string;
}) => {
  const highlightChildren = (children: React.ReactNode) => {
    const q = searchQuery?.trim();

    if (!q || q.length < 3) return children;

    const safe = escapeRegExp(q);
    const regex = new RegExp(`(${safe})`, 'gi');

    return Children.map(children, (child) => {
      if (typeof child !== 'string') return child;

      const parts = child.split(regex);

      return parts.map((part, i) =>
        regex.test(part) ? (
          <mark
            key={i}
            className="bg-primary text-default-50 px-1 rounded font-extrabold tracking-tighter"
          >
            {part}
          </mark>
        ) : (
          part
        )
      );
    });
  };

  return (
    <ReactMarkdown
      components={{
        h1: ({ children }) => (
          <h1 className="text-3xl font-bold mb-4">
            {highlightChildren(children)}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-2xl font-semibold mt-6 mb-3">
            {highlightChildren(children)}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-xl font-semibold mt-4 mb-2">
            {highlightChildren(children)}
          </h3>
        ),
        p: ({ children }) => (
          <p className="mb-4 leading-relaxed">{highlightChildren(children)}</p>
        ),

        ul: ({ children }) => (
          <ul
            className="list-disc marker:text-default-700 ml-10 mb-2 text-base
                      [&_ul]:text-sm [&_ul]:ml-4 [&_ul]:text-default-700 [&_ul]:mb-1
                      [&_ol]:text-sm [&_ol]:ml-4 [&_ol]:text-default-700 [&_ol]:mb-1"
          >
            {children}
          </ul>
        ),

        ol: ({ children }) => (
          <ol
            className="list-decimal marker:text-default-700 ml-10 mb-2 text-base
                      [&_ul]:text-sm [&_ul]:ml-4 [&_ul]:text-default-700 [&_ul]:mb-1
                      [&_ol]:text-sm [&_ol]:ml-4 [&_ol]:text-default-700 [&_ol]:mb-1"
          >
            {children}
          </ol>
        ),

        li: ({ children }) => (
          <li className="mb-1">{highlightChildren(children)}</li>
        ),

        a: ({ children, href }) => (
          <Link
            className="hover:underline break-words text-primary"
            href={href}
          >
            {highlightChildren(children)}
          </Link>
        ),

        code: ({ children }) => (
          <Code className="py-0" size="sm">
            {highlightChildren(children)}
          </Code>
        ),
      }}
      remarkPlugins={[remarkGfm]}
    >
      {content}
    </ReactMarkdown>
  );
};
