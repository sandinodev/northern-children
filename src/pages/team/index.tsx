import { GetStaticProps, NextPage } from "next";
import { People } from "~/components/people";

import { Seo } from "~/components/seo";
import { Trustees } from "~/components/trustees";

import { GLOBALS_QUERY, TEAM_QUERY } from "~/gql";

import { GlobalDataProps, useSetGlobalData } from "~/hooks";

import { DefaultPage } from "~/layouts/DefaultPage";

import { fetchData } from "~/lib/api";

import { GlobalsQuery, TeamQuery } from "~/types";

interface Props extends GlobalDataProps {
  team: TeamQuery["team"];
}

const Page: NextPage<Props> = ({ seoDefault, team, ...rest }) => {
  useSetGlobalData(rest);

  return (
    <>
      <Seo seo={team?.seo?.[0]} seoDefault={seoDefault} />

      <DefaultPage mt>
        {!!team?.people?.length && <People people={team.people} title={team.teamTitle} />}
        {!!team?.trustees?.length && <Trustees title={team.trusteesTitle} trustees={team.trustees} />}
      </DefaultPage>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params: _, previewData }) => {
  const globals = await fetchData<GlobalsQuery>(GLOBALS_QUERY);
  const { team } = await fetchData<TeamQuery>(TEAM_QUERY, undefined, previewData);

  return {
    revalidate: 60,
    props: {
      team,
      ...globals,
    },
  };
};

export default Page;
