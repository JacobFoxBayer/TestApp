# babel-plugin-autobind-class-methods
Autobinds "this" to class methods and works with hot reloading.

Compatible with the latest React Hot Loader 3-beta

## Installation
```
   npm install babel-plugin-autobind-class-methods --save-dev 
```

Example .babelrc:
```
{
  "presets": ["es2015", "react"],
  "plugins": ["autobind-class-methods"]
}
```

## What it does
Example code: 
```
class Example {
  
  constructor(){
    this.greeting = 'Hello'
  }
  
  greet(){
    console.log(this.greeting)
  }
  
  render(){
    setTimeout(this.greet, 0)
  }
}

const example = new Example()

example.render() // logs out 'Hello', in vanilla js it would log out undefined
```
