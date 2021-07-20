// ! Components
import PageSection from "../../misc/PageSection";
import Skeleton from "../../misc/Skeleton";

type displayProps = {
  EntryComponent: Function,
  title: string,
  loading: boolean,
  data: any[],
  onClick?: Function,
  emptyOnClick?: Function,
  placeholderLines?: number
}

type displayEntry = {
  id: string,
  [key: string]: any
}

const Display = (props: displayProps) => {
  const {
    EntryComponent,
    title,
    loading,
    data,
    onClick = () => {},
    placeholderLines = 6
  } = props;

  return (
    <PageSection title={title} alternate>
      {
        loading &&
          <Skeleton id={`${title} Skeleton`} lines={placeholderLines} className="mt-3"/>
      }
      <div className="group cursor-pointer" onClick={() => onClick()}>
        {
          (data && !loading) && (
            data.length != 0 ? (
              data.map((entry: displayEntry) =>
                <div
                  className="group-hover:border group-hover:border-primary"
                  key={entry.id}
                >
                  <EntryComponent {...entry} />
                </div>
              )
            ) : (
              <div className="flex flex-col items-center  justify-center rounded-md text-tertiary border h-36 group-hover:border-primary">
                <span className="text-4xl mb-3 group-hover:text-primary">
                  <i className="fas fa-plus" />
                </span>
                <span className="">Add {title}</span>
              </div>
            )
          )
        }
      </div>
    </PageSection>
  )
}

export default Display;
