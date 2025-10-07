const ALPHA_REGEX = /[A-Z]/;
const STANDARD_VOWELS = new Set(['A', 'E', 'I', 'O', 'U']);
const MASTER_NUMBERS = new Set([11, 22, 33]);
const DIPHTHONG_WITH_Y = new Set(['AY', 'EY', 'IY', 'OY', 'UY']);
const VOWEL_WITH_W = new Set(['AW', 'EW', 'IW', 'OW', 'UW']);

function isLetter(char) {
  return typeof char === 'string' && char.length === 1 && ALPHA_REGEX.test(char);
}

function findPreviousLetter(source, index) {
  for (let i = index - 1; i >= 0; i -= 1) {
    const candidate = source[i]?.toUpperCase();
    if (isLetter(candidate)) {
      return candidate;
    }
  }
  return null;
}

function findNextLetter(source, index) {
  for (let i = index + 1; i < source.length; i += 1) {
    const candidate = source[i]?.toUpperCase();
    if (isLetter(candidate)) {
      return candidate;
    }
  }
  return null;
}

function letterToNumber(letter) {
  const value = letter.toUpperCase().charCodeAt(0) - 64;
  return ((value - 1) % 9) + 1;
}

function reduceNumber(number) {
  let total = number;
  while (total > 9 && !MASTER_NUMBERS.has(total)) {
    total = total
      .toString()
      .split('')
      .reduce((acc, digit) => acc + Number(digit), 0);
  }
  return total;
}

function isVowel(letter, index = 0, source = letter ?? '') {
  if (!letter) {
    return false;
  }

  const upper = letter.toUpperCase();

  if (!isLetter(upper)) {
    return false;
  }

  if (STANDARD_VOWELS.has(upper)) {
    return true;
  }

  const previous = findPreviousLetter(source, index);
  const next = findNextLetter(source, index);
  const prevIsVowel = previous ? STANDARD_VOWELS.has(previous) : false;
  const nextIsVowel = next ? STANDARD_VOWELS.has(next) : false;
  const prevIsConsonant = previous ? !STANDARD_VOWELS.has(previous) : false;
  const nextIsConsonant = next ? !STANDARD_VOWELS.has(next) : false;

  if (upper === 'Y') {
    if (!previous) {
      return !next;
    }

    if (!next) {
      return true;
    }

    if (prevIsVowel) {
      const pair = `${previous}${upper}`;
      if (DIPHTHONG_WITH_Y.has(pair)) {
        return true;
      }
      if (nextIsVowel) {
        return false;
      }
    }

    if (prevIsConsonant && nextIsConsonant) {
      return true;
    }

    if (prevIsConsonant && nextIsVowel) {
      return true;
    }

    if (prevIsVowel && nextIsConsonant) {
      const pair = `${previous}${upper}`;
      if (DIPHTHONG_WITH_Y.has(pair)) {
        return true;
      }
    }

    return false;
  }

  if (upper === 'W') {
    if (!previous) {
      return false;
    }

    if (prevIsVowel) {
      const pair = `${previous}${upper}`;
      if (VOWEL_WITH_W.has(pair)) {
        return true;
      }
    }

    return false;
  }

  return false;
}

function sanitizeName(name) {
  return String(name ?? '').replace(/[^A-Za-z]/g, '');
}

function accumulateByPredicate(name, predicate) {
  const source = name.toUpperCase();
  let total = 0;

  for (let i = 0; i < source.length; i += 1) {
    const char = source[i];

    if (!isLetter(char)) {
      continue;
    }

    if (predicate(char, i, source)) {
      total += letterToNumber(char);
    }
  }

  return total;
}

function calculateHeartsDesire(name) {
  const cleaned = sanitizeName(name ?? '');
  if (!cleaned) {
    return 0;
  }

  const total = accumulateByPredicate(cleaned, (char, index, source) =>
    isVowel(char, index, source),
  );
  return reduceNumber(total);
}

function calculatePersonality(name) {
  const cleaned = sanitizeName(name ?? '');
  if (!cleaned) {
    return 0;
  }

  const total = accumulateByPredicate(cleaned, (char, index, source) =>
    !isVowel(char, index, source),
  );
  return reduceNumber(total);
}

module.exports = {
  isVowel,
  calculateHeartsDesire,
  calculatePersonality,
};
