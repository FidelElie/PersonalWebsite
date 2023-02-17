import { Container, Page } from "@/components/core";
import { Footer, Navbar } from "@/components/interfaces";

const Home = () => {
	return (
		<Page
			mainClassName="pt-20"
			headerClassName="fixed w-full"
			header={<Navbar />}
			footer={<Footer />}
		>
			<Container className="max-w-4xl mx-auto">
			</Container>
		</Page>
	)
}

export default Home;
