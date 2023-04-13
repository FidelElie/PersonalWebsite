import type { ReactNode } from "react";

import { clc } from "@/library/utilities";

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
      <h2 className={clc("py-1 uppercase font-medium", {
        "text-primary": alternate,
        "text-white": !alternate
      })}>
        { title }
      </h2>
      <div className={clc("", {
        [className!]: className
      })}>
        { children }
      </div>
    </div>
  )
}

export default PageSection;
