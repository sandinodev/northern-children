import gql from "graphql-tag";

import { ASSET_FRAGMENT } from "~/gql/Fragments.fragment";

export const SLIDER_VERTICAL_SLIDE_FRAGMENT = gql`
  fragment SliderVerticalSlide on sliderVertical_slide_BlockType {
    image {
      ...Asset
    }
    text
    title: slideTitle
  }

  ${ASSET_FRAGMENT}
`;
