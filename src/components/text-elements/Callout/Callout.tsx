import { garmzTwMerge } from "lib";
import React from "react";

import { border, getColorClassNames, makeClassName, sizing, spacing } from "lib";
import { colorPalette } from "lib/theme";
import { Color } from "../../../lib";

const makeCalloutClassName = makeClassName("Callout");

export interface CalloutProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  icon?: React.ElementType;
  color?: Color;
}

const Callout = React.forwardRef<HTMLDivElement, CalloutProps>((props, ref) => {
  const { title, icon, color, className, children, ...other } = props;

  const Icon = icon;
  return (
    <div
      ref={ref}
      className={garmzTwMerge(
        makeCalloutClassName("root"),
        "flex flex-col overflow-hidden rounded-garmz-default text-garmz-default",
        color
          ? garmzTwMerge(
              getColorClassNames(color, colorPalette.background).bgColor,
              getColorClassNames(color, colorPalette.darkBorder).borderColor,
              getColorClassNames(color, colorPalette.darkText).textColor,
              "dark:bg-opacity-10 bg-opacity-10",
            )
          : garmzTwMerge(
              // light
              "bg-garmz-brand-faint border-garmz-brand-emphasis text-garmz-brand-emphasis",
              // dark
              "dark:bg-dark-garmz-brand-muted/70 dark:border-dark-garmz-brand-emphasis dark:text-dark-garmz-brand-emphasis",
            ),
        spacing.lg.paddingY,
        spacing.lg.paddingRight,
        spacing.twoXl.paddingLeft,
        border.lg.left,
        className,
      )}
      {...other}
    >
      <div className={garmzTwMerge(makeCalloutClassName("header"), "flex items-start")}>
        {Icon ? (
          <Icon
            className={garmzTwMerge(
              makeCalloutClassName("icon"),
              "flex-none",
              sizing.lg.height,
              sizing.lg.width,
              spacing.xs.marginRight,
            )}
          />
        ) : null}
        <h4 className={garmzTwMerge(makeCalloutClassName("title"), "font-semibold")}>{title}</h4>
      </div>
      <p
        className={garmzTwMerge(
          makeCalloutClassName("body"),
          "overflow-y-auto",
          children ? spacing.sm.marginTop : "",
        )}
      >
        {children}
      </p>
    </div>
  );
});

Callout.displayName = "Callout";

export default Callout;
