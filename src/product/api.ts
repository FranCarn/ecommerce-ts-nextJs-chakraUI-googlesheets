import { Product } from "./types";
import axios from "axios";

export default {
  list: async (): Promise<Product[]> => {
    return axios
      .get(
        `https://docs.google.com/spreadsheets/d/e/2PACX-1vQaJRJoeEpEgv2fplhipKj_C__OTogMVtTjRhkU7wC1tPRvWOTU6koQi5s3E6Ri5AIwgSzVwqjbiRfH/pub?output=csv`,
        {
          responseType: "blob",
        }
      )
      .then((res) => {
        console.log(res.data);
        return res.data;
      });
  },
};
