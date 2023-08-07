import html2canvas from "html2canvas";
import { useEffect, useState } from "react";
import { Modal, Box } from "@mui/material";
import QRCode from "qrcode.react";
import ModalBoxStyle from "../../styles";
import { HiOutlineSave } from "react-icons/hi";

export default function QRcodeContainer({ isQRshown, setShowQR, content }) {
  const handleDownloadClick = async () => {
    try {
      const canvas = await html2canvas(
        document.querySelector(".qrcode-container")
      );
      const canvasWidth = 1000;
      const canvasHeight = 1000;

      //creating larger canvas
      const largerCanvas = document.createElement("canvas");
      largerCanvas.width = canvasWidth + 100;
      largerCanvas.height = canvasHeight + 300;
      const ctx = largerCanvas.getContext("2d");
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, largerCanvas.width, largerCanvas.height);
      ctx.drawImage(canvas, 50, 50, canvasWidth, canvasHeight);

      //ading text url to the bottom
      ctx.fillStyle = "#000000";
      ctx.font = "30px Arial";
      ctx.textAlign = "center";
      ctx.fillText(content, largerCanvas.width / 2, largerCanvas.height - 30);

      //downloading the generated canvas as a png file
      const dataUrl = largerCanvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = "qrcode_tapshare.png";
      a.click();
    } catch (error) {
      alert("Something went wrong while saving the QR code.");
    }
  };
  const [canvasDimensions, setCanvasDimensions] = useState({
    width: 250,
    height: 250,
  });

  useEffect(() => {
    const updateCanvasDimensions = () => {
      const canvasContainer = document.getElementById("canvas-container");
      if (canvasContainer) {
        setCanvasDimensions({
          width: canvasContainer.offsetWidth,
          height: canvasContainer.offsetHeight,
        });
      }
    };

    // Initial dimensions update
    setTimeout(() => {
      updateCanvasDimensions();
    }, 100);
    setTimeout(() => {
      updateCanvasDimensions();
    }, 1000);

    // listener to resize the canvas when the window is resized
    window.addEventListener("resize", updateCanvasDimensions);
    return () => window.removeEventListener("resize", updateCanvasDimensions);
  }, [isQRshown]);

  return (
    <Modal
      open={isQRshown}
      onClose={() => setShowQR(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={ModalBoxStyle}
        className="p-8 pb-12 bg-white rounded-xl max-w-[400px] w-[90%] max-h-[400px] h-auto aspect-square relative outline-none flex items-center justify-center"
        id="canvas-container"
      >
        <QRCode
          value={content}
          className="w-full h-full max-w-[400px] max-h-[400px] qrcode-container block"
          renderAs={"canvas"}
          size={canvasDimensions.width - 64}
        />
        <button
          className="max-h-fit max-w-fit absolute right-2 bottom-2 text-blue-500 hover:text-blue-600"
          title="Download this QR code"
          onClick={handleDownloadClick}
        >
          <HiOutlineSave className="text-3xl " />
        </button>
      </Box>
    </Modal>
  );
}
