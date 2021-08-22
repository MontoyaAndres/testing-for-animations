import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import arrow from "./arrow.svg";
import "./App.css";

gsap.registerPlugin(ScrollToPlugin);
const array = new Array(8).fill(0);

function App() {
  const [images, setImages] = useState([]);
  const element = useRef(null);

  useEffect(() => {
    const getImages = async () => {
      const images = await Promise.all(
        array.map(
          async () =>
            await fetch("https://picsum.photos/1920/1080").then(
              (response) => response.url
            )
        )
      );

      setImages(images);
    };

    getImages();
  }, []);

  const handleScroll = (event) => {
    const width = 931; // image with ".content .box"

    gsap.to(element.current, {
      duration: 2,
      scrollTo: {
        x: event === "right" ? `+=${width}` : `-=${width}`,
      },
      ease: "power.out",
    });
  };

  if (images.length === 0) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <div className="wrapper">
        <div className="arrow left" onClick={() => handleScroll("left")}>
          <img src={arrow} alt="arrow left" />
        </div>
        <div className="content" ref={element}>
          {images.map((image, index) => (
            <div className="box" key={index}>
              <div
                className="image"
                style={{ backgroundImage: `url("${image}")` }}
                alt={index}
              />
            </div>
          ))}
        </div>
        <div className="arrow right" onClick={() => handleScroll("right")}>
          <img src={arrow} alt="arrow right" />
        </div>
      </div>
    </>
  );
}

export default App;
