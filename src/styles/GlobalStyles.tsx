import React from "react";
import { createGlobalStyle } from "styled-components";
import tw, { GlobalStyles as BaseStyles } from "twin.macro";

import { Variables } from "./Variables";

const CustomStyles = createGlobalStyle`
  html {
    ${tw`bg-white-greenish text-black cursor-default leading-none min-h-full`}
  }

  body {
    ${tw`font-era text-base antialiased`}
  }

  html,
  body,
  #__next {
    ${tw`flex flex-col flex-1`}
  }

  a, button, input {
    ${tw`outline-none hover:outline-none focus:outline-none`}
  }

  address {
    ${tw`not-italic`}
  }

  img {
    -webkit-user-drag: none;
  }

  p {
    margin-bottom: 1.5em;
  }
`;

export const GlobalStyles = () => (
  <>
    <Variables />
    <BaseStyles />
    <CustomStyles />
  </>
);
