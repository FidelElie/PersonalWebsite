type contactTagProps = {
  icon: string,
  text: string,
  href?: string
}

const contactTags: contactTagProps[] = [
  {
    icon: "fas fa-phone",
    text: "07908296760"
  },
  {
    icon: "fas fa-street-view",
    text: "London, United Kingdom"
  },
  {
    icon: "fas fa-envelope",
    text: "fidel.elie@gmail.com",
    href: "mailto:fidel.elie@gmail.com"
  },
  {
    icon: "fab fa-github-square",
    text: "https://github.com/FidelElie/",
    href: "https://github.com/FidelElie/"
  },
  {
    icon: "fab fa-linkedin",
    text: "https://www.linkedin.com/in/fidel-elie/",
    href: "https://www.linkedin.com/in/fidel-elie/"
  }
]

export default contactTags;
export type { contactTagProps };
