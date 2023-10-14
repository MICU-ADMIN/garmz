import { makeClassName, garmzTwMerge } from "lib";
import React from "react";

const makeTableClassName = makeClassName("Table");

const Table = React.forwardRef<HTMLTableElement, React.TableHTMLAttributes<HTMLTableElement>>(
  (props, ref) => {
    const { children, className, ...other } = props;

    return (
      <div className={garmzTwMerge(makeTableClassName("root"), "overflow-auto", className)}>
        <table
          ref={ref}
          className={garmzTwMerge(
            makeTableClassName("table"),
            // common
            "w-full tabular-nums text-garmz-default",
            // light
            "text-garmz-content",
            // dark
            "dark:text-dark-garmz-content",
          )}
          {...other}
        >
          {children}
        </table>
      </div>
    );
  },
);

Table.displayName = "Table";

export default Table;
