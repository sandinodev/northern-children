import tw, { css, styled } from "twin.macro";

import { BaseButton, BaseContainer, BaseImage, BaseText, BaseWrapper } from "~/components/base";

import { ProgramFragment } from "~/types";

interface StylesExternalProps {
  color?: string;
}

interface Props extends StylesExternalProps {
  programs: ProgramFragment[];
}

const Wrapper = styled.ul<StylesExternalProps>`
  ${tw`relative divide-y z-1`}

  ${({ color }) =>
    color &&
    css`
      &:before {
        ${tw`absolute top-0 left-0 w-full h-full opacity-10 -z-1`}

        content: "";
        background-color: var(--color-${color.toLowerCase()});
      }

      ${Title} {
        color: var(--color-${color.toLowerCase()});
      }
    `}
`;

const Program = tw(BaseWrapper)`pt-80 pb-100`;

const Content = tw.div`col-span-6`;

const Title = styled.h2`
  ${tw`mb-60 text-xl font-alpina`}
`;

const Subtitle = tw.h3`mb-40 text-md font-bold`;

const Description = tw.div`mb-60`;

const Image = tw.div`col-span-5 col-start-8 self-center`;

export const Programs = ({ color, programs }: Props) => {
  return (
    <Wrapper color={color}>
      {programs.map((program, i) => (
        <Program key={i} as="li">
          <BaseContainer>
            <Content>
              <Title>{program.title}</Title>

              {!!program.subtitle?.length && <Subtitle>{program.subtitle}</Subtitle>}

              <Description>
                <BaseText text={program.description} />
              </Description>

              {program.contactLink && (
                <BaseButton href={program.contactLink.url}>{program.contactLink.text}</BaseButton>
              )}
            </Content>

            <Image>
              <BaseImage {...program.image?.[0]} />
            </Image>
          </BaseContainer>
        </Program>
      ))}
    </Wrapper>
  );
};
