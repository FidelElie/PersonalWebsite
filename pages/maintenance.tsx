import Head from "next/head";
import type { GetServerSideProps } from "next";

const MaintenancePage = () => {
	return (
		<div className="h-screen flex flex-col items-center justify-center">
			<Head>
				<title>Maintenance | Fidel Dev</title>
			</Head>
			<div className="container flex-grow flex items-center justify-center">
				<div className="text-center">
					<h1 className="text-5xl mb-3 tracking-tight">Under Maintenance</h1>
					<p className="font-light">
						Currently Under Maintenance, The Website Will Be Back Soon.
					</p>
				</div>
			</div>
		</div>
	)
}

export const getServerSideProps: GetServerSideProps = async () => {
	if (process.env.MAINTENANCE_MODE !== "1" && process.env.NODE_ENV !== "development") {
		return { redirect: { destination: "/", permanent: false } }
	}

	return { props: {} }
}

export default MaintenancePage;
