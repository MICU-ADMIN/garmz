import React from "react";
import { garmzTwMerge } from "../../../lib";

import { BaseColors, border, getColorClassNames, sizing, spacing } from "lib";
import { colorPalette } from "lib/theme";
import { Color, ValueFormatter } from "../../../lib";

export const ChartTooltipFrame = ({ children }: { children: React.ReactNode }) => (
  <div
    className={garmzTwMerge(
      // common
      "rounded-garmz-default text-garmz-default",
      // light
      "bg-garmz-background shadow-garmz-dropdown border-garmz-border",
      // dark
      "dark:bg-dark-garmz-background dark:shadow-dark-garmz-dropdown dark:border-dark-garmz-border",
      border.sm.all,
    )}
  >
    {children}
  </div>
);

export interface ChartTooltipRowProps {
  value: string;
  name: string;
  color: Color;
}

export const ChartTooltipRow = ({ value, name, color }: ChartTooltipRowProps) => (
  <div className="flex items-center justify-between space-x-8">
    <div className="flex items-center space-x-2">
      <span
        className={garmzTwMerge(
          // common
          "shrink-0 rounded-garmz-full",
          // light
          "border-garmz-background shadow-garmz-card",
          // dark
          "dark:border-dark-garmz-background dark:shadow-dark-garmz-card",
          getColorClassNames(color, colorPalette.background).bgColor,
          sizing.sm.height,
          sizing.sm.width,
          border.md.all,
        )}
      />
      <p
        className={garmzTwMerge(
          // commmon
          "text-right whitespace-nowrap",
          // light
          "text-garmz-content",
          // dark
          "dark:text-dark-garmz-content",
        )}
      >
        {name}
      </p>
    </div>
    <p
      className={garmzTwMerge(
        // common
        "font-medium tabular-nums text-right whitespace-nowrap",
        // light
        "text-garmz-content-emphasis",
        // dark
        "dark:text-dark-garmz-content-emphasis",
      )}
    >
      {value}
    </p>
  </div>
);

export interface ChartTooltipProps {
  active: boolean | undefined;
  payload: any;
  label: string;
  categoryColors: Map<string, Color>;
  valueFormatter: ValueFormatter;
}

const ChartTooltip = ({
  active,
  payload,
  label,
  categoryColors,
  valueFormatter,
}: ChartTooltipProps) => {
  if (active && payload) {
    const filteredPayload = payload.filter((item: any) => item.type !== "none");

    return (
      <ChartTooltipFrame>
        <div
          className={garmzTwMerge(
            // light
            "border-garmz-border",
            // dark
            "dark:border-dark-garmz-border",
            spacing.twoXl.paddingX,
            spacing.sm.paddingY,
            border.sm.bottom,
          )}
        >
          <p
            className={garmzTwMerge(
              // common
              "font-medium",
              // light
              "text-garmz-content-emphasis",
              // dark
              "dark:text-dark-garmz-content-emphasis",
            )}
          >
            {label}
          </p>
        </div>

        <div className={garmzTwMerge(spacing.twoXl.paddingX, spacing.sm.paddingY, "space-y-1")}>
          {filteredPayload.map(({ value, name }: { value: number; name: string }, idx: number) => (
            <ChartTooltipRow
              key={`id-${idx}`}
              value={valueFormatter(value)}
              name={name}
              color={categoryColors.get(name) ?? BaseColors.Blue}
            />
          ))}
        </div>
      </ChartTooltipFrame>
    );
  }
  return null;
};

export default ChartTooltip;
