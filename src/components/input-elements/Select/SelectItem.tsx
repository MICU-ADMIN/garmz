"use client";
import { garmzTwMerge } from "lib";
import React from "react";

import { Listbox } from "@headlessui/react";
import { makeClassName } from "lib";
import { sizing } from "lib/sizing";
import { spacing } from "lib/spacing";

const makeSelectItemClassName = makeClassName("SelectItem");

export interface SelectItemProps extends React.HTMLAttributes<HTMLLIElement> {
  value: string;
  icon?: React.ElementType;
}

const SelectItem = React.forwardRef<HTMLLIElement, SelectItemProps>((props, ref) => {
  const { value, icon, className, children, ...other } = props;

  const Icon = icon;

  return (
    <Listbox.Option
      className={garmzTwMerge(
        makeSelectItemClassName("root"),
        // common
        "flex justify-start items-center cursor-default text-garmz-default",
        // light
        "ui-active:bg-garmz-background-muted  ui-active:text-garmz-content-strong ui-selected:text-garmz-content-strong ui-selected:bg-garmz-background-muted text-garmz-content-emphasis",
        // dark
        "dark:ui-active:bg-dark-garmz-background-muted  dark:ui-active:text-dark-garmz-content-strong dark:ui-selected:text-dark-garmz-content-strong dark:ui-selected:bg-dark-garmz-background-muted dark:text-dark-garmz-content-emphasis",
        spacing.md.paddingX,
        spacing.md.paddingY,
        className,
      )}
      ref={ref}
      key={value}
      value={value}
      {...other}
    >
      {Icon && (
        <Icon
          className={garmzTwMerge(
            makeSelectItemClassName("icon"),
            // common
            "flex-none",
            // light
            "text-garmz-content-subtle",
            // dark
            "dark:text-dark-garmz-content-subtle",
            sizing.lg.width,
            spacing.xs.marginRight,
          )}
        />
      )}
      <span className="whitespace-nowrap truncate">{children ?? value}</span>
    </Listbox.Option>
  );
});

SelectItem.displayName = "SelectItem";

export default SelectItem;
