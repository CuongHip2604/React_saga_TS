import { City, ListResponse, Params } from "models"
import axiosClient from "./axios"

export default {
   getAll(params: Params): Promise<ListResponse<City>> {
      return axiosClient.get("cities", { params })
   }
}