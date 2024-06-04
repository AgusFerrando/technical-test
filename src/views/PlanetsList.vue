<script setup lang="ts">
    import { ref, onMounted, computed } from "vue";
    import axios from "axios";
    import { useRouter } from "vue-router";

    const router = useRouter();
    const searchQuery = ref<string>("");
    const queryTimeout = ref(null);
    const searchResults = ref<Array>([]);
    const allPlanets = ref<Array>([]);
    const searchError = ref<boolean>(false);

    onMounted(async() => {
        await getAllPlanets()
    })
    
    const getAllPlanets = async() => {
        try {
            const result = await axios.get(
                `https://swapi.dev/api/planets`
            );
            searchResults.value = result.data.results;
            console.log(searchResults.value)
        } catch (error) {
            console.log(error)
        } 
    }

    const filteredResults = computed(() => {
        if (searchQuery.value !== "") {
            return searchResults.value.filter((item)=> item.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
        }
        return searchResults.value 
    })
</script>

<template>
  <main class="flex flex-col items-center bg-background p-8">
    <h1 class="text-purple-dark text-2xl">Star Wars Planets</h1>
    <div class="flex flex-col border border-purple-light w-full min-h-[70vh] p-8 mt-2">
        <input
          type="text"
          v-model="searchQuery"
          @input="getSearchResults"
          placeholder="Search for a planet"
          class="py-2 px-1 w-1/4 bg-transparent border-b focus:border-purple focus:outline-none text-purple"
        />
        <ul
          class="text-primary-text w-2/3 py-2 px-1"
          v-if="filteredResults"
        >
          <p
            class="py-2 text-primary-text"
            v-if="!searchError && filteredResults.length === 0"
          >
            No results match your query, try a different term.
          </p> 
          <template v-else> 
            <li
              v-for="searchResult in filteredResults"
              :key="searchResult.id"
              class="py-2 cursor-pointer"
            >
              {{ searchResult.name }}
            </li>
          </template> 
        </ul>
      </div>
  </main>
</template>
