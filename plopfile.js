module.exports = function (plop) {
  // Component generator
  plop.setGenerator('page', {
    description: 'Create a new page component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the page component?',
        validate: function (value) {
          if (/.+/.test(value)) {
            return true;
          }
          return 'Page name is required';
        }
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/pages/{{lowerCase name}}/index.ts',
        templateFile: 'core/helpers/plopFiles/index.ts.hbs'
      },
      {
        type: 'add',
        path: 'src/pages/{{lowerCase name}}/{{pascalCase name}}.tsx',
        templateFile: 'core/helpers/plopFiles/page.tsx.hbs'
      },
      {
        type: 'add',
        path: 'src/pages/{{lowerCase name}}/{{camelCase name}}.hooks.ts',
        templateFile: 'core/helpers/plopFiles/hooks.ts.hbs'
      },
      {
        type: 'add',
        path: 'src/pages/{{lowerCase name}}/{{camelCase name}}.styles.scss',
        templateFile: 'core/helpers/plopFiles/styles.scss.hbs'
      },
      {
        type: 'add',
        path: 'src/pages/{{lowerCase name}}/{{camelCase name}}.types.ts',
        templateFile: 'core/helpers/plopFiles/types.ts.hbs'
      }
    ]
  });
};
