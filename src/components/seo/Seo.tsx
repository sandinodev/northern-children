import { NextSeo } from "next-seo";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  seo?: { [key: string]: any };
}

export const Seo: React.FC<Props> = ({ seo }) => {
  return (
    <NextSeo
      title={seo?.title}
      description={seo?.description}
      openGraph={{
        images: [
          {
            url: seo?.image?.url || "/social-embed.png",
            width: 1200,
            height: 630,
          },
        ],
      }}
    />
  );
};
