import { useEffect } from "react";

import { DataStore, useDataStore } from "~/store/data";

import { GlobalsQuery } from "~/types";

export interface GlobalDataProps {
  footer?: GlobalsQuery["footer"];
  socials?: GlobalsQuery["socials"];
}

const dataStoreSelector = ({ setFooter, setSocials }: DataStore) => ({ setFooter, setSocials });

export const useSetGlobalData = ({ footer, socials }: GlobalDataProps) => {
  const { setFooter, setSocials } = useDataStore(dataStoreSelector);

  useEffect(() => {
    setFooter(footer);
  }, [footer, setFooter]);

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
