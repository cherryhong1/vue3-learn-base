<template>
  <teleport to='#Model'>
    <div id="center"
         v-if="isOpen">
      <h2>
        <slot>this is a model</slot>
      </h2>
      <button @click="buttonClose">Close</button>
    </div>
  </teleport>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: 'Model',
  props: {
    msg: String,
    isOpen: Boolean
  },
  emits: {
    'close-model':null
  },
  setup (props, context) {
    const buttonClose = () => {
      context.emit('close-model')
    }
    return {
      buttonClose
    }
  }

})
</script>

<style scoped>
#center {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 200px;
  height: 200px;
  margin-left: -100px;
  margin-top: -100px;
  background-color: rgb(184, 68, 68);
  color: #edd;
}
</style>