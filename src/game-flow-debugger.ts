import { GAME_STAGE_ENTERED } from "./game-progress";
import LedspClient from "./ledsp-client";

export const GameFlowDebugger = (mountPoint: string, client: LedspClient) => {
  if (process.env.ENV === "development")
    setInterval(() => {
      console.log("updating game events...");
      const element = document.getElementById(mountPoint);
      if (!element) {
        console.error(`GameFlowDebugger: mount point ${mountPoint} not found`);
        return;
      }
      console.log("changing html of element: ", JSON.stringify(element));
      element.innerHTML = `
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
            ${client.gameProgressEvents
              .map(
                (e) => `
                <li>
                  Type: ${e.eventType}
                  ${
                    e.eventType === GAME_STAGE_ENTERED
                      ? `
                        <br />
                        (${e.step} -> ${e.stage})
                      `
                      : ""
                  }
                </li>
              `
              )
              .join("\n")}
          </ul>
        </div>
      `;
    }, 1000);
};
