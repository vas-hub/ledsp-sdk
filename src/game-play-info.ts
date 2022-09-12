export type GamePlayInfo = {
  readonly id: string;
  readonly sessionId: string;
  readonly user: {
    id: string;
    displayName: string;
  };
  readonly gameId: string;
  readonly playerId: string;
  readonly team: TeamInfo;
  readonly role: string;
  readonly settings: GamePlaySettings;
};

type TeamInfo = {
  id: string;
  name: string;
};

export type GamePlaySettings = {
  readonly playURL: string;
  readonly configuration: GameConfiguration;
};

export type GameConfiguration = {
  readonly playOptions: Record<string, string | number>;
  readonly players: PlayerInfo[];
  readonly returnPath: string;
  readonly gameResultsRegistryEndpoint: string;
};

export type PlayerInfo = {
  readonly id: string;
  readonly displayName: string;
  readonly color: string;
};
