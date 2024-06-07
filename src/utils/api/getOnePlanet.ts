import axios from "axios"
import type PlanetInterface from "../interfaces/planetInterface"

export const getOnePlanet = async (item: PlanetInterface) => {
    try {
      const result = await axios.get(item.url)
      return result.data
    } catch (error) {
      console.log(error)
    }
}