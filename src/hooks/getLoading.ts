import { reactive,ref } from "vue";
import axios from "axios";

export function getLoading<T>(url: string){
  const loadingState = reactive({
    loading : false,
    err : false
  })
  const result =ref<T|null>(null)
  axios.get(url).then((data)=>{
    loadingState.loading = true
    loadingState.loading = false
    result.value = data.data[0]
  }).catch(e=>{
    loadingState.err = e
  })
  return {loadingState,result}
}