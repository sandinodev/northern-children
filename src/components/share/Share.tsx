import { useRouter } from "next/router";
import { useMemo } from "react";
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from "react-share";
import tw, { styled } from "twin.macro";

import { MaskOpacity } from "~/components/mask";

import { SeoFragment, ShareFacebookFragment, ShareTwitterFragment } from "~/types";

interface Props {
  share?: (ShareFacebookFragment | ShareTwitterFragment)[];
  seo?: SeoFragment[];
}

const Wrapper = tw.div`col-span-full text-xs font-era-mono`;

const Socials = tw.ul`inline-flex`;

const Social = styled.li`
  &:before {
    ${tw`whitespace-pre`}

    content: ", ";
  }

  &:first-child:before {
    content: " ";
  }

  button {
    ${tw`underline`}
  }
`;

export const Share = ({ share, seo, ...rest }: Props) => {
  const router = useRouter();

  const _share = useMemo(
    () => ({
      facebook: share?.find(({ type }) => type === "facebook") as ShareFacebookFragment | undefined,
      twitter: share?.find(({ type }) => type === "twitter") as ShareTwitterFragment | undefined,
    }),
    [share]
  );

  const shareUrl = useMemo(() => `${process.env.NEXT_PUBLIC_URL}${router.asPath.replace("/", "")}`, [router.asPath]);

  const twitterHashtags = useMemo(
    () => _share.twitter?.hashtags?.filter((v) => !!v.hashtag?.length).flatMap((v) => v.hashtag as string),
    [_share.twitter?.hashtags]
  );

  return (
    <Wrapper {...rest}>
      <MaskOpacity>
        Share:
        <Socials>
          <Social>
            <FacebookShareButton hashtag={_share.facebook?.hashtag} quote={_share.facebook?.quote} url={shareUrl}>
              Facebook
            </FacebookShareButton>
          </Social>

          <Social>
            <TwitterShareButton hashtags={twitterHashtags} title={seo?.[0].title} url={shareUrl}>
              Twitter
            </TwitterShareButton>
          </Social>

          <Social>
            <LinkedinShareButton summary={seo?.[0].description} url={shareUrl}>
              Linkedin
            </LinkedinShareButton>
          </Social>
        </Socials>
      </MaskOpacity>
    </Wrapper>
  );
};
