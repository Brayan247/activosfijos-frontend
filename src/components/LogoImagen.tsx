import React, { useState } from 'react';

const LogoImage = ({ src, alt }: { src?: string; alt: string }) => {
  const [imgSrc, setImgSrc] = useState(src || '');
  const fallback = "https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png";

  return (
    <img
      src={imgSrc || fallback}
      alt={alt}
      style={{ height: 60, marginRight: '1rem', borderRadius: 8, objectFit: 'contain' }}
      onError={() => {
        if (imgSrc !== fallback) setImgSrc(fallback);
      }}
    />
  );
};

export default LogoImage;
