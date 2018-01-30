import { sayHello } from "./greet";

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    //@ts-ignore
    elt.innerText = sayHello(name);
}

showHello("greeting", "TypeScript");