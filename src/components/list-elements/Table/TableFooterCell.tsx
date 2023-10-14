import { makeClassName, spacing, garmzTwMerge } from "lib";
import React from "react";

const makeTableFooterCellClassName = makeClassName("TableFooterCell");

const TableFooterCell = React.forwardRef<
  HTMLTableCellElement,
  React.HTMLAttributes<HTMLTableCellElement>
>((props, ref) => {
  const { children, className, ...other } = props;
  return (
    <>
      <th
        ref={ref}
        className={garmzTwMerge(
          makeTableFooterCellClassName("root"),
          // common
          //"whitespace-nowrap text-left font-semibold",
          // light
          "text-garmz-content font-medium",
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

TableFooterCell.displayName = "TableFooterCell";

export default TableFooterCell;
