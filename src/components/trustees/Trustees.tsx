import tw from "twin.macro";
import { BaseContainer, BaseSection } from "~/components/base";

import { TrusteesTrusteeFragment } from "~/types";

interface Props {
  title?: string;
  trustees: TrusteesTrusteeFragment[];
}

const List = tw.ul`col-span-full border-t border-b divide-y`;

const Trustee = tw(BaseContainer)`py-12 text-xs font-era-mono`;

const Name = tw.div`col-span-4`;

const Description = tw.div`col-span-8`;

export const Trustees = ({ title, trustees }: Props) => {
  return (
    <BaseSection title={title} mb>
      <List>
        {trustees.map(({ description, name, role }, i) => (
          <Trustee key={i} as="li" fullW>
            <Name>{`${name}${role ? `, ${role}` : ""}`}</Name>
            <Description>{description}</Description>
          </Trustee>
        ))}
      </List>
    </BaseSection>
  );
};
