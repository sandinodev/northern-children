import tw, { css, styled } from "twin.macro";
import { eases } from "~/styles/eases";

import { PillFragment } from "~/types";

const Container = styled.div`
  ${tw`absolute flex items-center justify-center top-0 left-0 w-full h-full pointer-events-none z-1`}
`;

const Title = styled.h3`
  ${tw`text-max font-athletics uppercase`}

  transition: all 0.2s 0.2s ${eases.sine.inOut};
`;

const Description = styled(Container)`
  ${tw`px-20 text-md text-center opacity-0`}

  transition: opacity 0.4s ${eases.sine.inOut};
`;

const Wrapper = styled.li<{ bg?: string }>`
  ${tw`relative col-span-full lg:col-span-6`}

  padding-bottom: ${(400 / 603) * 100}%;
  border-radius: 30rem;
  transition: border-radius 0.4s ${eases.sine.inOut};

  ${({ bg }) =>
    bg &&
    css`
      background-color: var(--color-${bg.toLowerCase()});
    `}

  &:hover {
    border-radius: 2rem;
    transition-timing-function: ${eases.sine.in};

    ${Title} {
      ${tw`opacity-0`}

      transform: translateY(-0.3em);
      transition-delay: 0;
    }

    ${Description} {
      ${tw`opacity-100`}

      transition-delay: 0.1s;
    }
  }
`;

export const Pill = ({ description, title, ...rest }: PillFragment) => {
  return (
    <Wrapper {...rest}>
      <Container>
        <Title>{title}</Title>

        <Description>
          <p>{description}</p>
        </Description>
      </Container>
    </Wrapper>
  );
};
