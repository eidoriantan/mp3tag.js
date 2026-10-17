import { CopyButton } from './CopyButton'

export function InstallCommand ({ command }: { command: string }) {
  return (
    <div className="inline-flex max-w-full items-center gap-3 rounded-xl border border-border bg-surface py-1.5 pr-1.5 pl-4 font-mono text-sm">
      <span className="select-none text-muted" aria-hidden="true">$</span>
      <code className="overflow-x-auto whitespace-nowrap">{command}</code>
      <CopyButton text={command} />
    </div>
  )
}
