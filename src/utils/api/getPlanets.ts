import axios from "axios"

export const getPlanets = async (page: number) => {
    try {
      const result = await axios.get(`https://swapi.dev/api/planets/?page=${page}`)
      return result.data
    } catch (error) {
      console.log(error)
    }
}