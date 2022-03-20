import { GetStaticProps, NextPage } from "next";
import { Hero } from "~/components/hero";

import { Seo } from "~/components/seo";
import { TextBlock } from "~/components/text";
import { Tiles } from "~/components/tiles";

import { GLOBALS_QUERY, VOLUNTEER_QUERY } from "~/gql";

import { GlobalDataProps, useSetGlobalData } from "~/hooks";

import { DefaultPage } from "~/layouts/DefaultPage";

import { fetchData } from "~/lib/api";

import { GlobalsQuery, VolunteerQuery } from "~/types";

interface Props extends GlobalDataProps {
  volunteer: VolunteerQuery["volunteer"];
}

const Page: NextPage<Props> = ({ volunteer, seoDefault, ...rest }) => {
  useSetGlobalData(rest);

  return (
    <>
      <Seo seo={volunteer?.seo?.[0]} seoDefault={seoDefault} />

      <DefaultPage>
        {!!volunteer?.image?.length && (
          <Hero image={volunteer.image} imageMobile={volunteer.imageMobile} text={volunteer.title} />
        )}

        <TextBlock bg={volunteer?.color} text={volunteer?.description} />

        {!!volunteer?.tiles?.length && <Tiles color={volunteer?.color} items={volunteer.tiles} />}
      </DefaultPage>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ previewData }) => {
  const globals = await fetchData<GlobalsQuery>(GLOBALS_QUERY);
  const { volunteer } = await fetchData<VolunteerQuery>(VOLUNTEER_QUERY, undefined, previewData);

  return {
    revalidate: 60,
    props: {
      volunteer,
      ...globals,
    },
  };
};

export default Page;
