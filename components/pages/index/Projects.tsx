// ! Components
import Loading from "../../misc/Loading";
import PageSection from "../../misc/PageSection"

const Projects = (props: any) => {
  const { projects, loading } = props;

  return (
    <PageSection title="Notable Projects" alternate>
      {
        loading && (
          <span className="text-tertiary my-5">Fetching Projects, Please Wait</span>
        )
      }
      {
        (projects && !loading) && (
          projects.length != 0 ? (
            projects.map((project: any) => <ProjectEntry {...project} key={project.id}/>)
          ) : (
            <span className="flex items-center text-tertiary">
              <span className="mr-3">No Projects Were Found Or Selected</span>
              <i className="fas fa-sad-cry text-xl"/>
            </span>
          )
        )
      }
    </PageSection>
  )
}

const ProjectEntry = (props: any) => {
  const { title, link, description, tags } = props;

  return (
    <div className="flex flex-col mb-4">
      <div className="flex justify-between">
        <span className="text-sm uppercase">{ title }</span>
        { link && <a href={link} className="text-sm">{ link }</a> }
      </div>
      <span className="text-xs mb-2 text-tertiary">{ tags.join(", ") }</span>
      <p className="text-sm leading-none">{ description }</p>
    </div>
  )

}

export default Projects;
