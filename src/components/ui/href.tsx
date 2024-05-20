import * as React from "react";

export const Href = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a">
>((props, ref) => {
  return <a ref={ref} target="_blank" {...props} />;
});

Href.displayName = "Hyperlink";
