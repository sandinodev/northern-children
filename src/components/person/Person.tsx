import tw from "twin.macro";

import { BaseButton, BaseContainer, BaseImage, BaseText, BaseWrapper } from "~/components/base";

import { PersonQuery } from "~/types";

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
          <Title>{`${person.name}${person.education?.length ? `, ${person.education}` : ""}`}</Title>
          <Subtitle>{person.role}</Subtitle>

          <BaseImage fullW {...person.image?.[0]} />

          <Description>
            <BaseText text={person.description} />
          </Description>

          <BaseButton href="/team" ariaLabel="Go to previous page">
            Back
          </BaseButton>
        </Content>
      </BaseContainer>
    </BaseWrapper>
  );
};
