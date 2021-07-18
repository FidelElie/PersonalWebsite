// ! Library
import { convertTimestamp, monthAndYear } from "../../../lib/utilities";

// ! Components
import Loading from "../../misc/Loading";
import PageSection from "../../misc/PageSection"

const Experiences = (props: any) => {
  const { experiences, loading } = props;
  return (
    <PageSection title="Relevant Work Experience" alternate>
      {
        loading && (
          <span className="text-tertiary my-5">Fetching Work Experience, Please Wait</span>
        )
      }
      {
        (experiences && !loading) && (
          experiences.length != 0 ? (
            experiences.map((experience: any) =>
              <ExperienceEntry {...experience} key={experience.id} />
            )
          ) : (
            <span className="flex items-center text-tertiary">
              <span className="mr-3">No Work Experience Was Found Or Selected</span>
              <i className="fas fa-sad-cry text-xl" />
            </span>
          )
        )
      }
    </PageSection>
  )
}

const ExperienceEntry = (props: any) => {
  const { title, description, tags, startDate, endDate } = props;

  return (
    <div className="flex flex-col mb-4">
      <div className="flex justify-between">
        <span className="text-sm uppercase">{ title }</span>
        <span className="text-xs">
          { monthAndYear(convertTimestamp(startDate), true) }
          -
          { monthAndYear(convertTimestamp(endDate), true) }
        </span>
      </div>
      <span className="text-xs mb-2 text-tertiary">{tags.join(", ")}</span>
      <p className="text-sm leading-none">{description}</p>
    </div>
  )
}

export default Experiences;
