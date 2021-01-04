<template>
<div>
                  <!-- <h4>{{err}}</h4> -->
  <img alt="Vue logo"
       src="./assets/logo.png">
       <Suspense>
         <template #default>
           <!-- <asynccSupend></asynccSupend> -->
           <dog-test></dog-test>

         </template>
         <template #fallback>
           <h3>老丁·</h3>
         </template>
       </Suspense>
       <asynccSupend></asynccSupend> 

  <Model :isOpen="isOpen"
         @close-model="closeModel">{{isOpen}}</Model>
<button @click="openModel">打开Model{{isOpen}}</button>
  <h1>{{count}}</h1>
  <!-- <h2>{{double}}</h2>
  <h3 v-for="num in numberArr" :key="num">{{num}}</h3>
  <h4>{{person.name}}</h4> -->
  <h5>鼠标位置：{{x}}-{{y}} ,←：{{lx}},↓：{{ly}}</h5>
  <!-- <button @click="changeTitLE">改变title</button>
  <button @click="increase">d(^^*)+1</button> -->
  <!-- <h5 v-if="loading">ewrw</h5>
  <img v-if="result.url&&result.url!=null"
       :src="result.url"
       alt=""> -->
  <!-- <hello-world></hello-world> -->
  </div>
</template>

<script lang="ts">
import Model from "./components/Model";
// import HelloWorld from "./components/HelloWorld";
import asynccSupend from "./components/asyncSupend";
import dogTest from "./components/dogOnline"
import { defineComponent } from "vue";
import { ref, computed, reactive, toRefs, watch ,onErrorCaptured} from "vue";
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
interface DogResult {
  message: string;
  status: string;
}
interface CatResult {
  breeds: [];
  id: string;
  url: string;
  width: number;
  height: number;
}
export default defineComponent({
  name: "App",
  props: {
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
    const title = ref("");
    const changeTitLE = () => {
      return (title.value += "hello world!");
    };
    // const {loadingState,result} = toRefs(getLoading('https://dog.ceo/api/breeds/image/random'))
    const { loadingState, result } = getLoading<CatResult>(
      "https://api.thecatapi.com/v1/images/search"
    );
    watch(result, () => {
      if (result.value) {
        console.log(result.value.url);
      }
    });
    const { x, y } = MouseMove();
    const position = toRefs(reactiveMouseMove());
    const countDate: DateProps = reactive({
      count: 0,
      increase: () => {
        countDate.count++;
      },
      double: computed(() => {
        return countDate.count * 2;
      }),
      numberArr: [1, 2, 3],
      person: {},
    });
    countDate.numberArr[0] = 10;
    countDate.person.name = "lisa";
    watch([title, () => countDate.count], (newValue, oldValue) => {
      console.log("new-" + newValue, "old-" + oldValue);
      document.title = "update" + title.value + countDate.count;
    });
    const showCountData = toRefs(countDate);
    const ModelOpen = reactive({
      isOpen: false,
      closeModel: () => {
        ModelOpen.isOpen = false;
        console.log( ModelOpen.isOpen)
      },
      openModel: () => {
       ModelOpen.isOpen = !ModelOpen.isOpen;
      },
    });
    const showModelOpen = toRefs(ModelOpen)
    const err = ref(null)
    onErrorCaptured((e: any)=>{
      err.value = e
      return true
    })
    return {
      ...showCountData,
      changeTitLE,
      x,
      y,
      ...position,
      ...loadingState,
      result,
      ...showModelOpen,
      err
    };
  },
  components: {
    Model,
    asynccSupend,
    dogTest
    // HelloWorld,
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
