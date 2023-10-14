"use client";
import { Tab as HeadlessTab } from "@headlessui/react";
import { colorPalette, getColorClassNames, garmzTwMerge } from "lib";
import React, { useContext } from "react";

import { TabVariant, TabVariantContext } from "components/input-elements/Tabs/TabList";
import { BaseColorContext } from "contexts";
import { makeClassName, sizing, spacing } from "lib";
import { Color } from "../../../lib/inputTypes";

const makeTabClassName = makeClassName("Tab");

function getVariantStyles(tabVariant: TabVariant, color?: Color) {
  switch (tabVariant) {
    case "line":
      return garmzTwMerge(
        // common
        "ui-selected:border-b-2 hover:border-b-2 border-transparent transition duration-100",
        // light
        "hover:border-garmz-content hover:text-garmz-content-emphasis text-garmz-content",
        // dark
        "dark:hover:border-dark-garmz-content-emphasis dark:hover:text-dark-garmz-content-emphasis dark:text-dark-garmz-content",
        // brand
        color
          ? getColorClassNames(color, colorPalette.border).selectBorderColor
          : "ui-selected:border-garmz-brand dark:ui-selected:border-dark-garmz-brand",
        spacing.px.negativeMarginBottom,
        spacing.sm.paddingX,
        spacing.sm.paddingY,
      );
    case "solid":
      return garmzTwMerge(
        // common
        "border-transparent border rounded-garmz-small",
        // light
        "ui-selected:border-garmz-border ui-selected:bg-garmz-background ui-selected:shadow-garmz-input hover:text-garmz-content-emphasis text-garmz-content",
        // dark
        "dark:ui-selected:border-dark-garmz-border dark:ui-selected:bg-dark-garmz-background dark:ui-selected:shadow-dark-garmz-input dark:hover:text-dark-garmz-content-emphasis dark:text-dark-garmz-content",
        spacing.md.paddingX,
        spacing.twoXs.paddingY,
      );
  }
}

export interface TabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ElementType;
}

const Tab = React.forwardRef<HTMLButtonElement, TabProps>((props, ref) => {
  const { icon, className, children, ...other } = props;

  const variant = useContext(TabVariantContext);
  const color = useContext(BaseColorContext);
  const Icon = icon;
  return (
    <HeadlessTab
      ref={ref}
      className={garmzTwMerge(
        makeTabClassName("root"),
        // common
        "flex whitespace-nowrap truncate max-w-xs outline-none focus:ring-0 text-garmz-default transition duration-100",
        // brand
        color
          ? getColorClassNames(color, colorPalette.text).selectTextColor
          : variant === "solid"
          ? "ui-selected:text-garmz-content-emphasis dark:ui-selected:text-dark-garmz-content-emphasis"
          : "ui-selected:text-garmz-brand dark:ui-selected:text-dark-garmz-brand",
        getVariantStyles(variant, color),
        className,
      )}
      {...other}
    >
      {Icon ? (
        <Icon
          className={garmzTwMerge(
            makeTabClassName("icon"),
            "flex-none",
            sizing.lg.height,
            sizing.lg.width,
            children ? spacing.sm.marginRight : "",
          )}
        />
      ) : null}
      {children ? <span>{children}</span> : null}
    </HeadlessTab>
  );
});

Tab.displayName = "Tab";

export default Tab;
