const PYTHAGOREAN_TABLE = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  E: 5,
  F: 6,
  G: 7,
  H: 8,
  I: 9,
  J: 1,
  K: 2,
  L: 3,
  M: 4,
  N: 5,
  O: 6,
  P: 7,
  Q: 8,
  R: 9,
  S: 1,
  T: 2,
  U: 3,
  V: 4,
  W: 5,
  X: 6,
  Y: 7,
  Z: 8
};

const CHALDEAN_TABLE = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  E: 5,
  F: 8,
  G: 3,
  H: 5,
  I: 1,
  J: 1,
  K: 2,
  L: 3,
  M: 4,
  N: 5,
  O: 7,
  P: 8,
  Q: 1,
  R: 2,
  S: 3,
  T: 4,
  U: 6,
  V: 6,
  W: 6,
  X: 5,
  Y: 1,
  Z: 7
};

const ASCII_FALLBACKS = {
  Æ: "AE",
  æ: "ae",
  Ă: "A",
  ă: "a",
  Ą: "A",
  ą: "a",
  Ç: "C",
  ç: "c",
  Đ: "D",
  đ: "d",
  Ğ: "G",
  ğ: "g",
  Ł: "L",
  ł: "l",
  Ń: "N",
  ń: "n",
  Ő: "O",
  ő: "o",
  Œ: "OE",
  œ: "oe",
  Ø: "O",
  ø: "o",
  Ś: "S",
  ś: "s",
  Ş: "S",
  ş: "s",
  Ť: "T",
  ť: "t",
  Ź: "Z",
  ź: "z",
  Ż: "Z",
  ż: "z",
  Þ: "TH",
  þ: "th",
  Ð: "D",
  ð: "d",
  ß: "ss"
};

function sanitizeLetters(value) {
  if (!value) {
    return "";
  }

  const stripped = value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\x00-\x7F]/g, (char) => ASCII_FALLBACKS[char] ?? "");

  return stripped.toUpperCase().replace(/[^A-Z]/g, "");
}

function calculateTotal(value, table) {
  const letters = sanitizeLetters(value);

  let total = 0;
  for (const letter of letters) {
    const mapped = table[letter];
    if (mapped) {
      total += mapped;
    }
  }

  return total;
}

function calculatePythagoreanTotal(value) {
  return calculateTotal(value, PYTHAGOREAN_TABLE);
}

function calculateChaldeanTotal(value) {
  return calculateTotal(value, CHALDEAN_TABLE);
}

module.exports = {
  sanitizeLetters,
  calculatePythagoreanTotal,
  calculateChaldeanTotal
};
