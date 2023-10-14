import { makeClassName, garmzTwMerge } from "lib";
import React from "react";

const makeTableFootClassName = makeClassName("TableFoot");

const TableFoot = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>((props, ref) => {
  const { children, className, ...other } = props;
  return (
    <>
      <tfoot
        ref={ref}
        className={garmzTwMerge(
          makeTableFootClassName("root"),
          // common
          "text-left font-medium border-t-[1px] ",
          // light
          "text-garmz-content border-garmz-border",
          // dark
          "dark:text-dark-garmz-content dark:border-dark-garmz-border",
          className,
        )}
        {...other}
      >
        {children}
      </tfoot>
    </>
  );
});

TableFoot.displayName = "TableFoot";

export default TableFoot;
