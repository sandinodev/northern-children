import { Tiles } from "~/components/tiles";

import { ProgramFragment } from "~/types";

interface StylesExternalProps {
  color?: string;
}

interface Props extends StylesExternalProps {
  programs: ProgramFragment[];
}

export const Programs = ({ color, programs }: Props) => {
  return <Tiles color={color} items={programs} />;
};
