import { Entry, Section } from '../../components/docs'
import { methods, properties, type Member } from './data/mp3tag'

function MemberEntry ({ member }: { member: Member }) {
  return (
    <Entry id={member.id} kind={member.kind} name={member.name} meta={member.meta} code={member.code}>
      {member.description}
    </Entry>
  )
}

export default function MP3TagClass () {
  return (
    <div className="prose-doc">
      <Section id="properties" title="Properties">
        {properties.map((member) => <MemberEntry key={member.id} member={member} />)}
      </Section>

      <Section id="methods" title="Methods">
        {methods.map((member) => <MemberEntry key={member.id} member={member} />)}
      </Section>
    </div>
  )
}
