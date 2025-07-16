import client from "../client";
import type { Root as StoriesData } from "./types";

export const findAll = async () => {
  try {
    const response = await client.get<StoriesData>("/stories");
    console.log("Response", response);
    return response.data;
  } catch (err) {
    console.log("Inside error", err);
    throw err;
  }
};
