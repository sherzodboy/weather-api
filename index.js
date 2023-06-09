import getArgs from "./helpers/args.js";
import { getWeather } from "./services/api.service.js";
import {
  printError,
  printSucccess,
  printHelp,
} from "./services/log.service.js";
import {
  TOKEN_DICTIONARY,
  getKeyValue,
  saveKeyValue,
} from "./services/storage.service.js";

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

const saveCity = async (city) => {
  if (!city.length) {
    printError("Token does not exist");
    return;
  }

  try {
    await saveKeyValue(TOKEN_DICTIONARY.city, city);
    printSucccess("city saved successfully");
  } catch (error) {
    printError(error.message);
  }
};

const getForecast = async () => {
  try {
    const city = process.env.CITY ?? (await getKeyValue(TOKEN_DICTIONARY.city));
    const response = await getWeather(city ?? "Uzbekistan");
    console.log(response);
  } catch (error) {
    if (error?.response?.status == 404) {
      printError("City not found");
    } else if (error.response?.status == 401) {
      printError("Token not valid");
    } else {
      printError(error.message);
    }
  }
};

const startCLI = () => {
  const args = getArgs(process.argv);

  if (args.h) {
    return printHelp();
  }
  if (args.s) {
    return saveCity(args.s);
  }
  if (args.t) {
    return saveToken(args.t);
  }

  return getForecast();
};

startCLI();
