import tw, { styled } from "twin.macro";

import { BaseLink, BaseSection } from "~/components/base";

import { ContactQuery, GlobalsQuery } from "~/types";

import { ContactDirectory } from "./ContactDirectory";

interface Props {
  address?: string;
  addressLink?: string;
  contact: ContactQuery["contact"];
  socials: GlobalsQuery["socials"];
}

const StyledBaseSection = tw(BaseSection)`pb-100`;

const Address = tw.address`lg:text-md whitespace-pre`;

const Socials = styled.div`
  margin-top: 1.5em;
`;

export const Contact = ({ address, addressLink, contact, socials }: Props) => {
  return (
    <>
      <StyledBaseSection title={contact?.title} border noMt>
        <Address>
          <p>
            <BaseLink href={addressLink} underline>
              {address}
            </BaseLink>
          </p>

          {contact?.phone && (
            <BaseLink href={contact.phone.url} block underline>
              {contact.phone.text}
            </BaseLink>
          )}

          {contact?.email && (
            <BaseLink href={contact.email.url} block underline>
              {contact.email.text}
            </BaseLink>
          )}

          {!!socials?.links?.length && (
            <Socials>
              {socials.links.map(({ link }, i) => (
                <BaseLink key={i} href={link?.url} block underline>
                  {link?.text}
                </BaseLink>
              ))}
            </Socials>
          )}
        </Address>
      </StyledBaseSection>

      <BaseSection title={contact?.directoryTitle} mb>
        {!!contact?.directory?.length && <ContactDirectory directory={contact.directory} />}
      </BaseSection>
    </>
  );
};
