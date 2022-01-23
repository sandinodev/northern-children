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
  ${tw`py-144`}

  ${({ noBorder }) => !noBorder && tw`border-b border-black`}

  ${({ yellow }) => yellow && tw`bg-yellow`}
`;

const Content = tw.div`col-span-6 col-start-4 flex flex-col items-center text-center text-lg-alpina font-alpina`;

const Text = tw.p`mb-64`;

const Links = tw.div`grid grid-flow-col auto-cols-fr gap-x-40`;

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
