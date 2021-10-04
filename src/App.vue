<template>
  <div id="app">
    <fold-scroll
      :card-num="cardList.length"
      :card-width="260"
    >
      <template
        v-for="(item, idx) in cardList"
        :slot="idx"
      >
        <div
          class="inner-item"
          :key="`${item.id}-${idx}`"
        >
          <div class="inner-item__num">{{ item.id }}</div>
        </div>
      </template>
    </fold-scroll>
  </div>
</template>

<script>
import FoldScroll from './components/FoldScroll.vue'

export default {
  name: 'App',
  components: {
    FoldScroll
  },
  data() {
    return {
      cardList: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, {id: 5}]
    }
  }
}
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

.inner-item {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background-size: cover;
  box-shadow: 0 4px 12px 1px rgba(97, 97 ,97 , .14);
  background-image: url('./assets/img/leimu.jpg');
}

.inner-item__num {
  position: absolute;
  left: 8px;
  bottom: 5px;
  font-size: 26px;
  font-weight: bold;
  color: #6866b7;
}
</style>
