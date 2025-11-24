export type MarkdownSection = {
  title: string;
  content: string;
};

export const splitMarkdown = (md: string, level: number): MarkdownSection[] => {
  const prefix = '#'.repeat(level);
  const regex = new RegExp(`\\n(?=${prefix}\\s)`, 'g');

  const sections: { title: string; content: string }[] = [];
  const parts = md.split(regex);

  for (const part of parts) {
    const lines = part.trim().split('\n');

    if (lines.length === 0) continue;

    if (!lines[0].match(new RegExp(`^${prefix}\\s*`))) continue;
    const titleLine = lines[0].replace(new RegExp(`^${prefix}\\s*`), '');
    const content = lines.slice(1).join('\n');

    sections.push({ title: titleLine, content });
  }

  return sections;
};
