/**
 * @description: 移动时卡片的尺寸变化
 * @param { number } dis: 移动距离
 * @param { number } base: 尺寸阈值
 * @return { number } scale尺寸
 */
export const move_scale = (dis, base = 0.9, beforeBase = 1) => {
  if (Math.abs(dis) >= 375) {
    return dis > 0 ? beforeBase : base
  }
  return (dis > 0 ? base : beforeBase) + (dis / 375) * (1 - base)
}

/**
 * @description: 移动时的透明度变化
 * @param { number } dis: 移动距离
 * @param { number } base: 透明度阈值
 * @return { number } 透明度
 */
export const move_opacity = (dis, base = 0.4) => {
  if (Math.abs(dis) >= 375) {
    return dis > 0 ? 1 : base
  }
  return (dis > 0 ? base : 1) + (dis / 375) * (1 - base)
}
