import React from "react";

import { getColorClassNames, makeClassName, sizing, spacing, themeColorRange } from "lib";
import { colorPalette } from "lib/theme";
import { Color, garmzTwMerge } from "../../../lib";

const makeLegendClassName = makeClassName("Legend");

export interface LegendItemProps {
  name: string;
  color: Color;
  onClick?: (name: string, color: Color) => void;
  activeLegend?: string;
}

const LegendItem = ({ name, color, onClick, activeLegend }: LegendItemProps) => {
  const hasOnValueChange = !!onClick;
  return (
    <li
      className={garmzTwMerge(
        makeLegendClassName("legendItem"),
        // common
        "group inline-flex items-center truncate px-2 py-0.5 rounded-garmz-small transition ",
        hasOnValueChange ? "cursor-pointer" : "cursor-default",
        // light
        "text-garmz-content",
        hasOnValueChange ? "hover:bg-garmz-background-subtle" : "",
        // dark
        "dark:text-dark-garmz-content",
        hasOnValueChange ? "dark:hover:bg-dark-garmz-background-subtle" : "",
      )}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(name, color);
      }}
    >
      <svg
        className={garmzTwMerge(
          "flex-none",
          getColorClassNames(color, colorPalette.text).textColor,
          sizing.xs.height,
          sizing.xs.width,
          spacing.xs.marginRight,
          activeLegend && activeLegend !== name ? "opacity-40" : "opacity-100",
        )}
        fill="currentColor"
        viewBox="0 0 8 8"
      >
        <circle cx={4} cy={4} r={4} />
      </svg>
      <p
        className={garmzTwMerge(
          // common
          "whitespace-nowrap truncate text-garmz-default",
          // light
          "text-garmz-content",
          hasOnValueChange ? "group-hover:text-garmz-content-emphasis" : "",
          // dark
          "dark:text-dark-garmz-content",
          activeLegend && activeLegend !== name ? "opacity-40" : "opacity-100",
          hasOnValueChange ? "dark:group-hover:text-dark-garmz-content-emphasis" : "",
        )}
      >
        {name}
      </p>
    </li>
  );
};

export interface LegendProps extends React.OlHTMLAttributes<HTMLOListElement> {
  categories: string[];
  colors?: Color[];
  onClickLegendItem?: (category: string, color: Color) => void;
  activeLegend?: string;
}

const Legend = React.forwardRef<HTMLOListElement, LegendProps>((props, ref) => {
  const {
    categories,
    colors = themeColorRange,
    className,
    onClickLegendItem,
    activeLegend,
    ...other
  } = props;
  return (
    <ol
      ref={ref}
      className={garmzTwMerge(
        makeLegendClassName("root"),
        "flex flex-wrap overflow-hidden truncate",
        className,
      )}
      {...other}
    >
      {categories.map((category, idx) => (
        <LegendItem
          key={`item-${idx}`}
          name={category}
          color={colors[idx]}
          onClick={onClickLegendItem}
          activeLegend={activeLegend}
        />
      ))}
    </ol>
  );
});

Legend.displayName = "Legend";

export default Legend;
