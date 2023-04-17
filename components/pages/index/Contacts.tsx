import { clc } from "@/library/utilities";

import contactTags, { type contactTagProps } from "./Contacts.data";

const ContactPoint = (props: contactTagProps) => {
  const { text, icon, href } = props;

  const BaseTag = href ? "a" : "div";

  return (
    <BaseTag href={href} className="tag">
      <span className="text-secondary mr-2.5 dark:text-white">
        <i className={clc(icon, "text-base")}/>
      </span>
      <span className={clc("text-sm", BaseTag === "div" && "dark:text-white")}>
        { text }
      </span>
    </BaseTag>
  )
}

const Contacts = () => (
  <>
    { contactTags.map(tag => <ContactPoint {...tag} key={tag.text}/>) }
  </>
)

export default Contacts;
