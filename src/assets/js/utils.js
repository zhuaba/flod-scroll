
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