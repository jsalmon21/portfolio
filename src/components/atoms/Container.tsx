import * as React from "react";
import { cn } from "@/lib/utils";

type ContainerType = "div" | "footer" | "header" | "section";

interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  fluid?: boolean;
  type?: ContainerType;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({
  children,
  fluid,
  type = "div",
  className,
  ...props
}) => {
  const Component = type;
  return (
    <Component
      className={cn(fluid ? "px-8 w-full" : "container", "mx-auto", className)}
      {...props}
    >
      {children}
    </Component>
  );
};

export { Container };
