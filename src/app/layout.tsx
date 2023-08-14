import { ReactNode } from "react";
import "../styles/global.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Hub Desk",
};

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
};

export default Layout;
