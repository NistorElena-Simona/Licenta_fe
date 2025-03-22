import { NextUIProvider } from "@nextui-org/system";
import React from "react";


export function NextUI({children}: { children: React.ReactNode }) {
    return (
      <NextUIProvider>
        {children}
      </NextUIProvider>
    )
  }