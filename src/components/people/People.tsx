import tw from "twin.macro";
import { BaseCard, BaseContainer, BaseSection } from "~/components/base";

import { PeoplePersonFragment } from "~/types";

interface Props {
  people: PeoplePersonFragment[];
  title?: string;
}

const Container = tw(BaseContainer)`col-span-full w-full`;

const Person = tw.li`lg:col-span-4`;

export const People = ({ people, title }: Props) => {
  return (
    <BaseSection title={title} noMt>
      <Container as="ul" fullW gapY>
        {people.map(({ education, name, role, slug, ...rest }, i) => (
          <Person key={i}>
            <BaseCard
              href={`/team/${slug}`}
              subtitle={role}
              title={`${name}${education?.length ? `, ${education}` : ""}`}
              {...rest}
            />
          </Person>
        ))}
      </Container>
    </BaseSection>
  );
};
