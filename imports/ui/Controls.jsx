import React, {Component} from "react";
import PropTypes from "prop-types";


class Controls extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Controls">
        <button onClick={() => this.props.onClick("up")}>up</button>
        <button onClick={() => this.props.onClick("down")}>down</button>
        <button onClick={() => this.props.onClick("left")}>left</button>
        <button onClick={() => this.props.onClick("right")}>right</button>
      </div>);
  }
}

Controls.propTypes = {
  onClick : PropTypes.func.isRequired
};

export default Controls;