import { garmzTwMerge } from "lib";
import React from "react";

import { makeClassName } from "lib";

const makeListClassName = makeClassName("List");

const List = React.forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(
  (props, ref) => {
    const { children, className, ...other } = props;
    return (
      <ul
        ref={ref}
        className={garmzTwMerge(
          makeListClassName("root"),
          // common
          "w-full overflow-hidden divide-y",
          // light
          "divide-garmz-border text-garmz-content",
          // dark
          "dark:divide-dark-garmz-border dark:text-dark-garmz-content",
          className,
        )}
        {...other}
      >
        {children}
      </ul>
    );
  },
);

List.displayName = "List";

export default List;
