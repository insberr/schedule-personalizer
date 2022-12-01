export function update() {
    const root = window.rroot;
    if (process.env.NODE_ENV != 'production') {
        location.reload();
    }
    // fetch new page
    fetch('/?rng' + Math.random() * 10).then(async (r) => {
        try {
            const keys = await caches.keys();
            await Promise.all(keys.map((k) => caches.delete(k)));
        } catch (e) {
            console.log('unable to remove caches, that should be fine maybe');
            console.log(e);
            location.reload();
        }
        document.querySelectorAll('script').forEach((r) => r.remove());
        const data = await r.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, 'text/html');
        doc.querySelectorAll('script').forEach((s) => {
            if (!s.noModule) {
                return;
            }
            if (s.src) {
                fetch(s.src)
                    .then((r) => r.text())
                    .then((sc) => {
                        console.log('loading script', s.src);
                        const f = new Function(sc); // oh god oh fuck
                        console.log('starting...');
                        f();
                        console.log('after src');
                    });
            } else {
                console.log('running innerhtml script');
                const f = new Function(s.innerHTML); // oh god
                f();
            }
        });
    });
}
