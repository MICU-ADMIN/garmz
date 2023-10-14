"use client";
import { garmzTwMerge } from "lib";
import React from "react";

import Tooltip, { useTooltip } from "components/util-elements/Tooltip/Tooltip";
import { DeltaTypes, makeClassName, mapInputsToDeltaType, sizing } from "lib";
import { colors } from "./styles";

const makeDeltaBarClassName = makeClassName("DeltaBar");

const getDeltaType = (value: number) => (value >= 0 ? DeltaTypes.Increase : DeltaTypes.Decrease);

export interface DeltaBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  isIncreasePositive?: boolean;
  tooltip?: string;
  showAnimation?: boolean;
}

const DeltaBar = React.forwardRef<HTMLDivElement, DeltaBarProps>((props, ref) => {
  const {
    value,
    isIncreasePositive = true,
    showAnimation = false,
    className,
    tooltip,
    ...other
  } = props;
  const deltaType = mapInputsToDeltaType(getDeltaType(value), isIncreasePositive);

  const { tooltipProps, getReferenceProps } = useTooltip();

  return (
    <>
      <Tooltip text={tooltip} {...tooltipProps} />
      <div
        ref={ref}
        className={garmzTwMerge(
          makeDeltaBarClassName("root"),
          // common
          "relative flex items-center w-full rounded-garmz-full",
          // light
          "bg-garmz-background-subtle",
          // dark
          "dark:bg-dark-garmz-background-subtle",
          sizing.xs.height,
          className,
        )}
        {...other}
      >
        <div
          className={
            (makeDeltaBarClassName("negativeDeltaBarWrapper"), "flex justify-end h-full w-1/2")
          }
        >
          {value < 0 ? (
            <div
              ref={tooltipProps.refs.setReference}
              className={garmzTwMerge(
                makeDeltaBarClassName("negativeDeltaBar"),
                // common
                "rounded-l-garmz-full",
                colors[deltaType].bgColor,
              )}
              style={{
                width: `${Math.abs(value)}%`,
                transition: showAnimation ? "all 1s" : "",
              }}
              {...getReferenceProps}
            />
          ) : null}
        </div>
        <div
          className={garmzTwMerge(
            makeDeltaBarClassName("separator"),
            // common
            "ring-2 z-10 rounded-garmz-full",
            // light
            "ring-garmz-brand-inverted bg-garmz-background-emphasis",
            // dark
            "dark:ring-dark-garmz-brand-inverted dark:bg-dark-garmz-background-emphasis",
            sizing.md.height,
            sizing.twoXs.width,
          )}
        />
        <div
          className={garmzTwMerge(
            makeDeltaBarClassName("positiveDeltaBarWrapper"),
            "flex justify-start h-full w-1/2",
          )}
        >
          {value >= 0 ? (
            <div
              ref={tooltipProps.refs.setReference}
              className={garmzTwMerge(
                makeDeltaBarClassName("positiveDeltaBar"),
                // common
                "rounded-r-garmz-full",
                colors[deltaType].bgColor,
              )}
              style={{
                width: `${Math.abs(value)}%`,
                transition: showAnimation ? "all 1s" : "",
              }}
              {...getReferenceProps}
            />
          ) : null}
        </div>
      </div>
    </>
  );
});

DeltaBar.displayName = "DeltaBar";

export default DeltaBar;
