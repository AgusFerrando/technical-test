/**
 * @vitest-enviroment happy-dom
 */

import { describe, expect, it, beforeEach } from "vitest"
import { flushPromises, mount, shallowMount } from "@vue/test-utils"
import { createPinia, setActivePinia } from "pinia"
import PlanetList from "../src/views/PlanetsList.vue"
import PlanetCard from "../src/components/PlanetCard.vue"

vi.mock("@/services/getPlanets", () => ({
  getPlanets: vi.fn().mockResolvedValue({
    results: [
      {
        name: "Tatooine",
        films: [
            "https://swapi.dev/api/films/1"
        ]
      },
      {
        name: "Alderaan",
        films: [
            "https://swapi.dev/api/films/6"
        ]
      }
    ],
    count: 20,
  }),
}))

vi.mock("@/services/getMoviesInPlanet", () => ({
  getMoviesInPlanet: vi.fn().mockResolvedValue({
    title: "A New Hope",
  }),
}))

describe("Planet List test", () => {
  beforeEach(() => {
    
    const pinia = createPinia()
    setActivePinia(pinia)
  })
  

  it("should render", async () => {
    const wrapper = mount(PlanetList)
    await flushPromises()
    const expectedTitle = "Star Wars Planets"
    expect(wrapper.find("h1").text()).toBe(expectedTitle)
    expect(wrapper.find('input[type="text"]').exists()).toBeTruthy()
    const favoritesIcon = wrapper.find('button').find('i.material-icons')
    expect(favoritesIcon.exists()).toBe(true)
    expect(favoritesIcon.text()).toBe('favorite')
    const cards = wrapper.findAllComponents(PlanetCard)
    expect(cards.length).toBe(2)
    const expectedCard1 = {
      title: "Tatooine",
      film: "https://swapi.dev/api/films/1"
    }
    const expectedCard2 = {
      title: "Alderaan",
      film: "https://swapi.dev/api/films/6"
    }

    const titleElement1 = cards[0].find('h1')
    expect(titleElement1.exists()).toBe(true)
    expect(titleElement1.text()).toBe(expectedCard1.title) 

    const titleElement2 = cards[1].find('h1')
    expect(titleElement2.exists()).toBe(true)
    expect(titleElement2.text()).toBe(expectedCard2.title)
  })

  it('applies the filter correctly after the page is fully mounted', async () => {

    const wrapper = mount(PlanetList);
    await flushPromises()

    const filterInput = wrapper.find('input[type="text"]'); 
    await filterInput.setValue('Alderaan'); 
    await filterInput.trigger('input'); 

    await wrapper.vm.$nextTick();

    const filteredItems = wrapper.findAllComponents(PlanetCard); 
    expect(filteredItems).toHaveLength(1); 

    filteredItems.forEach(item => {
      expect(item.text()).toContain('Alderaan');
    });
  });

  it('returns a specific text when no results matches de search query', async () => {

    const wrapper = mount(PlanetList);
    await flushPromises()

    const filterInput = wrapper.find('input[type="text"]'); 
    await filterInput.setValue('Plutón'); 
    await filterInput.trigger('input'); 

    await wrapper.vm.$nextTick();

    const expectedResult = "No results match your query, try a different term."
    expect(wrapper.find("p").text()).toBe(expectedResult)

  });
  
})
