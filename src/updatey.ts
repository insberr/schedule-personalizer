export function update() {
    const root = window.rroot;
    if (root) {
        root.unmount();
    }
    // fetch new page
    fetch("/").then(async (r) => {
        document.getElementsByTagName("html")[0].innerHTML = await r.text();
        //https://stackoverflow.com/a/69190644
        function executeScriptElements(containerElement: HTMLElement) {
            const scriptElements = containerElement.querySelectorAll("script");
          
            Array.from(scriptElements).forEach((scriptElement) => {
              const clonedElement = document.createElement("script");
          
              Array.from(scriptElement.attributes).forEach((attribute) => {
                clonedElement.setAttribute(attribute.name, attribute.value);
              });
              
              clonedElement.text = scriptElement.text;
          
              scriptElement.parentNode?.replaceChild(clonedElement, scriptElement);
            });
          }
        executeScriptElements(document.body)
    })
}
