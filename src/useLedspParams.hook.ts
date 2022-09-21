import qs from "query-string";
import { QSDecode } from "./ledsp-encoding";

export default function useLedspParams() {
  const parsed = qs.parse(location.search);
  const ledsp = parsed?.ledsp?.toString();

  try {
    return {
      gamePlayInfoId: ledsp ? QSDecode(ledsp)?.id : undefined,
      demoId: parsed?.demoId?.toString(),
    };
  } catch (error) {
    console.error("Ledsp query string is invalid", error);
  }
  return {
    gamePlayInfoId: "--null--",
    demoId: parsed?.demoId?.toString(),
  };
}
