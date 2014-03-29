/** @jsx React.DOM */

var CONSTANTS = {
  COLOR:  ['D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'],       // 10
  CLARITY: ['IF', 'VVS1', 'VVS2', 'VS1', 'VS2', 'SI1', 'SI2', 'SI3', 'I1', 'I2', 'I3']  // 11
};

var PRICE_TABLE = {
  // .90 - .99
  11: {
    D: [152, 118, 103,  88,  77,  70,  62,  48,  38,  22,  15],
    E: [118, 103,  94,  79,  73,  65,  59,  45,  37,  21,  14],
    F: [103,  94,  84,  74,  69,  63,  55,  43,  36,  20,  14],
    G: [ 93,  84,  74,  69,  64,  59,  52,  41,  34,  19,  13],
    H: [ 85,  74,  69,  63,  60,  55,  49,  38,  32,  18,  13],
    I: [ 70,  62,  59,  55,  52,  50,  44,  34,  30,  17,  12],
    J: [ 54,  51,  49,  47,  46,  44,  39,  31,  26,  16,  11],
    K: [ 44,  42,  40,  38,  37,  35,  32,  26,  23,  15,  10],
    L: [ 39,  37,  35,  34,  32,  30,  27,  23,  20,  14,   9],
    M: [ 36,  34,  32,  30,  29,  27,  24,  21,  17,  12,   8]
  }
}



