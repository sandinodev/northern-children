import tw from "twin.macro";

import { BaseButton, BaseContainer, BaseImage, BaseText, BaseWrapper } from "~/components/base";

import { PersonQuery } from "~/types";
import { MaskOpacity } from "../mask";

const Content = tw.div`col-span-full lg:col-span-6`;

const Title = tw.h1`mb-46 text-lg font-alpina`;

const Subtitle = tw.h2`mb-80 text-xs font-era-mono`;

const Description = tw.div`mt-80 mb-100`;

export const Person = (person: PersonQuery["person"]) => {
  if (!person) return null;

  return (
    <BaseWrapper mb>
      <BaseContainer>
        <Content>
          <Title>
            <MaskOpacity>{`${person.name}${person.education?.length ? `, ${person.education}` : ""}`}</MaskOpacity>
          </Title>
          <Subtitle>
            <MaskOpacity>{person.role}</MaskOpacity>
          </Subtitle>

          <BaseImage fullW {...person.image?.[0]} />

          <Description>
            <BaseText text={person.description} />
          </Description>

          <MaskOpacity start="top bottom" noY>
            <BaseButton href="/team" ariaLabel="Go to previous page">
              Back
            </BaseButton>
          </MaskOpacity>
        </Content>
      </BaseContainer>
    </BaseWrapper>
  );
};
