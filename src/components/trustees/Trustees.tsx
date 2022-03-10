import tw from "twin.macro";

import { BaseContainer, BaseSection } from "~/components/base";
import { MaskOpacity } from "~/components/mask";

import { TrusteesTrusteeFragment } from "~/types";

interface Props {
  title?: string;
  trustees: TrusteesTrusteeFragment[];
}
const StyledMaskOpacity = tw(MaskOpacity)`col-span-full`;

const List = tw.ul`border-t border-b divide-y`;

const Trustee = tw(BaseContainer)`py-20 lg:py-12 text-xs font-era-mono`;

const Name = tw.div`col-span-full lg:col-span-4 mb-20 lg:mb-0`;

const Description = tw.div`col-span-full lg:col-span-8`;

export const Trustees = ({ title, trustees }: Props) => {
  return (
    <BaseSection title={title} mb>
      <StyledMaskOpacity start="top bottom" noY>
        <List>
          {trustees.map(({ description, name, role }, i) => (
            <Trustee key={i} fullW>
              <Name>{`${name}${role ? `, ${role}` : ""}`}</Name>
              <Description>{description}</Description>
            </Trustee>
          ))}
        </List>
      </StyledMaskOpacity>
    </BaseSection>
  );
};
