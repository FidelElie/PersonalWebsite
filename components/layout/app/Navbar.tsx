import Link from "next/link";
import { useRouter } from "next/router";
import { signOut } from "../../../lib/auth/client";
import { useLoader } from "../../../lib/provider/loader";

type props = {
  buttonText?: string,
  buttonOnClick?: Function,
  signOutButton?: boolean
}

const Navbar = (props: props) => {
  const { buttonOnClick, buttonText, signOutButton } = props;

  return (
    <nav className="mx-auto container items-center no-print">
      <div className="flex box-border px-5 py-2 mx-auto justify-between">
        <Link href="/">
          <a className="flex items-center pr-2 lg:pr-8 lg:px-6 focus:outline-none">
            <span className="w-2 h-2 p-2 mr-2 rounded-full bg-primary"></span>
            <h2 className="block p-2 text-lg tracking-tighter font-light text-black transition duration-500 ease-in-out transform cursor-pointer lg:text-x lg:mr-8">Fidel Elie</h2>
          </a>
        </Link>
        {
          buttonOnClick && (
            <button className="button bg-primary text-white"
              onClick={() => buttonOnClick()}
            >
              { buttonText }
            </button>
          )
        }
        { signOutButton && <SignOutButton/> }
      </div>
    </nav>
  )
}

const SignOutButton = () => {
  const router = useRouter();
  const { openLoader, closeLoader } = useLoader();

  const handleSignOut = async () => {
    openLoader();

    const signOutResponse = await signOut();

    if (signOutResponse.status == "success") {
      router.push("/")
    }

    closeLoader(500);
  }

  return (
    <button className="button bg-primary text-white" onClick={handleSignOut}>
      Sign Out
    </button>
  )
}

export default Navbar;