var DESCRIPTIONS = {
  clarity: new (function (){
    this.IF = 'Internally flawless - no internal inclusions.';
    this.VVS1 =  'Very very small inclusions. Very difficult to detect under 10x magnification.';
    this.VVS2 = this.VVS1;
    this.VS1 = 'Very small inclusions. Can be seen under 10x magnification and in some cases to the naked eye.';
    this.VS2 = this.VS1;
    this.SI1 = 'Small inclusions. Can be seen under 10x magnification and may be visible to the naked eye.';
    this.SI2 = this.SI1;
    this.SI3 = this.SI1;
    this.I1 =  'Imperfect. Inclusions are visible under 10x magnification and in most cases to the naked eye.';
    this.I2 = this.I1;
    this.I3 = this.I1;
  })(),
  color: {
    D: '',
    E: '',
    F: '',
    G: '',
    H: '',
    I: '',
    J: '',
    K: '',
    L: '',
    M: ''
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

function getOversizePremium(carat) {
  if (carat >= .6 && carat <= .69)
    return {min: 1.07, max: 1.10};

  else if (carat >= .8 && carat <= .89)
    return {min: 1.07, max: 1.12};

  else if (carat >= .95 && carat <= .99)
    return {min: 1.05, max: 1.10};

  else if (carat >= 1.25 && carat <= 1.49)
    return {min: 1.05, max: 1.10};

  else if (carat >= 1.7 && carat <= 1.99)
    return {min: 1.07, max: 1.12};

  else if (carat >= 2.5 && carat <= 2.99)
    return {min: 1.05, max: 1.10};

  else if (carat >= 3.5 && carat <= 3.99)
    return {min: 1.05, max: 1.10};

  else if (carat >= 4.5 && carat <= 4.99)
    return {min: 1.05, max: 1.10};

  return 1;
}


var Cost = React.createClass({
  render: function() {
    return (
      <div className="value">
        {this.props.total}
      </div>
    )
  }
});

// Component to handle both increment and decrement
var Iterate = React.createClass({
  componentDidMount: function() {
    this.getDOMNode().disabled = this.props.disabled;
  },
  componentDidUpdate: function() {
    this.getDOMNode().disabled = this.props.disabled;
  },
  render: function() {
    return (
      <button onClick={this.props.onClick} className={this.props.label.toLowerCase() + '-button'}>
        {this.props.label == 'Increment' ? '+' : '-'}
      </button>
    )
  }
});

var Premium = React.createClass({
  render: function() {
    var originalTotalCost = this.props.total,
        oversizePremiums = getOversizePremium(this.props.carat),
        premiumMin = (originalTotalCost * oversizePremiums.min).toFixed(2),
        premiumMax = (originalTotalCost * oversizePremiums.max).toFixed(2),
        premiumMessage = "Oversized: price can range from " + premiumMin + " to " + premiumMax;

    // conditionally display the premium message
    return (
      <div className="oversizePremiums">
        {premiumMin > 1 && premiumMessage}
      </div>
    )
  }
});

var NumericCharacteristic = React.createClass({
  increment: function(event){
    this.handleChange(event, this.props.val + this.props.interval);
    return false;
  },
  decrement: function(event){
    this.handleChange(event, this.props.val - this.props.interval);
    return false;
  },
  // when no arg passed, simply bubble the value up to the owner
  // if a value is passed, set the value then bubble up.
  handleChange: function(event, value) {
    // if no value is passed in, we are handling a change to the input directly.
    // so we'll need to cast to string
    value = (typeof value === "undefined") ? +this.refs.value.getDOMNode().value.trim() : value;

    // TODO: validate change
    if (value > this.props.max)
      value = this.props.max;
    else if (value < this.props.min)
      value = this.props.min;

    // propagate the value change up to the owner so total price can be recalculated
    this.props.onCharacteristicChange(this.props.name, value);
  },
  render: function() {
    var displayValue = parseFloat(this.props.val).toFixed(2),
        incrDisabled = this.props.val + this.props.interval > this.props.max,
        decrDisabled = this.props.val - this.props.interval < this.props.min;

    return (
      <div>
        <div className={this.props.name + '-container'}>
          <label>{this.props.name}</label>
          <Iterate label="Decrement" onClick={this.decrement} disabled={decrDisabled} />
          <div className="value">{displayValue}</div>
          <Iterate label="Increment" onClick={this.increment} disabled={incrDisabled} />
        </div>
      </div>
    );
  }
});

var Characteristic = React.createClass({
  increment: function(event){
    this.handleChange(event, this.props.val + this.props.interval);
    return false;
  },
  decrement: function(event){
    this.handleChange(event, this.props.val - this.props.interval);
    return false;
  },
  // when no arg passed, simply bubble the value up to the owner
  // if a value is passed, set the value then bubble up.
  handleChange: function(event, value) {
    // if no value is passed in, we are handling a change to the input directly.
    // so we'll need to cast to string
    value = (typeof value === "undefined") ? +this.refs.value.getDOMNode().value.trim() : value;

    // TODO: validate change
    if (value > this.props.max)
      value = this.props.max;
    else if (value < this.props.min)
      value = this.props.min;

    // propagate the value change up to the owner so total price can be recalculated
    this.props.onCharacteristicChange(this.props.name, value);
  },
  render: function() {
    var displayValue = CONSTANTS[this.props.name.toUpperCase()][this.props.val],
        incrDisabled = this.props.val + this.props.interval > this.props.max,
        decrDisabled = this.props.val - this.props.interval < this.props.min;
        description = DESCRIPTIONS[this.props.name][displayValue];

// <input type="text" name={this.props.name} ref="value"
//   min={this.props.min}
//   max={this.props.max}
//   value={this.props.val}
//   step={this.props.interval}
//   onChange={this.handleChange} />

    // NOTE! Here, the labels are "inverted" in that the decrement actually performs increment
    return (
      <div>
        <div className={this.props.name + '-container'}>
          <label>{this.props.name}</label>
          <Iterate label="Decrement" onClick={this.increment} disabled={incrDisabled} />
          <div className="value">{displayValue}</div>
          <div className={this.props.name + '-diagram ' + this.props.name + '-diagram-' + displayValue} />
          <Iterate label="Increment" onClick={this.decrement} disabled={decrDisabled} />
        </div>
        <p className="description">{description}</p>
      </div>
    );
  }
});

var DiamondForm = React.createClass({
  /** internal method to calculate the cost based on this state
   */
  _calculateTotalCost: function() {
    //return 1; //TODO: remove short circuit
    var multiplier,
        ptIndex = getPriceTableIndex(this.state.carat),
        actualColor = CONSTANTS.COLOR[this.state.color];

    multiplier = PRICE_TABLE[ptIndex][actualColor][this.state.clarity];

    return multiplier * 100 * this.state.carat;
  },
  handleCharacteristicChange: function(name, value) {
    // We cannot simply call setState and pass in an object, since `name` is 
    // a variable. We have to use bracket notation.
    var currentState = this.state;
    currentState[name] = value;
    this.setState(currentState);
  },
  getInitialState: function() {
    return {
      carat: .98,
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
        <NumericCharacteristic
          name="carat"
          min={0}
          max={4}
          val={this.state.carat}
          interval={.01}
          onCharacteristicChange={this.handleCharacteristicChange} />
        <Characteristic
          name="color"
          min={0}
          max={9}
          val={this.state.color}
          interval={1}
          onCharacteristicChange={this.handleCharacteristicChange} />
        <Characteristic
          name="clarity"
          min={0}
          max={10}
          val={this.state.clarity}
          interval={1}
          onCharacteristicChange={this.handleCharacteristicChange} />
        <div className="totalCost">
          <label>
            High Cash Asking Price
          </label>
          <Cost total={totalCost} />
        </div>
        <Premium total={totalCost} carat={this.state.carat}/>
      </form>
    );
  }
});

React.renderComponent(
  <DiamondForm />,
  document.getElementById('content')
);