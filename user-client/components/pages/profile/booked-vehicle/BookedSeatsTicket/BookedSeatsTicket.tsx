import { MutableRefObject, useEffect, useRef } from "react";
import QRCode from "qrcode";

const BookedSeatsTicket = (): React.JSX.Element => {
  const canvasElm: MutableRefObject<null | HTMLCanvasElement> = useRef(null);
  console.log(window.screen);
  useEffect(() => {
    QRCode.toCanvas(
      canvasElm.current,
      JSON.stringify({
        id: 1,
        booked_at: "",
        vehicle_id: "jfdkslfjdskfjdkls",
        seats: ["A", "B", "C"],
      }),
      function (err) {
        if (err) console.log(err);
        else console.log("isSuccess");
      }
    );
  }, [canvasElm]);
  return (
    <div className="border-2 border-solid border-container-border rounded-lg mt-10 flex flex-col justify-center items-center p-2">
      <h5 className="text-3xl text-primary-foreground">Your Ticket</h5>
      <canvas id="canvas" ref={canvasElm} style={{ border: "1px" }}></canvas>
    </div>
  );
};

export default BookedSeatsTicket;
