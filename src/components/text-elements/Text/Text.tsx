import { garmzTwMerge } from "lib";
import React from "react";

import { getColorClassNames } from "lib";
import { colorPalette } from "lib/theme";
import { Color } from "../../../lib/inputTypes";

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  color?: Color;
}

const Text = React.forwardRef<HTMLParagraphElement, TextProps>((props, ref) => {
  const { color, className, children } = props;
  return (
    <p
      ref={ref}
      className={garmzTwMerge(
        // common
        "text-garmz-default",
        color
          ? getColorClassNames(color, colorPalette.text).textColor
          : garmzTwMerge(
              // light
              "text-garmz-content",
              // dark
              "dark:text-dark-garmz-content",
            ),
        className,
      )}
    >
      {children}
    </p>
  );
});

Text.displayName = "Text";

export default Text;
