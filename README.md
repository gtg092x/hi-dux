# Hello Redux

Sample apps with a global data store + dispatch layer

## I just want to run examples

`yarn install`

`yarn run dev`

Go to `http://localhost:8080` - then order some chicken.

If you want to play around with redux vs no redux, check out `src/examples/index.js`

## Do I *need* to use Redux?

No. You could do all of this via state, props, and functions. But then again, you don't really *need* javascript frameworks at all. Redux makes a pretty complicated problem scalable. One we'll explain shortly!

## Ok, so what can suck about large apps in React?

Sharing state between components can be a huge pain! Without any global store, you have to pass methods and props to EVERYTHING. That gets complicated fast!

For example, let's pretend we want to set up a Howlin Ray's checkout screen. It'll have a cart, menu, and specials page.  

```js
import React from 'react';

class MyHowlinRaysStorePage {
  render() {
    return (
      <div>
        <HowlinMenu />
        <HowlinCart />
        <HowlinSpecials />
      </div>
    );
  }
}
```

They're going to need the same menu.

```js
import React from 'react';

const HowlinItem = ({ item }) => (<div>cool react component goes here</div>);
const HowlinMenu = ({ items }) => (<div>{items.map(item => <HowlinItem {...item} {/* other props */} />)}</div>);
const HowlinCart = ({ items }) => (<div>cool react component goes here</div>);
const HowlinSpecials = ({ items }) => (<div>cool react component goes here</div>);

class MyHowlinRaysStorePage {
  getItems() {
    return MENU_ITEMS;
  }
  render() {
    return (
      <div>
        <HowlinMenu items={this.getItems()} />
        <HowlinCart items={this.getItems()} />
        <HowlinSpecials items={this.getItems()} />
      </div>
    );
  }
}
```

Oh man - so we're sending three copies of our menu. That's getting difficult, but OK.

Oh yeah, we need to be able to send the cart info to specials and the cart too.

```js
import React from 'react';

const HowlinItem = ({ item }) => (<div />);
const HowlinMenu = ({ items }) => (<div>{items.map(item => <HowlinItem {...item} {/* other props */} />)}</div>);
const HowlinCart = ({ items, cart }) => (<div />);
const HowlinSpecials = ({ items, cart }) => (<div />);

class MyHowlinRaysStorePage {
  getItems() {
    return MENU_ITEMS;
  }
  getCart() {
    return this.state.cart;
  }
  render() {
    return (
      <div>
        <HowlinMenu items={this.getItems()} />
        <HowlinCart items={this.getItems()} cart={this.getCart()} />
        <HowlinSpecials items={this.getItems()} cart={this.getCart()} />
      </div>
    );
  }
}
```

Err... fine.

But wait! Now we need to be able to change this stuff by ordering, checking out, and restarting.

```js
import React from 'react';

const HowlinItem = ({ item, onOrder }) => (<div />);
const HowlinMenu = ({ items, onOrder }) => (<div>{items.map(item => <HowlinItem {...item} onOrder={() => onOrder(item)} {/* other props */} />)}</div>);
const HowlinCart = ({ items, cart, onCheckout, onClear }) => (<div />);
const HowlinSpecials = ({ items, cart, onOrder }) => (<div />);

class MyHowlinRaysStorePage {
  //
  orderItem(itemId) {
    //
  }
  clear() {
    // 
  }
  checkout() {
    //
  }
  render() {
    return (
      <div>
        <HowlinMenu items={this.getItems()} onOrder={this.orderItem} />
        <HowlinCart items={this.getItems()} cart={this.getCart()} onClear={this.clear} onCheckout={this.checkout} />
        <HowlinSpecials items={this.getItems()} cart={this.getCart()} onOrder={this.orderItem} />
      </div>
    );
  }
}
```

Oh crap, forgot we need to know how many of everything we have left over.

