import { GamePlayInfo } from "./game-play-info";
import { GameProgressEvent } from "./game-progress";
import { GameConcept } from "./interfaces";
import ValidateGameFlow from "./validate-game-flow";

export class LedspEmulator {
  private _events: GameProgressEvent[] = [];
  private expectedEvents: { step: string; stage: string }[] = [];

  constructor(
    private readonly gamePlayInfoId: string,
    private readonly gameConcept: GameConcept
  ) {
    this.expectedEvents = gameConcept.gameFlow.reduce((acc, step) => {
      const phase = gameConcept.phases.find((p) => p.name == step.phase);
      for (const stage of phase.stages) acc.push({ step: step.id, stage });
      return acc;
    }, [] as { step: string; stage: string }[]);
  }

  private get storageKey() {
    return `games-progresses-events.${this.gamePlayInfoId}`;
  }

  get events(): GameProgressEvent[] {
    return typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem(this.storageKey) || "[]")
      : this._events;
  }

  async gamePlayInfo(opts: Partial<GamePlayInfo> = {}): Promise<GamePlayInfo> {
    return Object.assign(
      defaultGamePlayInfo(this.gamePlayInfoId, this.gameConcept),
      opts
    );
  }

  async sendGameProgressEvent(event: GameProgressEvent): Promise<void> {
    ValidateGameFlow(
      this.gameConcept,
      this.events,
      this.expectedEvents,
      event,
      console.error
    );

    if (typeof window !== "undefined")
      localStorage.setItem(
        this.storageKey,
        JSON.stringify(this.events.concat(event))
      );
    else this._events.push(event);
  }
}

const defaultGamePlayInfo = (
  id: string,
  gameConcept: GameConcept
): GamePlayInfo => ({
  id,
  user: {
    id: "USER_DEMO",
    displayName: "Emulated user",
  },
  gameId: id,
  playerId: "P1_DEMO",
  team: {
    id: "T_DEMO",
    name: "Emulated team",
  },
  role: "Emulated role",
  settings: {
    playURL: "#",
    configuration: {
      playOptions: gameConcept.defaultPlayOptionsSet,
      players: [
        {
          id: "P1_DEMO",
          color: "red",
          displayName: "Player 1",
        },
        {
          id: "P2_DEMO",
          color: "blue",
          displayName: "Player 2",
        },
      ],
      returnPath: "#",
      gameResultsRegistryEndpoint: "",
    },
  },
});
