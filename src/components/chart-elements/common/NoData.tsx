import { garmzTwMerge } from "lib";
import React from "react";
import { Flex } from "../../../components/layout-elements/Flex";
import { Text } from "../../../components/text-elements/Text";

interface NoDataProps {
  noDataText?: string;
}
const NoData = ({ noDataText = "No data" }: NoDataProps) => {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      className={garmzTwMerge(
        // common
        "w-full h-full border border-dashed rounded-garmz-default",
        // light
        "border-garmz-border",
        // dark
        "dark:border-dark-garmz-border",
      )}
    >
      <Text
        className={garmzTwMerge(
          // light
          "text-garmz-content",
          // dark
          "dark:text-dark-garmz-content",
        )}
      >
        {noDataText}
      </Text>
    </Flex>
  );
};

export default NoData;
