import { makeClassName, garmzTwMerge } from "lib";
import React from "react";

const makeRowClassName = makeClassName("TableRow");

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  (props, ref) => {
    const { children, className, ...other } = props;
    return (
      <>
        <tr ref={ref} className={garmzTwMerge(makeRowClassName("row"), className)} {...other}>
          {children}
        </tr>
      </>
    );
  },
);

TableRow.displayName = "TableRow";

export default TableRow;
