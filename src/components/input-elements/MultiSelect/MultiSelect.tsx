"use client";
import { garmzTwMerge } from "lib";
import React, { useMemo, useState } from "react";

import { SelectedValueContext } from "contexts";

import { useInternalState } from "hooks";

import { ArrowDownHeadIcon, SearchIcon, XCircleIcon } from "assets";

import { Listbox } from "@headlessui/react";
import XIcon from "assets/XIcon";
import { border, makeClassName, sizing, spacing } from "lib";
import { getFilteredOptions, getSelectButtonColors } from "../selectUtils";

const makeMultiSelectClassName = makeClassName("MultiSelect");

export interface MultiSelectProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string[];
  value?: string[];
  onValueChange?: (value: string[]) => void;
  placeholder?: string;
  placeholderSearch?: string;
  disabled?: boolean;
  icon?: React.ElementType | React.JSXElementConstructor<any>;
  children: React.ReactElement[] | React.ReactElement;
}

const MultiSelect = React.forwardRef<HTMLDivElement, MultiSelectProps>((props, ref) => {
  const {
    defaultValue,
    value,
    onValueChange,
    placeholder = "Select...",
    placeholderSearch = "Search",
    disabled = false,
    icon,
    children,
    className,
    ...other
  } = props;

  const Icon = icon;

  const [selectedValue, setSelectedValue] = useInternalState(defaultValue, value);
  const [searchQuery, setSearchQuery] = useState("");

  // checked if there are selected options
  // used the same code from the previous version
  const selectedItems = selectedValue ?? [];
  const hasSelection = selectedItems.length > 0;

  const filteredOptions = useMemo(
    () => getFilteredOptions(searchQuery, children as React.ReactElement[]),
    [searchQuery, children],
  );

  const handleReset = () => {
    setSelectedValue([]);
    onValueChange?.([]);
  };

  return (
    <Listbox
      as="div"
      ref={ref}
      defaultValue={selectedValue}
      value={selectedValue}
      onChange={
        ((values: string[]) => {
          onValueChange?.(values);
          setSelectedValue(values);
        }) as any
      }
      disabled={disabled}
      className={garmzTwMerge(
        // common
        "w-full min-w-[10rem] relative text-garmz-default",
        className,
      )}
      {...other}
      multiple
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
              spacing.xs.paddingY,
              border.sm.all,
              getSelectButtonColors(value.length > 0, disabled),
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
                    makeMultiSelectClassName("Icon"),
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
            <div className="h-6 flex items-center">
              {value.length > 0 ? (
                <div className="flex flex-nowrap overflow-x-scroll [&::-webkit-scrollbar]:hidden [scrollbar-width:none] gap-x-1 mr-5 -ml-1.5 relative">
                  {filteredOptions
                    .filter((option) => value.includes(option.props.value))
                    .map((option, index) => {
                      return (
                        <div
                          key={index}
                          className={garmzTwMerge(
                            "max-w-[100px] lg:max-w-[200px] flex justify-center items-center pl-2 pr-1.5 py-1 font-medium",
                            "rounded-garmz-small",
                            "bg-garmz-background-muted dark:bg-dark-garmz-background-muted",
                            "bg-garmz-background-subtle dark:bg-dark-garmz-background-subtle",
                            "text-garmz-content-default dark:text-dark-garmz-content-default",
                            "text-garmz-content-emphasis dark:text-dark-garmz-content-emphasis",
                          )}
                        >
                          <div className="text-xs truncate ">
                            {option.props.children ?? option.props.value}
                          </div>
                          <div
                            onClick={(e) => {
                              e.preventDefault();
                              const newValue = value.filter((v) => v !== option.props.value);
                              onValueChange?.(newValue);
                              setSelectedValue(newValue);
                            }}
                          >
                            <XIcon
                              className={garmzTwMerge(
                                makeMultiSelectClassName("clearIconItem"),
                                // common
                                "cursor-pointer rounded-garmz-full w-3.5 h-3.5 ml-2",
                                // light
                                "text-garmz-content-subtle hover:text-garmz-content",
                                // dark
                                "dark:text-dark-garmz-content-subtle dark:hover:text-garmz-content",
                              )}
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>
              ) : (
                <span>{placeholder}</span>
              )}
            </div>
            <span
              className={garmzTwMerge(
                "absolute inset-y-0 right-0 flex items-center",
                spacing.md.marginRight,
              )}
            >
              <ArrowDownHeadIcon
                className={garmzTwMerge(
                  makeMultiSelectClassName("arrowDownIcon"),
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

          {/* coditionally showed XCircle */}
          {hasSelection && !disabled ? (
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
                  makeMultiSelectClassName("clearIconAllItems"),
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
            <div
              className={garmzTwMerge(
                // common
                "flex items-center w-full",
                // light
                "bg-garmz-background-muted",
                // dark
                "dark:bg-dark-garmz-background-muted",
                spacing.md.paddingX,
              )}
            >
              <span>
                <SearchIcon
                  className={garmzTwMerge(
                    // common
                    "flex-none",
                    // light
                    "text-garmz-content-subtle",
                    // dark
                    "dark:text-dark-garmz-content-subtle",
                    spacing.sm.marginRight,
                    sizing.md.height,
                    sizing.md.width,
                  )}
                />
              </span>
              <input
                name="search"
                type="input"
                autoComplete="off"
                placeholder={placeholderSearch}
                className={garmzTwMerge(
                  // common
                  "w-full focus:outline-none focus:ring-none bg-transparent text-garmz-default",
                  // light
                  "text-garmz-content-emphasis",
                  // dark
                  "dark:text-dark-garmz-content-emphasis",
                  spacing.sm.paddingY,
                )}
                onKeyDown={(e) => {
                  if (e.code === "Space" && (e.target as HTMLInputElement).value !== "") {
                    e.stopPropagation();
                  }
                }}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <SelectedValueContext.Provider value={{ selectedValue: value }}>
              {filteredOptions}
            </SelectedValueContext.Provider>
          </Listbox.Options>
        </>
      )}
    </Listbox>
  );
});

MultiSelect.displayName = "MultiSelect";

export default MultiSelect;
