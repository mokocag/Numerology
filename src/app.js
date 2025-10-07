import {
  calculateBirthDay,
  calculateExpression,
  calculateHeartsDesire,
  calculateLifePath,
  calculateLifePathOfDay,
  calculatePersonalMonth,
  calculatePersonalYear,
  calculatePersonality,
  calculateSelectedDateLabel,
  calculateUniversalMonth,
  calculateUniversalYear
} from './numerology/calculations.js';

const elements = {
  fullName: document.getElementById('fullName'),
  birthDate: document.getElementById('birthDate'),
  systemToggle: document.getElementById('systemToggle'),
  selectedDate: document.getElementById('selectedDate'),
  lifePath: document.getElementById('lifePath'),
  birthDay: document.getElementById('birthDay'),
  expression: document.getElementById('expression'),
  heartsDesire: document.getElementById('heartsDesire'),
  personality: document.getElementById('personality'),
  universalYear: document.getElementById('universalYear'),
  universalMonth: document.getElementById('universalMonth'),
  personalYear: document.getElementById('personalYear'),
  personalMonth: document.getElementById('personalMonth'),
  lifePathOfDay: document.getElementById('lifePathOfDay'),
  selectedDateDisplay: document.getElementById('selectedDateDisplay')
};

function formatDateInput(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function parseDate(value) {
  if (!value) return null;

  const parts = value.split('-');
  if (parts.length !== 3) return null;

  const [yearStr, monthStr, dayStr] = parts;
  const year = Number(yearStr);
  const month = Number(monthStr);
  const day = Number(dayStr);

  if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) {
    return null;
  }

  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
}

function displayValue(node, value) {
  node.textContent = value ?? '—';
}

function updateCalculations() {
  const system = elements.systemToggle.value;
  const nameRaw = elements.fullName.value || '';
  const hasNameLetters = /[a-zA-Z]/.test(nameRaw);
  const birthDate = parseDate(elements.birthDate.value);
  const selectedDate = parseDate(elements.selectedDate.value);

  const lifePath = birthDate ? calculateLifePath(birthDate) : null;
  const birthDay = birthDate ? calculateBirthDay(birthDate) : null;
  const expression = hasNameLetters ? calculateExpression(nameRaw, system) : null;
  const heartsDesire = hasNameLetters ? calculateHeartsDesire(nameRaw, system) : null;
  const personality = hasNameLetters ? calculatePersonality(nameRaw, system) : null;

  const universalYear = selectedDate ? calculateUniversalYear(selectedDate) : null;
  const universalMonth = selectedDate ? calculateUniversalMonth(selectedDate) : null;
  const personalYear = birthDate && selectedDate ? calculatePersonalYear(birthDate, selectedDate) : null;
  const personalMonth = birthDate && selectedDate ? calculatePersonalMonth(birthDate, selectedDate) : null;
  const lifePathOfDay = birthDate && selectedDate ? calculateLifePathOfDay(birthDate, selectedDate) : null;

  displayValue(elements.lifePath, lifePath);
  displayValue(elements.birthDay, birthDay);
  displayValue(elements.expression, expression);
  displayValue(elements.heartsDesire, heartsDesire);
  displayValue(elements.personality, personality);

  displayValue(elements.universalYear, universalYear);
  displayValue(elements.universalMonth, universalMonth);
  displayValue(elements.personalYear, personalYear);
  displayValue(elements.personalMonth, personalMonth);
  displayValue(elements.lifePathOfDay, lifePathOfDay);
  displayValue(elements.selectedDateDisplay, calculateSelectedDateLabel(selectedDate));
}

function init() {
  const today = new Date();
  elements.selectedDate.value = formatDateInput(today);
  if (!elements.birthDate.value) {
    elements.birthDate.value = formatDateInput(today);
  }

  updateCalculations();

  elements.fullName.addEventListener('input', updateCalculations);
  elements.birthDate.addEventListener('change', updateCalculations);
  elements.systemToggle.addEventListener('change', updateCalculations);
  elements.selectedDate.addEventListener('change', updateCalculations);
}

init();
