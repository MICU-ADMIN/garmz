"use client";

import { ArrowDownHeadIcon, XCircleIcon } from "assets";
import { border, makeClassName, sizing, spacing } from "lib";
import React, { useMemo } from "react";
import { constructValueToNameMapping, getSelectButtonColors, hasValue } from "../selectUtils";

import { Listbox } from "@headlessui/react";
import { useInternalState } from "hooks";
import { garmzTwMerge } from "lib";

const makeSelectClassName = makeClassName("Select");

export interface SelectProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  icon?: React.JSXElementConstructor<any>;
  enableClear?: boolean;
  children: React.ReactElement[] | React.ReactElement;
}

const Select = React.forwardRef<HTMLDivElement, SelectProps>((props, ref) => {
  const {
    defaultValue,
    value,
    onValueChange,
    placeholder = "Select...",
    disabled = false,
    icon,
    enableClear = true,
    children,
    className,
    ...other
  } = props;

  const [selectedValue, setSelectedValue] = useInternalState(defaultValue, value);
  const Icon = icon;
  const valueToNameMapping = useMemo(() => constructValueToNameMapping(children), [children]);

  const handleReset = () => {
    setSelectedValue("");
    onValueChange?.("");
  };

  return (
    <Listbox
      as="div"
      ref={ref}
      defaultValue={selectedValue}
      value={selectedValue}
      onChange={
        ((value: string) => {
          onValueChange?.(value);
          setSelectedValue(value);
        }) as any
      }
      disabled={disabled}
      className={garmzTwMerge(
        // common
        "w-full min-w-[10rem] relative text-garmz-default",
        className,
      )}
      {...other}
    >
      {({ value }) => (
        <>
          <Listbox.Button
            className={garmzTwMerge(
              // common
              "w-full outline-none text-left whitespace-nowrap truncate rounded-garmz-default focus:ring-2 transition duration-100",
              // light
              "border-garmz-border shadow-garmz-input focus:border-garmz-brand-subtle focus:ring-garmz-brand-muted",
              // dark
              "dark:border-dark-garmz-border dark:shadow-dark-garmz-input dark:focus:border-dark-garmz-brand-subtle dark:focus:ring-dark-garmz-brand-muted",
              Icon ? "p-10 -ml-0.5" : spacing.lg.paddingLeft,
              spacing.fourXl.paddingRight,
              spacing.sm.paddingY,
              border.sm.all,
              getSelectButtonColors(hasValue(value), disabled),
            )}
          >
            {Icon && (
              <span
                className={garmzTwMerge(
                  "absolute inset-y-0 left-0 flex items-center ml-px",
                  spacing.md.paddingLeft,
                )}
              >
                <Icon
                  className={garmzTwMerge(
                    makeSelectClassName("Icon"),
                    // common
                    "flex-none",
                    // light
                    "text-garmz-content-subtle",
                    // dark
                    "dark:text-dark-garmz-content-subtle",
                    sizing.lg.height,
                    sizing.lg.width,
                  )}
                />
              </span>
            )}
            <span className="w-[90%] block truncate">
              {value ? valueToNameMapping.get(value) ?? placeholder : placeholder}
            </span>
            <span
              className={garmzTwMerge(
                "absolute inset-y-0 right-0 flex items-center",
                spacing.lg.marginRight,
              )}
            >
              <ArrowDownHeadIcon
                className={garmzTwMerge(
                  makeSelectClassName("arrowDownIcon"),
                  // common
                  "flex-none",
                  // light
                  "text-garmz-content-subtle",
                  // dark
                  "dark:text-dark-garmz-content-subtle",
                  sizing.md.height,
                  sizing.md.width,
                )}
              />
            </span>
          </Listbox.Button>
          {enableClear && selectedValue ? (
            <button
              type="button"
              className={garmzTwMerge(
                "absolute inset-y-0 right-0 flex items-center",
                spacing.fourXl.marginRight,
              )}
              onClick={(e) => {
                e.preventDefault();
                handleReset();
              }}
            >
              <XCircleIcon
                className={garmzTwMerge(
                  makeSelectClassName("clearIcon"),
                  // common
                  "flex-none",
                  // light
                  "text-garmz-content-subtle",
                  // dark
                  "dark:text-dark-garmz-content-subtle",
                  sizing.md.height,
                  sizing.md.width,
                )}
              />
            </button>
          ) : null}
          <Listbox.Options
            className={garmzTwMerge(
              // common
              "absolute z-10 divide-y overflow-y-auto max-h-[228px] w-full left-0 outline-none rounded-garmz-default",
              // light
              "bg-garmz-background border-garmz-border divide-garmz-border shadow-garmz-dropdown",
              // dark
              "dark:bg-dark-garmz-background dark:border-dark-garmz-border dark:divide-dark-garmz-border dark:shadow-dark-garmz-dropdown",
              spacing.twoXs.marginTop,
              spacing.twoXs.marginBottom,
              border.sm.all,
            )}
          >
            {children}
          </Listbox.Options>
        </>
      )}
    </Listbox>
  );
});

Select.displayName = "Select";

export default Select;
