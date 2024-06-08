import axios from "axios"

export const getPlanet = async (id: number) => {
    try {
      const result = await axios.get(`https://swapi.dev/api/planets/${id}`)
      return result.data
    } catch (error) {
      console.log(error)
    }
}