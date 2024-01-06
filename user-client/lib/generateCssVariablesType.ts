const sass = require("sass");
const fs = require("fs");
const path = require("path");

const scssFilePath = path.resolve(
  __dirname,
  "../styles/utils/_next-variables.module.scss"
);
const cssFilePath = path.resolve(__dirname, "cssVariables.css");

const result = sass.renderSync({
  file: scssFilePath,
});

fs.writeFileSync(cssFilePath, result.css.toString());

console.log(`SCSS file compiled to CSS: ${cssFilePath}`);

const cssContent = fs.readFileSync(cssFilePath, "utf-8");
// Parse CSS variables from the content
const cssVariables = cssContent.match(/--[^:]+:[^;]+;/g);
// Extract variable names from the matched strings
const variableNames = cssVariables.map(
  (variable: any) => variable.match(/--([^:]+)/)[0]
);

// Create TypeScript interface definition
const interfaceDefinition = `interface CssVariables {\n  ${variableNames
  .map((variable: any) => `'${variable}': string,`)
  .join("\n  ")}\n}`;

// Create TypeScript type definition
const typeDefinition = `type CssVariables = ${variableNames
  .map((variable: any) => `'${variable}'`)
  .join("|")}; export default CssVariables`;

// Write the interface to a TypeScript file
const outputTsFilePath = path.resolve(__dirname, "../types/CssVariables.ts");
fs.writeFileSync(outputTsFilePath, typeDefinition);

console.log("Css Variable type definition file generated.");

// delete the css file
fs.unlinkSync(cssFilePath);
