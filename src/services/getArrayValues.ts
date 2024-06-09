import axios from "axios"

export const getArrayValues = async (item: string) => {
  try {
    const res = await axios.get(item)
    return res.data
  } catch (error) {
    console.log(error)
    return null
  }
}
