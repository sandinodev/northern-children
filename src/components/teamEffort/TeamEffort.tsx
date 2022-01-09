import tw from "twin.macro";

import { BaseContainer, BaseWrapper } from "~/components/base";
import { Pills } from "~/components/pills";

import { PillFragment } from "~/types";

interface Props {
  pills?: PillFragment[];
  text?: string;
  title?: string;
}

const Texts = tw.div`col-span-full lg:col-span-6`;

export const TeamEffort = ({ pills, text, title }: Props) => {
  return (
    <BaseWrapper>
      <BaseContainer>
        <Texts>
          {title}
        </Texts>

        {!!pills?.length && <Pills pills={pills} />}
      </BaseContainer>
    </BaseWrapper>
  );
};
