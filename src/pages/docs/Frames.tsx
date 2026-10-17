import { CircleDot } from 'lucide-react'
import { Callout, Entry, Section } from '../../components/docs'
import { FRAME_REQUEST_URL, ISO_639_2, tagsProperties, v1Frames, v2Frames } from './data/frames'

export default function Frames () {
  return (
    <div className="prose-doc">
      <Section id="tags" title={<span><code>tags</code> Properties</span>}>
        {tagsProperties.map((property) => (
          <Entry key={property.name} id={`tags-${property.name.toLowerCase()}`} name={property.name} meta={[`Type: ${property.type}`]}>
            <p>{property.description}</p>
          </Entry>
        ))}
      </Section>

      <Section id="v1" title={<span><code>tags.v1</code> ID3v1 Frames</span>}>
        {v1Frames.map((name) => (
          <Entry key={name} id={`v1-${name}`} name={name} meta={['Type: string']} />
        ))}
      </Section>

      <Section id="v2" title={<span><code>tags.v2</code> ID3v2 Frames</span>}>
        <Callout
          action={
            <a href={FRAME_REQUEST_URL} className="btn btn-secondary h-8 px-3 no-underline">
              <CircleDot className="size-4" aria-hidden="true" />
              Submit an issue
            </a>
          }
        >
          <strong>Note:</strong> ID3v2 Frames that are not mentioned here are not
          currently supported. Feel free to submit an issue!
        </Callout>

        <Callout>
          <strong>Note:</strong> All string-typed frames are separated by '\\' and
          should not contain newline characters.
        </Callout>

        <Callout>
          <strong>Note:</strong> If strict mode is enabled, all languages must follow{' '}
          <a href={ISO_639_2}>ISO 639-2</a>.
        </Callout>

        <div className="mt-8">
          {v2Frames.map((frame) => (
            <Entry
              key={frame.id}
              id={frame.id}
              name={frame.title}
              mono={false}
              meta={[`ID: ${frame.frameId}`, `Type: ${frame.type}`]}
              code={frame.code}
            >
              {typeof frame.description === 'string' ? <p>{frame.description}</p> : frame.description}
            </Entry>
          ))}
        </div>
      </Section>
    </div>
  )
}
