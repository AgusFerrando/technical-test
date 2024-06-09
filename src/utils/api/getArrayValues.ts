import axios from "axios"

export const getArrayValues = async (item: string) => {
  try {
    const res = await axios.get(item)
    console.log('res', res)
    return res.data
  } catch (error) {
    console.log(error)
    return null
  }
}
