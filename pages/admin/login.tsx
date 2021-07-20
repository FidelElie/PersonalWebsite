// ! Next and React
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react"

// ! Library
import { signIn } from "../../lib/auth/client";
import { useLoader } from "../../lib/provider/loader";

// ! Components
import AppLayout from "../../components/layout/app";
import verifyAuth from "../../lib/auth/server";

const formErrorData = [
  {
    code: "auth/wrong-password",
    message: "You Have Entered The Wrong Email/Password Combination."
  },
  {
    code: "auth/user-not-found",
    message: "You Have Entered The Wrong Email/Password Combination."
  },
  {
    code: "server",
    message : "Sorry An Error Happened On Our End, Please Contact An Administrator."
  },
  {
    code: "auth/too-many-requests",
    message: "Too Many Login Attempts, Please Try Again Later"
  }
]

export default function LoginPage() {
  const initialFormData = { email: "", password: "" }
  const initialFormErrors = Object.fromEntries(
    formErrorData.map(error => [error.code, { message: error.message, toggled: false }])
  );

  const router = useRouter();
  const { openLoader, closeLoader } = useLoader();
  const [loginData, setLoginData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState(initialFormErrors);

  const toggledError = Object.values(formErrors).find(error => error.toggled);

  const setFormData = (key: string, value: string) =>
    setLoginData({...loginData, ...{ [key] : value }});
  const enableFormError = (key: string) => {
    if (Object.keys(formErrors).includes(key)) {
      setFormErrors({
        ...formErrors,
        ...{ [key]: {
          toggled: true,
          message: formErrors[key].message
        }
      }});
    }
  }
  const resetFormErrors = () => setFormErrors(initialFormErrors);

  const handleLogin = async () => {
    resetFormErrors();
    openLoader();
    const signInResponse = await signIn(loginData);

    if ((signInResponse.status).includes("error")) {
      if (Object.keys(initialFormErrors).includes(signInResponse.error)) {
        enableFormError(signInResponse.error);
      }
      closeLoader();
      return;
    }

    if (signInResponse.status === "success") {
      router.push("/admin/home")
    };

    closeLoader(500);
  }

  return (
    <AppLayout>
      <div className="flex-grow flex items-center justify-center px-5 md:px-0">
        <div className="w-96 shadow-lg bg-white rounded-md overflow-hidden">
          <form onSubmit={event => {
            event.preventDefault();
            handleLogin();
          }}>
            <div className="bg-primary p-5">
              <h2 className="text-2xl text-white tracking-tighter md:text-4xl">Admin Login</h2>
            </div>
            {
              toggledError && (
                <div className="mb-5 bg-tertiary w-full p-5 box-border flex justify-between items-center text-white">
                  <span className="mr-2 text-center">
                    { toggledError.message }
                  </span>
                  <span className="text-xl hover:text-primary transition-colors cursor-pointer" onClick={resetFormErrors}>
                    <i className="fas fa-times" />
                  </span>
                </div>
              )
            }
            <div className="flex flex-col px-5 mt-5">
              <div className="field">
                <label htmlFor="Email" className="label">Email</label>
                <input
                  className="input"
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={loginData.email}
                  onChange={(event: ChangeEvent) =>
                    setFormData("email", (event.target as HTMLInputElement).value)
                  }
                />
              </div>
              <div className="field">
                <label htmlFor="Password" className="label">Password</label>
                <input
                  className="input"
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={loginData.password}
                  onChange={(event: ChangeEvent) =>
                    setFormData("password", (event.target as HTMLInputElement).value)
                  }
                />
              </div>
            </div>
            <div className="px-5 my-3 text-center">
              <span className="text-tertiary text-center text-sm">
                Forgot Your Password? Contact An Administrator
              </span>
            </div>
            <div className="px-5 pb-10">
              <button className="w-full px-4 py-2 text-base font-medium text-white transition duration-500 ease-in-out transform bg-primary rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:bg-blue-600" type="submit">Login</button>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  )
}

const getServerSideProps = verifyAuth({
  redirectOnSuccess: true,
  successUrl: "/admin/home"
});
export { getServerSideProps };
