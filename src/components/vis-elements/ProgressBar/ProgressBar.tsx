"use client";
import React from "react";

import Tooltip, { useTooltip } from "components/util-elements/Tooltip/Tooltip";
import { getColorClassNames, makeClassName, sizing, spacing, garmzTwMerge } from "lib";
import { colorPalette } from "lib/theme";
import { Color } from "../../../lib/inputTypes";

const makeProgressBarClassName = makeClassName("ProgressBar");

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  label?: string;
  tooltip?: string;
  showAnimation?: boolean;
  color?: Color;
}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>((props, ref) => {
  const { value, label, color, tooltip, showAnimation = false, className, ...other } = props;
  const { tooltipProps, getReferenceProps } = useTooltip();

  return (
    <>
      <Tooltip text={tooltip} {...tooltipProps} />
      <div
        ref={ref}
        className={garmzTwMerge(
          makeProgressBarClassName("root"),
          "flex items-center w-full",
          className,
        )}
        {...other}
      >
        <div
          ref={tooltipProps.refs.setReference}
          className={garmzTwMerge(
            makeProgressBarClassName("progressBarWrapper"),
            "relative flex items-center w-full rounded-garmz-full bg-opacity-20",
            color
              ? getColorClassNames(color, colorPalette.background).bgColor
              : "bg-garmz-brand-muted/50 dark:bg-dark-garmz-brand-muted",
            sizing.xs.height,
          )}
          {...getReferenceProps}
        >
          <div
            className={garmzTwMerge(
              makeProgressBarClassName("progressBar"),
              // common
              "flex-col h-full rounded-garmz-full",
              color
                ? getColorClassNames(color, colorPalette.background).bgColor
                : "bg-garmz-brand dark:bg-dark-garmz-brand",
            )}
            style={{
              width: `${value}%`,
              transition: showAnimation ? "all 1s" : "",
            }}
          />
        </div>
        {label ? (
          <div
            className={garmzTwMerge(
              makeProgressBarClassName("labelWrapper"),
              // common
              "w-16 truncate text-right",
              // light
              "text-garmz-content-emphasis",
              // dark
              "dark:text-dark-garmz-content-emphasis",
              spacing.sm.marginLeft,
            )}
          >
            <p
              className={garmzTwMerge(
                makeProgressBarClassName("label"),
                // common
                "shrink-0 whitespace-nowrap truncate text-garmz-default",
              )}
            >
              {label}
            </p>
          </div>
        ) : null}
      </div>
    </>
  );
});

ProgressBar.displayName = "ProgressBar";

export default ProgressBar;
