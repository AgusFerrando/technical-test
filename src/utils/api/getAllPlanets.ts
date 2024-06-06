import axios from "axios"

export const getAllPlanets = async () => {
    try {
      const result = await axios.get(`https://swapi.dev/api/planets`)
      return result.data.results
    } catch (error) {
      console.log(error)
    }
}