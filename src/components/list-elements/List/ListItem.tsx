import { garmzTwMerge } from "lib";
import React from "react";

import { makeClassName, spacing } from "lib";

const makeListItemClassName = makeClassName("ListItem");

const ListItem = React.forwardRef<HTMLLIElement, React.HTMLAttributes<HTMLLIElement>>(
  (props, ref) => {
    const { children, className, ...other } = props;
    return (
      <>
        <li
          ref={ref}
          className={garmzTwMerge(
            makeListItemClassName("root"),
            // common
            "w-full flex justify-between items-center truncate tabular-nums text-garmz-default",
            spacing.sm.paddingY,
            className,
          )}
          {...other}
        >
          {children}
        </li>
      </>
    );
  },
);

ListItem.displayName = "ListItem";

export default ListItem;
