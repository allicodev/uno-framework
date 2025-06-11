const path = require("path");
const fs = require("fs");

/**
 * Helper to prompt user for fields until 'exit' is entered.
 * Plop's built-in prompts can't loop, so we use a workaround:
 * - Prompt for a number of fields (up to 20, for example)
 * - User can type 'exit' to stop early
 */
module.exports = function (plop) {
  // Register the eq helper for handlebars
  plop.setHelper("eq", function (a, b) {
    return a === b;
  });

  plop.setGenerator("model", {
    description: "Generate a Mongoose model",
    prompts: [
      {
        type: "input",
        name: "modelName",
        message: "What Model name? (e.g. User)",
        validate: (v) => (v ? true : "Model name is required"),
      },

      ...Array.from({ length: 20 }).flatMap((_, i) => [
        {
          type: "input",
          name: `field${i}_name`,
          message:
            i === 0
              ? "First field name:"
              : `Field #${i + 1} name (or type exit to finish):`,
          validate: function (v, answers) {
            if (!v) return "Field name required";
            if (v.toLowerCase() === "exit") {
              // Force all subsequent prompts to be skipped
              for (let j = i; j < 20; j++) {
                answers[`field${j}_name`] = "exit";
              }
            }
            return true;
          },
        },
        {
          type: "list",
          name: `field${i}_type`,
          message: (answers) => {
            const fname = answers[`field${i}_name`];
            return fname && fname.toLowerCase() !== "exit"
              ? `Type of field '${fname}'?`
              : "";
          },
          choices: ["String", "Number", "Date", "Object"],
          when: (answers) => {
            const fname = answers[`field${i}_name`];
            return fname && fname.toLowerCase() !== "exit";
          },
        },
      ]),
    ],
    actions: function (data) {
      const fields = [];
      for (let i = 0; i < 20; i++) {
        const name = data[`field${i}_name`];
        if (!name || name.toLowerCase() === "exit") break;
        let type = data[`field${i}_type`];
        if (!type) type = "String";
        fields.push({ name, type });
      }
      const modelName =
        data.modelName.charAt(0).toUpperCase() + data.modelName.slice(1);
      const fileName = `${modelName}.model.ts`;
      // Actions: generate model file, update index.ts
      const actions = [
        {
          type: "add",
          path: path.join("..", "models", fileName),
          templateFile: "plop-templates/model.hbs",
          data: {
            modelName,
            fields,
          },
        },
      ];
      return actions;
    },
  });
};
