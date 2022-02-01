import tw, { styled } from "twin.macro";

import { BaseLink } from "~/components/base";

import { ContactDirectoryEntryFragment } from "~/types";

interface Props {
  directory: ContactDirectoryEntryFragment[];
}

const Wrapper = tw.ul`col-span-full lg:text-md`;

const Entry = tw.li`mb-60 last:mb-0`;

const Title = tw.h3`font-bold`;

const Address = styled.address`
  margin-top: 1.5em;
`;

export const ContactDirectory = ({ directory }: Props) => {
  return (
    <Wrapper>
      {directory.map((entry, i) => (
        <Entry key={i}>
          <Title>{entry.title}</Title>

          <Address>
            {entry.person}
            <br />
            {entry.phone}

            {entry.email && (
              <BaseLink href={entry.email.url} block underline>
                {entry.email.text}
              </BaseLink>
            )}
          </Address>
        </Entry>
      ))}
    </Wrapper>
  );
};
