import { GetStaticProps, NextPage } from "next";
import { useState, useEffect } from "react";

import { HeroSplit } from "~/components/hero";
import { History } from "~/components/history";
import { Quote } from "~/components/quote";
import { Seo } from "~/components/seo";
import { TeamEffort } from "~/components/teamEffort";
import { TextHalf2, TextMessage } from "~/components/text";

import { GLOBALS_QUERY, MISSION_VISION_QUERY } from "~/gql";

import { GlobalDataProps, useSetGlobalData } from "~/hooks";

import { DefaultPage } from "~/layouts/DefaultPage";

import { fetchData } from "~/lib/api";

import { GlobalsQuery, MissionVisionQuery } from "~/types";

interface Props extends GlobalDataProps {
  mission: MissionVisionQuery["mission"];
}

const Page: NextPage<Props> = ({ mission, seoDefault, ...rest }) => {
  useSetGlobalData(rest);

  useEffect(() => {
    if (window.location.href.indexOf("#") !== -1) {
      const _hash = window.location.hash;
      const _messageSection = document.querySelectorAll("main section")[4];
      const _historySection = document.querySelectorAll("main section")[6];
      if (_hash === "#message") {
        window.scrollTo(0, _messageSection?.offsetTop);
      } else if (_hash === "#history") {
        window.scrollTo(0, _historySection?.offsetTop);
      }
    }
  }, []);

  return (
    <>
      <Seo seo={mission?.seo?.[0]} seoDefault={seoDefault} />

      <DefaultPage>
        {!!mission?.hero?.length && <HeroSplit bg="turquoise" {...mission.hero[0]} />}

        {!!mission?.text?.length && <TextHalf2 text={mission.text} />}

        {!!mission?.quote?.length && <Quote {...mission.quote[0]} />}

        {!!mission?.message?.length && <TextMessage {...mission.message[0]} />}

        <TeamEffort pills={mission?.pills} title={mission?.teamEffortTitle} text={mission?.teamEffortText} />

        <History slides={mission?.sliderVertical} title={mission?.historyTitle} />
      </DefaultPage>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params: _, previewData }) => {
  const globals = await fetchData<GlobalsQuery>(GLOBALS_QUERY);
  const { mission } = await fetchData<MissionVisionQuery>(MISSION_VISION_QUERY, undefined, previewData);

  return {
    revalidate: 60,
    props: {
      mission,
      ...globals,
    },
  };
};

export default Page;
