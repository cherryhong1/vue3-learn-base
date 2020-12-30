<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <h1>{{count}}</h1>
  <h2>{{double}}</h2>
  <h3 v-for="num in numberArr" :key="num">{{num}}</h3>
  <h4>{{person.name}}</h4>
  <button @click="increase">d(^^*)+1</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { computed,reactive,toRefs} from "vue";
interface DateProps {
  count: number;
  double: number;
  increase: () => void;
  numberArr: number[];
  person: {
    name?: string;
  };
}
export default defineComponent({
  name: 'App',
  props:{
    title: String,
  },
  setup(props) {
    console.log(props.title)
    // const count = ref(0)
    // const increase = ()=> {
    //   return  count.value++
    // }
    // const double = computed(()=>{
    //  return count.value*2
    // })
    const countDate: DateProps = reactive({
      count:0,
      increase:()=>{
        countDate.count++
      },
      double:computed(()=> {
       return countDate.count*2
      }),
      numberArr:[1,2,3],
      person: {}
    })
    countDate.numberArr[0]=10
    countDate.person.name = "lisa"
    const showCountData = toRefs(countDate)
    return{
      ...showCountData
    }
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
