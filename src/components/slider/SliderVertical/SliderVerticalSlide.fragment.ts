import gql from "graphql-tag";

export const SLIDER_VERTICAL_SLIDE_FRAGMENT = gql`
  fragment SliderVerticalSlide on sliderVertical_slide_BlockType {
    text
    title: slideTitle
  }
`;
