module.exports = function (plop) {
  console.log("\n🚀 Welcome to Uno Framework! 🚀");
  console.log("The modern framework for building scalable applications ✨\n");

  // Module generator (empty for now)
  plop.setGenerator("module", {
    description: "Create a new module",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is the name of the module?",
        validate: function (value) {
          if (/.+/.test(value)) {
            return true;
          }
          return "Module name is required";
        },
      },
      {
        type: "confirm",
        name: "generateThunk",
        message: "Generate a redux store?",
        default: false,
      },
    ],
    actions: function (data) {
      const frontendFiles = [
        { name: "index.ts", template: "index.ts.hbs" },
        { name: "{{pascalCase name}}.tsx", template: "page.tsx.hbs" },
        { name: "{{camelCase name}}.hooks.ts", template: "hooks.ts.hbs" },
        { name: "{{camelCase name}}.styles.scss", template: "styles.scss.hbs" },
        { name: "{{camelCase name}}.types.ts", template: "types.ts.hbs" },
      ];

      const thunkFiles = [
        { name: "{{camelCase name}}.thunk.ts", template: "redux.thunk.ts.hbs" },
        { name: "{{camelCase name}}.slice.ts", template: "redux.slice.ts.hbs" },
        {
          name: "{{camelCase name}}.reducers.ts",
          template: "redux.reducers.ts.hbs",
        },
        { name: "index.ts", template: "index.ts.hbs" },
        {
          name: "../types/{{camelCase name}}.types.ts",
          template: "redux.types.ts.hbs",
          types: true,
        },
      ];

      const actions = [
        ...frontendFiles.map((f) => ({
          type: "add",
          path: `core/modules/{{lowerCase name}}/${f.name}`,
          templateFile: `core/helpers/plopFiles/frontend/${f.template}`,
        })),
      ];

      if (data.generateThunk) {
        actions.push(
          ...thunkFiles.map((f) => ({
            type: "add",
            path: f.types
              ? `core/redux/types/{{camelCase name}}.types.ts`
              : `core/redux/{{camelCase name}}/${f.name}`,
            templateFile: `core/helpers/plopFiles/redux/${f.template}`,
          })),
          {
            type: "modify",
            path: "core/redux/store.ts",
            pattern: /(import .*;)([\s\S]*?)(const store = configureStore)/,
            template: [
              '$1\nimport {{camelCase name}} from "./{{camelCase name}}/{{camelCase name}}.slice";',
              "$2$3",
            ].join("\n"),
          },
          {
            type: "modify",
            path: "core/redux/store.ts",
            pattern: /(reducer:\s*{)([\s\S]*?)(\n\s*},)/,
            template: "$1$2\n    {{camelCase name}},$3",
          }
        );
      }
      return actions;
    },
  });

  // Page generator
  plop.setGenerator("page", {
    description: "Create a new page component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is the name of the Page?",
        validate: function (value) {
          if (/.+/.test(value)) {
            return true;
          }
          return "Page name is required";
        },
      },
    ],
    actions: [],
  });
};
