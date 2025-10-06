const SYSTEMS = {
  pythagorean: {
    name: 'Pythagorean',
    values: {
      A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
      J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
      S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8
    }
  },
  chaldean: {
    name: 'Chaldean',
    values: {
      A: 1, B: 2, C: 3, D: 4, E: 5, F: 8, G: 3, H: 5, I: 1,
      J: 1, K: 2, L: 3, M: 4, N: 5, O: 7, P: 8, Q: 1, R: 2,
      S: 3, T: 4, U: 6, V: 6, W: 6, X: 5, Y: 1, Z: 7
    }
  }
};

const MASTER_NUMBERS = new Set([11, 22, 33]);

function sanitizeLetters(input) {
  return (input || '').toUpperCase().replace(/[^A-Z]/g, '');
}

function sumDigits(value) {
  return value
    .toString()
    .split('')
    .reduce((sum, digit) => sum + Number(digit), 0);
}

function reduceNumber(value) {
  let current = typeof value === 'number' ? Math.abs(value) : Number(String(value).replace(/\D/g, ''));

  while (current > 9 && !MASTER_NUMBERS.has(current)) {
    current = sumDigits(current);
  }

  return current;
}

function letterValue(letter, system) {
  const map = SYSTEMS[system]?.values ?? SYSTEMS.pythagorean.values;
  return map[letter] ?? 0;
}

function calculateNameNumber(name, system, filterFn = () => true) {
  const letters = sanitizeLetters(name).split('').filter(filterFn);
  const total = letters.reduce((sum, letter) => sum + letterValue(letter, system), 0);
  return reduceNumber(total);
}

function isVowel(letter, word) {
  if ('AEIOU'.includes(letter)) {
    return true;
  }
  if (letter !== 'Y') {
    return false;
  }
  const hasStandardVowel = word.split('').some((char) => 'AEIOU'.includes(char));
  return !hasStandardVowel;
}

function calculateLifePath(date) {
  if (!date) return null;
  const digits = date.getFullYear().toString() + (date.getMonth() + 1).toString().padStart(2, '0') + date.getDate().toString().padStart(2, '0');
  return reduceNumber(Number(digits));
}

function calculateBirthDay(date) {
  if (!date) return null;
  return reduceNumber(date.getDate());
}

function calculateExpression(name, system) {
  return calculateNameNumber(name, system);
}

function calculateHeartsDesire(name, system) {
  const words = (sanitizeLetters(name) ? name.toUpperCase().split(/[^A-Z]+/) : []);
  const vowels = [];
  words.forEach((word) => {
    const cleaned = sanitizeLetters(word);
    cleaned.split('').forEach((letter) => {
      if (isVowel(letter, cleaned)) {
        vowels.push(letter);
      }
    });
  });
  const total = vowels.reduce((sum, letter) => sum + letterValue(letter, system), 0);
  return reduceNumber(total);
}

function calculatePersonality(name, system) {
  const words = (sanitizeLetters(name) ? name.toUpperCase().split(/[^A-Z]+/) : []);
  const consonants = [];
  words.forEach((word) => {
    const cleaned = sanitizeLetters(word);
    cleaned.split('').forEach((letter) => {
      if (!isVowel(letter, cleaned)) {
        consonants.push(letter);
      }
    });
  });
  const total = consonants.reduce((sum, letter) => sum + letterValue(letter, system), 0);
  return reduceNumber(total);
}

function calculateUniversalYear(targetDate) {
  if (!targetDate) return null;
  return reduceNumber(targetDate.getFullYear());
}

function calculateUniversalMonth(targetDate) {
  if (!targetDate) return null;
  const universalYear = calculateUniversalYear(targetDate);
  return reduceNumber(universalYear + (targetDate.getMonth() + 1));
}

function calculatePersonalYear(birthDate, targetDate) {
  if (!birthDate || !targetDate) return null;
  const birthMonth = birthDate.getMonth() + 1;
  const birthDay = birthDate.getDate();
  const universalYear = calculateUniversalYear(targetDate);
  return reduceNumber(birthMonth + birthDay + universalYear);
}

function calculatePersonalMonth(birthDate, targetDate) {
  if (!birthDate || !targetDate) return null;
  const personalYear = calculatePersonalYear(birthDate, targetDate);
  return reduceNumber(personalYear + (targetDate.getMonth() + 1));
}

function calculateLifePathOfDay(birthDate, targetDate) {
  if (!birthDate || !targetDate) return null;
  const personalMonth = calculatePersonalMonth(birthDate, targetDate);
  return reduceNumber(personalMonth + targetDate.getDate());
}

function calculateSelectedDateLabel(date) {
  if (!date) return '—';
  const formatter = new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  });
  return formatter.format(date);
}

export {
  SYSTEMS,
  reduceNumber,
  calculateLifePath,
  calculateBirthDay,
  calculateExpression,
  calculateHeartsDesire,
  calculatePersonality,
  calculateUniversalYear,
  calculateUniversalMonth,
  calculatePersonalYear,
  calculatePersonalMonth,
  calculateLifePathOfDay,
  calculateSelectedDateLabel
};
