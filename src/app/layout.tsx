import "@/app/styles/globals.css";
import { ReactNode } from "react";
import { TemperatureProvider } from "@/app/context/TemperatureContext";

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <TemperatureProvider>{children}</TemperatureProvider>
      </body>
    </html>
  );
}