```js
import React from 'react';

const HowlinItem = ({ item, onOrder }) => (<div />);
const HowlinMenu = ({ items, onOrder, inventory }) =>
  (<div>{items.map(item => <HowlinItem {...item} inventory={inventory[item.id]} onOrder={() => onOrder(item)} {/* other props */} />)}</div>);
const HowlinCart = ({ items, cart, onCheckout, onClear }) => (<div />);
const HowlinSpecials = ({ items, cart, onOrder, inventory }) => (<div />);

class MyHowlinRaysStorePage {
  //
  getInventory() {
    //
  }
  render() {
    return (
      <div>
        <HowlinMenu items={this.getItems()} onOrder={this.orderItem} inventory={this.getInventory()}  />
        <HowlinCart items={this.getItems()} cart={this.getCart()} onClear={this.clear} onCheckout={this.checkout} />
        <HowlinSpecials items={this.getItems()} cart={this.getCart()} onOrder={this.orderItem} inventory={this.getInventory()} />
      </div>
    );
  }
}
```

New updates! Looks like we're moving the menu and specials into their own component together.

```js
import React from 'react';

const HowlinItem = ({ item, onOrder }) => (<div />);
const HowlinMenu = ({ items, onOrder, inventory }) =>
  (<div>{items.map(item => <HowlinItem {...item} inventory={inventory[item.id]} onOrder={() => onOrder(item)} {/* other props */} />)}</div>);
const HowlinCart = ({ items, cart, onCheckout, onClear }) => (<div />);
const HowlinSpecials = ({ items, cart, onOrder, inventory }) => (<div />);

const HowlinLunch = ({ items, cart, onOrder, inventory }) => (
  <div>
    <HowlinMenu items={items} onOrder={onOrder} inventory={inventory}  />
    <HowlinSpecials items={items} cart={cart} onOrder={onOrder} inventory={inventory} />
  </div>
); 

class MyHowlinRaysStorePage {
  //
  getInventory() {
    //
  }
  render() {
    return (
      <div>
        <HowlinCart items={this.getItems()} cart={this.getCart()} onClear={this.clear} onCheckout={this.checkout} />
        <HowlinLunch items={this.getItems()} cart={this.getCart()} onOrder={this.orderItem} inventory={this.getInventory()} />
      </div>
    );
  }
}
```

This is getting pretty gross. Everything needs to know about everything! Do I really need to have this huge list of dependencies?

What if there was one store that all children knew about and they could just get what they want from it?

Yes - with `Redux`!

# What's Redux?

