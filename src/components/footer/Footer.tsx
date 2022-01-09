import tw from "twin.macro";

import FacebookSVG from "~/assets/svg/icons/socials/facebook.svg";
import InstagramSVG from "~/assets/svg/icons/socials/instagram.svg";

import { BaseContainer, BaseLink, BaseWrapper } from "~/components/base";
import { Cta } from "~/components/cta";

import { Store, useStore } from "~/store";
import { DataStore, useDataStore } from "~/store/data";

const Wrapper = tw.footer`border-t border-black`;

const Main = tw(BaseWrapper)`py-20`;

const MainContainer = tw(BaseContainer)`items-end`;

const Address = tw.address`col-span-3 whitespace-pre-line`;

const Newsletter = tw.div`col-span-2`;

const Socials = tw.div`col-span-2 col-start-9 flex items-end`;

const SocialLink = tw(BaseLink)`mr-20 last:mr-0`;

const Credit = tw.div`col-span-2 text-right`;

const dataStoreSelector = ({ footer, socials }: DataStore) => ({ footer, socials });
const storeSelector = ({ hasFooter, hasFooterCTA }: Store) => ({ hasFooter, hasFooterCTA });

export const Footer = () => {
  const { footer, socials } = useDataStore(dataStoreSelector);
  const { hasFooter, hasFooterCTA } = useStore(storeSelector);

  return (
    <Wrapper>
      {hasFooterCTA && <Cta link={{ text: "Contact us", url: "/contact" }} text={footer?.cta} turquoise />}

      <Main>
        <MainContainer>
          <Address>{footer?.address}</Address>

          <Newsletter>
            <button aria-label="Show newsletter signup modal" type="button">
              Newsletter
            </button>
          </Newsletter>

          <Socials>
            <SocialLink href={socials?.instagram} aria-label="Instagram" block>
              <InstagramSVG />
            </SocialLink>

            <SocialLink href={socials?.facebook} aria-label="Facebook" block>
              <FacebookSVG />
            </SocialLink>
          </Socials>

          <Credit>
            <BaseLink href="https://thefutureforward.com">Web Credit</BaseLink>
          </Credit>
        </MainContainer>
      </Main>
    </Wrapper>
  );
};
