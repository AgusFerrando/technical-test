import axios from "axios"

export const getArrayValues = async(array: any) => {
    const result = []
    array.forEach(async (film: string) => {
      try {
        const res = await axios.get(film)
        return result.push(res)
      } catch (error) {
        console.log(error)
        return null
      }
    })
  }