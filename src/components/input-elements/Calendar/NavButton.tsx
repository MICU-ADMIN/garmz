import { Icon as IconComponent } from "components/icon-elements";
import { garmzTwMerge } from "lib";
import React from "react";

interface NavButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  icon: React.ElementType;
}

export const NavButton = ({ onClick, icon, ...other }: NavButtonProps) => {
  const Icon = icon;
  return (
    <button
      type="button"
      className={garmzTwMerge(
        "flex items-center justify-center p-1 h-7 w-7 outline-none focus:ring-2 transition duration-100 border border-garmz-border dark:border-dark-garmz-border hover:bg-garmz-background-muted dark:hover:bg-dark-garmz-background-muted rounded-garmz-small focus:border-garmz-brand-subtle select-none dark:focus:border-dark-garmz-brand-subtle focus:ring-garmz-brand-muted dark:focus:ring-dark-garmz-brand-muted text-garmz-content-subtle dark:text-dark-garmz-content-subtle hover:text-garmz-content dark:hover:text-dark-garmz-content",
      )}
      {...other}
    >
      <IconComponent onClick={onClick} icon={Icon} variant="simple" color="slate" size="xs" />
    </button>
  );
};
