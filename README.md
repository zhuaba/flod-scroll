# fold-scroll-container
基于vue2.x的H5横向折叠滑动组件容器实现
* 滑动过程伴随伸缩和透明度变化
* 支持阈值内滑动复位


<video id="video" controls="" preload="none" poster="./public/pic1.png">
  <source id="mp4" src="./public/fold-demo.mp4" type="video/mp4">
</video>

<figure class="third">
  <img src="./public/fold-demo2.gif" width="370"/>
</figure>


## Project setup and start
```
yarn install
yarn serve
```

### Usage
```vue
<fold-scroll
  :card-num="cardList.length"
  :card-width="260"
>
  <!-- 在不同的 slot 中放入你想展示的内容 -->
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

<script>
import FoldScroll from '~/FoldScroll.vue'

export default {
  data() {
    return {
      cardList: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, {id: 5}]
    }
  }
}
</script>
```

### Props

| 参数 | 说明 | 类型 | 默认值 | 必选 | 可选值 |
| --- | --- | --- | --- | --- | --- |
| cardNum | 传入的卡片数量 | number | true | N | - |
| cardWidth | 卡片的宽度 | number | false | N | 建议大于屏幕宽度的一半 |
| slideDistance | 滑动阈值（超过该距离则折叠滑动，不超过则复原） | number | false | N | - |

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| triggerThreshold | 滑动到阈值的时候触发该事件 | {currentIndex, direction} 触发滑动时的卡片序号， 滑动方向（-1为左， 1为右） |
| triggerSlideLeft | 触发左滑折叠时触发该事件 | currentIndex 触发滑动时的卡片序号 |
| triggerSlideRight | 触发右滑折叠时触发该事件 | currentIndex 触发滑动时的卡片序号 |


