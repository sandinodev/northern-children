import { NextSeo } from "next-seo";
import { DataStore, useDataStore } from "~/store/data";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  seo?: { [key: string]: any };
}

const dataStoreSelector = (state: DataStore) => state.seoDefault;

export const Seo = ({ seo }: Props) => {
  const seoDefault = useDataStore(dataStoreSelector);

  return (
    <NextSeo
      title={seo?.title}
      description={seo?.description || seoDefault?.description}
      openGraph={{
        images: [
          {
            url: seo?.image?.url || seoDefault?.image?.[0]?.src,
            width: 1200,
            height: 630,
          },
        ],
      }}
    />
  );
};
