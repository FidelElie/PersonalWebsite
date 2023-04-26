import { Page } from "@/components/core";
import { Navbar, Footer } from "@/components/interfaces/Navigation";
import { ResumeBuilderProvider } from "@/components/pages/index/Resume.provider";
import { Resume } from "@/components/pages/index/Resume";

const FrontPage = () => {
  return (
    <Page
      className="h-screen"
      mainClassName="flex-grow relative"
      title="CV Builder | Fidel Elie"
      headerClassName="no-print"
      header={<Navbar/>}
      footer={<Footer className="no-print"/>}
    >
      <ResumeBuilderProvider>
        <Resume/>
      </ResumeBuilderProvider>
    </Page>
  )
}

export default FrontPage;
