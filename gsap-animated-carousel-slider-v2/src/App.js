import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import arrow from "./arrow.svg";
import "./App.css";

gsap.registerPlugin(ScrollToPlugin);
const array = new Array(8).fill(0);

function App() {
  const wrapper = useRef(null);
  const content = useRef(null);
  const [images, setImages] = useState([]);
  const [isPressed, setIsPressed] = useState(false);
  const [startx, setStartX] = useState(0);

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

  const handleScroll = (event, type) => {
    const inner = event.clientX / 2;

    console.log(inner);

    if (parseInt(content.current.style.left) === 0 && type === "left") return;

    gsap.to(content.current, {
      left: type === "right" ? `-=${inner}` : `+=${inner}`,
      ease: "power.out",
    });

    checkBoundary();
  };

  const handleMouseDown = (event) => {
    event.preventDefault();

    wrapper.current.style.cursor = "grabbing";
    setIsPressed(true);
    setStartX(event.clientX - content.current.getBoundingClientRect().left);
  };

  const handleMouseEnter = (event) => {
    event.preventDefault();

    setIsPressed(false);
    wrapper.current.style.cursor = "grab";
  };

  const handleMouseUp = (event) => {
    event.preventDefault();

    setIsPressed(false);
    wrapper.current.style.cursor = "grab";
  };

  const handleMouseMove = (event) => {
    event.preventDefault();

    if (!isPressed) return;

    gsap.to(content.current, {
      left: event.clientX - startx,
      ease: "power.out",
    });

    checkBoundary();
  };

  const checkBoundary = () => {
    const outer = wrapper.current.getBoundingClientRect();
    const inner = content.current.getBoundingClientRect();

    if (parseInt(content.current.style.left) > 0) {
      gsap.to(content.current, {
        left: 0,
        ease: "power.out",
      });
    } else if (inner.right < outer.right) {
      gsap.to(content.current, {
        left: -inner.width + outer.width,
        ease: "power.out",
      });
    }
  };

  if (images.length === 0) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <div
        className="wrapper"
        ref={wrapper}
        onMouseDown={handleMouseDown}
        onMouseEnter={handleMouseEnter}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <div
          className="arrow left"
          onClick={(event) => handleScroll(event, "left")}
        >
          <img src={arrow} alt="arrow left" />
        </div>
        <div className="content" ref={content}>
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
        <div
          className="arrow right"
          onClick={(event) => handleScroll(event, "right")}
        >
          <img src={arrow} alt="arrow right" />
        </div>
      </div>
    </>
  );
}

export default App;
