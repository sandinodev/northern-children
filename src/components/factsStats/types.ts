import {
  FactsStatsImageBlockFragment,
  FactsStatsRichTextBlockFragment,
  FactsStatsTextWithBackgroundBlockFragment,
} from "~/types";

export type Block =
  | FactsStatsImageBlockFragment
  | FactsStatsRichTextBlockFragment
  | FactsStatsTextWithBackgroundBlockFragment;
