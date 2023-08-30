import React from 'react';
import { Image } from 'antd';

export const ImageViewer = ({ images, width }) => {
  if (images.length > 0) {
    return (
      <Image.PreviewGroup
        items={images}>
        <Image
          width={width}
          src={images[0]}
        />
      </Image.PreviewGroup>
    );
  } else {
    return null; // No images to show
  }
};

export const getImageBase64 = (file) =>{

  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}