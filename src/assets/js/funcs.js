// opacity 0.9
export const move_scale = (dis, base = 0.9) => {
  if (Math.abs(dis) >= 375) {
    return dis > 0 ? 1 : base
  }
  // if (direction === -1) {
  //   return 1 + (dis / 375) * (1 - base)
  // }
  // return 
  return (dis > 0 ? base : 1) + (dis / 375) * (1 - base)
}
