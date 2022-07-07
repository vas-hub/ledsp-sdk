export const QSDecode = (encodedParam: string) =>
  // TODO runtime validation?
  JSON.parse(
    Buffer.from(decodeURIComponent(encodedParam), "base64").toString("ascii")
  ) as LedspPlayInfo;

export const QSEncode = (paramToEncode: LedspPlayInfo) =>
  // TODO runtime validation?
  encodeURIComponent(
    Buffer.from(JSON.stringify(paramToEncode)).toString("base64")
  );

type LedspPlayInfo = {
  gameId: string;
  playerId: string;
  interpretationId: string;
  team: string;
  session: string;
  observer?: boolean;
};
