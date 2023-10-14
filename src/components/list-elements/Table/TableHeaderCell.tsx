import { makeClassName, spacing, garmzTwMerge } from "lib";
import React from "react";

const makeTableHeaderCellClassName = makeClassName("TableHeaderCell");

const TableHeaderCell = React.forwardRef<
  HTMLTableCellElement,
  React.HTMLAttributes<HTMLTableCellElement>
>((props, ref) => {
  const { children, className, ...other } = props;
  return (
    <>
      <th
        ref={ref}
        className={garmzTwMerge(
          makeTableHeaderCellClassName("root"),
          // common
          "sticky whitespace-nowrap text-left font-semibold",
          // light
          "text-garmz-content",
          // dark
          "dark:text-dark-garmz-content",
          spacing.none.top,
          spacing.twoXl.paddingX,
          spacing.xl.paddingY,
          className,
        )}
        {...other}
      >
        {children}
      </th>
    </>
  );
});

TableHeaderCell.displayName = "TableHeaderCell";

export default TableHeaderCell;
