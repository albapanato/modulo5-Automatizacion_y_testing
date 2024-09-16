// import globals from "globals";
// import pluginJs from "@eslint/js";
// import pluginReact from "eslint-plugin-react";

// export default [
//   {files: ["**/*.{js,mjs,cjs,jsx}"]},
//   {languageOptions: { globals: globals.browser }},
//   pluginJs.configs.recommended,
//   pluginReact.configs.flat.recommended,
// ];

// no reconocia en sample.test.js decribe, it, expected. Le he preguntado al chat gpt y me ha dicho de intalar lo siguiente: npm install eslint-plugin-jest --save-dev  y que escriba la siguiente configuracion de eslint:

import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginJest from "eslint-plugin-jest"; // Importar el plugin de Jest

export default [
    {
        files: ["**/*.{js,mjs,cjs,jsx}"],
    },
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.es2021,
                ...globals.jest, // Integrar los globals de Jest
            },
            ecmaVersion: "latest",
            sourceType: "module",
        },
    },
    pluginJs.configs.recommended,
    pluginReact.configs.flat.recommended,
    pluginJest.configs.recommended, // Añadir la configuración recomendada de Jest
];

// Configuracion en un archivo ".eslintrc.json":

// {
//   "env": {
//     "browser": true,
//     "es2021": true,
//     "jest/globals": true
//   },
//   "extends": [
//     "eslint:recommended",
//     "plugin:react/recommended"
//   ],
//   "parserOptions": {
//     "ecmaVersion": "latest",
//     "sourceType": "module"
//   },
//   "plugins": [
//     "react",
//     "jest"
//   ],
//   "rules": {
//     // Puedes agregar tus reglas personalizadas aquí
//   }
// }
