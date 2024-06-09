import axios from "axios"
import { BASE_URL } from "../utils/base_url"

export const getPlanet = async (id: number) => {
  try {
    const result = await axios.get(`${BASE_URL}/${id}`)
    return result.data
  } catch (error) {
    console.log(error)
  }
}
