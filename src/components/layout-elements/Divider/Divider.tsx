import { makeClassName, garmzTwMerge } from "lib";
import React from "react";

const makeDividerClassName = makeClassName("Divider");

const Divider = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => {
    const { className, children, ...other } = props;
    return (
      <div
        ref={ref}
        className={garmzTwMerge(
          makeDividerClassName("root"),
          // common
          "w-full mx-auto my-6 flex justify-between gap-3 items-center text-garmz-default",
          // light
          "text-garmz-content",
          // dark
          "dark:text-dark-garmz-content",
          className,
        )}
        {...other}
      >
        {children ? (
          <>
            <div
              className={garmzTwMerge("w-full h-[1px] bg-garmz-border dark:bg-dark-garmz-border")}
            />
            <div className={garmzTwMerge("text-inherit whitespace-nowrap")}>{children}</div>
            <div
              className={garmzTwMerge("w-full h-[1px] bg-garmz-border dark:bg-dark-garmz-border")}
            />
          </>
        ) : (
          <div
            className={garmzTwMerge("w-full h-[1px] bg-garmz-border dark:bg-dark-garmz-border")}
          />
        )}
      </div>
    );
  },
);

Divider.displayName = "Divider";

export default Divider;
