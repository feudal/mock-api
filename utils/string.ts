export const pascalCase = (str?: string) => {
  if (typeof str !== "string") return str;

  return str
    .replace(/\b(\w)/g, (match) => match.toUpperCase())
    .split(/[-_\s]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
};

export const kebabCase = (str?: string) => {
  if (typeof str !== "string") return str;

  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/\s+/g, "-")
    .toLowerCase();
};
