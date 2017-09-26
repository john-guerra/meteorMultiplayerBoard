import React, {Component} from "react";
import PropTypes from "prop-types";


class Board extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // this.redraw(this.props);
  }

  componentWillUpdate(newProps){
    this.redraw(newProps);
  }


  redraw(newProps) {
    console.log("redraw");
    let ctx = this.canvas.getContext("2d");

    ctx.clearRect(0, 0, newProps.width, newProps.height);


    newProps.players.forEach((p) => {
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.fillStyle = "steelblue";
      ctx.arc(p.x, p.y, 3, 0, Math.PI*2);
      ctx.fill();
      ctx.fillText(p.name, p.x, p.y+20);
    });
  }

  render() {
    return (
    <div className="Board">
      <canvas
        width={this.props.width}
        height={this.props.height}
        ref={(c) => this.canvas = c}></canvas>
    </div>);
  }
}

Board.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  players: PropTypes.array.isRequired
};

export default Board;