import { GAME_STAGE_ENTERED } from "./game-progress";
import LedspClient from "./ledsp-client";

export const GameFlowDebugger = (mountPoint: string, client: LedspClient) => {
  setInterval(() => {
    const element = document.getElementById(mountPoint);
    if (!element) {
      console.error(`GameFlowDebugger: mount point ${mountPoint} not found`);
      return;
    }
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
            opacity: 0.7;
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
