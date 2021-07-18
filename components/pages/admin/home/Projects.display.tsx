// ! Next and React
import Link from "next/link";
import { useEffect, useState } from "react";

// ! Library
import { useLoader } from "../../../../lib/provider/loader";
import { useCollection } from "../../../../lib/hooks/useFirestore";
import { deleteEntry } from "../../../../lib/mutation";

// ! Components
import Loading from "../../../misc/Loading";
import DeleteDialog from "./DeleteDialog";

const ProjectsDisplay = () => {
  const {
    data: projects,
    isLoading,
    mutate
  } = useCollection({ collection: "projects" });

  const { openLoader, closeLoader } = useLoader();
  const [dialogModal, setDialogModal] = useState(false);
  const [selectedField, setSelectedField] = useState<string | null>(null);

  const selectFieldForDeletion = (id: string) => setSelectedField(id);
  const closeModal = () => setSelectedField(null);

  const confirmDeletion = async () => {
    openLoader();

    const deletionResponse = await deleteEntry("projects", selectedField!);

    if (deletionResponse.status == 200) {
      // Mutate The Collection Display
      mutate();
      closeModal();
    } else {

    }

    closeLoader();
  }

  useEffect(() => { setDialogModal(selectedField != null) }, [selectedField]);

  return (
    <div className="w-full flex flex-col items-center justify-center flex-grow">
      <DeleteDialog
        text="Deleting This Project Is An Irreversible Action, Please Make Sure You Want To Delete This Before Continuing."
        dialogOpen={dialogModal}
        closeDialog={closeModal}
        onConfirm={confirmDeletion}
      />
      { isLoading && <Loading message="Fetching Projects, Please Wait" /> }
      {
        projects && (
          projects.length != 0 ? (
            projects.map(project => (
              <ProjectEntry
                project={project}
                selectFieldForDeletion={selectFieldForDeletion}
                key={project.id}
              />
            ))
          ) : (
            <span className="text-tertiary">No Projects Have Been Added</span>
          )
        )
      }
    </div>
  )
}

const ProjectEntry = (props: any) => {
  const { project, selectFieldForDeletion } = props;

  return (
    <div className="flex flex-col justify-between my-2 md:flex-row md:justify-start">
      <div className="flex flex-col flex-grow md:mr-10">
        <span className="text-lg text-secondary">{ project.title }</span>
        <div className="mb-3">
          {
            project.link != "" ? (
              <a href={project.link} className="">{project.link}</a>
            ) : (
                <span className="text-tertiary">{project.link}</span>
            )
          }
        </div>
        <span className="text-sm">{project.description}</span>
      </div>
      <div className="flex justify-between mt-2 md:flex-col md:justify-start md:mt-0">
        <div className="flex items-center space-x-2 mb-3">
          <Link href={`/admin/projects/edit?id=${project.id}`}>
            <a className="text-tertiary">
              Edit
            </a>
          </Link>
          <span
            className="text-tertiary cursor-pointer"
            onClick={() => selectFieldForDeletion(project.id)}
          >
            Delete
          </span>
        </div>
        <div className="flex flex-wrap w-32 text-right md:text-left">
          {
            (project.tags).length != 0 ? (
              <span className="text-tertiary text-xs">{(project.tags).join(", ")}</span>
            ) : (
              <span className="text-tertiary text-xs">No Tags</span>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default ProjectsDisplay;
