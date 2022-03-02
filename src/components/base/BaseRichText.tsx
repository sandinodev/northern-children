import parse, { HTMLReactParserOptions, Element, domToReact } from "html-react-parser";
import tw, { styled } from "twin.macro";

import { MaskOpacity } from "~/components/mask";

interface Props {
  text?: string;
}

const MAIN_TAGS = ["p", "h1", "h2", "h3", "h4", "h5", "ul", "ol"];

const Wrapper = styled.div`
  ul,
  ol {
    ${tw`text-xs font-era-mono`}
  }
`;

const options = (): HTMLReactParserOptions => {
  return {
    replace: (domNode) => {
      if (domNode instanceof Element && domNode.attribs) {
        if (MAIN_TAGS.includes(domNode.name)) {
          return <MaskOpacity as={domNode.name}>{domToReact(domNode.children)}</MaskOpacity>;
        }
      }
    },
  };
};

export const BaseRichText = ({ text, ...rest }: Props) => {
  if (!text?.length) return null;

  return <Wrapper {...rest}>{parse(text, options())}</Wrapper>;
};
