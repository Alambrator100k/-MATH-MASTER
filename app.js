/* ============================================================
   ALAMBRATOR Math Academy v5 — app.js
   ============================================================ */

/* ---------- State ---------- */
const DEFAULT_STATE = {
  lastPage:'home',
  lastTopic:'',
  lastStep:0,
  theme:'dark',
  font:'Cairo',
  notes:'',
  completed:[],
  quizCount:0,
  quizErrors:[],
  lastScore:'',
  lastActivity:''
};
let state = Object.assign({}, DEFAULT_STATE, JSON.parse(localStorage.getItem('mathMasterState')||'{}'));

function save(){
  state.lastActivity = new Date().toISOString();
  localStorage.setItem('mathMasterState', JSON.stringify(state));
  updateStats();
}

/* ---------- Shortcuts ---------- */
const $ = id => document.getElementById(id);
const typeset = el => {
  if(window.MathJax?.typesetPromise){
    MathJax.typesetPromise([el||document.body]).catch(()=>{});
  }
};
function toast(msg){
  const t = $('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(()=>t.classList.remove('show'), 2200);
}

/* ============================================================
   HISTORY API — زر الرجوع في الهاتف يعمل داخل الموقع
   ============================================================ */
const PAGE_TITLES = {
  home:'الرئيسية', lessons:'خريطة المنهج', study:'غرفة المذاكرة',
  practice:'التدريبات والاختبارات', laws:'مكتبة القوانين',
  calculator:'الآلة الحاسبة', videos:'فيديوهات الشرح',
  notes:'ملاحظاتي', settings:'الإعدادات'
};

let currentPage = 'home';
let isPopping = false;

function showPage(page, pushHistory = true){
  if(!PAGE_TITLES[page]) page = 'home';
  if(page === currentPage && pushHistory) return;

  // switch active section
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  const target = $('page-'+page);
  if(target) target.classList.add('active');

  // nav highlight
  document.querySelectorAll('#nav button').forEach(b=>{
    b.classList.toggle('active', b.dataset.page === page);
  });
  $('crumb').textContent = PAGE_TITLES[page];

  // close mobile sidebar
  $('sidebar').classList.remove('open');

  // persist
  state.lastPage = page;
  save();

  // scroll to top
  window.scrollTo({top:0, behavior:'smooth'});

  // math typeset after DOM update
  typeset(target);

  // history management
  if(pushHistory && !isPopping){
    history.pushState({page}, '', '#'+page);
  }
  currentPage = page;
}

/* Handle back button (hardware/gesture) */
window.addEventListener('popstate', e=>{
  isPopping = true;
  const page = (e.state && e.state.page) || (location.hash ? location.hash.slice(1) : 'home');
  showPage(page, false);
  isPopping = false;
});

/* ============================================================
   THEME + FONT
   ============================================================ */
const THEMES = ['dark','light','midnight','emerald','royal','sunset','rose','ocean'];
const FONTS = ['Cairo','Tajawal','Almarai','Amiri','Lateef','Scheherazade','ReemKufi','ElMessiri','Markazi','NotoKufi','IBMPlex','Readex','system'];

function applyTheme(name){
  THEMES.forEach(t=>document.body.classList.remove('th-'+t));
  document.body.classList.add('th-'+name);
  state.theme = name;
  save();
  const sel = $('themeSelect'); if(sel) sel.value = name;
}
function applyFont(name){
  FONTS.forEach(f=>document.body.classList.remove('f-'+f));
  document.body.classList.add('f-'+name);
  state.font = name;
  save();
  const sel = $('fontSelect'); if(sel) sel.value = name;
}

/* ============================================================
   TOPICS
   ============================================================ */
function topicCard(t){
  const tagCls = t.source === 'received' ? 'ready' : 'wait';
  const tagTxt = t.source === 'received' ? 'من الأوراق المرسلة' : 'مذكور بانتظار ورقته';
  return `<article class="card topic-card">
    <div class="topic-top">
      <div class="card-icon">${t.icon}</div>
      <span class="tag ${tagCls}">${tagTxt}</span>
    </div>
    <div><h3>${t.name}</h3><p dir="ltr" style="text-align:right">${t.en}</p></div>
    <p>${t.desc}</p>
    <div class="muted" style="font-size:10px">${t.sheets}</div>
    <button class="btn" onclick="openTopic('${t.id}')">ابدأ المذاكرة ←</button>
  </article>`;
}

function renderTopics(){
  $('topicCount').textContent = topics.length;
  const q = ($('topicSearch')?.value||'').toLowerCase();
  const f = $('topicFilter')?.value || 'all';
  const filtered = topics.filter(t=>{
    const matchFilter = f === 'all' || (f === 'received' ? t.source === 'received' : t.source === 'mentioned');
    const matchQ = (t.name+' '+t.en+' '+t.desc).toLowerCase().includes(q);
    return matchFilter && matchQ;
  });
  $('allTopics').innerHTML = filtered.length ? filtered.map(topicCard).join('') : '<div class="notice">لا توجد نتائج مطابقة.</div>';
}

$('topicSearch').addEventListener('input', renderTopics);
$('topicFilter').addEventListener('change', renderTopics);

/* ============================================================
   STUDY ROOM
   ============================================================ */
/* ============================================================
   STUDY ROOM — النسخة المطوّرة
   - في نهاية الدرس: زر "اختبار الدرس" + "الانتقال لدرس آخر" + "الخروج"
   - الاختبار اختياري من 10 أسئلة
   ============================================================ */

let currentLessonId = null;
let currentLessonStep = 0;
let lessonQuizRun = [];
let lessonQuizIdx = 0;
let lessonQuizScore = 0;
let lessonQuizLocked = false;
let lessonQuizActive = false;

function openTopic(id){
  const t = topics.find(x=>x.id===id);
  if(!t) return;

  state.lastTopic = id;
  state.lastStep = 0;
  save();

  showPage('study');

  currentLessonId = id;
  $('activeLessonTitle').textContent = t.name;

  const content = lessons[id];
  const tabs = $('lessonTabs');
  const panel = $('lessonContent');

  if(!content || !content.length){
    panel.innerHTML = `<h3>${t.name}</h3><p>${t.desc}</p>
      <div class="notice">هذا الباب مذكور في خطة المنهج، لكن لا توجد له صفحة تفصيلية ضمن الصور المرسلة حتى الآن.</div>`;
    tabs.innerHTML = '';
    typeset(panel);
    return;
  }

  lessonQuizActive = false;

  tabs.innerHTML = lessonTabs.map((x,i)=>
    `<button class="${i===0?'selected':''}" data-tab="${i}">
       <span class="tab-number">0${i+1}</span>${x}
     </button>`
  ).join('');

  function draw(i){
    if(i < 0 || i >= content.length) return;
    currentLessonStep = i;
    state.lastStep = i;
    save();

    const isLast = i === content.length - 1;

    // شريط التحكم
    let controlsHTML = `
      <div class="lesson-controls">
        <button class="btn" ${i===0?'disabled':''} onclick="lessonStep(${i-1})">→ السابق</button>
        <div class="lesson-dots">
          ${content.map((_,j)=>`<button class="${j===i?'on':''}" onclick="lessonStep(${j})" aria-label="الجزء ${j+1}"></button>`).join('')}
        </div>
        ${isLast
          ? `<button class="btn primary" onclick="startLessonQuiz()">✎ اختبار الدرس (اختياري)</button>`
          : `<button class="btn primary" onclick="lessonStep(${i+1})">التالي ←</button>`}
      </div>`;

    // لوحة النهاية تظهر فقط في آخر جزء
    let endPanelHTML = '';
    if(isLast){
      endPanelHTML = `
        <div class="lesson-end-panel">
          <div class="end-icon">🎓</div>
          <h3>وصلت لنهاية الدرس</h3>
          <p class="muted">يمكنك الآن تجربة اختبار سريع من 10 أسئلة (اختياري)، أو الانتقال لدرس آخر، أو الخروج من غرفة المذاكرة.</p>
          <div class="end-actions">
            <button class="btn primary" onclick="startLessonQuiz()">✎ ابدأ اختبار الدرس (10 أسئلة)</button>
            <button class="btn" onclick="showPage('lessons')">▤ درس آخر</button>
            <button class="btn" onclick="exitLesson()">✕ الخروج من الدرس</button>
          </div>
        </div>`;
    }

    panel.innerHTML = `
      <div class="lesson-kicker">
        ALAMBRATOR STUDY PATH
        <span>الجزء ${i+1} من ${content.length}</span>
      </div>
      ${content[i]}
      ${endPanelHTML}
      ${controlsHTML}
    `;

    tabs.querySelectorAll('[data-tab]').forEach(b=>{
      b.classList.toggle('selected', Number(b.dataset.tab) === i);
    });

    typeset(panel);
  }

  window.lessonStep = draw;
  window.currentLessonId = id;

  tabs.querySelectorAll('[data-tab]').forEach(b=>{
    b.addEventListener('click', ()=>draw(Number(b.dataset.tab)));
  });

  draw(0);
}

/* ---------- الخروج من الدرس ---------- */
function exitLesson(){
  currentLessonId = null;
  lessonQuizActive = false;
  $('activeLessonTitle').textContent = 'اختر درسًا للبدء';
  $('lessonTabs').innerHTML = '';
  $('lessonContent').innerHTML = `
    <div class="empty-state">
      <div>
        <div class="big">📚</div>
        <h3>اختر موضوعًا من خريطة المنهج</h3>
        <p>ستظهر هنا المقدمة والقوانين والأمثلة والأخطاء الشائعة والملخص.</p>
        <button class="btn primary" onclick="showPage('lessons')">اختيار موضوع</button>
      </div>
    </div>`;
  toast('تم الخروج من الدرس');
}

/* ============================================================
   اختبار نهاية الدرس — 10 أسئلة اختيارية
   ============================================================ */
function startLessonQuiz(){
  const ids = (typeof lessonQuizzes !== 'undefined' && lessonQuizzes[currentLessonId]) || [];
  if(!ids.length){
    toast('لا يوجد اختبار متاح لهذا الدرس بعد');
    return;
  }
  lessonQuizRun = ids
    .map(i => quizBank[i])
    .filter(Boolean)
    .slice(0, 10);

  if(!lessonQuizRun.length){
    toast('لا يوجد اختبار متاح لهذا الدرس بعد');
    return;
  }

  lessonQuizIdx = 0;
  lessonQuizScore = 0;
  lessonQuizLocked = false;
  lessonQuizActive = true;

  drawLessonQuiz();
}

function drawLessonQuiz(){
  if(!lessonQuizActive) return;
  const q = lessonQuizRun[lessonQuizIdx];
  if(!q) return;

  const panel = $('lessonContent');
  const total = lessonQuizRun.length;

  panel.innerHTML = `
    <div class="lesson-kicker">
      LESSON QUIZ — ${currentLessonId ? topics.find(t=>t.id===currentLessonId)?.name : ''}
      <span>السؤال ${lessonQuizIdx+1} من ${total}</span>
    </div>
    <div class="quiz-progress">
      <div class="quiz-progress-bar" style="width:${((lessonQuizIdx)/total)*100}%"></div>
    </div>
    <h3 style="font-size:17px;line-height:2;margin-top:14px">${q.q}</h3>
    <div id="lessonQuizOptions"></div>
    <div id="lessonQuizFeedback"></div>
    <div class="lesson-controls" style="margin-top:18px">
      <button class="btn" onclick="cancelLessonQuiz()">✕ إلغاء الاختبار</button>
      <button class="btn primary" id="lessonQuizNext" disabled onclick="nextLessonQuiz()">
        ${lessonQuizIdx === total-1 ? 'إنهاء الاختبار' : 'السؤال التالي ←'}
      </button>
    </div>
  `;

  $('lessonQuizOptions').innerHTML = q.o.map((opt,i)=>
    `<button class="quiz-option" onclick="answerLessonQuiz(${i})">${opt}</button>`
  ).join('');

  typeset(panel);
  lessonQuizLocked = false;
}

function answerLessonQuiz(i){
  if(lessonQuizLocked || !lessonQuizActive) return;
  lessonQuizLocked = true;

  const q = lessonQuizRun[lessonQuizIdx];
  const ok = i === q.a;
  const buttons = [...document.querySelectorAll('#lessonQuizOptions button')];

  buttons.forEach((b,j)=>{
    b.disabled = true;
    if(j === q.a) b.classList.add('correct');
    if(j === i && !ok) b.classList.add('wrong');
  });

  if(ok){
    lessonQuizScore++;
  } else {
    state.quizErrors.push({
      question: q.q,
      chosen: q.o[i],
      correct: q.o[q.a],
      explanation: q.e
    });
    save();
  }

  $('lessonQuizFeedback').innerHTML = `
    <div class="feedback ${ok?'good':'bad'}">
      <b>${ok?'إجابة صحيحة ✓':'إجابة غير صحيحة'}</b><br>
      ${q.e}<br>
      الإجابة الصحيحة: ${q.o[q.a]}
    </div>`;

  typeset($('lessonQuizFeedback'));
  $('lessonQuizNext').disabled = false;
}

function nextLessonQuiz(){
  if(!lessonQuizLocked) return;
  if(lessonQuizIdx < lessonQuizRun.length - 1){
    lessonQuizIdx++;
    drawLessonQuiz();
  } else {
    finishLessonQuiz();
  }
}

function finishLessonQuiz(){
  lessonQuizActive = false;

  // تسجيل النتيجة في حالة التطبيق
  state.quizCount++;
  state.lastScore = lessonQuizScore + '/' + lessonQuizRun.length;
  if(!state.completed.includes(currentLessonId)){
    state.completed.push(currentLessonId);
  }
  save();

  const panel = $('lessonContent');
  const pct = Math.round((lessonQuizScore / lessonQuizRun.length) * 100);
  const grade = pct >= 80 ? 'ممتاز 🎉' : pct >= 50 ? 'جيد 👍' : 'يحتاج مراجعة 📖';

  panel.innerHTML = `
    <div class="lesson-end-panel" style="border-color:var(--accent)">
      <div class="end-icon">${pct >= 80 ? '🏆' : pct >= 50 ? '⭐' : '📘'}</div>
      <h3>انتهى اختبار الدرس</h3>
      <p style="font-size:22px;font-weight:900;color:var(--accent);margin:10px 0">
        ${lessonQuizScore} / ${lessonQuizRun.length}
      </p>
      <p class="muted">التقدير: <b style="color:var(--accent)">${grade}</b> — النسبة ${pct}%</p>
      <div class="end-actions" style="margin-top:16px">
        <button class="btn primary" onclick="startLessonQuiz()">↻ إعادة الاختبار</button>
        <button class="btn" onclick="showPage('lessons')">▤ درس آخر</button>
        <button class="btn" onclick="exitLesson()">✕ الخروج من الدرس</button>
      </div>
    </div>`;

  typeset(panel);
  updateStats();
}

function cancelLessonQuiz(){
  if(!lessonQuizActive) return;
  if(!confirm('هل تريد إلغاء الاختبار والعودة لنهاية الدرس؟')) return;
  lessonQuizActive = false;
  // ارجع لآخر جزء من الدرس
  openTopic(currentLessonId);
  // انتقل لآخر جزء
  const content = lessons[currentLessonId];
  if(content && content.length){
    window.lessonStep(content.length - 1);
  }
}
/* ============================================================
   LAWS
   ============================================================ */
function renderLaws(){
  const q = ($('lawSearch')?.value||'').toLowerCase();
  const filtered = laws.filter(x=>x.join(' ').toLowerCase().includes(q));
  $('lawList').innerHTML = filtered.length
    ? filtered.map(x=>`<article class="card">
        <div class="topic-top"><h3>${x[0]}</h3><span class="tag">${x[1]}</span></div>
        <p>${x[2]}</p>
        <div class="formula-box">${x[3]}</div>
        <p><b>متى أستخدمه؟</b> ${x[4]}</p>
      </article>`).join('')
    : '<div class="notice">لا توجد نتائج مطابقة.</div>';
  typeset($('lawList'));
}
$('lawSearch').addEventListener('input', renderLaws);

/* ============================================================
   QUIZ — خيارات MathJax
   ============================================================ */
let quizRun = [], quizIndex = 0, quizScore = 0, quizLocked = false;

function startQuiz(qIds){
  if(Array.isArray(qIds) && qIds.length){
    quizRun = qIds.map(i=>quizBank[i]).filter(Boolean);
  } else {
    quizRun = [...quizBank].sort(()=>Math.random()-.5).slice(0,6);
  }
  quizIndex = 0;
  quizScore = 0;
  quizLocked = false;
  drawQuiz();
}

function drawQuiz(){
  const q = quizRun[quizIndex];
  if(!q){ return; }
  $('quizQuestion').innerHTML = q.q;
  $('quizProgress').textContent = `السؤال ${quizIndex+1} من ${quizRun.length}`;

  $('quizOptions').innerHTML = q.o.map((opt,i)=>
    `<button class="quiz-option" onclick="answerQuiz(${i})">${opt}</button>`
  ).join('');

  $('quizFeedback').innerHTML = '';
  $('quizNext').disabled = true;
  $('quizNext').textContent = quizIndex === quizRun.length-1 ? 'إنهاء الاختبار' : 'السؤال التالي';

  // مهم: نوع المعادلات في السؤال والخيارات
  typeset($('quizQuestion'));
  typeset($('quizOptions'));

  quizLocked = false;
}

function answerQuiz(i){
  if(quizLocked) return;
  quizLocked = true;

  const q = quizRun[quizIndex];
  const ok = i === q.a;
  const buttons = [...document.querySelectorAll('#quizOptions button')];

  buttons.forEach((b,j)=>{
    b.disabled = true;
    if(j === q.a) b.classList.add('correct');
    if(j === i && !ok) b.classList.add('wrong');
  });

  if(ok){
    quizScore++;
  } else {
    state.quizErrors.push({
      question: q.q,
      chosen: q.o[i],
      correct: q.o[q.a],
      explanation: q.e
    });
    save();
  }

  $('quizFeedback').innerHTML = `
    <div class="feedback ${ok?'good':'bad'}">
      <b>${ok?'إجابة صحيحة ✓':'إجابة غير صحيحة'}</b><br>
      ${q.e}<br>
      الإجابة الصحيحة: ${q.o[q.a]}
    </div>`;
  typeset($('quizFeedback'));

  $('quizNext').disabled = false;
}

function nextQuiz(){
  if(!quizLocked) return;
  if(quizIndex < quizRun.length-1){
    quizIndex++;
    drawQuiz();
  } else {
    state.quizCount++;
    state.lastScore = quizScore + '/' + quizRun.length;
    save();
    $('quizQuestion').textContent = `انتهى الاختبار: ${quizScore} من ${quizRun.length}`;
    $('quizOptions').innerHTML = '';
    $('quizFeedback').innerHTML = '<div class="feedback good">راجع الإجابات والتفسيرات، ثم ابدأ اختبارًا جديدًا.</div>';
    $('quizNext').disabled = true;
    $('quizStart').textContent = 'إعادة الاختبار';
    updateQuizStats();
  }
}

function updateQuizStats(){
  $('quizTotal').textContent = state.quizCount;
  $('errorTotal').textContent = state.quizErrors.length;
  $('lastScore').textContent = state.lastScore || '—';

  const errBox = $('errorReview');
  if(state.quizErrors.length){
    errBox.innerHTML = state.quizErrors.slice(-8).reverse().map(x=>`
      <div style="border-bottom:1px solid var(--line);padding:9px 0">
        <b>${x.question}</b>
        <p style="color:var(--red);margin:4px 0">إجابتك: ${x.chosen}</p>
        <p style="color:var(--green);margin:4px 0">الصحيح: ${x.correct}</p>
        <small class="muted">${x.explanation}</small>
      </div>`).join('');
    typeset(errBox);
  } else {
    errBox.textContent = 'لم تسجل أخطاء بعد.';
  }
}

$('quizStart').onclick = ()=>startQuiz();
$('quizNext').onclick = nextQuiz;

/* ============================================================
   STATS
   ============================================================ */
function updateStats(){
  const done = state.completed.length;
  const pct = topics.length ? Math.round(done/topics.length*100) : 0;
  $('doneCount').textContent = done;
  $('quizCount').textContent = state.quizCount;
  $('percentCount').innerHTML = pct + '<span class="unit">%</span>';
  $('topicCount').textContent = topics.length;
  updateQuizStats();
}

/* ============================================================
   NOTES
   ============================================================ */
$('notes').value = state.notes || '';
$('notes').addEventListener('input', ()=>{
  state.notes = $('notes').value;
  save();
  $('noteStatus').textContent = 'تم الحفظ تلقائيًا ✓';
});
$('clearNotes').onclick = ()=>{
  if(confirm('هل تريد مسح كل الملاحظات؟')){
    $('notes').value = '';
    state.notes = '';
    save();
    toast('تم مسح الملاحظات');
  }
};

/* ============================================================
   CALCULATOR — المطوّر
   ============================================================ */
const calcInput = $('calcDisplay');
const calcOut = $('calcResult');

document.querySelectorAll('[data-insert]').forEach(b=>{
  b.addEventListener('click', ()=>{
    const a = calcInput.selectionStart ?? calcInput.value.length;
    const z = calcInput.selectionEnd ?? a;
    const v = b.dataset.insert;
    calcInput.value = calcInput.value.slice(0,a) + v + calcInput.value.slice(z);
    calcInput.focus();
    calcInput.setSelectionRange(a+v.length, a+v.length);
  });
});

$('calcClear').onclick = ()=>{
  calcInput.value = '';
  calcOut.innerHTML = '<span class="muted">تم مسح التعبير.</span>';
};
$('calcBack').onclick = ()=>{
  const a = calcInput.selectionStart ?? calcInput.value.length;
  calcInput.value = calcInput.value.slice(0, Math.max(0,a-1)) + calcInput.value.slice(a);
  calcInput.focus();
};

function fmt(n){
  if(!Number.isFinite(n)) throw new Error('الناتج غير معرف');
  return Number(n.toPrecision(11)).toString();
}

/* Convert plain math input to LaTeX for display */
function toLatex(expr){
  let s = expr
    .replace(/\*/g,'\\cdot ')
    .replace(/\bsin\b/g,'\\sin ')
    .replace(/\bcos\b/g,'\\cos ')
    .replace(/\btan\b/g,'\\tan ')
    .replace(/\bcot\b/g,'\\cot ')
    .replace(/\bsec\b/g,'\\sec ')
    .replace(/\bcsc\b/g,'\\csc ')
    .replace(/\bsinh\b/g,'\\sinh ')
    .replace(/\bcosh\b/g,'\\cosh ')
    .replace(/\btanh\b/g,'\\tanh ')
    .replace(/\basin\b/g,'\\sin^{-1}')
    .replace(/\bacos\b/g,'\\cos^{-1}')
    .replace(/\batan\b/g,'\\tan^{-1}')
    .replace(/\bsqrt\b/g,'\\sqrt')
    .replace(/\bln\b/g,'\\ln ')
    .replace(/\bexp\b/g,'\\exp ')
    .replace(/\bpi\b/g,'\\pi ')
    .replace(/sqrt\(([^)]+)\)/g,'\\sqrt{$1}');
  // convert fractional powers / plain divisions
  return s;
}

