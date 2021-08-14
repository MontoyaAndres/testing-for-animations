import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export const Title = ({ lineContent, lineContent2 }) => {
  const line1 = useRef(null);
  const line2 = useRef(null);

  useEffect(() => {
    gsap.from([line1.current, line2.current], {
      duration: 0.8,
      delay: 0.8,
      ease: "power3.out",
      y: 64,
      stagger: {
        amount: 0.15,
      },
    });
  }, [line1, line2]);

  return (
    <h1 className="page-title">
      <div className="line-wrap">
        <div ref={line1} className="line">
          {lineContent}
        </div>
      </div>
      <div className="line-wrap">
        <div ref={line2} className="line">
          {lineContent2}
        </div>
      </div>
    </h1>
  );
};
