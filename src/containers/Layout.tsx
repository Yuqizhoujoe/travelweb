import React from "react";

export default function Layout({ children }: { children: any }) {
  return <div className="app-container max-h-full h-svh">{children}</div>;
}
