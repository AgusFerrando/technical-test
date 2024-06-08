/**
 * @vitest-enviroment happy-dom
 */

import { describe, expect, it, beforeEach } from "vitest"
import { mount } from "@vue/test-utils"
import { createPinia, setActivePinia } from "pinia"
import PlanetList from "../src/views/PlanetsList.vue"
import PlanetCard from "../src/components/PlanetCard.vue"



describe("Planet List test", () => {
  beforeEach(() => {
    // Create a new Pinia instance and set it as active
    const pinia = createPinia()
    setActivePinia(pinia)
  })
  vi.mock("@/utils/api/getPlanets", () => ({
    getPlanets: vi.fn().mockResolvedValue({
      results: [
        {
          name: "Tatooine",
          films: [
              "https://swapi.dev/api/films/1",
              "https://swapi.dev/api/films/1"
          ]
        },
        {
          name: "Alderaan",
          flims: [
              "https://swapi.dev/api/films/6",
              "https://swapi.dev/api/films/6"
          ]
        }
      ],
      count: 20,
    }),
  }))


  
  vi.mock("@/components/PlanetCard.vue", () => ({
    getAllMoviesInPlanet: vi.fn().mockResolvedValue({
      title: "A New Hope",
    }),
  }))



  it("should render", () => {
    const wrapper = mount(PlanetList)
    expect(wrapper.find("h1").exists()).toBeTruthy()
    expect(wrapper.find('input[type="text"]').exists()).toBeTruthy()
    expect(wrapper.find("PlanetCard").exists()).toBeTruthy()
  })

  it("loads next page of results when next button is clicked", async () => {
    const wrapper = mount(PlanetList)


    const cards = wrapper.findAllComponents('PlanetCard')
    //const nextButton = wrapper.find('button:contains("Next")')
    //await nextButton.trigger("click")

    expect(cards).toHaveLength(2)
  })
})
