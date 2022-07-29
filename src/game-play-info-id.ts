import { strict as assert } from 'assert';

export class GamePlayInfoId {
  private static SEPARATOR: string = '::';

  static fromComponents(comps: GameInfoIdComponents): GamePlayInfoId {
    return new GamePlayInfoId(comps.gameId, comps.playerId, comps.userId);
  }

  static fromString(encoded: string) {
    return GamePlayInfoId.decode(encoded);
  }

  private static encode(id: GamePlayInfoId) {
    return Buffer.from(
      [id.gameId, id.playerId, id.userId].join(GamePlayInfoId.SEPARATOR)
    ).toString('base64');
  }

  private static decode(encoded: string) {
    const [gameId, playerId, userId] = Buffer.from(encoded, 'base64')
      .toString()
      .split(GamePlayInfoId.SEPARATOR);

    return new GamePlayInfoId(gameId, playerId, userId);
  }

  readonly id: string;

  constructor(
    readonly gameId: string,
    readonly playerId: string,
    readonly userId: string
  ) {
    assert(
      typeof gameId === 'string' && gameId.length > 0,
      `gameId should be a non zero-length string, got «${gameId}»`
    );
    assert(
      typeof playerId === 'string' && playerId.length > 0,
      `playerId should be a non zero-length string, got «${playerId}»`
    );
    assert(
      typeof userId === 'string' && userId.length > 0,
      `gameId should be a non zero-length string, got «${userId}»`
    );

    this.id = GamePlayInfoId.encode(this);
  }

  toString() {
    return this.id;
  }

  equals(other: unknown): boolean {
    return other instanceof GamePlayInfoId && other.id === this.id;
  }

  // TODO: optimize
  hashCode(): number {
    return 0;
  }
}

type GameInfoIdComponents = {
  readonly gameId: string;
  readonly playerId: string;
  readonly userId: string;
};
