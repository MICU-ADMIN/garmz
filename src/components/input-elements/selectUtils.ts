import { garmzTwMerge } from "lib";
import React from "react";

export interface SelectItemProps {
  value: string;
  children?: React.ReactNode;
}

export const getNodeText = (node: React.ReactElement): string | React.ReactElement | undefined => {
  if (["string", "number"].includes(typeof node)) return node;
  if (node instanceof Array) return node.map(getNodeText).join("");
  if (typeof node === "object" && node) return getNodeText(node.props.children);
};

export function constructValueToNameMapping(children: React.ReactElement[] | React.ReactElement) {
  const valueToNameMapping = new Map<string, string>();
  React.Children.map(children, (child: React.ReactElement<SelectItemProps>) => {
    valueToNameMapping.set(child.props.value, (getNodeText(child) ?? child.props.value) as string);
  });
  return valueToNameMapping;
}

export function getFilteredOptions(
  searchQuery: string,
  children: React.ReactElement[],
): React.ReactElement[] {
  return React.Children.map(children, (child) => {
    const optionText = (getNodeText(child) ?? child.props.value) as string;
    if (optionText.toLowerCase().includes(searchQuery.toLowerCase())) return child;
  });
}

export const getSelectButtonColors = (
  hasSelection: boolean,
  isDisabled: boolean,
  hasError = false,
) => {
  return garmzTwMerge(
    isDisabled
      ? "bg-garmz-background-subtle dark:bg-dark-garmz-background-subtle"
      : "bg-garmz-background dark:bg-dark-garmz-background",
    !isDisabled && "hover:bg-garmz-background-muted dark:hover:bg-dark-garmz-background-muted",
    hasSelection
      ? "text-garmz-content-emphasis dark:text-dark-garmz-content-emphasis"
      : "text-garmz-content dark:text-dark-garmz-content",
    isDisabled && "text-garmz-content-subtle dark:text-dark-garmz-content-subtle",
    hasError && "text-rose-500",
    hasError ? "border-rose-500" : "border-garmz-border dark:border-dark-garmz-border",
  );
};

export function hasValue<T>(value: T | null | undefined) {
  return value !== null && value !== undefined && value !== "";
}
