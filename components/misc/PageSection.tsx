import { ReactNode } from "react";

import { joinClasses } from "../../lib/utilities";

type props = {
  title: string,
  alternate?: boolean,
  className?: string,
  children: ReactNode
}

const PageSection = (props: props) => {
  const { title, alternate, className, children } = props;

  return (
    <div className="section flex flex-col">
      <h2 className={joinClasses("py-1 uppercase font-medium", {
        "text-primary": alternate,
        "text-white": !alternate
      })}>
        { title }
      </h2>
      <div className={joinClasses("", {
        [className!]: className
      })}>
        { children }
      </div>
    </div>
  )
}

export default PageSection;
