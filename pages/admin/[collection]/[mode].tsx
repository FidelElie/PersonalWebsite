// ! Next and React
import Link from "next/link";
import { useRouter } from "next/router";

// ! Library
import verifyAuth from "../../../lib/auth/server";
import { useDocument } from "../../../lib/hooks/useFirestore";

// ! Components
import AppLayout from "../../../components/layout/app";
import ProjectsForm from "../../../components/pages/admin/Projects.form";
import ExperiencesForm from "../../../components/pages/admin/Experiences.form";
import Loading from "../../../components/misc/Loading";
import SkillsForm from "../../../components/pages/admin/Skills.form";

const formMapping = [
  { collection: "projects", Component: ProjectsForm },
  { collection: "experiences", Component: ExperiencesForm },
  { collection: "skills", Component: SkillsForm }
]

export default function MutateCollection() {
  const router = useRouter();
  const { collection, mode, id } = router.query;

  return (
    <AppLayout signOutButton>
      <div className="flex-grow mx-auto p-5 container box-border flex flex-col items-center mx:p-10">
        <div className="flex flex-col w-full shadow-lg rounded-md overflow-hidden lg:w-2/3">
          <div className="flex w-full items-center justify-between bg-primary p-5">
            <span className="text-white text-2xl capitalize tracking-tighter">
              { mode } { collection }
            </span>
            <Link href="/admin/home">
              <a className="bg-white button text-primary">Back To Home</a>
            </Link>
          </div>
          <div className="flex flex-col p-5">
            { mode == "add" && <AddMode collection={collection}/> }
            { mode == "edit" && <EditMode collection={collection} id={id}/> }
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

const AddMode = (props: any) => {
  const { collection } = props;

  const CurrentFormComponent = formMapping.find(
    map => map.collection == collection)!.Component;

  return <CurrentFormComponent/>
}

const EditMode = (props: any) => {
  const { collection, id } = props;
  const { data, isLoading, hasError } = useDocument(props);

  const CurrentFormComponent = formMapping.find(
    map => map.collection == collection)!.Component;

  return (
    <>
      { isLoading && <Loading message={`Fetching Data From Collection`}/> }
      { hasError && <span>An Error Occurred Fetching {id} From {collection}</span> }
      { data && <CurrentFormComponent data={data}/> }
    </>
  )
}

const getServerSideProps = verifyAuth();
export { getServerSideProps };
