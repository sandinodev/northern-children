import gql from "graphql-tag";

import { PILL_FRAGMENT } from "~/components/pills";
import { QUOTE_FRAGMENT } from "~/components/quote";
import { SEO_FRAGMENT } from "~/components/seo";
import { SLIDER_VERTICAL_SLIDE_FRAGMENT } from "~/components/slider";
import { TEXT_MESSAGE_FRAGMENT } from "~/components/text";

import { ASSET_FRAGMENT } from "./Fragments.fragment";

export const MISSION_VISION_QUERY = gql`
  query MissionVision {
    mission: entry(slug: "mission-vision") {
      ... on missionVision_missionVision_Entry {
        hero {
          ... on hero_hero_BlockType {
            image {
              ...Asset
            }
            imageMobile {
              ...Asset
            }
            text
          }
        }
        header
        historyTitle
        message {
          ...TextMessage
        }
        pills {
          ...Pill
        }
        quote {
          ...Quote
        }
        seo {
          ...Seo
        }
        sliderVertical {
          ...SliderVerticalSlide
        }
        text: textWithLineBreaks
        teamEffortTitle: text
        teamEffortText: textAdditional
      }
    }
  }

  ${ASSET_FRAGMENT}
  ${PILL_FRAGMENT}
  ${QUOTE_FRAGMENT}
  ${SEO_FRAGMENT}
  ${SLIDER_VERTICAL_SLIDE_FRAGMENT}
  ${TEXT_MESSAGE_FRAGMENT}
`;
