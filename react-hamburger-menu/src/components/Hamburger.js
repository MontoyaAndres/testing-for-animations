import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";

import {
  staggerText,
  staggerReveal,
  fadeInUp,
  handleHover,
  handleHoverExit,
  handleCityReturn,
  handleCity,
  staggerRevealClose,
} from "./Animations";

import dallas from "../images/dallas.webp";
import austin from "../images/austin.webp";
import newyork from "../images/newyork.webp";
import sanfrancisco from "../images/sanfrancisco.webp";
import beijing from "../images/beijing.webp";

const cities = [
  { name: "Dallas", image: dallas },
  { name: "Austin", image: austin },
  { name: "New York", image: newyork },
  { name: "San Francisco", image: sanfrancisco },
  { name: "Beijing", image: beijing },
];

export const Hamburger = ({ state }) => {
  // Create varibles of our dom nodes
  let menuLayer = useRef(null);
  let reveal1 = useRef(null);
  let reveal2 = useRef(null);
  let cityBackground = useRef(null);
  let line1 = useRef(null);
  let line2 = useRef(null);
  let line3 = useRef(null);
  let info = useRef(null);

  useEffect(() => {
    console.log(state);

    // If the menu is open and we click the menu button to close it.
    if (state.clicked === false) {
      // If menu is closed and we want to open it.

      staggerRevealClose(reveal2.current, reveal1.current);
      // Set menu to display none
      gsap.to(menuLayer.current, { duration: 1, css: { display: "none" } });
    } else if (
      state.clicked === true ||
      (state.clicked === true && state.initial === null)
    ) {
      // Set menu to display block
      gsap.to(menuLayer.current, { duration: 0, css: { display: "block" } });
      //Allow menu to have height of 100%
      gsap.to([reveal1.current, reveal2.current], {
        duration: 0,
        opacity: 1,
        height: "100%",
      });
      staggerReveal(reveal1.current, reveal2.current);
      fadeInUp(info.current);
      staggerText(line1.current, line2.current, line3.current);
    }
  }, [state]);

  return (
    <div ref={menuLayer} className="hamburger-menu">
      <div ref={reveal1} className="menu-secondary-background-color"></div>
      <div ref={reveal2} className="menu-layer">
        <div ref={cityBackground} className="menu-city-background"></div>
        <div className="container">
          <div className="wrapper">
            <div className="menu-links">
              <nav>
                <ul>
                  <li>
                    <Link
                      onMouseEnter={(e) => handleHover(e)}
                      onMouseOut={(e) => handleHoverExit(e)}
                      ref={line1}
                      to="/opportunities"
                    >
                      Opportunities
                    </Link>
                  </li>
                  <li>
                    <Link
                      onMouseEnter={(e) => handleHover(e)}
                      onMouseOut={(e) => handleHoverExit(e)}
                      ref={line2}
                      to="/solutions"
                    >
                      Solutions
                    </Link>
                  </li>
                  <li>
                    <Link
                      onMouseEnter={(e) => handleHover(e)}
                      onMouseOut={(e) => handleHoverExit(e)}
                      ref={line3}
                      to="/contact-us"
                    >
                      Contact us
                    </Link>
                  </li>
                </ul>
              </nav>
              <div ref={info} className="info">
                <h3>Our Promise</h3>
                <p>
                  The passage experienced a surge in popularity during the 1960s
                  when Letraset used it on their dry-transfer sheets, and again
                  during the 90s as desktop publishers bundled the text with
                  their software.
                </p>
              </div>
              <div className="locations">
                Locations:
                {cities.map((el) => (
                  <span
                    key={el.name}
                    onMouseEnter={() =>
                      handleCity(el.image, cityBackground.current)
                    }
                    onMouseOut={() => handleCityReturn(cityBackground.current)}
                  >
                    {el.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
