import { Link } from 'react-router'
import { AppWindow, ArrowRight, Code, Pencil, ShieldCheck } from 'lucide-react'
import { GithubIcon } from '../components/GithubIcon'
import { InstallCommand } from '../components/InstallCommand'
import { REPOSITORY_URL, SITE_SOURCE_URL } from '../config'
import { usePageMeta } from '../hooks/usePageMeta'
import { getPage } from '../site'

const features = [
  {
    icon: Code,
    title: 'Open Source',
    body: (
      <>
        It is an open-sourced project and free for everyone to use! You can view
        the source codes at <a href={REPOSITORY_URL}>GitHub</a>
      </>
    )
  },
  {
    icon: AppWindow,
    title: 'Node & Browser',
    body: (
      <>
        It can run on both <a href="https://nodejs.org">Node.js</a> and browsers.
        It was transpiled with <a href="https://babeljs.io/">Babel</a> to support
        the older browsers
      </>
    )
  },
  {
    icon: ShieldCheck,
    title: 'Standards Compliant',
    body: (
      <>
        It follows the <a href="http://id3.org">ID3 Specifications</a> and can
        validate the user's inputs to comply with the standards
      </>
    )
  }
]

export default function Home () {
  usePageMeta(getPage('/'))

  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
      <section className="flex flex-col items-center py-20 text-center sm:py-28" itemScope itemType="http://schema.org/SoftwareSourceCode">
        <img src="/images/logo.png" alt="" width="64" height="64" className="mb-8 size-16" />
        <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl" itemProp="name">mp3tag.js</h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-balance text-muted" itemProp="abstract">
          <i>mp3tag.js</i> is an open sourced{' '}
          <span itemProp="programmingLanguage">JavaScript</span>{' '}
          library used to edit the metadata of audio files. Licensed under the{' '}
          <a href="https://choosealicense.com/licenses/mit/" className="text-fg underline decoration-border underline-offset-4 hover:decoration-fg" itemProp="license">MIT License</a>.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4">
          <a href={REPOSITORY_URL} className="btn btn-primary h-11 px-5 text-[15px]" itemProp="codeRepository">
            <GithubIcon className="size-[18px]" />
            Visit GitHub repository
          </a>
          <InstallCommand command="npm install mp3tag.js" />
        </div>
      </section>

      <section className="border-t border-border py-20">
        <h2 className="text-center text-3xl font-semibold tracking-tight">Features</h2>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {features.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-2xl border border-border p-6">
              <div className="flex size-10 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <Icon className="size-5" aria-hidden="true" />
              </div>
              <h3 className="mt-5 font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted [&_a]:text-fg [&_a]:underline [&_a]:decoration-border [&_a]:underline-offset-2 [&_a:hover]:decoration-fg">
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 border-t border-border py-20 md:grid-cols-2">
        <div className="flex flex-col items-start rounded-2xl bg-surface p-8">
          <h2 className="text-2xl font-semibold tracking-tight">Editor</h2>
          <p className="mt-3 flex-1 leading-7 text-muted">
            You can use this editor as a live demonstration. The source codes are
            available at{' '}
            <a href={SITE_SOURCE_URL} className="text-fg underline decoration-border underline-offset-2 hover:decoration-fg">GitHub</a>.
            It also works offline so no worries about uploading your files.
          </p>
          <Link to="/editor" className="btn btn-secondary mt-6">
            <Pencil className="size-4" aria-hidden="true" />
            Editor
          </Link>
        </div>

        <div className="flex flex-col items-start rounded-2xl bg-surface p-8">
          <h2 className="text-2xl font-semibold tracking-tight">Documentations</h2>
          <p className="mt-3 flex-1 leading-7 text-muted">
            You can read the full documentations{' '}
            <Link to="/docs" className="text-fg underline decoration-border underline-offset-2 hover:decoration-fg">here</Link>.
          </p>
          <Link to="/docs" className="btn btn-secondary mt-6">
            Read the docs
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  )
}
