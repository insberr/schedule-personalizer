// eruda, will be stripped from production
/// <reference path="eruda.d.ts"/>
export default function eruda(callback: () => void) {
    if (process.env.NODE_ENV == "development" && window.location.origin.includes("gitpod.io")) {
        import("eruda").then((s) => {s.init(); callback()})
        /*document.write('<script src="//cdn.jsdelivr.net/npm/eruda"></script>');
        document.write('<script>eruda.init();</script>');*/
       /*fetch("https://cdn.jsdelivr.net/npm/eruda").then((s) => s.text()).then((s) => {
           eval(s).eruda.init()
       })*/
    } else {callback()}
    }

// the hell is eruda? oh youll have to tell me about it. ok talk later ok.
// mobile console, i used it on the ipads. very helpful. ill start the gutting.