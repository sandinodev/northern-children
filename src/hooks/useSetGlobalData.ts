import { useEffect } from "react";

import { DataStore, useDataStore } from "~/store/data";

import { GlobalsQuery } from "~/types";

export interface GlobalDataProps {
  donate?: GlobalsQuery["donate"];
  footer?: GlobalsQuery["footer"];
  intro?: GlobalsQuery["intro"];
  shareImage?: GlobalsQuery["shareImage"];
  socials?: GlobalsQuery["socials"];
}

const dataStoreSelector = ({ setDonate, setFooter, setIntro, setShareImage, setSocials }: DataStore) => ({
  setDonate,
  setFooter,
  setIntro,
  setShareImage,
  setSocials,
});

export const useSetGlobalData = ({ donate, footer, intro, shareImage, socials }: GlobalDataProps) => {
  const { setDonate, setFooter, setIntro, setShareImage, setSocials } = useDataStore(dataStoreSelector);

  useEffect(() => {
    const pages: string[] | undefined = donate?.pages?.flatMap(({ slug }) => slug as string).filter(Boolean);

    setDonate({ pages, link: donate?.link });
  }, [donate, setDonate]);

  useEffect(() => {
    setFooter(footer);
  }, [footer, setFooter]);

  useEffect(() => {
    setIntro(intro);
  }, [intro, setIntro]);

  useEffect(() => {
    setShareImage(shareImage);
  }, [shareImage, setShareImage]);

  useEffect(() => {
    const _socials = socials?.links?.reduce((acc: { [key: string]: string }, curr) => {
      if (curr.link?.text && curr.link?.url) {
        acc[curr.link.text.toLowerCase()] = curr.link.url;
      }

      return acc;
    }, {});

    setSocials(_socials);
  }, [socials, setSocials]);
};
