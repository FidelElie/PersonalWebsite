// ! Next and React
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react"

// ! Library
import { signIn } from "../../lib/auth/client";
import { useLoader } from "../../lib/provider/loader";

// ! Components
import AppLayout from "../../components/layout/app";
import verifyAuth from "../../lib/auth/server";

export default function LoginPage() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });
  const router = useRouter();
  const { openLoader, closeLoader } = useLoader();

  const handleLogin = async () => {
    openLoader();
    const signInResponse = await signIn(loginData);

    if (signInResponse.status === "auth-error") {
      console.log(signInResponse);
      closeLoader();
      return;
    }

    if (signInResponse.status === "success") {
      router.push("/admin/home");
    }

    closeLoader();
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
            <div className="flex flex-col px-5 mt-5">
              <div className="field">
                <label htmlFor="Email" className="label">Email</label>
                <input
                  className="input"
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={loginData.email}
                  onChange={
                    (event: ChangeEvent) => setLoginData(
                      { ...loginData, ...{ email: (event.target as HTMLInputElement).value } }
                    )
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
                  onChange={
                    (event: ChangeEvent) => setLoginData(
                      { ...loginData, ...{ password: (event.target as HTMLInputElement).value } }
                    )
                  }
                />
              </div>
            </div>
            <div className="px-5 my-3 text-center">
              <span className="text-tertiary text-center">
                Forgotten Password? Contact An Administrator
              </span>
            </div>
            <div className="px-5 pb-10">
              <button className="w-full px-4 py-2 text-base font-medium text-white transition duration-500 ease-in-out transform bg-primary rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:bg-blue-800" type="submit">Login</button>
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
