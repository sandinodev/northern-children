import { useRouter } from "next/router";
import { useMemo } from "react";
import tw, { styled } from "twin.macro";
import Image from "next/image";

import FacebookSVG from "~/assets/svg/icons/socials/facebook.svg";
import InstagramSVG from "~/assets/svg/icons/socials/instagram.svg";
import LinkedInSVG from "~/assets/svg/icons/socials/linkedin.svg";
import FooterLogo1 from "~/assets/logos/candid-seal-platinum-2024.jpg";
import FooterLogo2 from "~/assets/logos/Top Workplaces Certification Badge.pdf.jpg";

import { BaseContainer, BaseLink, BaseWrapper } from "~/components/base";
import { Cta } from "~/components/cta";

import { PAGES_WITHOUT_FOOTER, PAGES_WITHOUT_FOOTER_CTA } from "~/constants";

import { DataStore, useDataStore } from "~/store/data";

const Wrapper = tw.footer`border-t border-black bg-white-greenish z-footer`;

const Main = styled(BaseWrapper)`
  ${tw`pt-40 pb-20 lg:py-20`}

  a {
    transition: opacity 0.35s;
    &:hover {
      ${tw`opacity-50`}
    }
  }

  .two-col-logo {
    text-align: center;
  }
`;

const MainContainer = tw(BaseContainer)`items-end`;

const Address = tw.address`col-span-full lg:col-span-3 mb-10 lg:mb-0 whitespace-pre-line`;

const Newsletter = tw.div`col-span-full lg:col-span-2 mb-50 lg:mb-0`;

const Socials = tw.div`col-span-2 lg:col-start-9 flex lg:items-end`;

const SocialLink = tw(BaseLink)`mr-20 last:mr-0`;

const Credit = tw.div`col-span-2 text-right`;

const dataStoreSelector = ({ footer, socials }: DataStore) => ({ footer, socials });

export const Footer = () => {
  const router = useRouter();
  const { footer, socials } = useDataStore(dataStoreSelector);

  const hasFooter = useMemo(() => !PAGES_WITHOUT_FOOTER.includes(router.pathname), [router.pathname]);
  const hasFooterCTA = useMemo(() => !PAGES_WITHOUT_FOOTER_CTA.includes(router.pathname), [router.pathname]);

  if (!hasFooter) return null;

  return (
    <Wrapper id="footer">
      {hasFooterCTA && <Cta turquoise {...footer?.cta?.[0]} />}
      <div className="two-col-logo">
        <a href="https://www.guidestar.org/Profile/23-1396803" target="_blank" rel="noreferrer">
          <Image src={FooterLogo1} width={150} height={150} alt="Candid Seal Platinum" />
        </a>
        <Image src={FooterLogo2} width={150} height={150} alt="Top Workplaces Certification" />
      </div>
      <Main>
        <MainContainer fullW>
          <Address>
            <BaseLink href={footer?.addressLink}>{footer?.address}</BaseLink>
          </Address>

          <Newsletter>
            <BaseLink href={footer?.newsletterLink}>Newsletter</BaseLink>
          </Newsletter>

          <Socials>
            <SocialLink href={socials?.instagram} aria-label="Instagram" block>
              <InstagramSVG />
            </SocialLink>

            <SocialLink href={socials?.facebook} aria-label="Facebook" block>
              <FacebookSVG />
            </SocialLink>
            <SocialLink href={socials?.linkedin} aria-label="LinkedIn" block>
              <LinkedInSVG />
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
