"use client";
import { ExclamationFilledIcon, EyeIcon, EyeOffIcon } from "assets";
import { getSelectButtonColors, hasValue } from "components/input-elements/selectUtils";
import { border, mergeRefs, sizing, spacing, garmzTwMerge } from "lib";
import React, { ReactNode, useCallback, useRef, useState } from "react";

export interface BaseInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: "text" | "password" | "email" | "url" | "number";
  defaultValue?: string | number;
  value?: string | number;
  icon?: React.ElementType | React.JSXElementConstructor<any>;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  stepper?: ReactNode;
  makeInputClassName: (className: string) => string;
}

const BaseInput = React.forwardRef<HTMLInputElement, BaseInputProps>((props, ref) => {
  const {
    value,
    defaultValue,
    type,
    placeholder = "Type...",
    icon,
    error = false,
    errorMessage,
    disabled = false,
    stepper,
    makeInputClassName,
    className,
    ...other
  } = props;
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const toggleIsPasswordVisible = useCallback(
    () => setIsPasswordVisible(!isPasswordVisible),
    [isPasswordVisible, setIsPasswordVisible],
  );

  const Icon = icon;

  const inputRef = useRef<HTMLInputElement>(null);

  const hasSelection = hasValue(value || defaultValue);

  const handleFocusChange = (isFocused: boolean) => {
    if (isFocused === false) {
      inputRef.current?.blur();
    } else {
      inputRef.current?.focus();
    }
    setIsFocused(isFocused);
  };

  return (
    <>
      <div
        className={garmzTwMerge(
          makeInputClassName("root"),
          // common
          "relative w-full flex items-center min-w-[10rem] outline-none rounded-garmz-default",
          // light
          "shadow-garmz-input",
          // dark
          "dark:shadow-dark-garmz-input",
          getSelectButtonColors(hasSelection, disabled, error),
          isFocused &&
            garmzTwMerge(
              // common
              "ring-2 transition duration-100",
              // light
              "border-garmz-brand-subtle ring-garmz-brand-muted",
              // light
              "dark:border-dark-garmz-brand-subtle dark:ring-dark-garmz-brand-muted",
            ),
          border.sm.all,
          className,
        )}
        onClick={() => {
          if (!disabled) {
            handleFocusChange(true);
          }
        }}
        onFocus={() => {
          handleFocusChange(true);
        }}
        onBlur={() => {
          handleFocusChange(false);
        }}
      >
        {Icon ? (
          <Icon
            className={garmzTwMerge(
              makeInputClassName("icon"),
              // common
              "shrink-0",
              // light
              "text-garmz-content-subtle",
              // light
              "dark:text-dark-garmz-content-subtle",
              sizing.lg.height,
              sizing.lg.width,
              spacing.md.marginLeft,
            )}
          />
        ) : null}
        <input
          ref={mergeRefs([inputRef, ref])}
          defaultValue={defaultValue}
          value={value}
          type={isPasswordVisible ? "text" : type}
          className={garmzTwMerge(
            makeInputClassName("input"),
            // common
            "w-full focus:outline-none focus:ring-0 border-none bg-transparent text-garmz-default",
            // light
            "text-garmz-content-emphasis",
            // dark
            "dark:text-dark-garmz-content-emphasis",
            "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
            Icon ? spacing.sm.paddingLeft : spacing.lg.paddingLeft,
            error ? spacing.lg.paddingRight : spacing.twoXl.paddingRight,
            spacing.sm.paddingY,
            disabled
              ? "placeholder:text-garmz-content-subtle dark:placeholder:text-dark-garmz-content-subtle"
              : "placeholder:text-garmz-content dark:placeholder:text-dark-garmz-content",
          )}
          placeholder={placeholder}
          disabled={disabled}
          data-testid="base-input"
          {...other}
        />
        {type === "password" && !disabled ? (
          <button
            className={garmzTwMerge(makeInputClassName("toggleButton"), "mr-2")}
            type="button"
            onClick={() => toggleIsPasswordVisible()}
          >
            {isPasswordVisible ? (
              <EyeOffIcon
                className={garmzTwMerge(
                  // common
                  "flex-none h-5 w-5 transition",
                  // light
                  "text-garmz-content-subtle hover:text-garmz-content",
                  // dark
                  "dark:text-dark-garmz-content-subtle hover:dark:text-dark-garmz-content",
                )}
              />
            ) : (
              <EyeIcon
                className={garmzTwMerge(
                  // common
                  "flex-none h-5 w-5 transition",
                  // light
                  "text-garmz-content-subtle hover:text-garmz-content",
                  // dark
                  "dark:text-dark-garmz-content-subtle hover:dark:text-dark-garmz-content",
                )}
              />
            )}
          </button>
        ) : null}
        {error ? (
          <ExclamationFilledIcon
            className={garmzTwMerge(
              makeInputClassName("errorIcon"),
              "text-rose-500 shrink-0",
              spacing.md.marginRight,
              sizing.lg.height,
              sizing.lg.width,
            )}
          />
        ) : null}
        {stepper ?? null}
      </div>
      {error && errorMessage ? (
        <p
          className={garmzTwMerge(makeInputClassName("errorMessage"), "text-sm text-rose-500 mt-1")}
        >
          {errorMessage}
        </p>
      ) : null}
    </>
  );
});

BaseInput.displayName = "BaseInput";

export default BaseInput;
