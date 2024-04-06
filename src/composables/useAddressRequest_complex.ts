import { reactive, computed } from "vue"

const activeRequests = reactive([])

export default function useAddressRequest() {
  console.log('useAddressRequest is running');
  
  const isLoading = computed(() => activeRequests.length ? true : false)

  const makeRequest = async (address) => {
    // push the url to the activeRequests array

    const index = activeRequests.length
    activeRequests[index] = address

    const baseURL = 'https://api.phila.gov/ais/v1/search/';
    const url = baseURL + encodeURIComponent(address);
    // const response = await fetch(baseURL)
    // const data = await response.json()

    const response = await fetch(url)
      .catch(error => alert(error))
    const data = await response.json()

    // remove the url from the activeRequests array
    // if the response wasn't successful, still remove it, but show alert message

    activeRequests.splice(index, 1)
    return data

  }

  return { isLoading, makeRequest }
}