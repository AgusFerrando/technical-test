import axios from "axios"
import { BASE_URL } from "../utils/base_url"

export const getPlanets = async (page: number) => {
  try {
    const result = await axios.get(`${BASE_URL}/?page=${page}`)
    return result.data
  } catch (error) {
    console.log(error)
  }
}
