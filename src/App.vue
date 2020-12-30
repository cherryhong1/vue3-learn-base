<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <h1>{{count}}</h1>
  <!-- <h2>{{double}}</h2>
  <h3 v-for="num in numberArr" :key="num">{{num}}</h3>
  <h4>{{person.name}}</h4> -->
  <h5>鼠标位置：{{x}}-{{y}} ,←：{{lx}},↓：{{ly}}</h5>
  <!-- <button @click="changeTitLE">改变title</button>
  <button @click="increase">d(^^*)+1</button> -->
    <h5 v-if="loading">ewrw</h5>
    <img :src="imgUrl" alt="">

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ref,computed,reactive,toRefs,watch} from "vue";
import MouseMove from "./hooks/MouseMove";
import { reactiveMouseMove } from "./hooks/reactiveMouseMove";
import { getLoading } from "./hooks/getLoading";
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
  setup() {
    // const count = ref(0)
    // const increase = ()=> {
    //   return  count.value++
    // }
    // const double = computed(()=>{
    //  return count.value*2
    // })
    // onBeforeUpdate(()=>{
    //   console.log('onBeforeUpdate')
    // })
    // onBeforeMount(()=>{
    //   console.log('onBeforeMount')
    // })
    // onRenderTracked((event)=>{
    //   console.log(event.key)
    // })
    const title = ref('')
    const changeTitLE =()=>{
      return title.value += 'hello world!'
    }
    const loadingState = toRefs(getLoading('https://dog.ceo/api/breeds/image/random'))
    const { x,y} = MouseMove()
    const position = toRefs(reactiveMouseMove())
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
    watch([title,()=>countDate.count],(newValue,oldValue)=> {
      console.log('new-'+newValue,'old-'+oldValue);
      document.title ='update'+ title.value+countDate.count
    })
    const showCountData = toRefs(countDate)
    return{
      ...showCountData,
      changeTitLE,
      x,
      y,
      ...position,
      ...loadingState
    }

  },

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
