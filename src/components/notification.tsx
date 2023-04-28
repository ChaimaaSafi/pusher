import InfoIcon from "@/icons/InfoIcon";
import React from "react";

type Props = {
  message: string;
  time: string;
};

function Notification({ message, time }: Props) {
  return (
    <div className="px-3 py-2 flex items-start space-x-5">
      <div>
        <InfoIcon />
      </div>
      <div className="flex flex-col">
        <p className="text-base font-semibold text-start text-[#434E5B] mb-1">
          {message}
        </p>
        <span className="text-sm font-normal text-start text-[#556375]">
          {time}
        </span>
      </div>
    </div>
  );
}

export default Notification;
