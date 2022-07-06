export const QSDecode = (encodedParam: string) =>
  JSON.parse(
    Buffer.from(decodeURIComponent(encodedParam), "base64").toString("ascii")
  );

export const QSEncode = (paramToEncode: object) =>
  encodeURIComponent(
    Buffer.from(JSON.stringify(paramToEncode)).toString("base64")
  );
