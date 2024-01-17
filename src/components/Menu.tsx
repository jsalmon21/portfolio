"use client";

import * as React from "react";
import * as MenuPrimative from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const Menu = MenuPrimative.Root;

const MenuTrigger = MenuPrimative.Trigger;

const MenuClose = MenuPrimative.Close;

const MenuPortal = MenuPrimative.Portal;

const MenuOverlay = React.forwardRef<
  React.ElementRef<typeof MenuPrimative.Overlay>,
  React.ComponentPropsWithoutRef<typeof MenuPrimative.Overlay>
>(({ className, ...props }, ref) => (
  <MenuPrimative.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
));
MenuOverlay.displayName = MenuPrimative.Overlay.displayName;

const menuVariants = cva(
  "fixed z-50 gap-4 bg-black border-zinc-600 p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-full sm:w-3/4 sm:border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-full sm:w-3/4 sm:border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
);

interface MenuContentProps
  extends React.ComponentPropsWithoutRef<typeof MenuPrimative.Content>,
    VariantProps<typeof menuVariants> {}

const MenuContent = React.forwardRef<
  React.ElementRef<typeof MenuPrimative.Content>,
  MenuContentProps
>(({ side = "right", className, children, ...props }, ref) => (
  <MenuPortal>
    <MenuOverlay />
    <MenuPrimative.Content
      ref={ref}
      className={cn(menuVariants({ side }), className)}
      {...props}
    >
      {children}
      <MenuPrimative.Close
        aria-label="Close Menu"
        className="absolute right-8 top-6 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary"
      >
        <X />
      </MenuPrimative.Close>
    </MenuPrimative.Content>
  </MenuPortal>
));
MenuContent.displayName = MenuPrimative.Content.displayName;

const MenuHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
);
MenuHeader.displayName = "MenuHeader";

const MenuFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
);
MenuFooter.displayName = "MenuFooter";

const MenuTitle = React.forwardRef<
  React.ElementRef<typeof MenuPrimative.Title>,
  React.ComponentPropsWithoutRef<typeof MenuPrimative.Title>
>(({ className, ...props }, ref) => (
  <MenuPrimative.Title
    ref={ref}
    className={cn("text-lg font-semibold text-foreground", className)}
    {...props}
  />
));
MenuTitle.displayName = MenuPrimative.Title.displayName;

const MenuDescription = React.forwardRef<
  React.ElementRef<typeof MenuPrimative.Description>,
  React.ComponentPropsWithoutRef<typeof MenuPrimative.Description>
>(({ className, ...props }, ref) => (
  <MenuPrimative.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
MenuDescription.displayName = MenuPrimative.Description.displayName;

export {
  Menu,
  MenuPortal,
  MenuOverlay,
  MenuTrigger,
  MenuClose,
  MenuContent,
  MenuHeader,
  MenuFooter,
  MenuTitle,
  MenuDescription,
};
