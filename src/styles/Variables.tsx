import { createGlobalStyle } from "styled-components";

import { up } from "~/utils/screens";

const DEFAULT_WIDTH = 1366;

export const Variables = createGlobalStyle`
  :root {
    --color-blue: #0597cc;
    --color-green: #228848;
    --color-red: #e04f39;
    --color-turquoise: #38d6b8;
    --color-yellow: #f0b323;
    --color-violet: #6d6db2;

    ${up("lg")} {
      --font-max-size: 56px;
      --font-max-line: 1.2;
      --font-max-letter: 0;

      --font-xl-size: 50px;
      --font-xl-line: 1.15;
      --font-xl-letter: -0.02em;

      --font-lg-size: 36px;
      --font-lg-line: 1.2;
      --font-lg-line-alpina: 1.15;
      --font-lg-letter: 0;

      --font-md-size: 24px;
      --font-md-line: 1.2;
      --font-md-letter: 0;

      --font-base-size: 18px;
      --font-base-line: 1.2;
      --font-base-letter: 0;

      --font-xs-size: 14px;
      --font-xs-line: 1.25;
      --font-xs-letter: 0;

      --max-w-container: ${DEFAULT_WIDTH}px;
    }
  }
`;
