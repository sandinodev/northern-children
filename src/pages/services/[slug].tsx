import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Hero } from "~/components/hero";

import { Programs } from "~/components/programs";
import { Seo } from "~/components/seo";
import { TextBlock } from "~/components/text";

import { GLOBALS_QUERY, SERVICES_SLUGS_QUERY, SERVICE_QUERY } from "~/gql";

import { GlobalDataProps, useSetGlobalData } from "~/hooks";

import { DefaultPage } from "~/layouts/DefaultPage";

import { fetchData } from "~/lib/api";

import { GlobalsQuery, ServiceQuery, ServicesSlugsQuery } from "~/types";

interface Props extends GlobalDataProps {
  service: ServiceQuery["service"];
}

const Page: NextPage<Props> = ({ footer, service, socials }) => {
  useSetGlobalData({ footer, socials });

  return (
    <>
      <Seo seo={service?.seo?.[0]} />

      <DefaultPage>
        {!!service?.image?.length && <Hero image={service.image} text={service.title} />}

        <TextBlock bg={service?.color} text={service?.description} />

        {!!service?.programs?.length && <Programs color={service?.color} programs={service.programs} />}
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
  const { service } = await fetchData<ServiceQuery>(SERVICE_QUERY, { slug: _slug }, previewData);

  return {
    revalidate: 60,
    props: {
      service,
      ...globals,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { services = [] } = await fetchData<ServicesSlugsQuery>(SERVICES_SLUGS_QUERY);

  const paths = services.filter((service) => !!service?.slug).map(({ slug }) => `/services/${slug}`) || [];

  return {
    paths,
    fallback: true,
  };
};

export default Page;
