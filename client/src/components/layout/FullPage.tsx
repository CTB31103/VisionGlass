import clsx from "clsx";
import React, { type PropsWithChildren } from "react";
import lodash from "lodash";

export const FullPage = (
  props: PropsWithChildren<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    > & { screen?: boolean }
  >,
) => {
  const divProps = lodash.omit(props, "screen");
  return (
    <div
      {...divProps}
      className={clsx(
        "w-full",
        props.screen ? "min-h-screen" : "min-h-full",
        props.className,
      )}
    >
      {props.children}
    </div>
  );
};
