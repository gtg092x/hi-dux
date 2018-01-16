import React from 'react';
import PropTypes from 'prop-types';
import HowlinSandwich from './HowlinSandwich';

const HowlinMenu = ({ items, inventory, onOrder }) => (
  <div>
    {
      items.map(
        item =>
          <HowlinSandwich
            inventory={inventory[item.id]}
            onOrder={() => onOrder(item.id)}
            key={item.id}
            id={item.id}
            name={item.name}
            color={item.color}
            image={item.image}
            disabled={inventory[item.id] <= 0}
          />
      )
    }
  </div>
);

HowlinMenu.propTypes = {
  items: PropTypes.array.isRequired,
  inventory: PropTypes.object.isRequired,
  onOrder: PropTypes.func.isRequired,
};

export default HowlinMenu;
