export default function log(color: string, ...input: string[]) {
  const currentDate = new Date()
  const date = (
    String(currentDate.getDate()).padStart(2, '0') +
    '/' +
    String((currentDate.getMonth() + 1)).padStart(2, '0') +
    '/' +
    String(currentDate.getFullYear()).slice(-2) +
    '@' +
    String(currentDate.getHours()).padStart(2, '0') +
    ':' +
    String(currentDate.getMinutes()).padStart(2, '0') +
    ':' +
    String(currentDate.getSeconds()).padStart(2, '0')
  )

  if (!color) return console.log(`%c${date}`, 'color: grey', ...input)
  return console.log(`%c${date}`, `background: ${color}`, ...input)
}