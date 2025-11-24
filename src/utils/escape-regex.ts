export const escapeRegExp = (input: string) => {
  return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};
