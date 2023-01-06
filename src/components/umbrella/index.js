import React, { useEffect, useState, useRef } from "react";
import classNames from "classnames";
import "./Umbrella.css";
import { UmbrellaMapping } from "../../constants";
import Loader from "../loader";

const dimensions = { height: 406, width: 451 };

export const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

const Umbrella = ({ color, logo, toggleUploadIcon }) => {
  const [imageLoading, setImageLoading] = useState(false);
  const [src, setSrc] = useState(UmbrellaMapping[color]);

  const UmbrellaImageClass = classNames({
    ["Umbrella-image"]: true,
    ["d-none"]: imageLoading,
  });

  const LoaderClass = classNames({
    ["Umbrella-loading"]: imageLoading,
    ["d-none"]: !imageLoading,
  });

  // Merge Umbrella Image and Logo together using canvas
  const updateUmbrellaLogo = () => {
    const width = dimensions.width * 0.25;
    const height = dimensions.height * 0.1;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = UmbrellaMapping[color];
    img.onload = () => {
      canvas.width = dimensions.width;
      canvas.height = dimensions.height;
      ctx.drawImage(img, 0, 0, dimensions.width, dimensions.height);
      const logoImg = new Image();
      logoImg.src = logo;
      logoImg.onload = () => {
        ctx.drawImage(
          logoImg,
          dimensions.width / 2 - width / 2,
          dimensions.height - height - 30,
          width,
          height
        );
        setSrc(canvas.toDataURL());
        setImageLoading(false);
        toggleUploadIcon(false);
      };
    }
  };

  useEffect(() => {
    if (logo !== null) {
      toggleUploadIcon(true);
      setImageLoading(true);
      setTimeout(updateUmbrellaLogo, 3000);
    } else {
      setSrc(UmbrellaMapping[color]);
    }
  }, [logo, color]);

  return (
    <div className="Umbrella">
      <img className={UmbrellaImageClass} src={src} alt="Umbrella" />
      <Loader fill={color} className={LoaderClass} />
    </div>
  );
};

export default Umbrella;
