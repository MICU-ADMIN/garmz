"use client";
import { garmzTwMerge } from "lib";
import React from "react";

import { RootStylesContext } from "contexts";
import { border, makeClassName } from "lib";

const makeAccordionListClassName = makeClassName("AccordionList");

export interface AccordionListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactElement[] | React.ReactElement;
}

const AccordionList = React.forwardRef<HTMLDivElement, AccordionListProps>((props, ref) => {
  const { children, className, ...other } = props;
  const numChildren = React.Children.count(children);

  return (
    <div
      ref={ref}
      className={garmzTwMerge(
        makeAccordionListClassName("root"),
        // common
        "rounded-garmz-default",
        // light
        "shadow-garmz-card",
        // dark
        "dark:shadow-dark-garmz-card",
        className,
      )}
      {...other}
    >
      {React.Children.map(children, (child, idx) => {
        if (idx === 0) {
          return (
            <RootStylesContext.Provider
              value={garmzTwMerge(
                "rounded-t-garmz-default",
                border.sm.left,
                border.sm.top,
                border.sm.right,
                border.sm.bottom,
              )}
            >
              {React.cloneElement(child)}
            </RootStylesContext.Provider>
          );
        }
        if (idx === numChildren - 1) {
          return (
            <RootStylesContext.Provider
              value={garmzTwMerge(
                "rounded-b-garmz-default",
                border.sm.left,
                border.sm.right,
                border.sm.bottom,
              )}
            >
              {React.cloneElement(child)}
            </RootStylesContext.Provider>
          );
        }
        return (
          <RootStylesContext.Provider
            value={garmzTwMerge(border.sm.left, border.sm.right, border.sm.bottom)}
          >
            {React.cloneElement(child)}
          </RootStylesContext.Provider>
        );
      })}
    </div>
  );
});

AccordionList.displayName = "AccordionList";

export default AccordionList;
