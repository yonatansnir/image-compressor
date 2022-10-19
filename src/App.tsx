import { ChangeEvent, useRef, useState } from "react";
import { getImageSize } from "./utils";
import "./index.css";

function App() {
  const [file, setFile] = useState<null | File>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleFileDraw = (e: ChangeEvent<HTMLInputElement>) => {
    const fileItem = e.target.files?.item(0);
    if (!fileItem) return;
    setFile(fileItem);
    const objectURL = URL.createObjectURL(fileItem);
    const image = new Image();
    image.src = objectURL;
    image.onload = function () {
      if (!canvasRef.current) return;
      const { width, height } = image;
      console.log(width, height);
      canvasRef.current.width = 500;
      canvasRef.current.height = 500;
      const ctx = canvasRef.current.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(image, 0, 0, 500, 500);
      URL.revokeObjectURL(objectURL);
    };
  };

  return (
    <div style={{ margin: "50px auto" }}>
      <input type="file" onChange={handleFileDraw} />
      <div>
        <canvas ref={canvasRef} style={{ border: "1px solid black" }} />
      </div>
      <h3>Image Size: {getImageSize(file?.size || 0)}Mb</h3>
    </div>
  );
}

export default App;
