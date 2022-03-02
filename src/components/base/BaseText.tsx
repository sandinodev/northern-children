import ReactMarkdown from "react-markdown";

import { MaskOpacity } from "~/components/mask";

interface Props {
  text?: string;
}

export const BaseText = ({ text, ...rest }: Props) => {
  if (!text?.length) return null;

  return (
    <MaskOpacity {...rest}>
      <ReactMarkdown children={text} />
    </MaskOpacity>
  );
};
