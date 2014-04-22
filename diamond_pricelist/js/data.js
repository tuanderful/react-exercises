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