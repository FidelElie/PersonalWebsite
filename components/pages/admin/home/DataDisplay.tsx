// ! Next and React
import Link from "next/link";
import { useEffect, useState } from "react";

// ! Library
import { useLoader } from "../../../../lib/provider/loader";
import { useCollection } from "../../../../lib/hooks/useFirestore";
import { deleteEntry } from "../../../../lib/mutation";
import { convertTimestamp, monthAndYear } from "../../../../lib/utilities";

// ! Components
import DeleteDialog from "./DeleteDialog";
import Skeleton from "../../../misc/Skeleton";

const DataDisplay = (props: any) => {
  const { collection, EntryComponent } = props;
  const {
    data,
    isLoading,
    mutate
  } = useCollection({ collection });

  const { openLoader, closeLoader } = useLoader();
  const [dialogModal, setDialogModal] = useState(false);
  const [selectedField, setSelectedField] = useState<string | null>(null);

  const selectFieldForDeletion = (id: string) => setSelectedField(id);
  const closeModal = () => setSelectedField(null);

  const confirmDeletion = async () => {
    openLoader();

    const deletionResponse = await deleteEntry(collection, selectedField!);

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
        text={`Deleting ${collection} Is An Irreversible Action, Please Make Sure You Want To Delete This Before Continuing.`}
        dialogOpen={dialogModal}
        closeDialog={closeModal}
        onConfirm={confirmDeletion}
      />
      {isLoading && <Skeleton id={`${collection}-skeleton`} lines={8}/>}
      {
        data && (
          data.length != 0 ? (
            data.map(entry => (
              <div
                className="w-full flex flex-col my-2 md:flex-row md:px-5 md:py-2"
                key={`${collection}-${entry.id}`}
              >
                <EntryComponent
                  entry={entry}
                  selectFieldForDeletion={selectFieldForDeletion}
                />
              </div>
            ))
          ) : (
            <span className="text-tertiary capitalize">No {collection} Have Been Created</span>
          )
        )
      }
    </div>
  )
}

const SkillsEntry = (props: any) => {
  const { entry, selectFieldForDeletion } = props;

  return (
    <>
      <div className="flex flex-col justify-center w-full ">
        <div className="flex space-x-2 w-full items-center justify-between mb-2">
          <div className="flex items-center w-full">
            <span className="text-4xl mr-2">
              <i className={entry.icon} />
            </span>
            <span className="text-lg">{entry.title}</span>
          </div>
          <div className="space-x-2">
            <Link href={`/admin/skills/edit?id=${entry.id}`}>
              <a className="text-tertiary">
                Edit
              </a>
            </Link>
            <span
              className="text-tertiary cursor-pointer"
              onClick={() => selectFieldForDeletion(entry.id)}
            >
              Delete
            </span>
          </div>
        </div>
        <span className="text-sm text-tertiary"> {entry.tags.join(", ")}</span>
      </div>
    </>
  )
}


const ProjectEntry = (props: any) => {
  const { entry, selectFieldForDeletion } = props;

  return (
    <>
      <div className="flex flex-col flex-grow md:mr-10">
        <span className="text-lg text-secondary">{entry.title}</span>
        <div className="mb-2">
          {
            entry.link != "" ? (
              <a href={entry.link} className="">{entry.link}</a>
            ) : (
              <span className="text-tertiary">No Link</span>
            )
          }
        </div>
        <span className="text-sm">{entry.description}</span>
      </div>
      <div className="flex justify-between mt-2 md:flex-col md:justify-start md:mt-0">
        <div className="flex items-center space-x-2 mb-2">
          <Link href={`/admin/projects/edit?id=${entry.id}`}>
            <a className="text-tertiary">
              Edit
            </a>
          </Link>
          <span
            className="text-tertiary cursor-pointer"
            onClick={() => selectFieldForDeletion(entry.id)}
          >
            Delete
          </span>
        </div>
        <div className="flex flex-wrap w-32 text-right md:text-left">
          {
            (entry.tags).length != 0 ? (
              <span className="text-tertiary text-xs">{(entry.tags).join(", ")}</span>
            ) : (
              <span className="text-tertiary text-xs">No Tags</span>
            )
          }
        </div>
      </div>
    </>
  )
}

const ExperienceEntry = (props: any) => {
  const { entry, selectFieldForDeletion } = props;

  return (
    <>
      <div className="flex flex-col flex-grow md:mr-10">
        <span className="text-lg text-secondary flex flex-col md:flex-row md:items-center">
          {entry.title}
          <span className="text-sm text-tertiary md:ml-4">
            {monthAndYear(convertTimestamp(entry.startDate))}
            <span> - </span>
            {monthAndYear(convertTimestamp(entry.endDate))}
          </span>
        </span>
        <span className="text-tertiary">{entry.position}</span>
        <div className="flex flex-col mb-3">
          {
            entry.link != "" ? (
              <a href={entry.link} className="">{entry.link}</a>
            ) : (
              <span className="text-tertiary">{entry.link}</span>
            )
          }
        </div>
        <span className="text-sm">{entry.description}</span>
      </div>
      <div className="flex justify-between mt-2 md:flex-col md:justify-start md:mt-0">
        <div className="flex items-center space-x-2 mb-3">
          <Link href={`/admin/experiences/edit?id=${entry.id}`}>
            <a className="text-tertiary">
              Edit
            </a>
          </Link>
          <span
            className="text-tertiary cursor-pointer"
            onClick={() => selectFieldForDeletion(entry.id)}
          >
            Delete
          </span>
        </div>
        <div className="flex flex-wrap w-32 text-right md:text-left">
          {
            entry.tags.length != 0 ? (
              <span className="text-tertiary text-xs">
                {(entry.tags).join(", ")}
              </span>
            ) : (
              <span className="text-tertiary text-xs">
                No Tags
              </span>
            )
          }
        </div>
      </div>
    </>
  )
}

export default DataDisplay;
export { SkillsEntry, ProjectEntry, ExperienceEntry };