function runCalc(){
  if(!window.math){
    calcOut.textContent = 'محرك الحساب لم يحمّل. تحقق من الإنترنت.';
    return;
  }
  const m = math;
  const expr = calcInput.value.trim();
  const mode = $('calcMode').value;
  const a = Number($('calcA').value);
  const b = Number($('calcB').value);

  try{
    if(!expr) throw new Error('اكتب تعبيرًا رياضيًا أولًا');
    let html = '';

    if(mode === 'eval'){
      const val = m.evaluate(expr, {x:a});
      html = `
        <h3>الحساب بالتعويض</h3>
        <p>نعوّض عن x بالقيمة ${fmt(a)} في التعبير.</p>
        <div class="formula-box">\\[ ${toLatex(expr)} \\]</div>
        <p><b>الناتج العددي:</b> ${fmt(val)}</p>`;
    }
    else if(mode === 'derivative' || mode === 'derivative2'){
      const node = m.parse(expr);
      const der1 = m.derivative(node,'x');
      let res = der1;
      let label = 'المشتقة الأولى';
      let notation = "y'";
      if(mode === 'derivative2'){
        res = m.derivative(der1,'x');
        label = 'المشتقة الثانية';
        notation = "y''";
      }
      const simp = m.simplify(res).toString();
      html = `
        <h3>${label} رمزيًا</h3>
        <p>الدالة الأصلية:</p>
        <div class="formula-box">\\[ y = ${toLatex(expr)} \\]</div>
        <p>${label} التي أعادها المحرك:</p>
        <div class="formula-box">\\[ ${notation} = ${toLatex(simp)} \\]</div>
        <p class="muted">نتيجة رمزية مبسطة آليًا؛ راجع مجال الدالة قبل اعتمادها.</p>`;
    }
    else if(mode === 'integral'){
      const f = x => m.evaluate(expr, {x});
      const n = 1000, h = (b-a)/n;
      let sum = f(a) + f(b);
      for(let i=1;i<n;i++) sum += (i%2 ? 4 : 2) * f(a+i*h);
      const val = sum*h/3;
      html = `
        <h3>التكامل المحدد العددي — سمبسون</h3>
        <p>تم تقسيم الفترة إلى 1000 جزء.</p>
        <div class="formula-box">\\[ \\int_{${fmt(a)}}^{${fmt(b)}} ${toLatex(expr)}\\; dx \\]</div>
        <p><b>القيمة التقريبية:</b> ${fmt(val)}</p>`;
    }
    else if(mode === 'limit'){
      const f = x => m.evaluate(expr, {x});
      const h = Math.max(1e-7, Math.abs(a)*1e-7);
      const left = f(a-h), right = f(a+h);
      const ok = Math.abs(left-right) < 1e-4*Math.max(1, Math.abs(left), Math.abs(right));
      html = `
        <h3>تقدير النهاية عدديًا</h3>
        <div class="formula-box">\\[ \\lim_{x \\to ${fmt(a)}} ${toLatex(expr)} \\]</div>
        <p>من اليسار ≈ ${fmt(left)}، ومن اليمين ≈ ${fmt(right)}.</p>
        <p><b>التقدير:</b> ${ok ? fmt((left+right)/2) : 'القيمتان غير متقاربتين؛ قد لا توجد النهاية.'}</p>`;
    }
    else if(mode === 'solve'){
      const f = x => m.evaluate(expr, {x});
      const dfExpr = m.derivative(m.parse(expr),'x').toString();
      const df = x => m.evaluate(dfExpr, {x});
      let x = a, ok = false;
      for(let i=0;i<60;i++){
        const y = f(x), d = df(x);
        if(Math.abs(y) < 1e-10){ ok = true; break; }
        if(!Number.isFinite(d) || Math.abs(d) < 1e-14) break;
        const nx = x - y/d;
        if(!Number.isFinite(nx) || Math.abs(nx) > 1e12) break;
        if(Math.abs(nx-x) < 1e-12){ x = nx; ok = Math.abs(f(x)) < 1e-7; break; }
        x = nx;
      }
      html = `
        <h3>حل عددي للمعادلة</h3>
        <div class="formula-box">\\[ ${toLatex(expr)} = 0 \\]</div>
        <p>طريقة نيوتن، بداية x₀ = ${fmt(a)}.</p>
        ${ok
          ? `<p><b>الجذر التقريبي:</b> x ≈ ${fmt(x)}</p><p>التحقق: f(x) ≈ ${fmt(f(x))}</p>`
          : '<p>لم تتقارب. جرّب قيمة بداية مختلفة.</p>'}
      `;
    }

    calcOut.innerHTML = html;
    typeset(calcOut);
  }
  catch(e){
    calcOut.innerHTML = `<div class="feedback bad">تعذر التنفيذ: ${e.message}. راجع الأقواس واستخدم * للضرب و^ للأس.</div>`;
  }
}
$('calcEqual').onclick = runCalc;
calcInput.addEventListener('keydown', e=>{ if(e.key === 'Enter') runCalc(); });

