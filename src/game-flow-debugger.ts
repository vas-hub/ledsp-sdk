import { GAME_STAGE_ENTERED } from "./game-progress";
import LedspClient from "./ledsp-client";

export const GameFlowDebugger = (mountPoint: string, client: LedspClient) => {
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
          style="
            position: fixed;
            right: 0;
            top: 50%;
            height: 400px;
            overflow-y: scroll;
            background-color: white;
            padding: 10px;
            color: black;
            width: 300px;
            z-index: 1000;
          "
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
