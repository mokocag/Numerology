const assert = require('assert/strict');
const test = require('node:test');

const {
  sanitizeLetters,
  calculatePythagoreanTotal,
  calculateChaldeanTotal
} = require('../src/numerology/calculations');

test('sanitizeLetters removes accents and non-letter characters', () => {
  assert.equal(sanitizeLetters('Élodie Noël'), 'ELODIENOEL');
  assert.equal(sanitizeLetters("François D'Amour"), 'FRANCOISDAMOUR');
  assert.equal(sanitizeLetters('Łukasz Żółć'), 'LUKASZZOLC');
  assert.equal(sanitizeLetters('Señorita'), 'SENORITA');
});

test('pythagorean totals account for accented characters', () => {
  const fixtures = [
    { value: 'Élodie Noël', total: 51 },
    { value: "François D'Amour", total: 67 },
    { value: 'Łukasz Żółć', total: 38 },
    { value: 'Señorita', total: 38 }
  ];

  for (const fixture of fixtures) {
    assert.equal(
      calculatePythagoreanTotal(fixture.value),
      fixture.total,
      `Expected ${fixture.value} to total ${fixture.total} in Pythagorean system`
    );
  }
});

test('chaldean totals account for accented characters', () => {
  const fixtures = [
    { value: 'Élodie Noël', total: 45 },
    { value: "François D'Amour", total: 54 },
    { value: 'Łukasz Żółć', total: 42 },
    { value: 'Señorita', total: 28 }
  ];

  for (const fixture of fixtures) {
    assert.equal(
      calculateChaldeanTotal(fixture.value),
      fixture.total,
      `Expected ${fixture.value} to total ${fixture.total} in Chaldean system`
    );
  }
});
