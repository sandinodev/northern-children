import { FactsStatsImageBlockFragment } from "~/types";
import { FactsStatsRichTextBlockProps } from "./blocks/RichTextBlock";

import { FactsStatsTextWithBackgroundBlockProps } from "./blocks/TextWithBackgroundBlock";

export type Block =
  | FactsStatsImageBlockFragment
  | FactsStatsRichTextBlockProps
  | FactsStatsTextWithBackgroundBlockProps;
