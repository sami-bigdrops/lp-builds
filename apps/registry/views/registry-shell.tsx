import Link from "next/link"

import { getSectionNavItems } from "@/controllers/sections-controller"

type RegistryShellProps = {
  children: React.ReactNode
}

export function RegistryShell({ children }: RegistryShellProps) {
  const navItems = getSectionNavItems()

  return (
    <div className="flex min-h-svh">
      <aside className="flex w-56 shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
        <div className="border-b border-sidebar-border px-4 py-4">
          <Link
            href="/"
            className="text-sm font-medium tracking-tight text-sidebar-foreground hover:text-sidebar-primary"
          >
            Section registry
          </Link>
          <p className="mt-1 text-xs text-muted-foreground">
            Landing page sections
          </p>
        </div>

        <nav className="flex flex-1 flex-col gap-1 p-3" aria-label="Sections">
          <Link
            href="/sections"
            className="rounded-md px-2 py-1.5 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            All sections
          </Link>

          {navItems.length === 0 ? (
            <p className="px-2 py-3 text-xs text-muted-foreground">
              No sections yet
            </p>
          ) : (
            <ul className="mt-2 flex flex-col gap-0.5">
              {navItems.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={item.href}
                    className="block rounded-md px-2 py-1.5 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </nav>
      </aside>

      <main className="min-w-0 flex-1 bg-background">{children}</main>
    </div>
  )
}
