<template>
  <div class="demo">
    <FoldScroll>
      <template v-for="(item, idx) in cardList" :slot="idx">
        <div class="demo-item" :key="idx" :style="{ backgroundImage: `url(${require('../assets/img/leimu.jpg')})` }">
        </div>
      </template>
    </FoldScroll>
  </div>
</template>

<script>
import FoldScroll from '../components/FoldScroll.vue'

export default {
  name: 'App',
  components: {
    FoldScroll
  },
  data() {
    return {
      cardList: [{}, {}, {}]
    }
  }
}
</script>

<style>
.demo-item {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background-color: #e0e0e0;
  background-size: cover;
  box-shadow: 0 4px 12px 1px rgba(97, 97 ,97 , .14);
}
</style>
