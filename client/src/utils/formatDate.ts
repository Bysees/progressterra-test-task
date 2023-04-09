export const formatDate = (dateTime: string) => {
  const date = new Date(dateTime)
  const day = date.getDate()
  const month = date.getMonth() + 1
  const formattedDate = `${day < 10 ? '0' : ''}${day}.${month < 10 ? '0' : ''}${month}`

  return formattedDate
}
