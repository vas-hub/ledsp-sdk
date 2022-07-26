import React, { useEffect, useState } from "react";
import LedspClient from "./ledsp-client";

export const GameFlowDebugger = (props: { client: LedspClient }) => {
  const [events, updateEvents] = useState<any[]>([]);
  useEffect(() => {
    if (process.env.ENV === "development")
      setInterval(() => {
        console.log("updating events...", props.client.gameProgressEvents);
        updateEvents([...props.client.gameProgressEvents]);
      }, 1000);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        right: "0",
        top: "50%",
        height: "400px",
        overflowY: "scroll",
        backgroundColor: "white",
        padding: "10px",
        color: "black",
        width: "300px",
        zIndex: 1000,
      }}
    >
      Game progress events:
      <ul>
        {events.map((e, i) => (
          <li key={i}>
            Type: {e.eventType}
            <br />({e.step} {"->"} {e.stage})
          </li>
        ))}
      </ul>
    </div>
  );
};
