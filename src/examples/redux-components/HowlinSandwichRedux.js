import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HowlinSandwich from '../components/HowlinSandwich';
import { orderOne } from '../redux';

const selector = (state, { id }) => ({
  ...state.items.find(item => item.id === id),
  inventory: state.inventory[id],
  disabled: state.inventory[id] <= 0,
});

const dispatcher = (dispatch, { id }) => ({
  onOrder: () => dispatch(orderOne(id))
});

const HowlinSandwichRedux = connect(
  selector,
  dispatcher,
)(HowlinSandwich);

HowlinSandwichRedux.propTypes = {
  id: PropTypes.string.isRequired,
};

export default HowlinSandwichRedux;