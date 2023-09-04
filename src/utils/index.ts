export const shortenUrl = (url: string) => {
  const apiUrl = `https://tinyurl.com/api-create.php?url=${encodeURIComponent(
    url,
  )}`

  return fetch(apiUrl)
    .then((response) => response.text())
    .then((shortUrl) => shortUrl)
}
