import { GetStaticProps, NextPage } from "next";
import { useEffect, useState } from "react";
import { styled } from "twin.macro";

import { Cta } from "~/components/cta";
import { NewsStories } from "~/components/newsStories";
import { Seo } from "~/components/seo";
import { Slider } from "~/components/slider";

import { MAIN_PADDING_TOP } from "~/constants";

import { GLOBALS_QUERY, HOME_QUERY } from "~/gql";

import { GlobalDataProps, useSetGlobalData } from "~/hooks";

import { DefaultPage } from "~/layouts/DefaultPage";

import { fetchData } from "~/lib/api";
import { Store, useStore } from "~/store";

import { GlobalsQuery, HomeQuery } from "~/types";

import { down } from "~/utils/screens";

interface Props extends GlobalDataProps {
  home: HomeQuery["home"];
}

const StyledSlider = styled(Slider)`
  ${down("lg")} {
    height: calc(100vh - ${MAIN_PADDING_TOP.min}px);
  }
`;

const storeSelector = ({ isIntro, setIsIntro }: Store) => ({ isIntro, setIsIntro });

const Index: NextPage<Props> = ({ home, ...rest }) => {
  const { isIntro, setIsIntro } = useStore(storeSelector);

  const [hadIntro, setHadIntro] = useState(isIntro);

  useSetGlobalData(rest);

  useEffect(() => {
    if (isIntro || hadIntro) return;

    setIsIntro(true);
    setHadIntro(true);
  }, [hadIntro, isIntro, setIsIntro]);

  return (
    <>
      <Seo seo={home?.seo?.[0]} />

      <DefaultPage>
        {!!home?.slides?.length && <StyledSlider interval={home.interval} slides={home.slides} hScreen />}

        {!!home?.cta?.length && <Cta noBorder wide yellow {...home.cta[0]} />}

        {(!!home?.newsStoriesFeatured?.length || !!home?.newsStoriesLatest?.length) && (
          <NewsStories featured={home?.newsStoriesFeatured} list={home?.newsStoriesLatest} />
        )}
      </DefaultPage>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params: _, previewData }) => {
  const globals = await fetchData<GlobalsQuery>(GLOBALS_QUERY);
  const { home } = await fetchData<HomeQuery>(HOME_QUERY, undefined, previewData);

  return {
    revalidate: 60,
    props: {
      home,
      ...globals,
    },
  };
};

export default Index;
