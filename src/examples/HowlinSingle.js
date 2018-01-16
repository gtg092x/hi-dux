import React from 'react';
import HowlinMenu from "./components/HowlinMenu";
import { SANDWICHES, DEFAULT_INVENTORY } from './data/menu';

const styles = {
  restock: {padding: 16, width: '100%'},
};

class HowlinSingle extends React.Component {
  state = {
    inventory: DEFAULT_INVENTORY
  };

  _onOrder = id =>
    this.setState(
      ({ inventory }) =>
        ({ inventory: {
          ...inventory,
          [id]: inventory[id] - 1,
        }})
  );

  render() {
    return (
      <div>
        <HowlinMenu
          items={SANDWICHES}
          onOrder={this._onOrder}
          inventory={this.state.inventory}
        />
        <button
          type="button"
          style={styles.restock}
          onClick={() => this.setState({ inventory: DEFAULT_INVENTORY })}
        >
          Restock!
        </button>
      </div>
    );
  }
}

export default HowlinSingle;