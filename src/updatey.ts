export function update() {
    const root = window.rroot;
    if (root) {
        root.unmount();
    }
    if (process.env.NODE_ENV != "production") {
      location.reload()
    }
    // fetch new page
    fetch("/").then(async (r) => {
        document.querySelectorAll("script").forEach(r => r.remove())
        const data = await r.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, "text/html");
        doc.querySelectorAll("script").forEach((s) => {
          if (!s.noModule) {
            return
          }
          if (s.src) {
            fetch(s.src).then(r => r.text()).then((sc) => {
              console.log("loading script", s.src);
              const f = new Function(sc) // oh god oh fuck
              console.log("starting...")
              f();
            })
          } else {
            const f = new Function(s.innerHTML) // oh god
            f();
          }
        })
    })
}