import { MutableRefObject, useEffect, useRef } from "react";
import QRCode from "qrcode";
import { Skeleton } from "@mui/material";
import getCssVariable from "@/lib/getCssVariable";

type Props = {
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  ticket?: object;
};

const BookedSeatsTicket: React.FC<Props> = ({
  isError,
  isSuccess,
  isLoading,
  ticket,
}): React.JSX.Element => {
  const canvasElm: MutableRefObject<null | HTMLCanvasElement> = useRef(null);
  console.log(window.screen);
  useEffect(() => {
    if (canvasElm.current) {
      QRCode.toCanvas(
        canvasElm.current,
        JSON.stringify(ticket),
        function (err) {
          if (err) console.log(err);
          else console.log("isSuccess");
        }
      );
    }
  }, [canvasElm, ticket]);
  return (
    <div className="border-2 border-solid border-container-border rounded-lg mt-10 flex flex-col justify-center items-center p-2">
      <h5 className="text-3xl text-primary-foreground mb-3">Your Ticket</h5>
      {isLoading ? (
        <Skeleton
          variant="rectangular"
          sx={{
            bgcolor: getCssVariable("--clr-skeleton-background", true),
          }}
          className="rounded-sm"
          style={{ width: "300px", height: "300px" }}
        />
      ) : (
        <canvas id="canvas" ref={canvasElm} style={{ border: "1px" }}></canvas>
      )}
    </div>
  );
};

export default BookedSeatsTicket;
