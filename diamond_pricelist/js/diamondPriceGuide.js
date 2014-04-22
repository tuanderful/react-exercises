/** @jsx React.DOM */

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