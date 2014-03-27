/** @jsx React.DOM */

var CONSTANTS = {
  COLOR:  ['D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'],       // 10
  CLARITY: ['IF', 'VVS1', 'VVS2', 'VS1', 'VS2', 'SI1', 'SI2', 'SI3', 'I1', 'I2', 'I3']  // 11
};

var PRICE_TABLE = {
  // .90 - .99
  11: {
    D: [152, 118, 103,  88,  77,  70,  62,  48,  38,  22,  15],
    E: [118, 103,  94,  79,  73,  65,  59,  45,  37,  21,  14]
  }
}

function getPriceTableIndex(caratSize) {
  if (caratSize >= .01 && caratSize <= .03)
    return 1;
  else if (caratSize >= .04 && caratSize <= .07)
    return 2;
  else if (caratSize >= .08 && caratSize <= .14)
    return 3;
  else if (caratSize >= .15 && caratSize <= .17)
    return 4;
  else if (caratSize >= .18 && caratSize <= .22)
    return 5;
  else if (caratSize >= .23 && caratSize <= .29)
    return 6;
  else if (caratSize >= .30 && caratSize <= .39)
    return 7;
  else if (caratSize >= .40 && caratSize <= .49)
    return 8;
  else if (caratSize >= .50 && caratSize <= .69)
    return 9;
  else if (caratSize >= .70 && caratSize <= .89)
    return 10;
  else if (caratSize >= .90 && caratSize <= .99)
    return 11;
  else if (caratSize >= 1.0 && caratSize <= 1.49)
    return 12;
  else if (caratSize >= 1.5 && caratSize <= 1.99)
    return 13;
  else if (caratSize >= 2.0 && caratSize <= 2.99)
    return 14;
  else if (caratSize >= 3.0 && caratSize <= 3.99)
    return 15;
  else if (caratSize >= 4.0 && caratSize <= 4.99)
    return 16;
  else if (caratSize >= 5.0 && caratSize <= 5.99)
    return 17;
}


var Cost = React.createClass({
  render: function() {
    return (
      <div>
        High Cash Asking Price: {this.props.total}
      </div>
    )
  }
});

var Characteristic = React.createClass({
  handleChange: function() {
    var value = this.refs.value.getDOMNode().value.trim();

    // propagate the value change up to the owner so total price can be recalculated
    this.props.onCharacteristicChange(this.props.name, value);
  },
  render: function() {
    var longValueName = this.props.val;

    // Prettify
    if(this.props.name !== 'carat')
      longValueName = CONSTANTS[this.props.name.toUpperCase()][this.props.val];

    return (
      <div>
        <label>{this.props.name}</label>
        <input type="range" name="points" ref="value"
          min={this.props.min}
          max={this.props.max}
          value={this.props.val}
          step={this.props.interval}
          onChange={this.handleChange} />
        {longValueName}
      </div>
    );
  }
});

var DiamondForm = React.createClass({
  /** internal method to calculate the cost based on this state
   */
  _calculateTotalCost: function() {
    var multiplier,
        ptIndex = getPriceTableIndex(this.state.carat),
        actualColor = CONSTANTS.COLOR[this.state.color];

    multiplier = PRICE_TABLE[ptIndex][actualColor][this.state.clarity];

    return multiplier * 100 * this.state.carat;
  },
  handleCharacteristicChange: function(name, value){
    // We cannot simply call setState and pass in an object, since `name` is 
    // a variable. We have to use bracket notation.
    var currentState = this.state;
    currentState[name] = value;
    this.setState(currentState);
  },
  getInitialState: function() {
    return {
      carat: .92,
      color: 1,
      clarity: 1
    };
  },
  componentWillMount: function() {
  },
  render: function() {
    var totalCost = this._calculateTotalCost();

    return (
      <form>
        <Characteristic
          name="carat"
          min="0"
          max="4"
          val={this.state.carat}
          interval=".01"
          onCharacteristicChange={this.handleCharacteristicChange} />
        <Characteristic
          name="color"
          min="0"
          max="9"
          val={this.state.color}
          interval="1"
          onCharacteristicChange={this.handleCharacteristicChange} />
        <Characteristic
          name="clarity"
          min="0"
          max="10"
          val={this.state.clarity}
          interval="1"
          onCharacteristicChange={this.handleCharacteristicChange} />
        <Cost total={totalCost} />
      </form>
    );
  }
});

React.renderComponent(
  <DiamondForm />,
  document.getElementById('content')
);