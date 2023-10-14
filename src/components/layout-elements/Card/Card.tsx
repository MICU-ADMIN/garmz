import React from "react";
import { garmzTwMerge } from "../../../lib";

import { border, getColorClassNames, makeClassName, spacing } from "lib";
import { HorizontalPositions, VerticalPositions } from "lib/constants";
import { colorPalette } from "lib/theme";
import { Color, HorizontalPosition, VerticalPosition } from "../../../lib";

const makeCardClassName = makeClassName("Card");

const parseDecorationAlignment = (decorationAlignment: string) => {
  if (!decorationAlignment) return "";
  switch (decorationAlignment) {
    case HorizontalPositions.Left:
      return border.lg.left;
    case VerticalPositions.Top:
      return border.lg.top;
    case HorizontalPositions.Right:
      return border.lg.right;
    case VerticalPositions.Bottom:
      return border.lg.bottom;
    default:
      return "";
  }
};

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  decoration?: HorizontalPosition | VerticalPosition | "";
  decorationColor?: Color;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const { decoration = "", decorationColor, children, className, ...other } = props;
  return (
    <div
      ref={ref}
      className={garmzTwMerge(
        makeCardClassName("root"),
        // common
        "relative w-full text-left ring-1 rounded-garmz-default",
        // light
        "bg-garmz-background ring-garmz-ring shadow-garmz-card",
        // dark
        "dark:bg-dark-garmz-background dark:ring-dark-garmz-ring dark:shadow-dark-garmz-card",
        // brand
        decorationColor
          ? getColorClassNames(decorationColor, colorPalette.border).borderColor
          : "border-garmz-brand dark:border-dark-garmz-brand",
        parseDecorationAlignment(decoration),
        spacing.threeXl.paddingAll,
        className,
      )}
      {...other}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";

export default Card;
