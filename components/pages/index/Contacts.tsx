import { joinClasses } from "../../../lib/utilities";

import contactTags from "./Contacts.data";
import type { contactTagProps } from "./Contacts.data";

const ContactPoint = (props: contactTagProps) => {
  const { text, icon, href } = props;

  const BaseTag = href ? "a" : "div";

  return (
    <BaseTag href={href} className="tag">
      <span className="text-secondary mr-1">
        <i className={joinClasses(icon, "text-base")}/>
      </span>
      <span className="text-sm">{ text }</span>
    </BaseTag>
  )
}

const Contacts = () => (
  <>
    { contactTags.map(tag => <ContactPoint {...tag} key={tag.text}/>) }
  </>
)

export default Contacts;
