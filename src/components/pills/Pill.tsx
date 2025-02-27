import tw, { css, styled } from "twin.macro";

import { eases } from "~/styles/eases";

import { PillFragment } from "~/types";

import { down, up } from "~/utils/screens";
import { MaskOpacity } from "../mask";

const Content = styled.div`
  ${tw`lg:absolute flex items-center justify-center top-0 left-0 w-full h-full pointer-events-none z-1`}
`;

const Title = styled(Content)`
  ${tw`absolute px-20 text-max text-center font-athletics uppercase`}

  transition: all 0.2s 0.2s ${eases.sine.inOut};
`;

const Description = styled.div`
  ${tw`flex items-center justify-center px-20 py-20 lg:py-0 text-md text-center opacity-0`}

  transition: opacity 0.4s ${eases.sine.inOut};

  ${down("lg")} {
    min-height: 22rem;
  }

  p {
    ${tw`m-0`}
  }
`;
const Wrapper = tw.li`col-span-full lg:col-span-6`;

const Container = styled.div<{ bg?: string }>`
  ${tw`relative w-full`}

  border-radius: 11.2rem;
  transition: border-radius 0.4s ${eases.sine.inOut};

  ${up("lg")} {
    border-radius: 30rem;
    padding-bottom: ${(400 / 603) * 100}%;
  }

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
      transition-delay: 0s;
    }

    ${Description} {
      ${tw`opacity-100`}

      transition-delay: 0.1s;
    }
  }
`;

export const Pill = ({ description, title, ...rest }: PillFragment) => {
  return (
    <Wrapper>
      <MaskOpacity>
        <Container {...rest}>
          <Content>
            <Title as="h3">{title}</Title>

            <Description>
              <p>{description}</p>
            </Description>
          </Content>
        </Container>
      </MaskOpacity>
    </Wrapper>
  );
};
