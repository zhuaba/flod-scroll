// scale 0.9
export const move_scale = (dis, base = 0.9, beforeBase = 1) => {
  if (Math.abs(dis) >= 375) {
    return dis > 0 ? beforeBase : base
  }
  return (dis > 0 ? base : beforeBase) + (dis / 375) * (1 - base)
}

// opacity
export const move_opacity = (dis, base = 0.4) => {
  if (Math.abs(dis) >= 375) {
    return dis > 0 ? 1 : base
  }
  return (dis > 0 ? base : 1) + (dis / 375) * (1 - base)
}
