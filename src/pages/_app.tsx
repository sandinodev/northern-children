import { debounce } from "lodash";
import NextHead from "next/head";
import { AppProps } from "next/app";
import { DefaultSeo, DefaultSeoProps } from "next-seo";
import { useEffect } from "react";

import { Donate } from "~/components/donate";
import { Footer } from "~/components/footer";
import { Header } from "~/components/header";
import { Intro } from "~/components/intro";
import { TransitionPages } from "~/components/transition";

import { Store, useStore } from "~/store";

import { GlobalStyles } from "~/styles/GlobalStyles";
import "~/styles/fonts.css";

const defaultSeo: DefaultSeoProps = {
  title: "Title",
  titleTemplate: "%s | Northern Children",
  description: "Description",
  twitter: {
    cardType: "summary_large_image",
  },
  openGraph: {
    type: "website",
    images: [{ url: "/social-embed.png" }],
  },
};

const storeSelector = ({ isIntro, setWH, setWW }: Store) => ({
  isIntro,
  setWH,
  setWW,
});

const App = ({ Component, pageProps }: AppProps) => {
  const { isIntro, setWH, setWW } = useStore(storeSelector);

  useEffect(() => {
    const set = () => {
      setWH(window.innerHeight);
      setWW(window.innerWidth);
    };

    const debouncedSet = debounce(set, 300);

    window.addEventListener("resize", debouncedSet);
    set();

    return () => {
      window.removeEventListener("resize", debouncedSet);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <DefaultSeo {...defaultSeo} />

      <NextHead>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="preload" href="/fonts/Athletics-ExtraBold.otf" as="font" type="font/otf" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/GTAlpina-Light.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/ModernEra-Regular.otf" as="font" type="font/otf" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/ModernEraMono-Regular.otf" as="font" type="font/otf" crossOrigin="anonymous" />
      </NextHead>

      <GlobalStyles />

      <Header />

      <TransitionPages>
        <Component {...pageProps} />
      </TransitionPages>

      <Footer />

      <Donate />

      {isIntro && <Intro />}
    </>
  );
};

export default App;
