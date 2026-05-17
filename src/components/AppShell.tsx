import type { ReactNode } from 'react'

type AppShellProps = {
  children: ReactNode
}

export const AppShell = ({ children }: AppShellProps) => {
  return (
    <div className="min-h-screen bg-washi text-sumi">
      <div className="mx-auto min-h-screen w-full max-w-content px-[21px] pb-[34px] pt-[34px]">
        {children}
      </div>
    </div>
  )
}
