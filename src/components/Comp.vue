<template>
  <div
    class="fold-scroll"
    @touchstart="playerTouchStart"
    @touchmove="playerTouchMove"
    @touchend="playerTouchEnd"
  >
    <div class="fold-scroll-wrapper">
      <div
        v-for="(item, index) in cardArrs"
        class="fold-scroll-item"
        :key="index"
        :style="[
          { zIndex: item.zIndex },
          { transform: `scale(${item.scale}) translate3d(${item.translateX}px, 0px, 0px)` },
          { opacity: item.opacity}
        ]"
      >
        <div class="item-inner"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { move_scale, move_opacity } from '../assets/js/funcs.js'

export default {
  name: 'Comp',
  data() {
    return {
      cardArrs: [
        {
          zIndex: 1,
          scale: 1,
          translateX: 10,
          opacity: 1,
        },
        {
          zIndex: 2,
          scale: 1,
          translateX: 275,
          opacity: 1,
        },
        {
          zIndex: 3,
          scale: 1,
          translateX: 540,
          opacity: 1,
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
            this.cardArrs[2].translateX = 540 + this.disX * 0.2
            break
          case 1:
            this.cardArrs[0].scale = move_scale(this.disX)
            this.cardArrs[0].opacity = move_opacity(this.disX)
            this.cardArrs[1].translateX = 15 + this.disX
            this.cardArrs[2].translateX = 275 + this.disX
            break
          case 2:
            this.cardArrs[0].scale = move_scale(this.disX, 0.85, this.cardArrs[0].scale)
            this.cardArrs[1].scale = move_scale(this.disX)
            this.cardArrs[1].opacity = move_opacity(this.disX)
            this.cardArrs[2].translateX = 15 + this.disX
            break
          default:
            break
        }
      }

      // 左滑动
      if (this.disX < 0) {
        switch(this.currentIndex) {
          case 0:
            this.cardArrs[0].scale = move_scale(this.disX)
            this.cardArrs[0].opacity = move_opacity(this.disX)
            this.cardArrs[1].translateX = 275 + this.disX
            this.cardArrs[2].translateX = 540 + this.disX
            break
          case 1:
            this.cardArrs[0].scale = move_scale(this.disX, 0.85, 0.9)
            this.cardArrs[1].scale = move_scale(this.disX)
            this.cardArrs[1].opacity = move_opacity(this.disX)
            this.cardArrs[2].translateX = 275 + this.disX
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
    // 往左滑动一次卡片
    slideLeft() {
      switch(this.currentIndex) {
        case 0:
          this.cardArrs[0].translateX = 5
          this.cardArrs[0].opacity = 0.4
          this.cardArrs[1].translateX = 10
          this.cardArrs[2].translateX = 275
          break
        case 1:
          this.cardArrs[2].translateX = 15
          break
        case 2:
          this.reback()
          break
        default:
          break
      }
      this.currentIndex < 2 && this.currentIndex++
    },
    // 往右滑动一次卡片
    slideRight() {
      switch(this.currentIndex) {
        case 0:
        case 1:
          this.cardArrs[0].translateX = 10
          this.cardArrs[0].scale = 1
          this.cardArrs[0].opacity = 1
          this.cardArrs[1].translateX = 275
          this.cardArrs[1].opacity = 1
          this.cardArrs[1].scale = 1
          this.cardArrs[2].translateX = 540
          break
        case 2:
          this.cardArrs[0].translateX = 5
          this.cardArrs[0].scale = 0.9
          this.cardArrs[1].translateX = 10
          this.cardArrs[1].scale = 1
          this.cardArrs[1].opacity = 1
          this.cardArrs[2].translateX = 275
          break
        default:
          break
      }
      this.currentIndex > 0 && this.currentIndex--
    },
    // 滑动距离若不超过阈值则复位
    reback() {
      switch(this.currentIndex) {
        case 0:
          this.cardArrs[0].translateX = 10
          this.cardArrs[0].opacity = 1
          this.cardArrs[0].scale = 1
          this.cardArrs[1].translateX = 275
          this.cardArrs[2].translateX = 540
          break
        case 1:
          this.cardArrs[0].translateX = 5
          this.cardArrs[0].opacity = 0.4
          this.cardArrs[1].translateX = 10
          this.cardArrs[1].scale = 1
          this.cardArrs[2].translateX = 275
          break
        case 2:
          this.cardArrs[0].translateX = 5
          this.cardArrs[1].translateX = 10
          this.cardArrs[2].translateX = 15
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

.fold-scroll {
  position: relative;
  height: 300px;
  overflow: hidden;
}

.fold-scroll-wrapper {
  position: relative;
}

.fold-scroll-item {
  position: absolute;
  width: 260px;
  height: 130px;
  border-radius: 5px;
  transform-origin: left;
  will-change: transform;
}

.item-inner {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background-image: url('../assets/img/leimu.jpg');
  background-color: #e0e0e0;
  background-size: cover;
  box-shadow: 0 4px 12px 1px rgba(97, 97 ,97 , .14);
}
</style>
