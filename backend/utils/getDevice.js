import { UAParser } from "ua-parser-js";

const getDeviceInfo = (userAgent) => {
  const parser = new UAParser(userAgent);
  const result = parser.getResult();

  const deviceType = result.device.type || "Desktop";
  const browser = result.browser.name || "Unknown Browser";
  const os = result.os.name || "Unknown OS";

  return {
    device: `${deviceType} - ${browser} on ${os}`,
    raw: result,
  };
};

export default getDeviceInfo;