/* ============================================================
   MOTIVATION
   ============================================================ */
const MOTIVATIONS = [
  'كل مسألة صعبة هي فرصة لفهم أعمق. استمر!',
  'الرياضيات ليست حفظًا، بل فهمٌ ومنطق. أنت تبني عقلك مسألة بعد مسألة.',
  'لا تقارن نفسك بالآخرين، قارن نفسك بنفسك أمس. تقدمك محسوب.',
  'عندما تتعثر في مشتقة، فكّر في القاعدة المناسبة بدلًا من الحفظ الأعمى.',
  'خطوة صغيرة اليوم خير من انتظار دفعة كبيرة غدًا.',
  'الخطأ الذي تفهمه أفضل من الصواب الذي تحفظه.',
  'كل درس تنهيه يقربك من هدفك. لا تستسلم.'
];
function showMotivation(){
  $('motivationText').textContent = MOTIVATIONS[Math.floor(Math.random()*MOTIVATIONS.length)];
  $('motivationModal').hidden = false;
}
function hideMotivation(){ $('motivationModal').hidden = true; }
function nextMotivation(){
  $('motivationText').textContent = MOTIVATIONS[Math.floor(Math.random()*MOTIVATIONS.length)];
}

/* ============================================================
   FULLSCREEN
   ============================================================ */
