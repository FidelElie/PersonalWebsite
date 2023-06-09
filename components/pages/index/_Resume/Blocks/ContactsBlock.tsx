import { clc } from "@/library/utilities";
import type { DetailSchema, DetailModel, CONTACT_MEDIUMS } from "@/library/models";

import { Flex, For, Copy, Icon, IconNames } from "@/components/core";

import { useResumeBuilder } from "../../ResumeProvider";

const renderTypeAsLink: typeof CONTACT_MEDIUMS[number][] = [
  "linkedin", "email", "facebook", "github", "instagram", "linkedin", "phone"
];

const orderPriority: readonly typeof CONTACT_MEDIUMS[number][] = [
  "phone", "location", "email", "github", "linkedin"
];

const narrowToContacts = (details: DetailModel[]) => {
  return details.map(
    detail => detail.data.type === "contact" ? { ...detail, data: detail.data } : []
  ).flat()
}

export const ContactsBlock = () => {
  const { selected: { details }, setView } = useResumeBuilder();

  const narrowedToContacts = narrowToContacts(details);

  const contacts = orderPriority.map(
    type => narrowedToContacts.find(contact => contact.data.medium === type) ?? []
  ).flat();

  return (
    <Flex.Row className="items-center flex-wrap" onClick={() => setView("details")}>
      <For each={contacts}>
        { contact => <ContactPoint key={contact.id} contact={contact}/> }
      </For>
    </Flex.Row>
  )
}

const ContactPoint = (props: ContactPointProps) => {
  const { contact } = props;

  const { data } = contact;

  const BaseTag = isLink(data) ? "a": "div";

  const determineIconName = (type: typeof CONTACT_MEDIUMS[number]): typeof IconNames[number] => {
    switch (type) {
      case "phone":
        return "phone-fill";
      case "email":
        return "mail-line";
      case "linkedin":
        return "linkedin-box-fill";
      case "facebook":
        return "facebook-box-fill";
      case "github":
        return "github-fill";
      case "instagram":
        return "instagram-fill";
      case "location":
        return "map-pin-2-line";
      default:
        throw new Error("Unknown contact medium");
    }
  }

  const determineParseLink = (type: typeof CONTACT_MEDIUMS[number], link: string) => {
    switch (type) {
      case "email":
        return `mailto:${link}`;
      case "phone":
        return `tel:${link}`;
      default:
        return link;
    }
  }

  const cleanContact = (link: string) => {
    return link.replace(/https*:\/\//, "");
  }

  return (
    <BaseTag
      className="pr-2 pb-2"
      {...(BaseTag !== "div" ? { href: determineParseLink(data.medium, data.value) } : {}) }
    >
      <Flex.Row className="items-center tracking-tighter text-sm">
        <Icon name={determineIconName(data.medium)} className="text-lg mr-0.5 text-gray-600"/>
        <Copy
          className={clc(
            "",
            BaseTag === "a" && "underline text-primary underline-offset-4"
          )}
        >
          { cleanContact(data.value) }
        </Copy>
      </Flex.Row>
    </BaseTag>
  )
}


const isLink = (contact: DetailSchema["data"]) => {
  if (contact.type !== "contact") { return false; }

  return renderTypeAsLink.some(medium => medium === contact.medium);
}

interface ContactPointProps {
  contact: ReturnType<typeof narrowToContacts>[number];
}
