import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
export default function Layout({ children }: Props) {
  return <main className="mb-8">{children}</main>;
}
