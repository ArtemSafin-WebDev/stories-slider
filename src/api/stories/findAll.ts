import client from "../client";
import type { Root as StoriesData } from "./types";

export const findAll = async () => {
  const response = await client.get<StoriesData>("/stories");
  return response.data;
};
