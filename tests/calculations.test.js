const test = require('node:test');
const assert = require('node:assert/strict');

const {
  isVowel,
  calculateHeartsDesire,
  calculatePersonality,
} = require('../src/numerology/calculations');

test('isVowel expands Y guidance', () => {
  const mary = 'Mary';
  assert.equal(isVowel(mary[3], 3, mary), true, 'Y at the end of Mary should be vowel');

  const bryan = 'Bryan';
  assert.equal(isVowel(bryan[2], 2, bryan), true, 'Y between consonant and vowel should count as vowel');

  const gwyneth = 'Gwyneth';
  assert.equal(isVowel(gwyneth[2], 2, gwyneth), true, 'Y between consonants should count as vowel');

  const maya = 'Maya';
  assert.equal(isVowel(maya[2], 2, maya), true, 'Y forming diphthong should be vowel');

  const yvonne = 'Yvonne';
  assert.equal(isVowel(yvonne[0], 0, yvonne), false, 'Leading Y before vowel acts as consonant');
});

test('isVowel allows W to ally with vowels', () => {
  const owen = 'Owen';
  assert.equal(isVowel(owen[1], 1, owen), true, 'W in Owen partners with preceding vowel');

  const william = 'William';
  assert.equal(isVowel(william[0], 0, william), false, 'Leading W before vowel remains consonant');

  const howard = 'Howard';
  assert.equal(isVowel(howard[2], 2, howard), true, 'W in Howard works with the O vowel');
});

test('calculateHeartsDesire honours nuanced vowel rules', () => {
  const cases = [
    ['Mary', 8],
    ['Bryan', 8],
    ['Gwyneth', 3],
    ['Lynne', 3],
    ['Owen', 7],
  ];

  for (const [name, expected] of cases) {
    assert.equal(
      calculateHeartsDesire(name),
      expected,
      `Expected hearts desire for ${name} to be ${expected}`,
    );
  }
});

test('calculatePersonality remains in sync with vowel logic', () => {
  const cases = [
    ['Mary', 4],
    ['Bryan', 7],
    ['Gwyneth', 9],
    ['Lynne', 4],
    ['Owen', 5],
  ];

  for (const [name, expected] of cases) {
    assert.equal(
      calculatePersonality(name),
      expected,
      `Expected personality for ${name} to be ${expected}`,
    );
  }
});
