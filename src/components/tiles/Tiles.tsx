import tw, { css, styled } from "twin.macro";

import { Tile, TileProps } from "./Tile";

interface StylesExternalProps {
  color?: string;
}

interface Props extends StylesExternalProps {
  items: TileProps["item"][];
  richText?: boolean;
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

      h2 {
        color: var(--color-${color.toLowerCase()});
      }
    `}
`;

export const Tiles = ({ color, items, richText }: Props) => {
  if (!items?.length) return null;

  return (
    <Wrapper color={color}>
      {items.map((item, i) => (
        <Tile key={i} item={item} richText={richText} />
      ))}
    </Wrapper>
  );
};