function toggleFullscreen(){
  if(!document.fullscreenElement){
    document.documentElement.requestFullscreen?.().catch(()=>{});
  } else {
    document.exitFullscreen?.();
  }
}
$('fullscreenBtn')?.addEventListener('click', toggleFullscreen);
$('fullscreenBtn2')?.addEventListener('click', toggleFullscreen);

/* ============================================================
   SETTINGS LISTENERS
   ============================================================ */
$('themeSelect')?.addEventListener('change', e=>applyTheme(e.target.value));
$('fontSelect')?.addEventListener('change', e=>applyFont(e.target.value));
$('quickTheme')?.addEventListener('click', ()=>{
  const idx = THEMES.indexOf(state.theme);
  applyTheme(THEMES[(idx+1) % THEMES.length]);
  toast('الثيم: ' + state.theme);
});

/* ============================================================
   NAV + MENU
   ============================================================ */
document.querySelectorAll('#nav button').forEach(b=>{
  b.addEventListener('click', ()=>showPage(b.dataset.page));
});
$('menuBtn').onclick = ()=> $('sidebar').classList.toggle('open');

/* ============================================================
   INIT
   ============================================================ */
(function init(){
  applyTheme(state.theme || 'dark');
  applyFont(state.font || 'Cairo');

  renderTopics();
  renderLaws();
  updateStats();

  // welcome toast
  setTimeout(()=>toast('مرحبًا بك في ALAMBRATOR Academy v5'), 600);

  // initial page from hash or saved
  const hashPage = location.hash ? location.hash.slice(1) : '';
  const initialPage = PAGE_TITLES[hashPage] ? hashPage : (PAGE_TITLES[state.lastPage] ? state.lastPage : 'home');

  // push base state then show
  history.replaceState({page:initialPage}, '', '#'+initialPage);
  showPage(initialPage, false);
  currentPage = initialPage;

  // typeset everything visible once MathJax is ready
  if(window.MathJax?.startup?.promise){
    MathJax.startup.promise.then(()=>typeset(document.body));
  }

  // Re-open last topic if saved
  if(state.lastTopic && lessons[state.lastTopic]){
    // we don't auto-open to avoid jump; user can navigate
  }
})();
/* ============================================================
   VIDEOS — عرض القائمة + المشغل المدمج
   ============================================================ */
