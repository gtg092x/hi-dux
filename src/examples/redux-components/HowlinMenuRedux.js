import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HowlinSandwichRedux from './HowlinSandwichRedux';

const HowlinMenuBase = ({ items }) => (
  <div>
    {
      items.map(
        item =>
          <HowlinSandwichRedux key={item.id} id={item.id} />
      )
    }
  </div>
);

HowlinMenuBase.propTypes = {
  items: PropTypes.array.isRequired,
};

const selector = state => ({
  items: state.items,
});

export default connect(selector)(HowlinMenuBase);
