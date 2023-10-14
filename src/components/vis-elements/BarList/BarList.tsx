import {
  Color,
  defaultValueFormatter,
  getColorClassNames,
  makeClassName,
  sizing,
  spacing,
  garmzTwMerge,
  ValueFormatter,
} from "lib";
import { colorPalette } from "lib/theme";
import React from "react";

const makeBarListClassName = makeClassName("BarList");

type Bar = {
  key?: string;
  value: number;
  name: string;
  icon?: React.JSXElementConstructor<any>;
  href?: string;
  target?: string;
  color?: Color;
};

const getWidthsFromValues = (dataValues: number[]) => {
  let maxValue = -Infinity;
  dataValues.forEach((value) => {
    maxValue = Math.max(maxValue, value);
  });

  return dataValues.map((value) => {
    if (value === 0) return 0;
    return Math.max((value / maxValue) * 100, 1);
  });
};

export interface BarListProps extends React.HTMLAttributes<HTMLDivElement> {
  data: Bar[];
  valueFormatter?: ValueFormatter;
  color?: Color;
  showAnimation?: boolean;
}

const BarList = React.forwardRef<HTMLDivElement, BarListProps>((props, ref) => {
  const {
    data = [],
    color,
    valueFormatter = defaultValueFormatter,
    showAnimation = false,
    className,
    ...other
  } = props;

  const widths = getWidthsFromValues(data.map((item) => item.value));

  const rowHeight = sizing.threeXl.height;

  return (
    <div
      ref={ref}
      className={garmzTwMerge(
        makeBarListClassName("root"),
        "flex justify-between",
        spacing.threeXl.spaceX,
        className,
      )}
      {...other}
    >
      <div className={garmzTwMerge(makeBarListClassName("bars"), "relative w-full")}>
        {data.map((item, idx) => {
          const Icon = item.icon;

          return (
            <div
              key={item.key ?? item.name}
              className={garmzTwMerge(
                makeBarListClassName("bar"),
                // common
                "flex items-center rounded-garmz-small bg-opacity-30",
                rowHeight,
                item.color || color
                  ? getColorClassNames(item.color ?? (color as Color), colorPalette.background)
                      .bgColor
                  : "bg-garmz-brand-subtle dark:bg-dark-garmz-brand-subtle dark:bg-opacity-30",
                idx === data.length - 1 ? spacing.none.marginBottom : spacing.sm.marginBottom,
              )}
              style={{
                width: `${widths[idx]}%`,
                transition: showAnimation ? "all 1s" : "",
              }}
            >
              <div className={garmzTwMerge("absolute max-w-full flex", spacing.sm.left)}>
                {Icon ? (
                  <Icon
                    className={garmzTwMerge(
                      makeBarListClassName("barIcon"),
                      // common
                      "flex-none",
                      // light
                      "text-garmz-content",
                      // dark
                      "dark:text-dark-garmz-content",
                      sizing.lg.height,
                      sizing.lg.width,
                      spacing.md.marginRight,
                    )}
                  />
                ) : null}
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.target ?? "_blank"}
                    rel="noreferrer"
                    className={garmzTwMerge(
                      makeBarListClassName("barLink"),
                      // common
                      "whitespace-nowrap hover:underline truncate text-garmz-default",
                      // light
                      "text-garmz-content-emphasis",
                      // dark
                      "dark:text-dark-garmz-content-emphasis",
                    )}
                  >
                    {item.name}
                  </a>
                ) : (
                  <p
                    className={garmzTwMerge(
                      makeBarListClassName("barText"),
                      // common
                      "whitespace-nowrap truncate text-garmz-default",
                      // light
                      "text-garmz-content-emphasis",
                      // dark
                      "dark:text-dark-garmz-content-emphasis",
                    )}
                  >
                    {item.name}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className={(makeBarListClassName("labels"), "text-right min-w-min")}>
        {data.map((item, idx) => (
          <div
            key={item.key ?? item.name}
            className={garmzTwMerge(
              makeBarListClassName("labelWrapper"),
              "flex justify-end items-center",
              rowHeight,
              idx === data.length - 1 ? spacing.none.marginBottom : spacing.sm.marginBottom,
            )}
          >
            <p
              className={garmzTwMerge(
                makeBarListClassName("labelText"),
                // common
                "whitespace-nowrap truncate text-garmz-default",
                // light
                "text-garmz-content-emphasis",
                // dark
                "dark:text-dark-garmz-content-emphasis",
              )}
            >
              {valueFormatter(item.value)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
});

BarList.displayName = "BarList";

export default BarList;
