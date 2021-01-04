import { ref,onUnmounted,onMounted } from "vue";
 
function mouseMove(){
  const x =ref(0)
  const y = ref(0)
  const getPostion=((e: MouseEvent)=>{
    x.value =e.pageX;
    y.value = e.pageY
  })
  onMounted(()=>{
    document.addEventListener('click',getPostion)
  })
  onUnmounted(()=>{
    document.removeEventListener('click',getPostion)
  })
  return {x,y}
}
export default mouseMove