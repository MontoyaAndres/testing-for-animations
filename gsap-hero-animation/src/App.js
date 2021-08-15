import { useEffect, useRef } from "react";
import gsap from "gsap";

import imgGirl from "./images/girl.webp";
import imgBoy from "./images/boy.webp";
import arrow from "./images/arrow-right.svg";
import "./App.css";

function App() {
  const app = useRef(null);
  const images = useRef(null);
  const content = useRef(null);
  const tl = gsap.timeline();

  useEffect(() => {
    // images
    const girlImage = images.current.firstElementChild;
    const boyImage = images.current.lastElementChild;

    // content
    const headlineFirst = content.current.children[0].children[0];
    const headlineSecond = headlineFirst.nextSibling;
    const headlineThird = headlineSecond.nextSibling;
    const contentP = content.current.children[1];
    const contentButton = content.current.children[2];

    gsap.to(app.current, {
      duration: 0,
      css: {
        visibility: "visible",
      },
    });

    // images animation
    tl.from(girlImage, {
      duration: 1.2,
      y: 1280,
      ease: "power3.out",
    })
      .from(
        girlImage.firstElementChild,
        {
          duration: 2,
          scale: 1.6,
          ease: "power3.out",
        },
        "<0.2"
      )
      .from(
        boyImage,
        {
          duration: 1.4,
          y: 1280,
          ease: "power3.out",
        },
        "<0.2"
      )
      .from(
        boyImage.firstElementChild,
        {
          duration: 2,
          scale: 1.6,
          ease: "power3.out",
        },
        "<0.2"
      );

    // content animation
    tl.from(
      [headlineFirst.children, headlineSecond.children, headlineThird.children],
      {
        duration: 1,
        y: 44,
        ease: "power3.out",
        delay: 0.8,
        stagger: 0.5,
      },
      "<0.15"
    )
      .from(
        contentP,
        {
          duration: 1,
          y: 20,
          opacity: 0,
          ease: "power3.out",
        },
        "<0.16"
      )
      .from(
        contentButton,
        {
          duration: 1,
          y: 20,
          opacity: 0,
          ease: "power3.out",
        },
        "<0.17"
      );
  }, [tl]);

  return (
    <div className="hero" ref={app}>
      <div className="container">
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-content-inner" ref={content}>
              <h1>
                <div className="hero-content-line">
                  <div className="hero-content-line-inner">
                    Relieving the burden
                  </div>
                </div>
                <div className="hero-content-line">
                  <div className="hero-content-line-inner">
                    of disease caused
                  </div>
                </div>
                <div className="hero-content-line">
                  <div className="hero-content-line-inner">by behaviors.</div>
                </div>
              </h1>
              <p>
                Better treats serious cardiometabolic diseases to transform
                lives and reduce healthcare utilization through the use of
                digital therapeutics.
              </p>
              <div className="btn-row">
                <button className="explore-button">
                  Explore
                  <div className="arrow-icon">
                    <img src={arrow} alt="row" />
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div className="hero-images">
            <div ref={images} className="hero-images-inner">
              <div className="hero-image girl">
                <img src={imgGirl} alt="girl" />
              </div>
              <div className="hero-image boy">
                <img src={imgBoy} alt="boy" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
