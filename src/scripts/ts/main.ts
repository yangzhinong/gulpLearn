import { sayHello } from "./greet";

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    //@ts-ignore
    elt.innerText = sayHello(name);
}

showHello("greeting", "TypeScript!");

console.log('change!!');

setTimeout(()=>{
    console.log("hello");
},200);
