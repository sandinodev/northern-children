import ReactMarkdown from "react-markdown";

interface Props {
  text?: string;
}

export const BaseText = ({ text, ...rest }: Props) => {
  if (!text?.length) return null;

  return <ReactMarkdown children={text} {...rest} />;
};
