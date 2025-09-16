"use client";

import { useEffect, useRef } from "react";
import QRCode from "qrcode";

interface QRCodeProps {
  url: string;
  size?: number;
}

export default function QRCodeComponent({ url, size = 200 }: QRCodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, url, {
        width: size,
        margin: 2,
        color: {
          dark: "#065f46", // brand-ink color
          light: "#ffffff",
        },
      }).catch((err) => {
        console.error("Error generating QR code:", err);
      });
    }
  }, [url, size]);

  return (
    <div className="flex flex-col items-center">
      <canvas ref={canvasRef} />
      <p className="text-sm text-gray-600 mt-2 text-center max-w-xs">
        Scan to book cleaning service
      </p>
    </div>
  );
}
