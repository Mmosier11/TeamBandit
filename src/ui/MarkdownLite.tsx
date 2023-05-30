// -------------------------------------------------------------------------- //
//-                          MARKDOWNLITE COMPONENT                          -//
// -------------------------------------------------------------------------- //
'use client';
/* -------------------------------------------------------------------------- */
import { Fragment } from 'react';
/* -------------------------------------------------------------------------- */
// ---------------------------------- Types --------------------------------- //
type MarkdownLiteProps = {
  text: string;
};
/* -------------------------------------------------------------------------- */

export function MarkdownLite({ text }: MarkdownLiteProps) {
  const linkRegex = /\[(.+?)\]\((.+?)\)/g;
  const parts = [];

  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(text)) !== null) {
    const [fullMatch, linkText, linkUrl] = match;
    const matchStart = match.index;
    const matchEnd = matchStart + fullMatch.length;

    if (lastIndex < matchStart) {
      parts.push(text.slice(lastIndex, matchStart));
    }

    parts.push(
      <a
        target='_blank'
        rel='noopener noreferrer'
        className='break-words text-pink-500 underline underline-offset-2'
        key={linkUrl}
        href={linkUrl}
      >
        {linkText}
      </a>
    );

    lastIndex = matchEnd;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>{part}</Fragment>
      ))}
    </>
  );
}
