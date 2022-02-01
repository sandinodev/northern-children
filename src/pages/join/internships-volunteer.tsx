import { GetStaticProps, NextPage } from "next";
import { Hero } from "~/components/hero";

import { Seo } from "~/components/seo";
import { TextBlock } from "~/components/text";

import { GLOBALS_QUERY, INTERNSHIPS_VOLUNTEER_QUERY } from "~/gql";

import { GlobalDataProps, useSetGlobalData } from "~/hooks";

import { DefaultPage } from "~/layouts/DefaultPage";

import { fetchData } from "~/lib/api";

import { GlobalsQuery, InternshipsVolunteerQuery } from "~/types";

interface Props extends GlobalDataProps {
  internships: InternshipsVolunteerQuery["internships"];
}

const Page: NextPage<Props> = ({ footer, internships, socials }) => {
  useSetGlobalData({ footer, socials });

  return (
    <>
      <Seo seo={internships?.seo?.[0]} />

      <DefaultPage>
        {!!internships?.image?.length && <Hero image={internships.image} text={internships.title} />}

        <TextBlock bg="blue" text={internships?.description} />

        {/* {!!service?.programs?.length && <Programs color={service?.color} programs={service.programs} />} */}
      </DefaultPage>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ previewData }) => {
  const globals = await fetchData<GlobalsQuery>(GLOBALS_QUERY);
  const { internships } = await fetchData<InternshipsVolunteerQuery>(
    INTERNSHIPS_VOLUNTEER_QUERY,
    undefined,
    previewData
  );

  return {
    revalidate: 60,
    props: {
      internships,
      ...globals,
    },
  };
};

export default Page;
