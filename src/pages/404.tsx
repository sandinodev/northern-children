import { GetStaticProps, NextPage } from "next";
import tw from "twin.macro";

import { BaseButton, BaseWrapper } from "~/components/base";
import { MaskOpacity } from "~/components/mask";
import { Seo } from "~/components/seo";

import { GLOBALS_QUERY } from "~/gql";

import { GlobalDataProps, useSetGlobalData } from "~/hooks";

import { DefaultPage } from "~/layouts/DefaultPage";

import { fetchData } from "~/lib/api";

import { GlobalsQuery } from "~/types";

const Wrapper = tw(
  BaseWrapper
)`absolute top-0 left-0 flex flex-col items-center justify-center w-screen h-screen bg-white-greenish z-30`;

const Title = tw.h1`mb-20 lg:mb-40 text-xl font-alpina`;

const Text = tw.p`mb-44 lg:mb-68 text-center`;

const Custom404: NextPage<GlobalDataProps> = ({ seoDefault, ...rest }) => {
  useSetGlobalData(rest);

  return (
    <>
      <Seo seo={{ title: "404" }} seoDefault={seoDefault} />

      <DefaultPage>
        <Wrapper>
          <Title>404 - Page Does Not Exist</Title>

          <Text>Please use the menu above to find what you need.</Text>

          <MaskOpacity noY>
            <BaseButton href="/">Go back to homepage</BaseButton>
          </MaskOpacity>
        </Wrapper>
      </DefaultPage>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params: _, previewData }) => {
  const globals = await fetchData<GlobalsQuery>(GLOBALS_QUERY);

  return {
    props: {
      ...globals,
    },
  };
};

export default Custom404;
