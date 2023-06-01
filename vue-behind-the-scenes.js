// What is reactivity:

// Reactivity allows us to write cleaner code, preventing us from having to manually update the UI in response to data changes. Instead, the UI updates automatically.

// However, JavaScript doesn’t work like this on its own because javascript is not a reactive, so we can achieve reactivity using libraries and frameworks like React, Vue, and Angular.

// before the Composition API in Vue 3, we used a data function that returned the object we wanted to track. However, with the Composition API, we use two functions for defining state, ref() and reactive().

// using data property : 

<template>
  <h1>{{age}}</h1>
  <button @click="increaseAge">+ Increase age</button>
  <button @click="decreaseAge">- Decrease age</button>
</template>
<script>
export default {
  data: function() {
    return {
      age: 0
    }
  },
  methods: {
    increaseAge() {
      this.age++
    },
    decreaseAge() {
      this.age--
    }
  }
}
</script>



//using composition api:


<template>
  <div>{{state.first_name}} {{state.last_name}}</div>
  <button @click="swapNames">Swap names</button>
</template>
<script>
import { reactive } from 'vue'
export default {
  setup() {
    const state = reactive({
      first_name: "John",
      last_name: "Doe",
    })

    const swapNames = () => {
      state.first_name = "Naruto"
      state.last_name = "Uzumaki"
    }

    return { state, swapNames }
  }
}
</script>



<template>
  <h1>{{age}}</h1>
  <button @click="increaseAge">+ Increase age</button>
  <button @click="decreaseAge">- Decrease age</button>
</template>
<script>
import { ref } from 'vue'
export default {
  setup() {
    const age = ref(0);

    const increaseAge = () => {
      age.value++
    }

    const decreaseAge = () => {
      age.value--
    }

    return { age, increaseAge, decreaseAge }
  }
}
</script>




// We can't really track the reading and writing of local variables like in the example. There's just no mechanism for doing that in vanilla JavaScript. 

let A0 = 1
let A1 = 2
let A2 = A0 + A1

console.log(A2) // 3

A0 = 2
console.log(A2) // Still 3


//So , in javascript Proxies  are used for reactive object property

// You create a Proxy with two parameters:

// target: the original object which you want to proxy
// handler: an object that defines which operations will be intercepted and how to redefine intercepted operations.
// hander have traps like set and get 

const data = {
    message: 'Hello!',
    longMessage: 'Hello! World!'
  };
  
  const handler = {
    set(target, key, value) {
      if (key === 'message') {
        target.longMessage = value + ' World!';
      }
      target.message = value;
    }
  };
  
  const proxy = new Proxy(data, handler);
  
  proxy.message = 'Hello!!!!';
  
  console.log(proxy.longMessage); // 'Hello!!!! World!'






//$refs in vue
// It allows us to obtain a direct reference to a specific DOM element or child component instance after it's mounted.
//using refs parent component will have full access to every property and method of the child component.


// Virtual DOM:
// The virtual DOM (VDOM) is a programming concept where an ideal, or “virtual”, representation of a UI is kept in memory and synced with the “real” DOM.
//  

//How vue updates the DOM ? 
// Updates are made to the virtual DOM first, only differences are then rendered to the real DOM.




//Life cycle hooks:

beforeCreate() {
    // before! observe the data and props
    console.log("beforeCreate")
  },
  // observing data and props
  // init events
  created() {
    console.log("created")
    // have access to data and props
    // good time to fetch data and manipulate data on the component
  },
  beforeMount() {
    console.log("beforeMount")
    // finish render the template and its child component
    // good time to manipulate data that came back from child component
  },
  // render the template to the real DOM
  mounted() {
    console.log("mounted")
    // the template is render and printed on the real DOM
    // if you manipulate the data here its effect on the view that already printed 
  },
  beforeUpdate() {
    console.log("beforeUpdate")
    // just before any update of the component happens
    // good time to debug what the status before the change
  },
  // the update happens
  updated() {
    console.log("updated")
    // good time to debug what changed
  },
  beforeDestroy() {
    console.log("beforeDestroy")
    // component before unmounted, time for update the things that happens on this component 
  },
  // clean all events, watchers, and child components
  destroyed() {
    console.log("destroyed")
    // component unmounted, time for clean ups
  }