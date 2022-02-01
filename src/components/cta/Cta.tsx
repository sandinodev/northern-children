import tw, { styled } from "twin.macro";

import { BaseButton, BaseContainer, BaseWrapper } from "~/components/base";

import { CtaFragment } from "~/types";

import { parsePublicToLocalHref } from "~/utils";

interface StylesExternalProps {
  noBorder?: boolean;
  yellow?: boolean;
}

interface Props extends CtaFragment, StylesExternalProps {
  turquoise?: boolean;
}

const Wrapper = styled(BaseWrapper)<StylesExternalProps>`
  ${tw`py-100 lg:py-144`}

  ${({ noBorder }) => !noBorder && tw`border-b border-black`}

  ${({ yellow }) => yellow && tw`bg-yellow`}
`;

const Content = tw.div`col-span-full lg:col-span-6 lg:col-start-4 flex flex-col items-center text-center text-lg-alpina font-alpina`;

const Text = tw.p`mb-64`;

const Links = tw.div`grid grid-flow-row lg:grid-flow-col auto-cols-fr gap-x-10 lg:gap-x-40 gap-y-40`;

export const Cta = ({ links, text, turquoise, ...rest }: Props) => {
  return (
    <Wrapper {...rest}>
      <BaseContainer>
        <Content>
          <Text>{text}</Text>

          {!!links?.length && (
            <Links>
              {links.map(({ ariaLabel, link }, i) => (
                <BaseButton
                  key={i}
                  ariaLabel={ariaLabel}
                  href={parsePublicToLocalHref(link?.url)}
                  turquoise={turquoise}
                >
                  {link?.text}
                </BaseButton>
              ))}
            </Links>
          )}
        </Content>
      </BaseContainer>
    </Wrapper>
  );
};
