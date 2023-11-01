import * as React from "react"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"


const alertVariants = cva(
  "w-full flex items-center rounded-lg px-4 py-3 text-sm [&>svg]:text-foreground [&>svg]:mr-2",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        success: "border-success/50 bg-success text-white [&>svg]:text-white",
        destructive: "border-destructive/50 bg-destructive text-white [&>svg]:text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props} />
))
Alert.displayName = "Alert"

const AlertDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props} />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertDescription }