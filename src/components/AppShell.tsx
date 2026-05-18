import type { ReactNode } from 'react'

type AppShellProps = {
  children: ReactNode
}

export const AppShell = ({ children }: AppShellProps) => {
  return (
    <div className="app-shell text-sumi">
      <div className="app-shell__content mx-auto min-h-screen w-full max-w-content px-[21px] pb-[calc(55px+var(--safe-area-bottom))] pt-[calc(55px+var(--safe-area-top))]">
        {children}
      </div>
    </div>
  )
}
