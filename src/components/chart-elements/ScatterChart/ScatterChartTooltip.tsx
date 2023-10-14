import React from "react";
import { Color, defaultValueFormatter, garmzTwMerge } from "../../../lib";

import { ScatterChartValueFormatter } from "components/chart-elements/ScatterChart/ScatterChart";
import { BaseColors, border, getColorClassNames, sizing, spacing } from "lib";
import { colorPalette } from "lib/theme";

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
}

export const ChartTooltipRow = ({ value, name }: ChartTooltipRowProps) => (
  <div className="flex items-center justify-between space-x-8">
    <div className="flex items-center space-x-2">
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

export interface ScatterChartTooltipProps {
  label: string;
  categoryColors: Map<string, Color>;
  active: boolean | undefined;
  payload: any;
  valueFormatter: ScatterChartValueFormatter;
  axis: any;
  category?: string;
}

const ScatterChartTooltip = ({
  label,
  active,
  payload,
  valueFormatter,
  axis,
  category,
  categoryColors,
}: ScatterChartTooltipProps) => {
  if (active && payload) {
    return (
      <ChartTooltipFrame>
        <div
          className={garmzTwMerge(
            // common
            "flex items-center space-x-2",
            // light
            "border-garmz-border",
            // dark
            "dark:border-dark-garmz-border",
            spacing.twoXl.paddingX,
            spacing.sm.paddingY,
            border.sm.bottom,
          )}
        >
          <span
            className={garmzTwMerge(
              // common
              "shrink-0 rounded-garmz-full",
              // light
              "border-garmz-background shadow-garmz-card",
              // dark
              "dark:border-dark-garmz-background dark:shadow-dark-garmz-card",
              getColorClassNames(
                category
                  ? categoryColors.get(payload?.[0]?.payload[category]) ?? BaseColors.Blue
                  : BaseColors.Blue,
                colorPalette.background,
              ).bgColor,
              sizing.sm.height,
              sizing.sm.width,
              border.md.all,
            )}
          />
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
          {payload.map(({ value, name }: { value: number; name: string }, idx: number) => {
            const valueFormatterKey = Object.keys(axis).find((key) => axis[key] === name) ?? "";
            const valueFormatterFn =
              valueFormatter[valueFormatterKey as keyof ScatterChartValueFormatter] ??
              defaultValueFormatter;
            return (
              <ChartTooltipRow
                key={`id-${idx}`}
                value={valueFormatter && valueFormatterFn ? valueFormatterFn(value) : `${value}`}
                name={name}
              />
            );
          })}
        </div>
      </ChartTooltipFrame>
    );
  }
  return null;
};

export default ScatterChartTooltip;
