<template>
  <div class="demo">
    <FoldScroll :cardNum="10" :cardWidth="260">
      <template v-for="(item, idx) in cardList" :slot="idx">
        <!-- <div class="demo-item" :key="idx" :style="{ backgroundColor: getColor(idx), backgroundImage: `url(${require('../assets/img/leimu.jpg')})` }"> -->
        <div class="demo-item" :key="idx" :style="{ backgroundColor: getColor(idx) }">
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
      cardList: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
    }
  },
  methods: {
    getColor(idx) {
      let color = ['#e0e0e0', '#ffe0e0', '#e0ffe0', '#e0e0ff']
      return color[idx] ?? this.getColor(idx - 4)
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
  background-size: cover;
  box-shadow: 0 4px 12px 1px rgba(97, 97 ,97 , .14);
}
</style>
