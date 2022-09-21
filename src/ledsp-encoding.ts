export const QSDecode = (encodedParam: string) =>
  // TODO runtime validation?
  JSON.parse(
    Buffer.from(decodeURIComponent(encodedParam), "base64").toString("ascii")
  ) as LedspGamePlayParams;

export const QSEncode = (paramToEncode: LedspGamePlayParams) =>
  // TODO runtime validation?
  encodeURIComponent(
    Buffer.from(JSON.stringify(paramToEncode)).toString("base64")
  );

type LedspGamePlayParams = {
  id: string;
  session?: string;
  observer?: boolean;
};

export const DebriefParamsDecode = (encodedParam: string) =>
  // TODO runtime validation?
  JSON.parse(
    Buffer.from(decodeURIComponent(encodedParam), "base64").toString("ascii")
  ) as DebriefParams;

export const DebriefParamsEncode = (paramToEncode: DebriefParams) =>
  // TODO runtime validation?
  encodeURIComponent(
    Buffer.from(JSON.stringify(paramToEncode)).toString("base64")
  );

type DebriefParams = {
  sessionId: string;
  playerId?: string;
  gameId?: string;
  teamId?: string;
  teamName?: string;
};
