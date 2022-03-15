import { NextSeo } from "next-seo";
import { useMemo } from "react";
import { DataStore, useDataStore } from "~/store/data";
import { rewriteImageSrc } from "~/utils";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  seo?: { [key: string]: any };
}

const dataStoreSelector = (state: DataStore) => state.seoDefault;

export const Seo = ({ seo }: Props) => {
  const seoDefault = useDataStore(dataStoreSelector);

  const src = useMemo(
    () => rewriteImageSrc(seo?.image?.url || seoDefault?.image?.[0]?.src),
    [seo?.image?.url, seoDefault?.image]
  );

  return (
    <NextSeo
      title={seo?.title}
      description={seo?.description || seoDefault?.description}
      openGraph={{
        images: [
          {
            url: src || "",
            width: 1200,
            height: 630,
          },
        ],
      }}
    />
  );
};
