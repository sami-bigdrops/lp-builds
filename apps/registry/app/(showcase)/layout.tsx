import { RegistryShell } from "@/views/registry-shell"

export default function ShowcaseLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <RegistryShell>{children}</RegistryShell>
}
