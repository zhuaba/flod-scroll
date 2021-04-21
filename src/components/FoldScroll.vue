<template>
  <div
    class="fold-scroll"
    @touchstart="playerTouchStart"
    @touchmove="playerTouchMove"
    @touchend="playerTouchEnd"
  >
    <div
      v-for="(item, index) in cardArrs"
      class="fold-scroll-item"
      :key="item.zIndex"
      :style="[
        { zIndex: item.zIndex },
        { transform: `scale(${item.scale}) translate3d(${item.translateX}px, 0px, 0px)` },
        { opacity: item.opacity},
        { width: cardWidth + 'px' }
      ]"
    >
      <slot :name="index"></slot>
    </div>
  </div>
</template>

<script>
import { move_scale, move_opacity } from '../assets/js/funcs.js'
import { formatCardData } from '../assets/js/utils.js'

/*
* (this.cardWidth + 5) 为卡片宽度加 margin-left: 5px
* 10 + (this.cardWidth + 5) 为再加上初卡片的 margin-left: 10px
*/

export default {
  name: 'FoldScroll',
  props: {
    cardNum: {
      type: Number,
      default: 3
    },
    cardWidth: {
      type: Number,
      default: 260
    }
  },
  data() {
    return {
      cardArrs: formatCardData(this.cardNum, this.cardWidth),
      startX: 0, // 触摸位置
      endX: 0, // 结束位置
      moveX: 0, // 滑动时的位置
      disX: 0, // 移动距离
      slideDistance: Math.floor(this.cardWidth * 2 / 5), // 滑动触发切换还是回位的阀值
      currentIndex: 0, // 当前主视口的卡片 index
      savePosition: {}
    }
  },
  methods: {
    playerTouchStart(e) {
      this.startX = e.changedTouches[0].clientX
      this.savePosition = this.cardArrs.slice(this.currentIndex + 1)
      console.log('滑动起点---->', this.startX)
    },
    playerTouchMove(e) {
      this.moveX = e.changedTouches[0].clientX
      this.disX = this.moveX - this.startX

      // 右滑动
      if (this.disX > 0) {
        // 到边缘的时候营造出滑动阻尼的体验，阻尼系数 0.2
        if (this.currentIndex === 0) {
          this.cardArrs[0].translateX = 10 + this.disX * 0.2
          this.cardArrs[1].translateX = 10 + (this.cardWidth + 5) + this.disX * 0.2
          this.cardArrs[2].translateX = 15 + (this.cardWidth + 5) * 2 + this.disX * 0.2
          return
        }
        if (this.currentIndex === this.cardNum - 1) {
          this.cardArrs[this.currentIndex - 2].scale = move_scale(this.disX, 0.85, this.cardArrs[this.currentIndex - 2].scale)
          this.cardArrs[this.currentIndex - 1].scale = move_scale(this.disX)
          this.cardArrs[this.currentIndex - 1].opacity = move_opacity(this.disX)
          this.cardArrs[this.currentIndex].translateX = 15 + this.disX
          return
        }
        this.cardArrs[this.currentIndex -1].scale = move_scale(this.disX)
        this.cardArrs[this.currentIndex - 1].opacity = move_opacity(this.disX)
        this.cardArrs[this.currentIndex].translateX = 10 + this.disX
        this.cardArrs[this.currentIndex + 1].translateX = 10 + (this.cardWidth + 5) + this.disX
      }

      // 左滑动
      if (this.disX < 0) {
        if (this.currentIndex === 0) {
          this.cardArrs[0].scale = move_scale(this.disX)
          this.cardArrs[0].opacity = move_opacity(this.disX)
          this.cardArrs[1].translateX = 10 + (this.cardWidth + 5) + this.disX
          this.cardArrs[2].translateX = 10 + (this.cardWidth + 5) * 2 + this.disX
          return
        }
        // 到边缘的时候营造出滑动阻尼的体验，阻尼系数 0.2
        if (this.currentIndex === this.cardNum - 1) {
          this.cardArrs[this.currentIndex - 2].translateX = 5 + this.disX * 0.2
          this.cardArrs[this.currentIndex - 1].translateX = 10 + this.disX * 0.2
          this.cardArrs[this.currentIndex].translateX = 15 + this.disX * 0.2
          return
        }
        this.cardArrs[this.currentIndex -1].scale = move_scale(this.disX, 0.85, 0.9)
        this.cardArrs[this.currentIndex].scale = move_scale(this.disX)
        this.cardArrs[this.currentIndex].opacity = move_opacity(this.disX)
        this.cardArrs[this.currentIndex + 1].translateX = 10 + (this.cardWidth + 5) + this.disX
        // this.cardNum > (this.currentIndex + 2) && this.moveRestCards(this.currentIndex + 2, this.disX)
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
      if (this.currentIndex === 0) {
        this.cardArrs[0].translateX = 5
        this.cardArrs[0].opacity = 0.4
        this.cardArrs[1].translateX = 10
        this.cardArrs[2].translateX = 10 + (this.cardWidth + 5)
        this.cardNum > 3 && this.slideRestCards(3, -1)
      } else if (this.currentIndex === this.cardNum - 1) {
        this.reback()
      } else {
        this.cardArrs[this.currentIndex + 1].translateX = 15
        this.cardNum > (this.currentIndex + 2) && this.slideRestCards(this.currentIndex + 2, -1)
      }
      this.currentIndex < this.cardNum - 1 && this.currentIndex++
    },
    // 往右滑动一次卡片
    slideRight() {
      if (this.currentIndex <= 1) {
        this.cardArrs[0].translateX = 10
        this.cardArrs[0].scale = 1
        this.cardArrs[0].opacity = 1
        this.cardArrs[1].translateX = 10 + (this.cardWidth + 5)
        this.cardArrs[1].opacity = 1
        this.cardArrs[1].scale = 1
        this.cardArrs[2].translateX = 10 + (this.cardWidth + 5) * 2
        this.currentIndex === 1 && this.slideRestCards(3, 1)
      } else {
        this.cardArrs[this.currentIndex - 2].translateX = 5
        this.cardArrs[this.currentIndex - 2].scale = 0.9
        this.cardArrs[this.currentIndex - 1].translateX = 10
        this.cardArrs[this.currentIndex - 1].scale = 1
        this.cardArrs[this.currentIndex - 1].opacity = 1
        this.cardArrs[this.currentIndex].translateX = 10 + (this.cardWidth + 5)
        // 不能使用 this.slideRestCards ，获取到的translateX会有问题，只能手动计算
        for (let i = this.currentIndex + 1; i < this.cardNum; i ++) {
          this.cardArrs[i].translateX = 10 + (this.cardWidth + 5) + (this.cardWidth + 5) * (i - this.currentIndex)
        }
      }
      this.currentIndex > 0 && this.currentIndex--
    },
    // 滑动距离若不超过阈值则复位
    reback() {
      if (this.currentIndex === 0) {
        this.cardArrs[0].translateX = 10
        this.cardArrs[0].opacity = 1
        this.cardArrs[0].scale = 1
        this.cardArrs[1].translateX = 10 + (this.cardWidth + 5)
        this.cardArrs[2].translateX = 10 + (this.cardWidth + 5) * 2
        return
      }
      if (this.currentIndex === this.cardNum - 1) {
        this.cardArrs[this.currentIndex - 2].translateX = 5
        this.cardArrs[this.currentIndex - 1].translateX = 10
        this.cardArrs[this.currentIndex].translateX = 15
        return
      }
      this.cardArrs[this.currentIndex - 1].translateX = 5
      this.cardArrs[this.currentIndex - 1].opacity = 0.4
      this.cardArrs[this.currentIndex].translateX = 10
      this.cardArrs[this.currentIndex].scale = 1
      this.cardArrs[this.currentIndex + 1].translateX = 10 + (this.cardWidth + 5)
    },
    // 每拖动改变一张卡片的位置，移动后面剩余的卡片的位置
    slideRestCards(idx, direction) {
      for (let i = idx; i < this.cardNum; i++) {
        this.cardArrs[i].translateX += (this.cardWidth + 5) * direction
      }
    },
    // 实时改变后续卡片的位置
    moveRestCards(idx, distance) {
      for (let i = idx; i < this.cardNum; i++) {
        this.cardArrs[i].translateX = 10 + (this.cardWidth + 5) * i + distance
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

.fold-scroll-item {
  position: absolute;
  height: 130px;
  border-radius: 5px;
  transform-origin: left;
  will-change: transform;
}

</style>
