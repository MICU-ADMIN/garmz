"use client";
import Tooltip, { useTooltip } from "components/util-elements/Tooltip/Tooltip";
import {
  Color,
  getColorClassNames,
  makeClassName,
  mergeRefs,
  Size,
  Sizes,
  spacing,
  garmzTwMerge,
} from "lib";
import { colorPalette } from "lib/theme";
import React from "react";
import { badgeProportions, iconSizes } from "./styles";

const makeBadgeClassName = makeClassName("Badge");

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: Color;
  size?: Size;
  icon?: React.ElementType;
  tooltip?: string;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>((props, ref) => {
  const { color, icon, size = Sizes.SM, tooltip, className, children, ...other } = props;

  const Icon = icon ? icon : null;

  const { tooltipProps, getReferenceProps } = useTooltip();

  return (
    <span
      ref={mergeRefs([ref, tooltipProps.refs.setReference])}
      className={garmzTwMerge(
        makeBadgeClassName("root"),
        // common
        "w-max flex-shrink-0 inline-flex justify-center items-center cursor-default rounded-garmz-full",
        color
          ? garmzTwMerge(
              getColorClassNames(color, colorPalette.background).bgColor,
              getColorClassNames(color, colorPalette.text).textColor,
              "bg-opacity-20 dark:bg-opacity-25",
            )
          : garmzTwMerge(
              // light
              "bg-garmz-brand-muted text-garmz-brand-emphasis",
              // dark
              "dark:bg-dark-garmz-brand-muted dark:text-dark-garmz-brand-emphasis",
            ),
        badgeProportions[size].paddingX,
        badgeProportions[size].paddingY,
        badgeProportions[size].fontSize,
        className,
      )}
      {...getReferenceProps}
      {...other}
    >
      <Tooltip text={tooltip} {...tooltipProps} />
      {Icon ? (
        <Icon
          className={garmzTwMerge(
            makeBadgeClassName("icon"),
            "shrink-0",
            spacing.twoXs.negativeMarginLeft,
            spacing.xs.marginRight,
            iconSizes[size].height,
            iconSizes[size].width,
          )}
        />
      ) : null}
      <p className={garmzTwMerge(makeBadgeClassName("text"), "text-sm whitespace-nowrap")}>
        {children}
      </p>
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;
