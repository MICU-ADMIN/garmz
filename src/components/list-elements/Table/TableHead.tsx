import { makeClassName, garmzTwMerge } from "lib";
import React from "react";

const makeTableHeadClassName = makeClassName("TableHead");

const TableHead = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>((props, ref) => {
  const { children, className, ...other } = props;
  return (
    <>
      <thead
        ref={ref}
        className={garmzTwMerge(
          makeTableHeadClassName("root"),
          // common
          "text-left",
          // light
          "text-garmz-content",
          // dark
          "dark:text-dark-garmz-content",
          className,
        )}
        {...other}
      >
        {children}
      </thead>
    </>
  );
});

TableHead.displayName = "TableHead";

export default TableHead;
