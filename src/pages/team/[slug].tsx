import { GetStaticPaths, GetStaticProps, NextPage } from "next";

import { Person } from "~/components/person";
import { Seo } from "~/components/seo";

import { GLOBALS_QUERY, PEOPLE_SLUGS_QUERY, PERSON_QUERY } from "~/gql";

import { GlobalDataProps, useSetGlobalData } from "~/hooks";

import { DefaultPage } from "~/layouts/DefaultPage";

import { fetchData } from "~/lib/api";

import { GlobalsQuery, PeopleSlugsQuery, PersonQuery } from "~/types";

interface Props extends GlobalDataProps {
  person: PersonQuery["person"];
}

const Page: NextPage<Props> = ({ footer, person, socials }) => {
  useSetGlobalData({ footer, socials });

  return (
    <>
      <Seo seo={person?.seo?.[0]} />

      <DefaultPage mt>
        <Person {...person} />
      </DefaultPage>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params: { slug } = {}, previewData }) => {
  let _slug: string;

  if (typeof slug === "string") {
    _slug = slug;
  } else {
    _slug = (slug || []).join("/");
  }

  const globals = await fetchData<GlobalsQuery>(GLOBALS_QUERY);
  const { person } = await fetchData<PersonQuery>(PERSON_QUERY, { slug: _slug }, previewData);

  return {
    revalidate: 60,
    props: {
      person,
      ...globals,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { people = [] } = await fetchData<PeopleSlugsQuery>(PEOPLE_SLUGS_QUERY);

  const paths = people.filter((person) => !!person?.slug).map(({ slug }) => `/team/${slug}`) || [];

  return {
    paths,
    fallback: true,
  };
};

export default Page;
