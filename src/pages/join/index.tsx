import { GetStaticProps, NextPage } from "next";
import { Cta } from "~/components/cta";

import { Hero } from "~/components/hero";
import { Quote } from "~/components/quote";
import { Seo } from "~/components/seo";
import { TextBlock, TextHalf } from "~/components/text";

import { GLOBALS_QUERY, JOIN_QUERY } from "~/gql";

import { GlobalDataProps, useSetGlobalData } from "~/hooks";

import { DefaultPage } from "~/layouts/DefaultPage";

import { fetchData } from "~/lib/api";

import { GlobalsQuery, JoinQuery } from "~/types";

interface Props extends GlobalDataProps {
  join: JoinQuery["join"];
}

const Page: NextPage<Props> = ({ footer, join, socials }) => {
  useSetGlobalData({ footer, socials });

  return (
    <>
      <Seo seo={join?.seo?.[0]} />

      <DefaultPage>
        {!!join?.image?.length && <Hero image={join.image} text={join.heroText} />}

        {!!join?.description?.length && <TextBlock bg={join.descriptionBg} text={join.description} />}

        {!!join?.text?.length && <TextHalf text={join.text} />}

        {!!join?.quote?.length && <Quote {...join.quote[0]} />}

        {!!join?.cta?.length && <Cta noBorder {...join.cta[0]} />}
      </DefaultPage>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params: _, previewData }) => {
  const globals = await fetchData<GlobalsQuery>(GLOBALS_QUERY);
  const { join } = await fetchData<JoinQuery>(JOIN_QUERY, undefined, previewData);

  return {
    revalidate: 60,
    props: {
      join,
      ...globals,
    },
  };
};

export default Page;
