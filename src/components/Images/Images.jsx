/* eslint-disable no-unused-vars */
import { useState } from "react";
import ImageForm from "./ImageForm";
import ShowImages from "./ShowImages";
import JSZip from "jszip";

function Images() {
  const [borderSize, setBorderSize] = useState(10);
  const [borderColor, setBorderColor] = useState("#303030");
  const [processedImages, setProcessedImages] = useState([]);

  const handleImageOnChange = async (e) => {
    const files = e.target.files;
    for (const file of files) {
      const image = await loadImage(file);
      const processedImage = processImage(image);
      setProcessedImages((prevImage=>[...prevImage, processedImage]));
    }
  };

  const loadImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const image = new Image();
        image.onload = () => resolve({ image, fileName: file.name });
        image.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const processImage = ({ image, fileName }) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const newWidth = image.width + 2 * borderSize;
    const newHeight = image.height + 2 * borderSize;

    canvas.width = newWidth;
    canvas.height = newHeight;

    ctx.fillStyle = borderColor;
    ctx.fillRect(0, 0, newWidth, newHeight);

    ctx.drawImage(image, borderSize, borderSize);
    //convert the canvas to a data url
    const processedImageUrl = canvas.toDataURL();
    return { imageUrl: processedImageUrl, fileName };
  };

  const saveAllImages = () => {
    const zip = new JSZip();
  
    processedImages.forEach(({ imageUrl, fileName }) => {
      // Convert the base64 image to a Uint8Array
      const data = atob(imageUrl.split(',')[1]);
      const uint8Array = new Uint8Array(data.length);
      for (let i = 0; i < data.length; i++) {
        uint8Array[i] = data.charCodeAt(i);
      }
  
      zip.file(fileName, uint8Array);
    });
  
    zip.generateAsync({ type: 'blob' }).then((blob) => {
      const url = URL.createObjectURL(blob);
  
      const a = document.createElement('a');
      a.href = url;
      a.download = 'all_processed_images.zip';
  
      // Simulate a click on the download link
      const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true, view: window });
      a.dispatchEvent(clickEvent);
  
      // Clean up the object URL after the download link has been clicked
      URL.revokeObjectURL(url);
    });
  };
  
  const saveImage = (imageUrl, fileName) => {
    // Convert the base64 image to a Blob
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        // Create an object URL from the Blob
        const url = URL.createObjectURL(blob);
  
        // Create an anchor element for downloading
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
  
        // Simulate a click on the download link
        const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true, view: window });
        a.dispatchEvent(clickEvent);
  
        // Clean up the object URL after the download link has been clicked
        URL.revokeObjectURL(url);
      })
      .catch((error) => console.error('Error fetching image:', error));
  };
  
  return (
    <div>
      <ImageForm
        setBorderColor={setBorderColor}
        setBorderSize={setBorderSize}
        borderColor={borderColor}
        borderSize={borderSize}
        handleImageOnChange={handleImageOnChange}
      />
      <ShowImages processedImages={processedImages} saveImage={saveImage} saveAllImages={saveAllImages}/>
    </div>
  );
}

export default Images;
