const form = document.getElementById('mathForm');
const topicSelect = document.getElementById('topicSelect');
const equation = document.getElementById('equation');
const steps = document.getElementById('steps');
const result = document.getElementById('result');
const exampleBtn = document.getElementById('exampleBtn');

const examples = {
  quadratic: {
    equation: 'x^2 - 5x + 6 = 0',
    solution: [
      'a = 1, b = −5, c = 6.',
      'Дискриминант: D = b² − 4ac = 25 − 24 = 1.',
      'Түбірлері: x = (5 ± √1) / 2.',
      'Жауабы: x₁ = 3, x₂ = 2.'
    ],
    check: ['x^2-5x+6=0','x²−5x+6=0','x^2 - 5x + 6 = 0']
  },
  trig: {
    equation: 'sin(x) = 1/2, 0° ≤ x < 360°',
    solution: [
      'sin x = 1/2 болатын негізгі бұрыш — 30°.',
      'Синус оң болатын I және II ширектерді аламыз.',
      'Сондықтан x = 30° немесе x = 150°.',
      'Жауабы: 30°, 150°.'
    ],
    check: ['sin(x)=1/2','sinx=1/2','sin x = 1/2, 0° ≤ x < 360°']
  },
  exponential: {
    equation: '2^x = 8',
    solution: [
      '8 санын негізі 2 болатын дәреже түрінде жазамыз: 8 = 2³.',
      'Сонда 2ˣ = 2³.',
      'Негіздер бірдей болғандықтан, x = 3.',
      'Жауабы: x = 3.'
    ],
    check: ['2^x=8','2ˣ=8']
  },
  logarithm: {
    equation: 'log₂(x) = 3',
    solution: [
      'Анықтама бойынша log₂(x) = 3 ⇔ x = 2³.',
      '2³ = 8.',
      'Анықталу шарты: x > 0; x = 8 шартты қанағаттандырады.',
      'Жауабы: x = 8.'
    ],
    check: ['log_2(x)=3','log₂(x)=3','log2(x)=3','log₂ x = 3']
  },
  derivative: {
    equation: 'f(x) = x^2 + 3x',
    solution: [
      'Дәреже ережесі: (xⁿ)′ = nxⁿ⁻¹.',
      '(x²)′ = 2x, ал (3x)′ = 3.',
      'Жауабы: f′(x) = 2x + 3.'
    ],
    check: ['f(x)=x^2+3x','f(x) = x^2 + 3x','x^2+3x']
  },
  linear: {
    equation: '3x - 7 = 11',
    solution: [
      'Екі жағына да 7 қосамыз: 3x = 18.',
      'Екі жағын 3-ке бөлеміз: x = 6.',
      'Тексеру: 3 · 6 − 7 = 11.',
      'Жауабы: x = 6.'
    ],
    check: ['3x-7=11','3x - 7 = 11']
  }
};

function loadExample() {
  const sample = examples[topicSelect.value];
  equation.value = sample.equation;
  steps.value = '';
  result.innerHTML = '<div class="empty-state"><span>∑</span><p>Мысал жүктелді.<br>«Шығару» батырмасын бас.</p></div>';
}

topicSelect.addEventListener('change', loadExample);
exampleBtn.addEventListener('click', loadExample);

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const sample = examples[topicSelect.value];
  const normalize = value => value.toLowerCase().replace(/\s/g, '').replace(/[−–]/g, '-');
  const entered = normalize(equation.value);
  const expected = sample.check.map(normalize);
  if (!expected.includes(entered)) {
    result.innerHTML = '<div class="result-banner warn"><b>Бұл есеп дайын үлгілердің ішінде жоқ.</b><br>Қазір осы тақырыптағы көрсетілген мысалды таңда. Кез келген есепті шығару үшін кейін ЖИ API қосамыз.</div>';
    return;
  }

  const ownWork = steps.value.trim();
  const note = ownWork
    ? '<div class="result-banner">Шешу жолың енгізілді. Бұл демонстрациялық нұсқа қадамдарды толық автоматты салыстырмайды; төмендегі шешімді өз жұмысыңмен салыстыр.</div>'
    : '';
  result.innerHTML = note + '<div class="result-banner">Есептің үлгілік шешімі дайын.</div>' +
    sample.solution.map((line, index) =>
      `<div class="check-row"><span class="check-mark">${index + 1}</span><div>${line}</div></div>`
    ).join('');
});