From [the docs](https://redux.js.org/docs/introduction/CoreConcepts.html)

> Imagine your app's state is described as a plain object. For example, the state of a todo app might look like this:
  
```js
  {
    todos: [{
      text: 'Eat food',
      completed: true
    }, {
      text: 'Exercise',
      completed: false
    }],
    visibilityFilter: 'SHOW_COMPLETED'
  }
```

> This object is like a "model" except that there are no setters. This is so that different parts of the code can't change the state arbitrarily, causing hard-to-reproduce bugs. 

In our case, our app state looks like this:

```js
  {
    items: [{name: 'Item Name', id: 'itemid'}, {/* more items */}],
    inventory: {
      itemid: 5, // or however many items we have remaining
    },
    cart: [{ id: 'itemid', quantity: 3 }],
  }
```

Let's make that universal! We should make a reducer for each part of the state.

```js
// reducers.js

// when the action type SET_ITEMS is dispatched, we have a new state! Whatever `action.data` was
function items(state = [], action) {
  switch (action.type) {
    case 'SET_ITEMS':
      return action.data;
    // We'll get lots of actions through here - make sure we don't blow away our state by leaving off `default`
    default:
      return state;
  }
}

// when the action type DECREMENT_ITEM is dispatched, we make a copy of our old state but change one prop. The prop we decrement is whatever `action.id` was.
function inventory(state = {}, action) {
  switch (action.type) {
    case 'DECREMENT_INVENTORY_ITEM':
      return {
        ...state,
        [action.id]: state[action.id] - 1,
      };
    default:
      return state;
  }
}

// when the action type ADD_ITEM is dispatched, we make a copy of our old state but add whatever is in `action.data`.
// when the action type REMOVE_ITEM_AT is dispatched, we make a copy of our old state but add whatever is in `action.data`.
function cart(state = [], action) {
  switch (action.type) {
    case 'ADD_CART_ITEM':
      return [
        ...state,
        action.data, // where data is { id: String, quanity: Number }
      ];
    case 'SUBMIT_CART':
      // doesn't really submit it - just clears it
      return [];
    case 'CLEAR_CART':
      return [];
    case 'REMOVE_CART_ITEM_AT':
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1),
      ];
    default:
      return state;
  }
}

// https://redux.js.org/docs/api/combineReducers.html
// this means that all reducers get all actions
export default combineReducers({
  cart,
  items,
  inventory,
});
```

That was the hard part.

Let's make a store out of it with our new - much cleaner `MyHowlinRaysStorePage`

```js
import reducer from './reducers';
// redux is the state library
import { createStore } from 'redux';
// react-redux is handful of tools that combine react with redux
import { Provider, connect } from 'react-redux';

const store = createStore(reducer);

const HowlinItem = ({ item, onOrder }) => (<div />);

// state is the whole redux state
// componentProps are the props that come in to the component
// return an object - it'll get merged with incoming props 
const mapItemStateToProps = (state, componentProps) => ({
  item: state.items.find(item => item.id === componentProps.id)
});

// dispatch is the store dispatcher
const mapItemDispatchToProps = (dispatch, componentProps) => ({
  onOrder: () => dispatch({
    type: 'DECREMENT_INVENTORY_ITEM',
    id: componentProps.id
  })
});

// connect is kind of scary - but it's easy to get used to
// https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options
const HowlinItemWithRedux = connect(
  mapItemStateToProps,
  mapItemDispatchToProps,
)(HowlinItem);

const HowlinMenu = ({ itemIds, onOrder, inventory }) =>
  (<div>{itemIds.map(id => <HowlinItemWithRedux id={id} />)}</div>);

const HowlinMenuWithRedux = connect(
  state => ({
    itemIds: state.items.map(item => item.id),
  }),
)(HowlinMenu);
  
const HowlinCart = ({ items, cart, onCheckout, onClear }) => (<div />);

const HowlinCartWithRedux = connect(
  state => ({
    items: state.items,
    cart: state.cart,
  }),
  dispatch => ({
    onCheckout: () => dispatch({ type: 'SUBMIT_CART' }),
    onClear: () => dispatch({ type: 'CLEAR_CART' })
  }),
)(HowlinCart);
  
const HowlinSpecials = ({ items, cart, onOrder, inventory }) => (<div />);

const HowlinSpecialsWithRedux = connect(
  state => ({
    items: state.items,
    cart: state.cart,
    inventory: state.inventory,
  }),
  dispatch => ({
    onOrder: itemId => dispatch({ type: 'DECREMENT_INVENTORY_ITEM', data: itemId })
  }),
)(HowlinSpecials);


// woah! That's a nice improvement. HowlinLunch doesn't have to know anything!
const HowlinLunch = () => (
  <div>
    <HowlinMenuWithRedux />
    <HowlinSpecialsWithRedux />
  </div>
); 
  

// Provider adds the store to a context variable - making it accessible to child components
const MyHowlinRaysStorePage = () => (
  <Provider store={store}>
    <div>
      <HowlinCartWithRedux />
      <HowlinLunch />
    </div>
  </Provider>
);
```

# Was that really an improvement?

YES! It'd be nice to have less code, but maintenance is sooooo much easier now.

:point_up: you're right though - there's a lot of boilerplate. But the number of inter-relationships between the components went down a ton. In fact, go take a look at the "layout" components.

```js
const HowlinLunch = () => (
  <div>
    <HowlinMenuWithRedux />
    <HowlinSpecialsWithRedux />
  </div>
);
```

Redux did something pretty remarkable here - we can now truly treat these components as portable parts of the app. Who cares where you put `HowlinMenuWithRedux`? The component certainly doesn't - that means it's one less thing your brain gets bogged down with when you're designing your app.

# What's next?

Redux and front-end state is a pretty difficult topic: if you got a little lost, that's to be expected. We'll spend some time trying to master redux, but playing with this project is a good start. 
