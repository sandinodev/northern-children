import { styled } from "twin.macro";

interface Props {
  text?: string;
}

const Wrapper = styled.div``;

export const BaseRichText = ({ text, ...rest }: Props) => {
  if (!text?.length) return null;

  return <Wrapper dangerouslySetInnerHTML={{ __html: text }} {...rest} />;
};
