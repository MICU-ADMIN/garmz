import { garmzTwMerge } from "lib";
import React from "react";

import { getColorClassNames } from "lib";
import { colorPalette } from "lib/theme";
import { Color } from "../../../lib";

export interface TitleProps extends React.HTMLAttributes<HTMLParagraphElement> {
  color?: Color;
}

const Title = React.forwardRef<HTMLParagraphElement, TitleProps>((props, ref) => {
  const { color, children, className, ...other } = props;
  return (
    <p
      ref={ref}
      className={garmzTwMerge(
        // common
        "font-medium text-garmz-title",
        color
          ? getColorClassNames(color, colorPalette.darkText).textColor
          : "text-garmz-content-emphasis dark:text-dark-garmz-content-emphasis",
        className,
      )}
      {...other}
    >
      {children}
    </p>
  );
});

Title.displayName = "Title";

export default Title;
