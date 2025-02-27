import tw from "twin.macro";

import { BaseContainer } from "~/components/base";

import { PillFragment } from "~/types";

import { Pill } from "./Pill";

interface Props {
  pills?: PillFragment[];
}

const Wrapper = tw(BaseContainer)`col-span-full gap-y-50 w-full mb-240`;

export const Pills = ({ pills }: Props) => {
  if (!pills?.length) return null;

  return (
    <Wrapper as="ul">
      {pills.map((pill, i) => (
        <Pill key={i} {...pill} />
      ))}
    </Wrapper>
  );
};
