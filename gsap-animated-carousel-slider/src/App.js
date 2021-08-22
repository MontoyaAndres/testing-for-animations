import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
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
    if (event.clientX > element.current.clientWidth / 2) {
      gsap.to(element.current, {
        duration: 2,
        scrollTo: {
          x: "+=175",
        },
        ease: "power.out",
      });
    } else {
      gsap.to(element.current, {
        duration: 2,
        scrollTo: {
          x: "-=175",
        },
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
        ref={element}
        class="wrapper"
        onMouseMove={handleScroll}
        onTouchMove={handleScroll}
      >
        {images.map((image, index) => (
          <div class="box" key={index}>
            <div
              className="image"
              style={{ backgroundImage: `url("${image}")` }}
              alt={index}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
