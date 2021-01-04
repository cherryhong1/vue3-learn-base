<template>
  <div>
    <img :src="dogResult2&&dogResult2.message" alt="">
  </div>
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios"
export default defineComponent({
 async setup(){
   const Dog2 = await axios.get('https://dog.ceo/api/breeds/image/234')

   return {
     dogResult2:Dog2.data

   }
  }
})
</script>

<style>

</style>