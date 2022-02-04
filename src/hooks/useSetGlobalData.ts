import { useEffect } from "react";

import { DataStore, useDataStore } from "~/store/data";

import { GlobalsQuery } from "~/types";

export interface GlobalDataProps {
  footer?: GlobalsQuery["footer"];
  intro?: GlobalsQuery["intro"];
  socials?: GlobalsQuery["socials"];
}

const dataStoreSelector = ({ setFooter, setIntro, setSocials }: DataStore) => ({ setFooter, setIntro, setSocials });

export const useSetGlobalData = ({ footer, intro, socials }: GlobalDataProps) => {
  const { setFooter, setIntro, setSocials } = useDataStore(dataStoreSelector);

  useEffect(() => {
    setFooter(footer);
  }, [footer, setFooter]);

  useEffect(() => {
    setIntro(intro);
  }, [intro, setIntro]);

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
