export default function config(plop) {
  plop.setGenerator("component", {
    description: "Create a new component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is your component name?",
      },
    ],
    actions: [
      {
        type: "add",
        path: "components/{{pascalCase name}}/{{pascalCase name}}.tsx",
        templateFile: "plop-templates/Component/Component.hbs",
      },
      {
        type: "add",
        path: "components/{{pascalCase name}}/index.scss",
        templateFile: "plop-templates/Component/index.scss.hbs",
      },
      {
        type: "add",
        path: "components/{{pascalCase name}}/index.ts",
        templateFile: "plop-templates/Component/index.ts.hbs",
      },
      {
        type: "modify",
        path: "components/index.ts",
        pattern: "/* INJECT_EXPORT */",
        template: "export * from './{{pascalCase name}}';\n/* INJECT_EXPORT */",
      },
      {
        type: "modify",
        path: "components/index.scss",
        pattern: "/* INJECT_IMPORT */",
        template: "@forward './{{pascalCase name}}';\n/* INJECT_IMPORT */",
      },
    ],
  });
}
