import CssVariables from "@/types/CssVariables";

export default function getCssVariableForTailwind(variable: CssVariables) {
  return `var(${variable})`;
}
