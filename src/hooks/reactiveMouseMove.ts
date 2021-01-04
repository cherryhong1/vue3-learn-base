import { reactive ,onMounted,onUnmounted} from "vue";
// interface PositionType{
//   lx:number,
//   ly:number,
//   changeMove:()=>void
// }
export function reactiveMouseMove(){
  const position = reactive({
    lx:0,
    ly:0,
    changeMove:(e: MouseEvent)=>{
      position.lx = e.pageX
      position.ly = e.pageY
    }
  })
  onMounted(()=>{
    document.addEventListener('click',position.changeMove)
  })
  onUnmounted(()=>{
    document.removeEventListener('click',position.changeMove)
  })
  return position
}
