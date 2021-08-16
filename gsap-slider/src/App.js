import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

import leftArrow from "./assets/arrow-left.svg";
import rightArrow from "./assets/arrow-right.svg";

import "./App.css";
import image from "./assets/image.jpg";
import image2 from "./assets/image2.jpg";
import image3 from "./assets/image3.jpg";

const testimonials = [
  {
    name: "Julia Cameron",
    title: "Creative Director, VISA",
    image: image3,
    quote:
      "It's all good. I was amazed at the quality of the Design. We've seen amazing results already.",
  },
  {
    name: "Mark Jacobs",
    title: "Tech Lead, Google",
    image: image,
    quote:
      "The rebranding has really helped our business. Definitely worth the investment.",
  },
  {
    name: "Lisa Bearings",
    title: "Brand Coordinator, Facebook",
    image: image2,
    quote:
      "The service was excellent. Absolutely wonderful! A complete redesign did it for us.",
  },
];

function App() {
  const imageList = useRef(null);
  const testimonialList = useRef(null);
  const imageWidth = 340;

  const [state, setState] = useState({
    isActive1: true,
    isActive2: false,
    isActive3: false,
  });

  useEffect(() => {
    gsap.to(testimonialList.current.children[0], {
      duration: 0,
      opacity: 1,
    });
  }, []);

  // Image transition
  const slideLeft = (index, duration, multiplied = 1) => {
    gsap.to(imageList.current.children[index], {
      duration,
      x: -imageWidth * multiplied,
      ease: "power3.out",
    });
  };

  const slideRight = (index, duration, multiplied = 1) => {
    gsap.to(imageList.current.children[index], {
      duration,
      x: imageWidth * multiplied,
      ease: "power3.out",
    });
  };

  const scale = (index, duration) => {
    gsap.from(imageList.current.children[index], {
      duration,
      scale: 1.2,
      ease: "power3.out",
    });
  };

  // Content transition
  const fadeOut = (index, duration) => {
    gsap.to(testimonialList.current.children[index], {
      duration,
      opacity: 0,
    });
  };

  const fadeIn = (index, duration) => {
    gsap.to(testimonialList.current.children[index], {
      duration,
      opacity: 1,
      delay: 1,
    });
  };

  const nextSlide = () => {
    if (imageList.current.children[0].classList.contains("active")) {
      setState({ isActive1: false, isActive2: true });
      // Image transition
      slideLeft(0, 1);
      slideLeft(1, 1);
      scale(1, 1);
      slideLeft(2, 1);
      slideLeft(2, 0);
      // Content transition
      fadeOut(0, 1);
      fadeIn(1, 1);
    }

    if (imageList.current.children[1].classList.contains("active")) {
      setState({ isActive2: false, isActive3: true });
      // Image transition
      slideRight(0, 1);
      slideLeft(1, 1, 2);
      slideLeft(2, 1, 2);
      scale(2, 1);
      // Content transition
      fadeOut(1, 1);
      fadeIn(2, 1);
    }

    if (imageList.current.children[2].classList.contains("active")) {
      setState({ isActive1: true, isActive3: false });
      // Image transition
      slideLeft(2, 1, 3);
      slideLeft(0, 1, 0);
      slideLeft(1, 0, 0);
      scale(0, 1);
      // Content transition
      fadeOut(2, 1);
      fadeIn(0, 1);
    }
  };

  const prevSlide = () => {
    if (imageList.current.children[0].classList.contains("active")) {
      setState({ isActive1: false, isActive3: true });
      // Image transition
      slideLeft(2, 0, 3);
      slideLeft(2, 1, 2);
      scale(2, 1);
      slideRight(0, 1);
      slideRight(1, 1);
      // Content transition
      fadeOut(0, 1);
      fadeIn(2, 1);
    }

    if (imageList.current.children[1].classList.contains("active")) {
      setState({ isActive2: false, isActive1: true });
      // Image transition
      slideLeft(0, 0);
      slideRight(0, 1, 0);
      slideRight(1, 1, 0);
      slideRight(2, 1, 2);
      scale(0, 1);
      // Content transition
      fadeOut(1, 1);
      fadeIn(0, 1);
    }

    if (imageList.current.children[2].classList.contains("active")) {
      setState({ isActive2: true, isActive3: false });
      // Image transition
      slideLeft(2, 1);
      slideLeft(1, 0, 2);
      slideLeft(1, 1);
      scale(1, 1);
      // Content transition
      fadeOut(2, 1);
      fadeIn(1, 1);
    }
  };

  return (
    <div className="testimonial-section">
      <div className="testimonial-container">
        <div onClick={prevSlide} className="arrows left">
          <span>
            <img src={leftArrow} alt="left arrow" />
          </span>
        </div>
        <div className="inner">
          <div className="t-image">
            <ul ref={imageList}>
              <li className={state.isActive1 ? "active" : ""}>
                <img src={testimonials[0].image} alt={testimonials[0].name} />
              </li>
              <li className={state.isActive2 ? "active" : ""}>
                <img src={testimonials[1].image} alt={testimonials[0].name} />
              </li>
              <li className={state.isActive3 ? "active" : ""}>
                <img src={testimonials[2].image} alt={testimonials[0].name} />
              </li>
            </ul>
          </div>
          <div className="t-content">
            <ul ref={testimonialList}>
              <li className={state.isActive1 ? "active" : ""}>
                <div className="content-inner">
                  <p className="quote">{testimonials[0].quote}</p>
                  <h3 className="name">{testimonials[0].name}</h3>
                  <h4 className="title">{testimonials[0].title}</h4>
                </div>
              </li>
              <li className={state.isActive2 ? "active" : ""}>
                <div className="content-inner">
                  <p className="quote">{testimonials[1].quote}</p>
                  <h3 className="name">{testimonials[1].name}</h3>
                  <h4 className="title">{testimonials[1].title}</h4>
                </div>
              </li>
              <li className={state.isActive3 ? "active" : ""}>
                <div className="content-inner">
                  <p className="quote">{testimonials[2].quote}</p>
                  <h3 className="name">{testimonials[2].name}</h3>
                  <h4 className="title">{testimonials[2].title}</h4>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="arrows right" onClick={nextSlide}>
          <img src={rightArrow} alt="right arrow" />
        </div>
      </div>
    </div>
  );
}

export default App;
