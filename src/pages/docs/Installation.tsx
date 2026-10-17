import { Link } from 'react-router'
import { CodeBlock } from '../../components/CodeBlock'
import { Section, SubHeading } from '../../components/docs'

export default function Installation () {
  return (
    <div className="prose-doc">
      <p>There are multiple ways for installing this library:</p>

      <p>
        You can install the library by downloading the distributed package and
        including them on your scripts. <Link to="/downloads">Go to Downloads page</Link>
      </p>

      <p className="mt-6">
        If you have <a href="https://www.npmjs.com/get-npm">npm</a>, you can install
        the library by running the command (recommended):
      </p>
      <CodeBlock plain code="npm install --save mp3tag.js@latest" className="mt-3" />

      <p className="mt-6">
        The source codes are written as an ES6 module so you can just copy the{' '}
        <code>src</code> folder and include them on your scripts as{' '}
        <code>module</code>
      </p>
      <CodeBlock plain code={'<script src="/path/to/mp3tag.mjs" type="module">'} className="mt-3" />

      <p className="mt-6">
        You can also use CDN services such as <a href="https://unpkg.com/">UNPKG</a>{' '}
        by including this line on your codes:
      </p>
      <CodeBlock plain code={'<script src="http://unpkg.com/mp3tag.js/dist/mp3tag.min.js">'} className="mt-3 mb-12" />

      <Section id="integrating-from-v2-v3" title="Integrating from v2 - v3">
        <SubHeading>Changes</SubHeading>

        <h4 className="mt-4 font-mono text-sm font-semibold">save()</h4>
        <p className="mt-1">
          <code>save</code> method default options are changed:
        </p>
        <ul>
          <li><code>id3v1.include</code> is set to false</li>
          <li><code>id3v2.unsynch</code> is set to false</li>
          <li><code>id3v2.footer</code> support is dropped</li>
        </ul>

        <h4 className="mt-6 font-mono text-sm font-semibold">mp3tag.errorCode</h4>
        <p className="mt-1">
          <code>mp3tag.errorCode</code> was removed (use <code>mp3tag.error</code> instead)
        </p>

        <h4 className="mt-6 font-mono text-sm font-semibold">mp3tag.tags</h4>
        <p className="mt-1">
          All ID3v2 tags (TIT2, TPE1, ...) are moved to <code>mp3tag.tags.v2</code>
        </p>
      </Section>
    </div>
  )
}
