import { fontSize, getColorClassNames, Sizing, sizing, spacing, garmzTwMerge } from "lib";

import { colorPalette } from "lib/theme";
import { ButtonVariant, Color } from "../../../lib/inputTypes";

export const iconSizes: { [size: string]: Sizing } = {
  xs: {
    height: sizing.md.height,
    width: sizing.md.width,
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
    height: sizing.xl.height,
    width: sizing.xl.width,
  },
  xl: {
    height: sizing.xl.height,
    width: sizing.xl.width,
  },
};

export const getButtonProportions = (variant: ButtonVariant) => {
  if (!(variant === "light")) {
    return {
      xs: {
        paddingX: spacing.md.paddingX,
        paddingY: spacing.xs.paddingY,
        fontSize: fontSize.xs,
      },
      sm: {
        paddingX: spacing.twoXl.paddingX,
        paddingY: spacing.sm.paddingY,
        fontSize: fontSize.sm,
      },
      md: {
        paddingX: spacing.twoXl.paddingX,
        paddingY: spacing.sm.paddingY,
        fontSize: fontSize.md,
      },
      lg: {
        paddingX: spacing.twoXl.paddingX,
        paddingY: spacing.md.paddingY,
        fontSize: fontSize.lg,
      },
      xl: {
        paddingX: spacing.twoXl.paddingX,
        paddingY: spacing.lg.paddingY,
        fontSize: fontSize.xl,
      },
    };
  }
  return {
    xs: {
      paddingX: "",
      paddingY: "",
      fontSize: fontSize.xs,
    },
    sm: {
      paddingX: "",
      paddingY: "",
      fontSize: fontSize.sm,
    },
    md: {
      paddingX: "",
      paddingY: "",
      fontSize: fontSize.md,
    },
    lg: {
      paddingX: "",
      paddingY: "",
      fontSize: fontSize.lg,
    },
    xl: {
      paddingX: "",
      paddingY: "",
      fontSize: fontSize.xl,
    },
  };
};

export const getButtonColors = (variant: ButtonVariant, color?: Color) => {
  switch (variant) {
    case "primary":
      return {
        textColor: color
          ? getColorClassNames("white").textColor
          : "text-garmz-brand-inverted dark:text-dark-garmz-brand-inverted",
        hoverTextColor: color
          ? getColorClassNames("white").textColor
          : "text-garmz-brand-inverted dark:text-dark-garmz-brand-inverted",
        bgColor: color
          ? getColorClassNames(color, colorPalette.background).bgColor
          : "bg-garmz-brand dark:bg-dark-garmz-brand",
        hoverBgColor: color
          ? getColorClassNames(color, colorPalette.darkBackground).hoverBgColor
          : "hover:bg-garmz-brand-emphasis dark:hover:bg-dark-garmz-brand-emphasis",
        borderColor: color
          ? getColorClassNames(color, colorPalette.border).borderColor
          : "border-garmz-brand dark:border-dark-garmz-brand",
        hoverBorderColor: color
          ? getColorClassNames(color, colorPalette.darkBorder).hoverBorderColor
          : "hover:border-garmz-brand-emphasis dark:hover:border-dark-garmz-brand-emphasis",
      };
    case "secondary":
      return {
        textColor: color
          ? getColorClassNames(color, colorPalette.text).textColor
          : "text-garmz-brand dark:text-dark-garmz-brand",
        hoverTextColor: color
          ? getColorClassNames(color, colorPalette.text).textColor
          : "hover:text-garmz-brand-emphasis dark:hover:text-dark-garmz-brand-emphasis",
        bgColor: getColorClassNames("transparent").bgColor,
        hoverBgColor: color
          ? garmzTwMerge(
              getColorClassNames(color, colorPalette.background).hoverBgColor,
              "hover:bg-opacity-20 dark:hover:bg-opacity-20",
            )
          : "hover:bg-garmz-brand-faint dark:hover:bg-dark-garmz-brand-faint",
        borderColor: color
          ? getColorClassNames(color, colorPalette.border).borderColor
          : "border-garmz-brand dark:border-dark-garmz-brand",
      };
    case "light":
      return {
        textColor: color
          ? getColorClassNames(color, colorPalette.text).textColor
          : "text-garmz-brand dark:text-dark-garmz-brand",
        hoverTextColor: color
          ? getColorClassNames(color, colorPalette.darkText).hoverTextColor
          : "hover:text-garmz-brand-emphasis dark:hover:text-dark-garmz-brand-emphasis",
        bgColor: getColorClassNames("transparent").bgColor,
        borderColor: "",
        hoverBorderColor: "",
      };
  }
};
