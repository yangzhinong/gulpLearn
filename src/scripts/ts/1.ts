class Test {
    constructor(private name:string, private age:number){}

    sayHello(){
        return console.log(this.name + " age=" + this.age.toString()); 
    }
}