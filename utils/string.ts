export const stripSlashes = (str?: string) => {
  if (typeof str !== "string") return str;

  return str.replaceAll("/", "");
};

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

export const parseName = (name?: string | string[]) => {
  if (typeof name === "string") {
    return name;
  }
  if (Array.isArray(name)) {
    return name.join("/");
  }
  return "";
};

export const checkIfIsId = (name?: string) => {
  // format of the id ac7b4306-4096-432f-bc35-6b6875fab1d3

  if (!name) return false;
  return name?.length === 36 && name?.includes("-");
};

export const capitalize = (str?: string) => {
  if (typeof str !== "string") return str;

  return str.charAt(0).toUpperCase() + str.slice(1);
};
