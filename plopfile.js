module.exports = function (plop) {
  // Component generator
  plop.setGenerator("page", {
    description: "Create a new page component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is the name of the page component?",
        validate: function (value) {
          if (/.+/.test(value)) {
            return true;
          }
          return "Page name is required";
        },
      },
      {
        type: "confirm",
        name: "generateThunk",
        message: "Generate a thunk module?",
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
          path: `src/pages/{{lowerCase name}}/${f.name}`,
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
          }))
        );
      }
      return actions;
    },
  });
};
