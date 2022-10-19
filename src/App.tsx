import { ChangeEvent, useRef, useState } from "react";
import { getImageSize, getResizedPx } from "./utils";
import "./index.css";

function App() {
  const [fileSize, setFileSize] = useState<number>(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const anchorRef = useRef<HTMLAnchorElement | null>(null);

  const handleFileDraw = (e: ChangeEvent<HTMLInputElement>) => {
    const fileItem = e.target.files?.item(0);
    if (!fileItem) return;
    setFileSize(fileItem.size);
    const objectURL = URL.createObjectURL(fileItem);
    const image = new Image();
    image.src = objectURL;
    image.onload = function () {
      if (!canvasRef.current) return;
      const { width, height } = getResizedPx(image.width, image.height);
      canvasRef.current.width = Number(width);
      canvasRef.current.height = Number(height);
      const ctx = canvasRef.current.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(image, 0, 0, Number(width), Number(height));
      URL.revokeObjectURL(objectURL);
    };
  };

  const handleResize = () => {
    if (!canvasRef.current) return;
    const base64 = canvasRef.current.toDataURL("image/jpeg", 0.7);
    const { size } = new Blob([base64]);
    const image = new Image();
    image.src = base64;
    image.onload = function () {
      if (!canvasRef.current) return;
      const ctx = canvasRef.current.getContext("2d");
      ctx?.drawImage(image, 0, 0);
      setFileSize(size);
    };
  };

  const handleDownload = () => {
    if (!canvasRef.current || !anchorRef.current) return;
    const base64 = canvasRef.current.toDataURL("image/jpeg", 1);
    anchorRef.current.href = base64;
    anchorRef.current.click();
  };

  return (
    <div style={{ margin: "50px auto" }}>
      <input type="file" onChange={handleFileDraw} />
      <div>
        <canvas ref={canvasRef} style={{ border: "1px solid black" }} />
      </div>
      <h3>Image Size: {getImageSize(fileSize)}Mb</h3>
      <button onClick={handleResize}>Compress</button>
      <button onClick={handleDownload}>Download</button>
      <a ref={anchorRef} download="file.jpg" />
    </div>
  );
}

export default App;
