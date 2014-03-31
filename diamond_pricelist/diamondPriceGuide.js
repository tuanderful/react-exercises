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
  },
  // 1.0 - 1.49
  12: {
    D: [275, 195, 170, 133, 116, 88,  75,  60,  47,  27,  17],
    E: [190, 165, 133, 115, 102, 85,  71,  58,  45,  26,  16],
    F: [160, 133, 116, 107, 92,  82,  69,  56,  44,  25,  15],
    G: [130, 116, 106, 91,  85,  78,  66,  54,  43,  24,  14],
    H: [106, 98,  89,  81,  77,  71,  63,  51,  41,  23,  14],
    I: [88,  83,  76,  72,  69,  66,  59,  47,  37,  22,  13],
    J: [75,  70,  67,  64,  60,  57,  54,  42,  32,  20,  13],
    K: [63,  60,  57,  55,  53,  50,  46,  37,  30,  18,  12],
    L: [54,  52,  50,  48,  46,  44,  40,  34,  28,  17,  11],
    M: [47,  43,  40,  38,  36,  34,  31,  27,  25,  16,  11]
  },
  13: {
    D: [336, 243, 211, 177, 155, 115, 93,  72,  54,  31,  18],
    E: [238, 206, 177, 160, 142, 112, 90,  70,  51,  30,  17],
    F: [206, 177, 153, 140, 127, 107, 86,  67,  50,  29,  16],
    G: [166, 150, 135, 120, 115, 101, 81,  65,  49,  28,  16],
    H: [134, 125, 113, 105, 100, 92,  76,  61,  47,  27,  16],
    I: [107, 102, 96,  89,  85,  80,  69,  56,  43,  25,  15],
    J: [93,  86,  82,  77,  72,  67,  61,  49,  38,  23,  15],
    K: [74,  70,  67,  65,  62,  57,  52,  43,  35,  20,  14],
    L: [62,  60,  58,  56,  54,  50,  45,  38,  32,  19,  13],
    M: [52,  49,  46,  44,  42,  41,  39,  33,  28,  18,  13]
  }
}



var DESCRIPTIONS = {
  clarity: new (function (){
    this.IF = 'Internally flawless. No inclusions and only blemishes are visible to a skilled grader using 10× magnification.';
    this.VVS1 =  'Very very small inclusions.  Inclusions are difficult for a skilled grader to see under 10× magnification.';
    this.VVS2 = this.VVS1;
    this.VS1 = 'Very small inclusions. Inclusions are minor and range from difficult to somewhat easy for a skilled grader to see under 10x magnification, and in some cases to the naked eye.';
    this.VS2 = this.VS1;
    this.SI1 = 'Small inclusions. Inclusions are noticeable to a skilled grader under 10x magnification, and may be visible to the naked eye.';
    this.SI2 = this.SI1;
    this.SI3 = this.SI1;
    this.I1 =  'Imperfect. Inclusions are obvious under 10× magnification, in most cases to the naked eye, and may affect transparency and brilliance.';
    this.I2 = this.I1;
    this.I3 = this.I1;
  })(),
  color: new (function(){
    this.D = 'Colorless';
    this.E = this.D;
    this.F = this.D;
    this.G = 'Near Colorless';
    this.H = this.G;
    this.I = this.G;
    this.J = this.G;
    this.K = 'Faint';
    this.L = this.K;
    this.M = this.K;
  })()
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
    return {min: 7, max: 10, caratMin: .6, caratMax: .69};

  else if (carat >= .8 && carat <= .89)
    return {min: 7, max: 12, caratMin: .8, caratMax: .89};

  else if (carat >= .95 && carat <= .99)
    return {min: 5, max: 10, caratMin: .95, caratMax: .99};

  else if (carat >= 1.25 && carat <= 1.49)
    return {min: 5, max: 10, caratMin: 1.25, caratMax: 1.49};

  else if (carat >= 1.7 && carat <= 1.99)
    return {min: 7, max: 12, caratMin: 1.7, caratMax: 1.99};

  else if (carat >= 2.5 && carat <= 2.99)
    return {min: 5, max: 10, caratMin: 2.5, caratMax: 2.99};

  else if (carat >= 3.5 && carat <= 3.99)
    return {min: 5, max: 10, caratMin: 3.5, caratMax: 3.99};

  else if (carat >= 4.5 && carat <= 4.99)
    return {min: 5, max: 10, caratMin: 4.5, caratMax: 4.99};

  return null;
}


