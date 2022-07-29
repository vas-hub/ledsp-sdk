import { GamePlayInfo } from "@vas/ledsp-shared";
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

const randomId = () => (Math.random() * 10000).toString();

const defaultGamePlayInfo = (
  id: string,
  gameConcept: GameConcept
): GamePlayInfo => ({
  id,
  user: {
    id: randomId(),
    displayName: "Emulated user",
  },
  gameId: randomId(),
  playerId: randomId(),
  team: {
    id: randomId(),
    name: "Emulated team",
  },
  role: "Emulated role",
  settings: {
    playURL: "#",
    configuration: {
      playOptions: gameConcept.defaultPlayOptionsSet,
      players: [
        {
          id: randomId(),
          color: "red",
          displayName: "Player 1",
        },
        {
          id: randomId(),
          color: "blue",
          displayName: "Player 2",
        },
      ],
      returnPath: "#",
      gameResultsRegistryEndpoint: "",
    },
  },
});
