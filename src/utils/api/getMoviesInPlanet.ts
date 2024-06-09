import axios from "axios";

export const getMoviesInPlanet = async (film: string) => {
  try {
    const result = await axios.get(film)
    return result.data
  } catch (error) {
    console.log(error)
  }
}