var Cost = React.createClass({
  render: function() {
    var totalCost = this.props.multiplier * 100 * this.props.carat,
        number = totalCost.toString(), 
        dollars = number.split('.')[0], 
        //cents = (number.split('.')[1] || '') +'00';
        formattedTotal = dollars.split('').reverse().join('')
            .replace(/(\d{3}(?!$))/g, '$1,')
            .split('').reverse().join('');

    return (
      <div className="value">
        {formattedTotal}
      </div>
    )
  }
});

var Premium = React.createClass({
  render: function() {
    var oversizePremiums = getOversizePremium(this.props.carat);

    if (oversizePremiums !== null) {
      premiumMin = (this.props.multiplier * (100 + oversizePremiums.min) * this.props.carat).toFixed(2),
      premiumMax = (this.props.multiplier * (100 + oversizePremiums.max) * this.props.carat).toFixed(2),
      premiumMessage = "Oversize: price can range from " + premiumMin + " to " + premiumMax;
    }

    // conditionally display the premium message
    return (
      <div className="oversizePremiums">
        {oversizePremiums !== null && premiumMessage}
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


// Primarily for Carat
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
    value = (typeof value === "undefined") ? (+this.refs.value.getDOMNode().value.trim()).toFixed(2) : (+value).toFixed(2);
    value = +value;

    // TODO: validate change
    if (value > this.props.max)
      value = this.props.max;
    else if (value < this.props.min)
      value = this.props.min;

    // propagate the value change up to the owner so total price can be recalculated
    this.props.onCharacteristicChange(this.props.name, value);
  },

// <input type="text" name={this.props.name} ref="value"
//   min={this.props.min}
//   max={this.props.max}
//   value={this.props.val}
//   step={this.props.interval}
//   onChange={this.handleChange} />

  render: function() {
    var _val = this.props.val,
        _interval = this.props.interval,
        _name = this.props.name,
        displayValue = this.props.val,
        incrDisabled = _val + _interval > this.props.max,
        decrDisabled = _val - _interval < this.props.min,
        oversizePremium = getOversizePremium(this.props.val),
        description = '';

        if (oversizePremium !== null) {
          description = "Diamonds weighing between " + oversizePremium.caratMin + " and " + oversizePremium.caratMax + " may trade at a premium";
        }

    return (
      <div>
        <div className={_name + '-container'}>
          <label>{_name}</label>
          <Iterate label="Decrement" onClick={this.decrement} disabled={decrDisabled} />
          <div className="value">{displayValue}</div>
          <Iterate label="Increment" onClick={this.increment} disabled={incrDisabled} />
        </div>
        <p className="description">{description}</p>
      </div>
    );
  }
});

var Characteristic = React.createClass({
  // when no arg passed, simply bubble the value up to the owner
  // if a value is passed, set the value then bubble up.
  increment: function(){
    this.props.onCharacteristicChange(this.props.name, this.props.val + this.props.interval);
    return false;
  },
  decrement: function(){
    this.props.onCharacteristicChange(this.props.name, this.props.val - this.props.interval);
    return false;
  },
  render: function() {
    var _val = this.props.val,
        _interval = this.props.interval,
        _name = this.props.name,
        displayValue = CONSTANTS[this.props.name.toUpperCase()][this.props.val],
        incrDisabled = _val + _interval > this.props.max,
        decrDisabled = _val - _interval < this.props.min;
        description = DESCRIPTIONS[this.props.name][displayValue];

    // NOTE! Here, the labels are "inverted" in that the decrement actually performs increment
    return (
      <div>
        <div className={_name + '-container'}>
          <label>{_name}</label>
          <Iterate label="Decrement" onClick={this.increment} disabled={incrDisabled} />
          <div className="value">{displayValue}</div>
          <div className={_name + '-diagram ' + _name + '-diagram-' + displayValue} />
          <Iterate label="Increment" onClick={this.decrement} disabled={decrDisabled} />
        </div>
        <p className="description">{description}</p>
      </div>
    );
  }
});

var DiamondForm = React.createClass({
  _calculateMultiplier: function() {
    var multiplier,
        ptIndex = getPriceTableIndex(this.state.carat),
        actualColor = CONSTANTS.COLOR[this.state.color];

    return PRICE_TABLE[ptIndex][actualColor][this.state.clarity];
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
      carat: 1.24,
      color: 1,
      clarity: 1
    };
  },
  componentWillMount: function() {
  },
  render: function() {
    var multiplier = this._calculateMultiplier();

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
          <Cost multiplier={multiplier} carat={this.state.carat} />
        </div>
        <Premium multiplier={multiplier} carat={this.state.carat}/>
      </form>
    );
  }
});

React.renderComponent(
  <DiamondForm />,
  document.getElementById('content')
);