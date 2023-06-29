import onePesoCoin from "../assets/images/1.png";
import tenPesoCoin from "../assets/images/10.png";
import oneHundredCash from "../assets/images/100.png";
import oneThousandCash from "../assets/images/1000.png";
import twentyCash from "../assets/images/20.png";
import twoHundredCash from "../assets/images/200.png";
import twentyPesoCoin from "../assets/images/20_coin.png";
import fivePesoCoin from "../assets/images/5.png";
import fiftyCash from "../assets/images/50.png";
import fiveHundredCash from "../assets/images/500.png";
import { TDenominations } from "../types";

export const images: { [key: string]: string } = {
  "1000": oneThousandCash,
  "500": fiveHundredCash,
  "200": twoHundredCash,
  "100": oneHundredCash,
  "50": fiftyCash,
  "20b": twentyCash,
  "20c": twentyPesoCoin,
  "10": tenPesoCoin,
  "5": fivePesoCoin,
  "1": onePesoCoin,
};

export const initialQuantities: TDenominations = {
  "1000": 0,
  "500": 0,
  "200": 0,
  "100": 0,
  "50": 0,
  "20b": 0,
  "20c": 0,
  "10": 0,
  "5": 0,
  "1": 0,
};

export const temporaryStock: TDenominations = {
  "1000": 10,
  "500": 20,
  "200": 20,
  "100": 50,
  "50": 50,
  "20b": 0,
  "20c": 0,
  "10": 0,
  "5": 2,
  "1": 200,
};
