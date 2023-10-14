"use client";
import { garmzTwMerge } from "lib";
import React from "react";

import Tooltip, { useTooltip } from "components/util-elements/Tooltip/Tooltip";
import { getColorClassNames, makeClassName, sizing } from "lib";
import { colorPalette } from "lib/theme";
import { Color } from "../../../lib";

const makeMarkerBarClassName = makeClassName("MarkerBar");

export interface MarkerBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  minValue?: number;
  maxValue?: number;
  markerTooltip?: string;
  rangeTooltip?: string;
  showAnimation?: boolean;
  color?: Color;
}

const MarkerBar = React.forwardRef<HTMLDivElement, MarkerBarProps>((props, ref) => {
  const {
    value,
    minValue,
    maxValue,
    markerTooltip,
    rangeTooltip,
    showAnimation = false,
    color,
    className,
    ...other
  } = props;

  const { tooltipProps: markerTooltipProps, getReferenceProps: getMarkerReferenceProps } =
    useTooltip();
  const { tooltipProps: rangeTooltipProps, getReferenceProps: getRangeReferenceProps } =
    useTooltip();

  return (
    <div
      ref={ref}
      className={garmzTwMerge(
        makeMarkerBarClassName("root"),
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
      {minValue !== undefined && maxValue !== undefined ? (
        <>
          <Tooltip text={rangeTooltip} {...rangeTooltipProps} />
          <div
            ref={rangeTooltipProps.refs.setReference}
            className={garmzTwMerge(
              makeMarkerBarClassName("rangeBar"),
              // common
              "absolute h-full rounded-garmz-full",
              // light
              "bg-garmz-content-subtle",
              // dark
              "dark:bg-dark-garmz-content-subtle",
            )}
            style={{
              left: `${minValue}%`,
              width: `${maxValue - minValue}%`,
              transition: showAnimation ? "all 1s" : "",
            }}
            {...getRangeReferenceProps}
          />
        </>
      ) : null}
      <Tooltip text={markerTooltip} {...markerTooltipProps} />
      <div
        ref={markerTooltipProps.refs.setReference}
        className={garmzTwMerge(
          makeMarkerBarClassName("markerWrapper"),
          "absolute right-1/2 -translate-x-1/2",
          sizing.lg.width, // wide transparent wrapper for tooltip activation
        )}
        style={{
          left: `${value}%`,
          transition: showAnimation ? "all 1s" : "",
        }}
        {...getMarkerReferenceProps}
      >
        <div
          className={garmzTwMerge(
            makeMarkerBarClassName("marker"),
            "ring-2 mx-auto rounded-garmz-full",
            "ring-garmz-brand-inverted",
            "dark:ring-dark-garmz-brand-inverted",
            color
              ? getColorClassNames(color, colorPalette.background).bgColor
              : "dark:bg-dark-garmz-brand bg-garmz-brand",
            sizing.md.height,
            sizing.twoXs.width,
          )}
        />
      </div>
    </div>
  );
});

MarkerBar.displayName = "MarkerBar";

export default MarkerBar;
