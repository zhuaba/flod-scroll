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
      default: 3,
    },
    cardWidth: {
      type: Number,
      default: 260,
    },
    slideDistance: {
      type: Number,
    }
  },
  data() {
    return {
      cardArrs: formatCardData(this.cardNum, this.cardWidth),
      touchStartX: 0,
      touchLeaveX: 0,
      // 当前主视口的卡片 index
      currentIndex: 0,
    }
  },
  computed: {
    slideDis () {
      return this.slideDistance ?? Math.floor(this.cardWidth * 2 / 5)
    }
  },
  methods: {
    playerTouchStart(e) {
      this.touchStartX = e.changedTouches[0].clientX
      this.savePosition = this.cardArrs.slice(this.currentIndex + 1)
    },
    playerTouchMove(e) {
      // 手指位置的X坐标
      const currentPositionX = e.changedTouches[0].clientX
      // 实时移动距离
      const moveValue = currentPositionX - this.touchStartX

      // 右滑动
      if (moveValue > 0) {
        // 右滑到临界值的时候会触发事件
        moveValue >= this.slideDis && this.triggerThreshold(this.currentIndex, 1)
        // 到边缘的时候营造出滑动阻尼的体验，阻尼系数 0.2
        if (this.currentIndex === 0) {
          this.cardArrs[0].translateX = 10 + moveValue * 0.2
          this.cardArrs[1].translateX = 10 + (this.cardWidth + 5) + moveValue * 0.2
          this.cardArrs[2].translateX = 15 + (this.cardWidth + 5) * 2 + moveValue * 0.2
          return
        }
        if (this.currentIndex === this.cardNum - 1) {
          this.cardArrs[this.currentIndex - 2].scale = move_scale(moveValue, 0.85, this.cardArrs[this.currentIndex - 2].scale)
          this.cardArrs[this.currentIndex - 1].scale = move_scale(moveValue)
          this.cardArrs[this.currentIndex - 1].opacity = move_opacity(moveValue)
          this.cardArrs[this.currentIndex].translateX = 15 + moveValue
          return
        }
        this.cardArrs[this.currentIndex -1].scale = move_scale(moveValue)
        this.cardArrs[this.currentIndex - 1].opacity = move_opacity(moveValue)
        this.cardArrs[this.currentIndex].translateX = 10 + moveValue
        this.cardArrs[this.currentIndex + 1].translateX = 10 + (this.cardWidth + 5) + moveValue
      }

      // 左滑动
      if (moveValue < 0) {
        // 左滑到临界值的时候会触发事件
        Math.abs(moveValue) >= this.slideDis && this.triggerThreshold(this.currentIndex, -1)
        if (this.currentIndex === 0) {
          this.cardArrs[0].scale = move_scale(moveValue)
          this.cardArrs[0].opacity = move_opacity(moveValue)
          this.cardArrs[1].translateX = 10 + (this.cardWidth + 5) + moveValue
          this.cardArrs[2].translateX = 10 + (this.cardWidth + 5) * 2 + moveValue
          return
        }
        // 到边缘的时候营造出滑动阻尼的体验，阻尼系数 0.2
        if (this.currentIndex === this.cardNum - 1) {
          this.cardArrs[this.currentIndex - 2].translateX = 5 + moveValue * 0.2
          this.cardArrs[this.currentIndex - 1].translateX = 10 + moveValue * 0.2
          this.cardArrs[this.currentIndex].translateX = 15 + moveValue * 0.2
          return
        }
        this.cardArrs[this.currentIndex -1].scale = move_scale(moveValue, 0.85, 0.9)
        this.cardArrs[this.currentIndex].scale = move_scale(moveValue)
        this.cardArrs[this.currentIndex].opacity = move_opacity(moveValue)
        this.moveRestCards(this.currentIndex + 1, moveValue)
      }
    },
    playerTouchEnd(e) {
      this.touchLeaveX = e.changedTouches[0].clientX
      const distance = e.changedTouches[0].clientX - this.touchStartX
      if (Math.abs(distance) < this.slideDis) {
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
        this.cardNum > 3 && this.slideRestCards(3)
      } else if (this.currentIndex === this.cardNum - 1) {
        this.reback()
      } else {
        this.cardArrs[this.currentIndex + 1].translateX = 10
        if (this.cardNum > (this.currentIndex + 2)) { this.cardArrs[this.currentIndex + 2].translateX = 10 + this.cardWidth + 5 }
        this.cardNum > (this.currentIndex + 3) && this.slideRestCards(this.currentIndex + 3)
      }
      this.$emit('triggerSlideLeft', this.currentIndex)
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
        this.currentIndex === 1 && this.slideRestCards(2)
      } else {
        this.cardArrs[this.currentIndex - 2].translateX = 5
        this.cardArrs[this.currentIndex - 2].scale = 0.9
        this.cardArrs[this.currentIndex - 1].translateX = 10
        this.cardArrs[this.currentIndex - 1].scale = 1
        this.cardArrs[this.currentIndex - 1].opacity = 1
        this.cardArrs[this.currentIndex].translateX = 10 + (this.cardWidth + 5)
        this.cardNum > (this.currentIndex + 1) && this.slideRestCards(this.currentIndex + 1)
      }
      this.$emit('triggerSlideRight', this.currentIndex)
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
    slideRestCards(idx) {
      for (let i = idx; i < this.cardNum; i++) {
        this.cardArrs[i].translateX = 15 + (this.cardWidth + 5) * (i - idx + 2)
      }
    },
    // 实时改变后续卡片的位置
    moveRestCards(idx, distance) {
      for (let i = idx; i < this.cardNum; i++) {
        this.cardArrs[i].translateX = 10 + (this.cardWidth + 5) * (i - idx + 1) + distance
      }
    },
    triggerThreshold(idx, direction) {
      // direction: -1 表示左滑动， 1 表示右滑动
      this.$emit('triggerThreshold', {
        currentIndex: idx,
        direction: direction
      })
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
