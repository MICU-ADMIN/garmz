"use client";
import { SelectedValueContext } from "contexts";
import { garmzTwMerge } from "lib";
import React, { useContext } from "react";

import { isValueInArray, makeClassName, spacing } from "lib";

import { Listbox } from "@headlessui/react";

const makeMultiSelectItemClassName = makeClassName("MultiSelectItem");

export interface MultiSelectItemProps extends React.HTMLAttributes<HTMLLIElement> {
  value: string;
}

const MultiSelectItem = React.forwardRef<HTMLLIElement, MultiSelectItemProps>((props, ref) => {
  const { value, className, children, ...other } = props;

  const { selectedValue } = useContext(SelectedValueContext);
  const isSelected = isValueInArray(value, selectedValue);

  return (
    <Listbox.Option
      className={garmzTwMerge(
        makeMultiSelectItemClassName("root"),
        // common
        "flex justify-start items-center cursor-default text-garmz-default",
        // light
        // "ui-active:bg-garmz-background-muted ui-active:text-garmz-content-strong ui-selected:text-garmz-content-strong ui-selected:bg-garmz-background-muted text-garmz-content-emphasis",
        "ui-active:bg-garmz-background-muted ui-active:text-garmz-content-strong ui-selected:text-garmz-content-strong text-garmz-content-emphasis",
        // dark
        "dark:ui-active:bg-dark-garmz-background-muted dark:ui-active:text-dark-garmz-content-strong dark:ui-selected:text-dark-garmz-content-strong dark:ui-selected:bg-dark-garmz-background-muted dark:text-dark-garmz-content-emphasis",
        spacing.md.paddingX,
        spacing.md.paddingY,
        className,
      )}
      ref={ref}
      key={value}
      value={value}
      {...other}
    >
      <input
        type="checkbox"
        className={garmzTwMerge(
          makeMultiSelectItemClassName("checkbox"),
          // common
          "flex-none focus:ring-none focus:outline-none cursor-pointer",
          // light
          "accent-garmz-brand",
          // dark
          "dark:accent-dark-garmz-brand",
          spacing.md.marginRight,
        )}
        checked={isSelected}
        readOnly={true}
      />
      <span className="whitespace-nowrap truncate">{children ?? value}</span>
    </Listbox.Option>
  );
});

MultiSelectItem.displayName = "MultiSelectItem";

export default MultiSelectItem;
