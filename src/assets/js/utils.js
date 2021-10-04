/**
 * @description: 初始化展示卡片的样式，位置，层级
 * @param { number } num 卡片数量
 * @param { number } width  卡片宽度
 * @return { array<object> } 处理后的卡片数组
 */
export const formatCardData = (num, width) => {
  const res = []
  for (let i = 0; i < num; i++) {
    res.push({
      opacity: 1,
      scale: 1,
      translateX: 10 + (width + 5) * i,
      zIndex: i + 1,
    })
  }
  return res
}