import tw from "twin.macro";

import { BaseSection } from "~/components/base";
import { MaskOpacity } from "~/components/mask";
import { Pills } from "~/components/pills";

import { PillFragment } from "~/types";

interface Props {
  pills?: PillFragment[];
  text?: string;
  title?: string;
}

const Text = tw.div`col-span-full lg:col-span-6 text-md mb-100`;

export const TeamEffort = ({ pills, text, title }: Props) => {
  return (
    <BaseSection title={title}>
      <Text>
        <MaskOpacity>{text}</MaskOpacity>
      </Text>

      {!!pills?.length && <Pills pills={pills} />}
    </BaseSection>
  );
};
