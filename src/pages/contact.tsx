import { GetStaticProps, NextPage } from "next";

import { Contact } from "~/components/contact";
import { Seo } from "~/components/seo";

import { CONTACT_QUERY, GLOBALS_QUERY } from "~/gql";

import { GlobalDataProps, useSetGlobalData } from "~/hooks";

import { DefaultPage } from "~/layouts/DefaultPage";

import { fetchData } from "~/lib/api";

import { ContactQuery, GlobalsQuery } from "~/types";

interface Props extends GlobalDataProps {
  contact: ContactQuery["contact"];
}

const Page: NextPage<Props> = ({ contact, seoDefault, ...rest }) => {
  useSetGlobalData(rest);

  return (
    <>
      <Seo seo={contact?.seo?.[0]} seoDefault={seoDefault} />

      <DefaultPage mt>
        <Contact
          address={rest.footer?.address}
          addressLink={rest.footer?.addressLink}
          contact={contact}
          socials={rest.socials}
        />
      </DefaultPage>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params: _, previewData }) => {
  const globals = await fetchData<GlobalsQuery>(GLOBALS_QUERY);
  const { contact } = await fetchData<ContactQuery>(CONTACT_QUERY, undefined, previewData);

  return {
    revalidate: 60,
    props: {
      contact,
      ...globals,
    },
  };
};

export default Page;
