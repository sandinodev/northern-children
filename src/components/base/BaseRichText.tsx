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
    ${tw`text-xs font-era-mono list-outside`}

    margin-left: 1em;
    margin-bottom: 1.5em;

    li {
      ${tw`mb-27`}
    }
  }

  ol {
    ${tw`list-decimal`}
  }

  ul {
    ${tw`list-disc`}
  }

  a {
    ${tw`underline`}
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