function renderVideos(){
  const list = $('videoList');
  if(!list) return;

  const q = ($('videoSearch')?.value || '').toLowerCase().trim();
  const typeFilter = $('videoFilter')?.value || 'all';

  const filtered = videos.filter(v=>{
    const matchType = typeFilter === 'all' || v.type === typeFilter;
    const matchQ = !q || (v.title + ' ' + v.desc).toLowerCase().includes(q);
    return matchType && matchQ;
  });

  if(!filtered.length){
    list.innerHTML = '<div class="notice">لا توجد فيديوهات مطابقة. جرّب كلمة بحث أخرى.</div>';
    return;
  }

  list.innerHTML = filtered.map(v=>{
    const hasId = !!v.ytId;
    const thumb = hasId
      ? `https://img.youtube.com/vi/${v.ytId}/hqdefault.jpg`
      : `https://img.youtube.com/vi/default/hqdefault.jpg`;
    const ytWatch = hasId
      ? `https://www.youtube.com/watch?v=${v.ytId}`
      : `https://www.youtube.com/playlist?list=${playlistId}`;

    return `
      <article class="video-card">
        <div class="video-thumb" ${hasId ? `onclick="openVideoPlayer('${v.ytId}','${escapeAttr(v.title)}')"` : ''}>
          <img src="${thumb}" alt="${escapeAttr(v.title)}" loading="lazy"
               onerror="this.style.display='none'">
          <div class="play-overlay">
            <div class="play-btn">▶</div>
          </div>
          <span class="video-index">#${v.id}</span>
        </div>
        <div class="video-body">
          <span class="video-type">${videoTypeLabels[v.type] || v.type}</span>
          <h3>${v.title}</h3>
          <p>${v.desc}</p>
          <div class="video-actions">
            ${hasId
              ? `<button class="btn primary" onclick="openVideoPlayer('${v.ytId}','${escapeAttr(v.title)}')">▶ مشاهدة</button>
                 <a class="btn" href="${ytWatch}" target="_blank" rel="noopener">YouTube ↗</a>`
              : `<a class="btn primary" href="${ytWatch}" target="_blank" rel="noopener">فتح القائمة ↗</a>`}
          </div>
        </div>
      </article>`;
  }).join('');
}

