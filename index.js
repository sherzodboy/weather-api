import getArgs from "./helpers/args.js";
import { getWeather } from "./services/api.service.js";
import {
  printError,
  printSucccess,
  printHelp,
} from "./services/log.service.js";
import { TOKEN_DICTIONARY, saveKeyValue } from "./services/storage.service.js";

const saveToken = async (token) => {
  if (!token.length) {
    printError("Token does not exist");
    return;
  }

  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token);
    printSucccess("Token saved successfully");
  } catch (error) {
    printError(error.message);
  }
};

const startCLI = () => {
  const args = getArgs(process.argv);

  if (args.h) {
    printHelp();
  }
  if (args.s) {
  }
  if (args.t) {
    return saveToken(args.t);
  }
  getWeather("uzbekistan");
};

startCLI();
