import CssVariables from "@/types/CssVariables";
import variables from "@/styles/utils/_next-variables.module.scss";

export default function getCssVariable(
  variable: CssVariables,
  isDynamic: boolean = false
) {
  if (isDynamic) {
    return `var(${variable})`;
  }
  return variables[`${variable}`];
}
