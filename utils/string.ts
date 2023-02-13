export const pascalCase = (str?: string) => {
  if (typeof str !== "string") return str;

  return str
    .replace(/\b(\w)/g, (match) => match.toUpperCase())
    .split(/[-_\s]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
};
