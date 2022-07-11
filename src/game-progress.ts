export type GameProgressEvent =
  | GameLaunched
  | GameStarted
  | GameEnded
  | PhaseEntered
  | StageEntered;

export class GameLaunched {
  constructor(
    public readonly id: string,
    public readonly gameId: string,
    public readonly playerId: string,
    public readonly teamId: string,
    public readonly timestamp: number
  ) {}
}

export class GameStarted {
  constructor(
    public readonly id: string,
    public readonly gameId: string,
    public readonly playerId: string,
    public readonly teamId: string,
    public readonly timestamp: number
  ) {}
}

export class GameEnded {
  constructor(
    public readonly id: string,
    public readonly gameId: string,
    public readonly playerId: string,
    public readonly teamId: string,
    // TODO: check this later
    public readonly cleared: boolean,
    public readonly timestamp: number
  ) {}
}

export class PhaseEntered {
  constructor(
    public readonly id: string,
    public readonly gameId: string,
    public readonly playerId: string,
    public readonly teamId: string,
    public readonly phase: string,
    public readonly timestamp: number
  ) {}
}

export class StageEntered {
  constructor(
    public readonly id: string,
    public readonly gameId: string,
    public readonly playerId: string,
    public readonly teamId: string,
    public readonly stage: string,
    public readonly timestamp: number
  ) {}
}
