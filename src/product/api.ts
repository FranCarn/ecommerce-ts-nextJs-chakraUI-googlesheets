import { Product } from "./types";
import Papa from "papaparse";
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
      .then(
        (res) =>
          new Promise<Product[]>((resolve, reject) => {
            Papa.parse(res.data, {
              header: true,
              complete: (results) => resolve(results.data as Product[]),
              error: (error) => reject(error.message),
            });
          })
      );
  },
};
