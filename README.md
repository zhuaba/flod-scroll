# fold-scroll-container
基于vue2.x的H5横向折叠滑动组件容器实现
* 滑动过程伴随伸缩和透明度变化
* 支持阈值内滑动复位

### intro
fold-scroll 提供了一个折叠滑动的容器，可以通过暴露出来的 slot（#0～n）进行内容填充展示


<figure class="third">
  <img src="./public/leimu.gif" width="370"/>
</figure>


### Usage Example
In your project, you can import fold-scroll package with npm or yarn
```js
npm i fold-scroll / yarn add fold-scroll
```

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
import FoldScroll from 'fold-scroll'

export default {
  components: {
    FoldScroll,
  },
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
| slideThreshold | 滑动阈值（超过该距离阈值则进行折叠，不超过则复原） | number | false | N | - |

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| triggerThreshold | 滑动到阈值的时候触发该事件 | {currentIndex, direction} 触发滑动时的卡片序号， 滑动方向（-1为左， 1为右） |
| triggerSlideLeft | 触发左滑折叠时触发该事件 | currentIndex 触发滑动时的卡片序号 |
| triggerSlideRight | 触发右滑折叠时触发该事件 | currentIndex 触发滑动时的卡片序号 |


