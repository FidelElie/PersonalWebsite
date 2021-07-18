// ! Next and React
import Link from "next/link";
import { useEffect, useState } from "react";

// ! Library
import { useLoader } from "../../../../lib/provider/loader";
import { useCollection } from "../../../../lib/hooks/useFirestore";
import { convertTimestamp, monthAndYear } from "../../../../lib/utilities";
import { deleteEntry } from "../../../../lib/mutation";

// ! Components
import Loading from "../../../misc/Loading";
import DeleteDialog from "./DeleteDialog";

const ExperiencesDisplay = () => {
  const {
    data: experiences,
    isLoading,
    mutate
  } = useCollection({ collection: "experiences" });
  const { openLoader, closeLoader } = useLoader();
  const [dialogModal, setDialogModal] = useState(false);
  const [selectedField, setSelectedField] = useState<string | null>(null);

  const selectFieldForDeletion = (id: string) => setSelectedField(id);
  const closeModal = () => setSelectedField(null);

  const confirmDeletion = async () => {
    openLoader();

    const deletionResponse = await deleteEntry("experiences", selectedField!);

    if (deletionResponse.status == 200) {
      // Mutate The Collection Display
      mutate();
      closeModal();
    } else {

    }

    closeLoader();
  }

  useEffect(() => { setDialogModal(selectedField != null)}, [selectedField]);

  return (
    <div className="w-full flex flex-col items-center justify-center flex-grow">
      <DeleteDialog
        text="Deleting This Experience Is An Irreversible Action, Please Make Sure You Want To Delete This Before Continuing."
        dialogOpen={dialogModal}
        closeDialog={closeModal}
        onConfirm={confirmDeletion}
      />
      { isLoading && <Loading message="Fetching Work Experiences, Please Wait" /> }
      {
        experiences && (
          experiences.length != 0 ? (
            experiences.map(experience => (
              <ExperienceEntry
                experience={experience}
                selectFieldForDeletion={selectFieldForDeletion}
                key={experience.id}
              />
            ))
          ) : (
            <span className="text-tertiary">No Work Experiences Have Been Added</span>
          )
        )
      }
    </div>
  )
}

const ExperienceEntry = (props: any) => {
  const { experience, selectFieldForDeletion } = props;

  return (
    <div className="w-full flex flex-col my-2 md:flex-row md:px-5 md:py-2">
      <div className="flex flex-col flex-grow md:mr-10">
        <span className="text-lg text-secondary flex flex-col md:flex-row md:items-center">
          { experience.title }
          <span className="text-sm text-tertiary md:ml-4">
            {monthAndYear(convertTimestamp(experience.startDate))}
            <span> - </span>
            {monthAndYear(convertTimestamp(experience.endDate))}
          </span>
        </span>
        <span className="text-tertiary">{ experience.position }</span>
        <div className="flex flex-col mb-3">
          {
            experience.link != "" ? (
              <a href={experience.link} className="">{experience.link}</a>
            ) : (
                <span className="text-tertiary">{experience.link}</span>
            )
          }
        </div>
        <span className="text-sm">{experience.description}</span>
      </div>
      <div className="flex justify-between mt-2 md:flex-col md:justify-start md:mt-0">
        <div className="flex items-center space-x-2 mb-3">
          <Link href={`/admin/experiences/edit?id=${experience.id}`}>
            <a className="text-tertiary">
              Edit
            </a>
          </Link>
          <span
            className="text-tertiary cursor-pointer"
            onClick={() => selectFieldForDeletion(experience.id)}
          >
            Delete
          </span>
        </div>
        <div className="flex flex-wrap w-32 text-right md:text-left">
          {
            experience.tags.length != 0 ? (
              <span className="text-tertiary text-xs">
                {(experience.tags).join(", ")}
              </span>
            ) : (
              <span className="text-tertiary text-xs">
                No Tags
              </span>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default ExperiencesDisplay;
