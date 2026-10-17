import { OWNER } from '../config'

export function Footer () {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-8 text-center text-sm text-muted sm:px-6">
        Copyright &copy; 2020 - {new Date().getFullYear()},{' '}
        <a href={OWNER.url} className="text-fg hover:text-accent">@{OWNER.login}</a>
      </div>
    </footer>
  )
}
