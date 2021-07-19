// ! Library
import { joinClasses, numberArray } from "../../lib/utilities";

type skeletonProps = {
  id: string,
  lines: number,
  className?: string
}

const Skeleton = (props: skeletonProps) => {
  const { id, lines, className } = props;

  return (
    <div className={joinClasses("w-full flex flex-col animate-pulse space-y-3", {
      [className!]: className
    })}>
      {
        numberArray(0, lines).map(lineNumber => (
          <div className="w-full h-4 bg-gray-200" key={`${id}-${lineNumber}`}></div>
        ))
      }
    </div>
  )
}


export default Skeleton;
