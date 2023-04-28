/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Pusher from "pusher-js";
import NotificationIcon from "@/icons/NotificationIcon";
import PusherIcon from "@/icons/PusherIcon";
import Notification from "@/components/notification";

// eslint-disable-next-line react-hooks/exhaustive-deps
const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY as string, {
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER as string,
});

const Index = () => {
  const [notifications, setNotifications] = useState<any>([]);
  const [count, setCount] = useState(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const channel = pusher.subscribe("notification-channel");
    channel.bind("alerts", (data: any) => {
      setNotifications([...notifications, data]);
    });
    console.log(count);

    setCount(count + 1);

    return () => {
      pusher.unsubscribe("notification-channel");
    };
  }, [notifications]);
  console.log(notifications);

  //console.log(JSON.parse(notifications[0]));

  return (
    <section className="max-w-[900px] mx-auto flex flex-col h-screen w-full">
      <header className="w-full flex items-center justify-between pt-5 pb-3 border-b-2 border-[#9239e0]">
        <div>
          <PusherIcon />
        </div>
        <button
          className="relative disabled:cursor-not-allowed"
          disabled={notifications.length === 0}
          onClick={() => {
            setIsOpen(!isOpen);
            if (isOpen) {
              setCount(0);
            }
          }}
        >
          <div className="text-gray-8">
            <NotificationIcon />
          </div>
          <p className="absolute -top-3 -right-3 flex h-7 w-7 items-center justify-center rounded-full bg-[#9239e0] text-white">
            {count === 0 ? count : count - 1}
          </p>
          {isOpen && (
            <div className="absolute w-[400px] z-30 py-2 top-10 -right-3 border border-[#9239e0]  bg-[#fdfdfd] rounded-md">
              {notifications.map(({ message, time }: any, index: number) => (
                <div key={index}>
                  <Notification message={message} time={time} />
                  {index != notifications.length - 1 && (
                    <hr className="bg-black" />
                  )}
                </div>
              ))}
            </div>
          )}
        </button>
      </header>
      <div className="h-full py-40 flex justify-center">
        <h2 className="text-2xl capitalize font-medium mb-2 text-gray-950">
          real-time notifications in your Next.js app using Pusher
        </h2>
      </div>
    </section>
  );
};

export default Index;
