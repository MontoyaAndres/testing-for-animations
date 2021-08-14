import { useEffect, useRef } from "react";
import gsap from "gsap";
import CSSRulePlugin from "gsap/CSSRulePlugin";

import People from "./image/people.webp";
import "./App.css";

gsap.registerPlugin(CSSRulePlugin);

function App() {
  const image = useRef(null);
  const container = useRef(null);

  useEffect(() => {
    const imageReveal = CSSRulePlugin.getRule(".img-container::after");
    const tl = gsap.timeline();

    tl.to(container.current, {
      duration: 0,
      css: {
        visibility: "visible",
      },
    })
      .to(imageReveal, {
        duration: 1.4,
        width: "0%",
        ease: "power2.inOut",
      })
      .from(image.current, {
        duration: 1.4,
        scale: 1.6,
        ease: "power2.inOut",
        delay: -1.4,
      });
  }, []);

  return (
    <section className="main">
      <p>GSAP IMAGE REVEAL</p>
      <div ref={container} className="container">
        <>
          <div className="img-container">
            <img src={People} ref={image} className="image" alt="content" />
          </div>
        </>
      </div>
    </section>
  );
}

export default App;
