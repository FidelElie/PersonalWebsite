import type { GetStaticProps } from "next";
import { QueryClient, dehydrate } from "@tanstack/react-query";

import {
  fetchDetails,
  fetchExperiences,
  fetchProjects,
  fetchSkills,
  fetchTags
} from "@/library/api";
import type { ExtendedNextPage } from "@/library/types";

import { Page } from "@/components/core";

import { Navbar, Footer } from "@/components/interfaces/Navigation";

import { ResumeBuilderProvider } from "@/components/pages/index/ResumeBuilderProvider";
import { Resume } from "@/components/pages/index/Resume";

const FrontPage: ExtendedNextPage = () => {
  return (
    <Page
      className="h-screen"
      mainClassName="flex-grow relative"
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

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(["tags"], () => fetchTags()),
    queryClient.prefetchQuery(["skills"], () => fetchSkills({ where: [["active", "!=", false]]})),
    queryClient.prefetchQuery(
      ["projects"],
      () => fetchProjects({ where: [["active", "!=", false]]})
    ),
    queryClient.prefetchQuery(
      ["experiences"],
      () => fetchExperiences({ where: [["active", "!=", false]]})
    ),
    queryClient.prefetchQuery(["details"], () => fetchDetails())
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}

FrontPage.title = "CV";

export default FrontPage;
