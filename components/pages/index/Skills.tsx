import skillData from "./Skills.data";
import type { skillProps } from "./Skills.data";
import PageSection from "../../misc/PageSection";

const SkillPoint = (props: skillProps) => {
  const { title, icon, tags, more } = props;

  return (
    <div className="flex w-1/3 py-1 px-1 box-border">
      <span className="text-2xl mr-2 text-secondary">
        <i className={icon}/>
      </span>
      <div className="flex flex-col">
        <span className="text-sm uppercase">{ title }</span>
        <span className="text-xs text-tertiary">
          {tags.join(", ")}
          { more && <span>&#8230;</span> }
        </span>
      </div>
    </div>
  )
}

const Skills = () => (
  <PageSection title="Skills & Expertise" alternate>
    <div className="flex flex-wrap w-full">
      { skillData.map(skill => <SkillPoint {...skill} key={`skill-${skill.title}`}/> )}
    </div>
  </PageSection>
)

export default Skills;
