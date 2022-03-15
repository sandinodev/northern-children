import { NextSeo } from "next-seo";
import { DataStore, useDataStore } from "~/store/data";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  seo?: { [key: string]: any };
}

const dataStoreSelector = (state: DataStore) => state.shareImage;

export const Seo = ({ seo }: Props) => {
  const shareImage = useDataStore(dataStoreSelector);

  return (
    <NextSeo
      title={seo?.title}
      description={seo?.description}
      openGraph={{
        images: [
          {
            url: seo?.image?.url || shareImage?.image?.[0].src,
            width: 1200,
            height: 630,
          },
        ],
      }}
    />
  );
};
