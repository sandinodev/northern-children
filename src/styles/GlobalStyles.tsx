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

  @media (min-width: 1025px) {
    #header ul li button,
    #header ul li a,
    #header nav > a {
      font-weight: 700;
    }
  }

  @media (max-width: 767px) {
    #__next > section:nth-child(2) {
      height: 100vh; 
    }
  } 
`;

export const GlobalStyles = () => (
  <>
    <Variables />
    <BaseStyles />
    <CustomStyles />
  </>
);
