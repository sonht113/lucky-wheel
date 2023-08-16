export function randomIndex(prizes: { name: string; img: any; percentpage: number }[]) {
  let winningPrizeIndex = 0

  // Mảng tỉ lệ tích luỹ qua các phần quà
  const cumulativeRatios: number[] = []
  let cumulativeRatio = 0

  for (const prize of prizes) {
    cumulativeRatio += prize.percentpage
    cumulativeRatios.push(cumulativeRatio)
  }

  // Tổng tỉ lệ tích luỹ qua tất cả phần quà
  const totalCumulativeRatio = cumulativeRatios[cumulativeRatios.length - 1]
  const randomValue = setTimeout(() => Math.random() * totalCumulativeRatio, 50000)
  console.log(randomValue)

  for (let i = 0; i < cumulativeRatios.length; i++) {
    if (randomValue <= cumulativeRatios[i]) {
      winningPrizeIndex = i
      break
    }
  }

  return winningPrizeIndex
}
