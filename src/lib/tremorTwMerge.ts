import { extendTailwindMerge } from "tailwind-merge";

export const garmzTwMerge = extendTailwindMerge({
  classGroups: {
    boxShadow: [
      {
        shadow: [
          {
            garmz: ["input", "card", "dropdown"],
            "dark-garmz": ["input", "card", "dropdown"],
          },
        ],
      },
    ],
    borderRadius: [
      {
        rounded: [
          {
            garmz: ["small", "default", "full"],
            "dark-garmz": ["small", "default", "full"],
          },
        ],
      },
    ],
    fontSize: [
      {
        text: [
          {
            garmz: ["default", "title", "metric"],
            "dark-garmz": ["default", "title", "metric"],
          },
        ],
      },
    ],
  },
});
