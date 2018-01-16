import { combineReducers } from 'redux';
import { SANDWICHES, DEFAULT_INVENTORY } from '../data/menu';

const SET_MENU = 'SET_MENU';
const ORDER_ONE = 'ORDER_ONE';
const RESTOCK = 'RESTOCK';

/**
 * This is an action creator - it's a method that returns an object with a `type` attribute set.
 * The object that gets returned from this is consumed by redux `dispatch`, which passes the action to the reducers.
 * @param data
 * @returns {{type: string, data: *}}
 */
export function setMenu (data) {
  return {
    type: SET_MENU,
    data,
  };
}

/**
 * Another action creator. This passes only `type`.
 * @returns {{type: string}}
 */
export function restock () {
  return {
    type: RESTOCK,
  };
}

/**
 * Another action creator - this passes id to action.
 * @param id
 * @returns {{type: string, id: *}}
 */
export function orderOne (id) {
  return {
    type: ORDER_ONE,
    id,
  };
}

/**
 * An item reducer. This accepts two arguments - the current redux state, namespaced to `items` (so state.items) and an action.
 * @param state
 * @param action
 * @returns Array
 */
function items (state = SANDWICHES, action) {
  switch (action.type) {
    case SET_MENU:
      return action.data;
    default:
      return state;
  }
}

/**
 * The inventory reducer. This accepts two arguments - the current redux state, namespaced to `inventory` (state.inventory) and an action.
 * @param state
 * @param action
 * @returns {*}
 */
function inventory (state = DEFAULT_INVENTORY, action) {
  switch (action.type) {
    case ORDER_ONE:
      return {
        ...state,
        [action.id]: state[action.id] - 1,
      };
    case RESTOCK:
      return DEFAULT_INVENTORY;
    default:
      return state;
  }
}

/**
 * We're combining reducers here.
 * https://redux.js.org/docs/api/combineReducers.html
 * By doing this, we'll have both reducers called with every dispatch.
 */

/*
Not the real code, but is basically what you get:
const mapValues = require('lodash/mapValues');
const combineReducers = obj => (state = {}, action) => mapValues(obj, (val, key) => val(state[key], action));
 */

export default combineReducers({
  inventory,
  items,
});

/*
Your state will change over time, but it will always look something like this:

```
{
  items: [{ id: itemId, ...props }],
  inventory: {
    [itemId]: Number
  },
}
```

*/