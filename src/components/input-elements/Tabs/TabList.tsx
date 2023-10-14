"use client";
import { garmzTwMerge } from "lib";
import React, { createContext } from "react";

import { BaseColorContext } from "contexts";

import { Tab } from "@headlessui/react";
import { border, makeClassName, spacing } from "lib";
import { Color } from "../../../lib";

const makeTabListClassName = makeClassName("TabList");

export type TabVariant = "line" | "solid";

export const TabVariantContext = createContext<TabVariant>("line");

const variantStyles: { [key in TabVariant]: string } = {
  line: garmzTwMerge(
    // common
    "flex",
    // light
    "border-garmz-border",
    // dark
    "dark:border-dark-garmz-border",
    spacing.twoXl.spaceX,
    border.sm.bottom,
  ),
  solid: garmzTwMerge(
    // common
    "inline-flex p-0.5 rounded-garmz-default",
    // light
    "bg-garmz-background-subtle",
    // dark
    "dark:bg-dark-garmz-background-subtle",
    spacing.xs.spaceX,
  ),
};

export interface TabListProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: Color;
  variant?: TabVariant;
  children: React.ReactElement[] | React.ReactElement;
}

const TabList = React.forwardRef<HTMLDivElement, TabListProps>((props, ref) => {
  const { color, variant = "line", children, className, ...other } = props;

  return (
    <Tab.List
      ref={ref}
      className={garmzTwMerge(
        makeTabListClassName("root"),
        "justify-start overflow-x-clip",
        variantStyles[variant],
        className,
      )}
      {...other}
    >
      <TabVariantContext.Provider value={variant}>
        <BaseColorContext.Provider value={color}>{children}</BaseColorContext.Provider>
      </TabVariantContext.Provider>
    </Tab.List>
  );
});

TabList.displayName = "TabList";

export default TabList;
