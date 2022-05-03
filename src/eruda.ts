// eruda, will be stripped from production
/// <reference path="eruda.d.ts"/>
export default function eruda() {
    if (process.env.NODE_ENV == "development" && window.location.href.includes("gitpod.io")) {
        import("eruda").then((s) => {s.init()})
        /*document.write('<script src="//cdn.jsdelivr.net/npm/eruda"></script>');
        document.write('<script>eruda.init();</script>');*/
       /*fetch("https://cdn.jsdelivr.net/npm/eruda").then((s) => s.text()).then((s) => {
           eval(s).eruda.init()
       })*/
    }
    }