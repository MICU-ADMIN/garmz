"use client";
import { useInternalState } from "hooks";
import { garmzTwMerge } from "lib";
import React, { useMemo, useState } from "react";

import { Combobox } from "@headlessui/react";
import { ArrowDownHeadIcon, XCircleIcon } from "assets";
import { border, makeClassName, sizing, spacing } from "lib";
import {
  constructValueToNameMapping,
  getFilteredOptions,
  getSelectButtonColors,
  hasValue,
} from "../selectUtils";

const makeSearchSelectClassName = makeClassName("SearchSelect");

export interface SearchSelectProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  icon?: React.ElementType | React.JSXElementConstructor<any>;
  enableClear?: boolean;
  children: React.ReactElement[] | React.ReactElement;
}

const makeSelectClassName = makeClassName("SearchSelect");

const SearchSelect = React.forwardRef<HTMLDivElement, SearchSelectProps>((props, ref) => {
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

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedValue, setSelectedValue] = useInternalState(defaultValue, value);

  const Icon = icon;
  const valueToNameMapping = useMemo(() => constructValueToNameMapping(children), [children]);
  const filteredOptions = useMemo(
    () => getFilteredOptions(searchQuery, children as React.ReactElement[]),
    [searchQuery, children],
  );

  const handleReset = () => {
    setSelectedValue("");
    setSearchQuery("");
    onValueChange?.("");
  };

  return (
    <Combobox
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
          <Combobox.Button className="w-full">
            {Icon && (
              <span
                className={garmzTwMerge(
                  "absolute inset-y-0 left-0 flex items-center ml-px",
                  spacing.md.paddingLeft,
                )}
              >
                <Icon
                  className={garmzTwMerge(
                    makeSearchSelectClassName("Icon"),
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

            <Combobox.Input
              className={garmzTwMerge(
                // common
                "w-full outline-none text-left whitespace-nowrap truncate rounded-garmz-default focus:ring-2 transition duration-100 text-garmz-default pr-14",
                // light
                "border-garmz-border shadow-garmz-input focus:border-garmz-brand-subtle focus:ring-garmz-brand-muted",
                // dark
                "dark:border-dark-garmz-border dark:shadow-dark-garmz-input dark:focus:border-dark-garmz-brand-subtle dark:focus:ring-dark-garmz-brand-muted",
                Icon ? "p-10 -ml-0.5" : spacing.lg.paddingLeft,
                spacing.sm.paddingY,
                border.sm.all,
                disabled
                  ? "placeholder:text-garmz-content-subtle dark:placeholder:text-garmz-content-subtle"
                  : "placeholder:text-garmz-content dark:placeholder:text-garmz-content",
                getSelectButtonColors(hasValue(value), disabled),
              )}
              placeholder={placeholder}
              onChange={(event) => setSearchQuery(event.target.value)}
              displayValue={(value: string) => valueToNameMapping.get(value) ?? ""}
            />
            <div
              className={garmzTwMerge(
                "absolute inset-y-0 right-0 flex items-center",
                spacing.md.paddingRight,
              )}
            >
              <ArrowDownHeadIcon
                className={garmzTwMerge(
                  makeSearchSelectClassName("arrowDownIcon"),
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
            </div>
          </Combobox.Button>
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
          {filteredOptions.length > 0 && (
            <Combobox.Options
              className={garmzTwMerge(
                // common
                "absolute z-10 divide-y overflow-y-auto max-h-[228px] w-full left-0 outline-none rounded-garmz-default text-garmz-default",
                // light
                "bg-garmz-background border-garmz-border divide-garmz-border shadow-garmz-dropdown",
                // dark
                "dark:bg-dark-garmz-background dark:border-dark-garmz-border dark:divide-dark-garmz-border dark:shadow-dark-garmz-dropdown",
                spacing.twoXs.marginTop,
                spacing.twoXs.marginBottom,
                border.sm.all,
              )}
            >
              {filteredOptions}
            </Combobox.Options>
          )}
        </>
      )}
    </Combobox>
  );
});

SearchSelect.displayName = "SearchSelect";

export default SearchSelect;
