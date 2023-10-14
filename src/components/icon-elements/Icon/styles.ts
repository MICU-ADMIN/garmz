import { border, getColorClassNames, Sizing, sizing, spacing, garmzTwMerge } from "lib";

import { colorPalette } from "lib/theme";
import { Color, IconVariant } from "../../../lib/inputTypes";

export type WrapperProportionTypes = {
  paddingX: string;
  paddingY: string;
};

export const wrapperProportions: { [size: string]: WrapperProportionTypes } = {
  xs: {
    paddingX: spacing.xs.paddingX,
    paddingY: spacing.xs.paddingY,
  },
  sm: {
    paddingX: spacing.xs.paddingX,
    paddingY: spacing.xs.paddingY,
  },
  md: {
    paddingX: spacing.sm.paddingX,
    paddingY: spacing.sm.paddingY,
  },
  lg: {
    paddingX: spacing.sm.paddingX,
    paddingY: spacing.sm.paddingY,
  },
  xl: {
    paddingX: spacing.md.paddingX,
    paddingY: spacing.md.paddingY,
  },
};

export const iconSizes: { [size: string]: Sizing } = {
  xs: {
    height: sizing.sm.height,
    width: sizing.sm.width,
  },
  sm: {
    height: sizing.lg.height,
    width: sizing.lg.width,
  },
  md: {
    height: sizing.lg.height,
    width: sizing.lg.width,
  },
  lg: {
    height: sizing.twoXl.height,
    width: sizing.twoXl.width,
  },
  xl: {
    height: sizing.threeXl.height,
    width: sizing.threeXl.width,
  },
};

export type ShapeTypes = {
  rounded: string;
  border: string;
  ring: string;
  shadow: string;
};

export const shape: { [style: string]: ShapeTypes } = {
  simple: {
    rounded: "",
    border: "",
    ring: "",
    shadow: "",
  },
  light: {
    rounded: "rounded-garmz-default",
    border: "",
    ring: "",
    shadow: "",
  },
  shadow: {
    rounded: "rounded-garmz-default",
    border: border.sm.all,
    ring: "",
    shadow: "shadow-garmz-card dark:shadow-dark-garmz-card",
  },
  solid: {
    rounded: "rounded-garmz-default",
    border: border.md.all,
    ring: "ring-1",
    shadow: "",
  },
  outlined: {
    rounded: "rounded-garmz-default",
    border: border.sm.all,
    ring: "ring-2",
    shadow: "",
  },
};

export const getIconColors = (variant: IconVariant, color?: Color) => {
  switch (variant) {
    case "simple":
      return {
        textColor: color
          ? getColorClassNames(color, colorPalette.text).textColor
          : "text-garmz-brand dark:text-dark-garmz-brand",
        bgColor: "",
        borderColor: "",
        ringColor: "",
      };
    case "light":
      return {
        textColor: color
          ? getColorClassNames(color, colorPalette.text).textColor
          : "text-garmz-brand dark:text-dark-garmz-brand",
        bgColor: color
          ? garmzTwMerge(
              getColorClassNames(color, colorPalette.background).bgColor,
              "bg-opacity-20",
            )
          : "bg-garmz-brand-muted dark:bg-dark-garmz-brand-muted",
        borderColor: "",
        ringColor: "",
      };
    case "shadow":
      return {
        textColor: color
          ? getColorClassNames(color, colorPalette.text).textColor
          : "text-garmz-brand dark:text-dark-garmz-brand",
        bgColor: color
          ? garmzTwMerge(
              getColorClassNames(color, colorPalette.background).bgColor,
              "bg-opacity-20",
            )
          : "bg-garmz-background dark:bg-dark-garmz-background",
        borderColor: "border-garmz-border dark:border-dark-garmz-border",
        ringColor: "",
      };
    case "solid":
      return {
        textColor: color
          ? getColorClassNames(color, colorPalette.text).textColor
          : "text-garmz-brand-inverted dark:text-dark-garmz-brand-inverted",
        bgColor: color
          ? garmzTwMerge(
              getColorClassNames(color, colorPalette.background).bgColor,
              "bg-opacity-20",
            )
          : "bg-garmz-brand dark:bg-dark-garmz-brand",
        borderColor: "border-garmz-brand-inverted dark:border-dark-garmz-brand-inverted",
        ringColor: "ring-garmz-ring dark:ring-dark-garmz-ring",
      };
    case "outlined":
      return {
        textColor: color
          ? getColorClassNames(color, colorPalette.text).textColor
          : "text-garmz-brand dark:text-dark-garmz-brand",
        bgColor: color
          ? garmzTwMerge(
              getColorClassNames(color, colorPalette.background).bgColor,
              "bg-opacity-20",
            )
          : "bg-garmz-background dark:bg-dark-garmz-background",
        borderColor: color
          ? getColorClassNames(color, colorPalette.ring).borderColor
          : "border-garmz-brand-subtle dark:border-dark-garmz-brand-subtle",
        ringColor: color
          ? garmzTwMerge(getColorClassNames(color, colorPalette.ring).ringColor, "ring-opacity-40")
          : "ring-garmz-brand-muted dark:ring-dark-garmz-brand-muted",
      };
  }
};
