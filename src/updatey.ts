export function update() {
    const root = window.rroot;
    if (root) {
        root.unmount();
    }
    // fetch new page
    fetch("/").then(async (r) => {
        document.getElementsByTagName("html")[0].innerHTML = await r.text();
        document.querySelectorAll("script").forEach((e) => {
            const src = e.attributes.getNamedItem("src")?.value
            if (!src) {
                const data = e.innerHTML;
                e.remove()
                const n = document.createElement("script");
                n.innerHTML = data;
                document.body.append(n)
            } else {
                e.remove()
                const n = document.createElement("script");
                n.src = src;
                document.body.append(n)
            }
            
            
        })
    })
}
