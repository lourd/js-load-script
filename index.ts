export default function loadScript(url: string) {
  return new Promise<void>((resolve, reject) => {
    const script = document.createElement('script')
    script.onload = () => resolve()
    script.onerror = reject
    script.src = url
    script.async = true
    script.type = 'text/javascript'
    document.head.appendChild(script)
  })
}
