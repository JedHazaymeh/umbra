export default function authHeader() {
  const tokensItem = localStorage.getItem('tokens')
  if (tokensItem) {
    const tokens = JSON.parse(tokensItem)
    if (tokens && tokens.access) {
      return { Authorization: 'Bearer ' + tokens.access }
    }
    return {}
  }
}