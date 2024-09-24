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

  iframe {
    width: 100%;
  }

  .two-col-logo {
    text-align: center;
    padding: 50px 0;
    border-bottom: 1px solid rgb(38 38 38);
    display: flex;
    column-gap: 50px;
    width: 100%;
    justify-content: center;
    opacity: 1;
  }

  @media (min-width: 1025px) {
    #header ul li button,
    #header ul li a,
    #header nav ul > a {
      font-weight: 700;
    }
  }

  @media (max-width: 767px) {
    #__next > section:nth-child(2) {
      height: 100vh; 
    }

    main > section:first-child {
      height: auto;
      padding-bottom: 50px;
    }

    main > section:nth-child(6) >  section:nth-child(2) >  section:first-child  h3 {
      margin-top: 0rem;
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
