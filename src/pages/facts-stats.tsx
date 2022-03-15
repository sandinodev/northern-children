import { GetStaticProps, NextPage } from "next";

import { FactsStatsBlocks } from "~/components/factsStats";
import { Hero } from "~/components/hero";
import { Seo } from "~/components/seo";

import { FACTS_STATS_QUERY, GLOBALS_QUERY } from "~/gql";

import { GlobalDataProps, useSetGlobalData } from "~/hooks";

import { DefaultPage } from "~/layouts/DefaultPage";

import { fetchData } from "~/lib/api";

import { FactsStatsQuery, GlobalsQuery } from "~/types";

interface Props extends GlobalDataProps {
  facts: FactsStatsQuery["facts"];
}

const Page: NextPage<Props> = ({ facts, ...rest }) => {
  useSetGlobalData(rest);

  return (
    <>
      <Seo seo={facts?.seo?.[0]} />

      <DefaultPage>
        {!!facts?.heroImage?.length && (
          <Hero image={facts.heroImage} imageMobile={facts.heroImageMobile} text={facts.title} />
        )}

        {!!facts?.blocks?.length && <FactsStatsBlocks blocks={facts.blocks} color={facts.color} />}
      </DefaultPage>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params: _, previewData }) => {
  const globals = await fetchData<GlobalsQuery>(GLOBALS_QUERY);
  const { facts } = await fetchData<FactsStatsQuery>(FACTS_STATS_QUERY, undefined, previewData);

  return {
    revalidate: 60,
    props: {
      facts,
      ...globals,
    },
  };
};

export default Page;
