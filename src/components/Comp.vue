<template>
  <div
    @touchstart="playerTouchStart"
    @touchmove="playerTouchMove"
    @touchend="playerTouchEnd"
    class="container">
    <div class="card-wrapper">

      <div class="card-item"
        v-for="(item, index) in cardArrs"
        :key="index"
        :style="[
          { zIndex: item.zIndex },
          { transform: `scale(${item.scale}) translate3d(${item.translateX}px, 0px, 0px)` },
          { transition: `transform ${item.transitionTime}s ease 0s` },
          { opacity: item.scale === 1 ? 1 : item.scale}
        ]">

        <div class="item-inner"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Comp',
  data() {
    return {
      cardArrs: [
        {
          zIndex: 1,
          scale: 1,
          translateX: 10,
          transitionTime: 0
        },
        {
          zIndex: 2,
          scale: 1,
          translateX: 275,
          transitionTime: 0
        },
        {
          zIndex: 3,
          scale: 1,
          translateX: 540,
          transitionTime: 0
        },
      ],
      startX: 0, // 触摸位置
      endX: 0, // 结束位置
      moveX: 0, // 滑动时的位置
      disX: 0, // 移动距离
      slideDistance: 130, // 滑动触发切换还是回位的阀值
      currentIndex: 0, // 当前第一个的 index
    }
  },
  methods: {
    playerTouchStart(e) {
      this.startX = e.changedTouches[0].clientX
      console.log('滑动起点---->', this.startX)
    },
    playerTouchMove(e) {
      this.moveX = e.changedTouches[0].clientX
      this.disX = this.moveX - this.startX

      // 右滑动
      if (this.disX > 0) {
        switch(this.currentIndex) {
          case 0:
            this.cardArrs[0].translateX = 10 + this.disX * 0.2
            this.cardArrs[1].translateX = 275 + this.disX * 0.2
            // this.cardArrs[1].scale = 0.9
            this.cardArrs[2].translateX = 540 + this.disX * 0.2
            break
          case 1:
            this.cardArrs[1].translateX = 15 + this.disX
            this.cardArrs[2].translateX = 285 + this.disX
            break
          case 2:
            this.cardArrs[2].translateX = 20 + this.disX
            break
          default:
            break
        }
      }
      // 左滑动
      if (this.disX < 0) {
        switch(this.currentIndex) {
          case 0:
            this.cardArrs[0].scale = 1 - Math.abs(this.disX / 500) * 0.1
            this.cardArrs[1].translateX = 275 + this.disX
            this.cardArrs[2].translateX = 540 + this.disX
            break
          case 1:
            this.cardArrs[2].translateX = 285 + this.disX
            break
          case 2:
            this.cardArrs[0].translateX = 10 + this.disX * 0.2
            this.cardArrs[1].translateX = 15 + this.disX * 0.2
            this.cardArrs[2].translateX = 20 + this.disX * 0.2
            break
          default:
            break
        }
      }
    },
    playerTouchEnd(e) {
      this.endX = e.changedTouches[0].clientX
      const distance = e.changedTouches[0].clientX - this.startX
      console.log('滑动距离--->', distance)
      if (Math.abs(distance) < this.slideDistance) {
        this.reback()
        return
      }
      if (distance > 0) {
        this.slideRight()
        return
      }
      this.slideLeft()
    },
    slideLeft() {
      switch(this.currentIndex) {
        case 0:
          this.cardArrs[1].translateX = 15
          this.cardArrs[2].translateX = 285
          break
        case 1:
          this.cardArrs[2].translateX = 20
          break
        case 2:
          this.reback()
          break
        default:
          break
      }
      this.currentIndex < 2 && this.currentIndex++
    },
    slideRight() {
      switch(this.currentIndex) {
        case 0:
        case 1:
          this.cardArrs[0].translateX = 10
          this.cardArrs[1].translateX = 275
          this.cardArrs[2].translateX = 540
          break
        case 2:
          this.cardArrs[0].translateX = 10
          this.cardArrs[1].translateX = 15
          this.cardArrs[2].translateX = 280
          break
        default:
          break
      }
      this.currentIndex > 0 && this.currentIndex--
    },
    reback() {
      switch(this.currentIndex) {
        case 0:
          this.cardArrs[0].translateX = 10
          this.cardArrs[1].translateX = 275
          this.cardArrs[2].translateX = 540
          break
        case 1:
          this.cardArrs[0].translateX = 10
          this.cardArrs[0].scale = 0.95
          this.cardArrs[1].translateX = 15
          this.cardArrs[2].translateX = 280
          break
        case 2:
          this.cardArrs[0].translateX = 10
          this.cardArrs[0].scale = 0.9
          this.cardArrs[1].translateX = 15
          this.cardArrs[1].scale = 0.95
          this.cardArrs[2].translateX = 20
          break
        default:
          break
      }
    }
  }
}
</script>

<style>
html, body { margin: 0; padding: 0; }
.container {
  height: 300px;
  position: relative;
  overflow: hidden;
}
.card-wrapper {
  position: relative;
  width: calc(65vw + 11px);
}
.card-item {
  position: absolute;
  margin: 5px;
  width: 260px;
  height: 130px;
  border-radius: 5px;
  will-change: transform;
}
.item-inner {
  background-color: #e0e0e0;
  width: 100%;
  height: 100%;
  box-shadow: 0 4px 12px 1px rgba(57,57,57,.14);
  position: relative;
  border-radius: 12px;
}
</style>
