import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  container: { overflow: 'none', display: 'inline-block', border: 'solid 1px black', padding: 4 },
  image: ({ disabled }) => ({ opacity: disabled ? 0.6 : 1, width: 300 }),
  h2: ({ color, disabled }) => ({ color, textDecoration: disabled ? 'line-through' : null }),
  imageContainer: { height: 200, overflow: 'hidden' },
  button: { display: 'block', padding: 14, width: '100%' },
};

const HowlinSandwich = ({ disabled, name, color, image, onOrder, inventory }) => (
  <div className="howlin-sandwich" style={styles.container}>
    <h2 style={styles.h2({ color, disabled })}>{name}</h2>
    <h3>only {inventory} remaining</h3>
    <div style={styles.imageContainer}>
      <img style={styles.image({ disabled })} src={image} />
    </div>
    <button style={styles.button} onClick={onOrder} disabled={disabled} type="button">
      Order
    </button>
  </div>
);

HowlinSandwich.propTypes = {
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  onOrder: PropTypes.func.isRequired,
  inventory: PropTypes.number.isRequired,
};

export default HowlinSandwich;