function escapeAttr(s){
  return String(s).replace(/'/g,'&#39;').replace(/"/g,'&quot;');
}

function openVideoPlayer(ytId, title){
  if(!ytId) return;
  $('videoPlayerTitle').textContent = title || 'مشاهدة الفيديو';
  $('videoPlayerFrame').src = `https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0`;
  $('videoPlayerYTLink').href = `https://www.youtube.com/watch?v=${ytId}`;
  $('videoPlayerModal').hidden = false;
  document.body.style.overflow = 'hidden';
}

function closeVideoPlayer(){
  $('videoPlayerModal').hidden = true;
  $('videoPlayerFrame').src = '';
  document.body.style.overflow = '';
}

/* ربط أحداث الفلترة والبحث */
document.addEventListener('DOMContentLoaded', ()=>{
  const s = $('videoSearch');
  const f = $('videoFilter');
  if(s) s.addEventListener('input', renderVideos);
  if(f) f.addEventListener('change', renderVideos);
});

/* استدعِ renderVideos مع showPage عند فتح قسم الفيديوهات */
const _origShowPage = window.showPage;
window.showPage = function(page, push){
  _origShowPage(page, push);
  if(page === 'videos') renderVideos();
};

/* تهيئة أول مرة */
if(document.readyState !== 'loading') renderVideos();
else document.addEventListener('DOMContentLoaded', renderVideos);
