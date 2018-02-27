function loadScript(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');

    script.onload = () => resolve();

    script.onerror = reject;
    script.src = url;
    script.async = true;
    script.type = 'text/javascript';
    document.head.appendChild(script);
  });
}

export default loadScript;
