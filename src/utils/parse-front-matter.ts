export const parseFrontMatter = (
  md: string
): { meta: Record<string, string> } => {
  const match = md.match(/^---\s*([\s\S]*?)\s*---\s*/);

  if (!match) return { meta: {} };

  const rawMeta = match[1].trim();

  const meta: Record<string, string> = {};

  rawMeta.split('\n').forEach((line) => {
    const [key, ...rest] = line.split(':');

    if (key && rest.length) {
      meta[key.trim()] = rest.join(':').trim();
    }
  });

  return { meta };
};
