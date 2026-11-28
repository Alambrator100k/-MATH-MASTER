/* ============================================================
   ALAMBRATOR Math Academy v5 — data.js
   كل الرموز الرياضية بصيغة MathJax: \(...\) للسطري، \[...\] للمستقل
   ============================================================ */

const topics = [
  {id:'basic',name:'قواعد الاشتقاق الأساسية',en:'Differentiation – Basic Rules',icon:'∂',source:'received',desc:'الثابت والقوة والجمع والطرح والجذور والأسس الكسرية والسالبة.',sheets:'Sheet (1)'},
  {id:'trig',name:'الدوال المثلثية',en:'Trigonometric Functions',icon:'∿',source:'received',desc:'مشتقات sin وcos وtan وcot وsec وcosec وتطبيقاتها.',sheets:'Sheet (2)'},
  {id:'inverse',name:'الدوال المثلثية العكسية',en:'Inverse Trigonometric Functions',icon:'↶',source:'received',desc:'مشتقات الدوال العكسية الست وقواعد المقامات والإشارات.',sheets:'Sheet (3)'},
  {id:'chain',name:'قاعدة السلسلة والاشتقاق المركب',en:'Chain Rule',icon:'⛓',source:'received',desc:'اشتقاق دالة داخل دالة وتحديد الداخل والخارج.',sheets:'Sheets (1, 2, 5)'},
  {id:'logexp',name:'الدوال الأسية واللوغاريتمية',en:'Exponential & Logarithmic',icon:'eˣ',source:'received',desc:'قواعد ln وlog وeˣ والأساس a وتطبيقات الضرب والسلسلة.',sheets:'Sheet (4)'},
  {id:'hyper',name:'الدوال الزائدية والعكسية',en:'Hyperbolic Functions',icon:'⌁',source:'received',desc:'sinh وcosh وtanh وبقية الدوال ومشتقات العكسية.',sheets:'Sheet (5)'},
  {id:'second',name:'المشتقات الثانية والعليا',en:'Higher Derivatives',icon:'∂²',source:'received',desc:'إيجاد المشتقة الأولى ثم الثانية وتطبيقات أوراق العمل.',sheets:'Sheets (1, 2, 4)'},
  {id:'proof',name:'مسائل الإثبات',en:'Show That Problems',icon:'✓',source:'received',desc:'تنظيم خطوات الإثبات والاشتقاق والتبسيط.',sheets:'Sheets (1, 3, 4)'},
  {id:'implicit',name:'الاشتقاق الضمني',en:'Implicit Differentiation',icon:'∂y',source:'received',desc:'اشتقاق المعادلات التي يظهر فيها x و y معًا.',sheets:'صفحة 18 + Sheet 5'},
  {id:'parametric',name:'الاشتقاق البارامتري',en:'Parametric Differentiation',icon:'t→',source:'received',desc:'إيجاد dy/dx من x و y بدلالة متغير وسيط t.',sheets:'صفحتا 19–20'},
  {id:'logdiff',name:'الاشتقاق اللوغاريتمي',en:'Logarithmic Differentiation',icon:'ln',source:'received',desc:'أخذ ln للطرفين عند وجود متغير في الأس.',sheets:'Sheet 3'},
  {id:'higher',name:'المشتقات العليا والرتب المتتابعة',en:'Higher Order Derivatives',icon:'∂ⁿ',source:'received',desc:'المشتقة الثانية والثالثة والنونية.',sheets:'صفحتا 19–22'},
  {id:'lhopital',name:'قاعدة لوبيتال',en:"L’Hôpital's Rule",icon:'lim',source:'mentioned',desc:'النهايات غير المعينة وشروط التطبيق.',sheets:'بانتظار الورقة'},
  {id:'maclaurin',name:'متسلسلة ماكلورين',en:'Maclaurin Series',icon:'Σ',source:'mentioned',desc:'توسع تايلور حول الصفر.',sheets:'بانتظار الورقة'},
  {id:'taylor',name:'متسلسلة تايلور',en:'Taylor Series',icon:'T',source:'mentioned',desc:'التوسع حول نقطة عامة.',sheets:'بانتظار الورقة'}
];

const lessonTabs = ['افهم شكل السؤال','اختَر القاعدة','القانون بالعربي والرموز','حل خطوة بخطوة','اختبر فهمك','ملخص ومراجعة'];

/* ============================================================
   الدروس — كل الرموز بصيغة MathJax
   ============================================================ */
const lessons = {

basic:[
`<h3>مقدمة: كيف نشتق؟</h3><p>الاشتقاق هو إيجاد معدل تغير الدالة بالنسبة إلى المتغير <span dir="ltr">\\(x\\)</span>. إذا كانت <span dir="ltr">\\(y\\)</span> دالة في <span dir="ltr">\\(x\\)</span>، فإن المشتقة تكتب بالصور التالية:</p><div class="formula-box">\\[y'=\\frac{dy}{dx}=f'(x)\\]</div><p>في ورقة <b>Sheet (1)</b> المطلوب غالبًا إيجاد المشتقة الأولى أو الثانية.</p>`,
`<h3>الفكرة ببساطة</h3><p>ابدأ بتحديد شكل كل حد. إذا كان الحد قوة لـ <span dir="ltr">\\(x\\)</span> فاستخدم قاعدة القوة. وإذا كان هناك قوس مرفوع لأس فغالبًا تحتاج قاعدة السلسلة. وإذا وجدت ضربًا أو قسمة بين دالتين فاختر قاعدة الضرب أو القسمة.</p>`,
`<h3>القوانين الأساسية</h3>
<p><b>قاعدة الثابت:</b> مشتقة أي عدد ثابت تساوي صفرًا.</p><div class="formula-box">\\[\\frac{d}{dx}(c)=0\\]</div>
<p><b>قاعدة القوة:</b> ننزل الأس ليصبح معاملًا، ثم نضربه في المعامل الموجود، ونطرح واحدًا من الأس.</p><div class="formula-box">\\[\\frac{d}{dx}(x^n)=n\\,x^{n-1}\\]</div>
<p><b>قاعدة الجمع والطرح:</b> نشتق كل حد بمفرده.</p><div class="formula-box">\\[(u\\pm v)'=u'\\pm v'\\]</div>
<p><b>قاعدة الضرب:</b> مشتقة الأول في الثاني، زائد الأول في مشتقة الثاني.</p><div class="formula-box">\\[(uv)'=u'v+uv'\\]</div>
<p><b>قاعدة القسمة:</b> مشتقة البسط في المقام، ناقص البسط في مشتقة المقام، على مربع المقام.</p><div class="formula-box">\\[\\left(\\frac{u}{v}\\right)'=\\frac{u'v-uv'}{v^2}\\]</div>
<p><b>قاعدة الجذر:</b> حوّل الجذر إلى أس كسري ثم اشتق بقاعدة القوة.</p><div class="formula-box">\\[\\sqrt[n]{x^m}=x^{m/n}\\]</div>`,
`<h3>أمثلة محلولة</h3>
<p><b>مثال 1:</b> أوجد مشتقة <span dir="ltr">\\(y=x^5+3x^3+8x+7\\)</span>.</p>
<p>نشتق كل حد: مشتقة <span dir="ltr">\\(x^5\\)</span> هي <span dir="ltr">\\(5x^4\\)</span>، ومشتقة <span dir="ltr">\\(3x^3\\)</span> هي <span dir="ltr">\\(9x^2\\)</span>، ومشتقة <span dir="ltr">\\(8x\\)</span> هي <span dir="ltr">\\(8\\)</span>، ومشتقة الثابت <span dir="ltr">\\(7\\)</span> تساوي صفرًا.</p>
<div class="formula-box">\\[\\boxed{y'=5x^4+9x^2+8}\\]</div>
<p><b>مثال 2:</b> <span dir="ltr">\\(y=(x^2+3x+5)^4\\)</span>. نستخدم قاعدة السلسلة: مشتقة الخارج × مشتقة الداخل.</p>
<div class="formula-box">\\[y'=4(x^2+3x+5)^3(2x+3)\\]</div>`,
`<h3>أخطاء شائعة</h3>
<ul>
<li>نسيان ضرب المعامل الموجود أمام <span dir="ltr">\\(x\\)</span> في الأس.</li>
<li>نسيان طرح واحد من الأس.</li>
<li>اعتبار مشتقة الثابت هي الثابت نفسه؛ الصحيح أنها صفر.</li>
<li>في قاعدة الضرب لا نضرب المشتقتين معًا، بل نستخدم <span dir="ltr">\\(u'v+uv'\\)</span>.</li>
<li>في قاعدة القسمة انتبه لترتيب البسط وإشارة الطرح.</li>
</ul>`,
`<h3>ملخص سريع</h3>
<div class="formula-box">\\[c\\to 0,\\qquad x^n\\to n\\,x^{n-1}\\]</div>
<div class="formula-box">\\[(u+v)'=u'+v',\\qquad (uv)'=u'v+uv'\\]</div>
<div class="formula-box">\\[\\left(\\frac{u}{v}\\right)'=\\frac{u'v-uv'}{v^2}\\]</div>
<p>اسأل نفسك قبل الحل: هل يوجد جمع؟ ضرب؟ قسمة؟ قوس مركب؟ ثم اختر القاعدة المناسبة.</p>`
],

trig:[
`<h3>مقدمة الدوال المثلثية</h3><p>هذه الدوال تظهر مباشرة في <b>Sheet (2)</b>. احفظ المشتقات الأساسية، ثم انتبه إلى مشتقة ما بداخل الدالة إذا كان مثلثيًا مركبًا مثل <span dir="ltr">\\(\\sin(3x)\\)</span>.</p>`,
`<h3>كيف أتعرف على السؤال؟</h3><p>إذا رأيت <span dir="ltr">\\(\\sin\\)</span> أو <span dir="ltr">\\(\\cos\\)</span> أو <span dir="ltr">\\(\\tan\\)</span> أو <span dir="ltr">\\(\\cot\\)</span> أو <span dir="ltr">\\(\\sec\\)</span> أو <span dir="ltr">\\(\\csc\\)</span> فابدأ بجدول المشتقات. إذا كانت الزاوية ليست <span dir="ltr">\\(x\\)</span> وحدها، اضرب في مشتقة الزاوية باستخدام قاعدة السلسلة.</p>`,
`<h3>جدول القوانين</h3>
<div class="formula-box">\\[(\\sin u)'=u'\\cos u\\]</div>
<div class="formula-box">\\[(\\cos u)'=-u'\\sin u\\]</div>
<div class="formula-box">\\[(\\tan u)'=u'\\sec^2 u\\]</div>
<div class="formula-box">\\[(\\cot u)'=-u'\\csc^2 u\\]</div>
<div class="formula-box">\\[(\\sec u)'=u'\\sec u\\tan u\\]</div>
<div class="formula-box">\\[(\\csc u)'=-u'\\csc u\\cot u\\]</div>`,
`<h3>أمثلة محلولة</h3>
<p><b>مثال 1:</b> <span dir="ltr">\\(y=\\cos 3x\\)</span>. مشتقة الخارج هي <span dir="ltr">\\(-\\sin 3x\\)</span>، ومشتقة الداخل <span dir="ltr">\\(3\\)</span>.</p>
<div class="formula-box">\\[\\boxed{y'=-3\\sin 3x}\\]</div>
<p><b>مثال 2:</b> <span dir="ltr">\\(y=\\sin^3 x=(\\sin x)^3\\)</span>.</p>
<div class="formula-box">\\[\\boxed{y'=3\\sin^2 x\\cos x}\\]</div>`,
`<h3>أخطاء شائعة</h3>
<ul>
<li>نسيان السالب في مشتقة <span dir="ltr">\\(\\cos\\)</span> و <span dir="ltr">\\(\\cot\\)</span> و <span dir="ltr">\\(\\csc\\)</span>.</li>
<li>نسيان مشتقة الزاوية الداخلية.</li>
<li>الخلط بين <span dir="ltr">\\(\\sin^3 x\\)</span> و <span dir="ltr">\\(\\sin(x^3)\\)</span>.</li>
</ul>`,
`<h3>ملخص الدوال المثلثية</h3><p>احفظ جدول المشتقات الست، ثم طبّق قاعدة السلسلة إذا كانت الزاوية <span dir="ltr">\\(u\\)</span> وليست <span dir="ltr">\\(x\\)</span> فقط.</p>`
],

inverse:[
`<h3>مقدمة الدوال المثلثية العكسية</h3><p>الرمز <span dir="ltr">\\(\\sin^{-1}x\\)</span> يعني الدالة العكسية (Arc Sine)، وليس مقلوب الجيب. وهو موضوع <b>Sheet (3)</b>.</p>`,
`<h3>كيف تختار القانون؟</h3><p>حدد اسم الدالة العكسية أولًا، ثم حدد <span dir="ltr">\\(u\\)</span> وما مشتقته. انتبه إلى أن مشتقة <span dir="ltr">\\(\\cos^{-1}\\)</span> و <span dir="ltr">\\(\\cot^{-1}\\)</span> و <span dir="ltr">\\(\\csc^{-1}\\)</span> تحتوي على إشارة سالبة.</p>`,
`<h3>قوانين الاشتقاق</h3>
<div class="formula-box">\\[(\\sin^{-1}u)'=\\frac{u'}{\\sqrt{1-u^2}}\\]</div>
<div class="formula-box">\\[(\\cos^{-1}u)'=-\\frac{u'}{\\sqrt{1-u^2}}\\]</div>
<div class="formula-box">\\[(\\tan^{-1}u)'=\\frac{u'}{1+u^2}\\]</div>
<div class="formula-box">\\[(\\cot^{-1}u)'=-\\frac{u'}{1+u^2}\\]</div>
<div class="formula-box">\\[(\\sec^{-1}u)'=\\frac{u'}{|u|\\sqrt{u^2-1}}\\]</div>
<div class="formula-box">\\[(\\csc^{-1}u)'=-\\frac{u'}{|u|\\sqrt{u^2-1}}\\]</div>`,
`<h3>أمثلة محلولة من Sheet (3)</h3>
<p><b>السؤال 2:</b> <span dir="ltr">\\(y=\\tan^{-1}(x^2)\\)</span>. نضع <span dir="ltr">\\(u=x^2\\)</span>، إذن <span dir="ltr">\\(u'=2x\\)</span>.</p>
<div class="formula-box">\\[y'=\\frac{u'}{1+u^2}=\\frac{2x}{1+x^4}\\]</div>
<p><b>السؤال 3:</b> <span dir="ltr">\\(y=\\cos^{-1}(3x^4)\\)</span>. هنا <span dir="ltr">\\(u'=12x^3\\)</span>.</p>
<div class="formula-box">\\[\\boxed{y'=-\\frac{12x^3}{\\sqrt{1-9x^8}}}\\]</div>`,
`<h3>أخطاء شائعة</h3>
<ul>
<li>اعتبار الأس <span dir="ltr">\\(-1\\)</span> مقلوبًا وليس دالة عكسية.</li>
<li>نسيان مشتقة <span dir="ltr">\\(u\\)</span>.</li>
<li>نسيان السالب في <span dir="ltr">\\(\\cos^{-1}\\)</span> و <span dir="ltr">\\(\\cot^{-1}\\)</span> و <span dir="ltr">\\(\\csc^{-1}\\)</span>.</li>
<li>نسيان القيمة المطلقة في مقام <span dir="ltr">\\(\\sec^{-1}\\)</span> و <span dir="ltr">\\(\\csc^{-1}\\)</span>.</li>
</ul>`,
`<h3>ملخص</h3><p><span dir="ltr">\\(\\sin\\)</span> و <span dir="ltr">\\(\\cos\\)</span> مقامهما جذر <span dir="ltr">\\(1-u^2\\)</span>. <span dir="ltr">\\(\\tan\\)</span> و <span dir="ltr">\\(\\cot\\)</span> مقامهما <span dir="ltr">\\(1+u^2\\)</span>. <span dir="ltr">\\(\\sec\\)</span> و <span dir="ltr">\\(\\csc\\)</span> مقامهما <span dir="ltr">\\(|u|\\sqrt{u^2-1}\\)</span>.</p>`
],

chain:[
`<h3>مقدمة قاعدة السلسلة</h3><p>نستخدمها عندما تكون لدينا دالة داخل دالة، مثل <span dir="ltr">\\((x^2+1)^5\\)</span> أو <span dir="ltr">\\(\\sin(x^3)\\)</span>.</p>`,
`<h3>طريقة التفكير</h3><p>سمِّ الجزء الداخلي <span dir="ltr">\\(u\\)</span>. اشتق الشكل الخارجي مع إبقاء <span dir="ltr">\\(u\\)</span> كما هو، ثم اضرب في مشتقة <span dir="ltr">\\(u\\)</span>.</p>`,
`<h3>القانون بالعربي</h3>
<p><b>مشتقة الدالة المركبة = مشتقة الدالة الخارجية × مشتقة الدالة الداخلية.</b></p>
<div class="formula-box">\\[\\frac{dy}{dx}=\\frac{dy}{du}\\cdot\\frac{du}{dx}\\]</div>`,
`<h3>مثال</h3>
<p><span dir="ltr">\\(y=(x^2+3x+5)^4\\)</span>. مشتقة الخارج <span dir="ltr">\\(4(x^2+3x+5)^3\\)</span>، ومشتقة الداخل <span dir="ltr">\\(2x+3\\)</span>.</p>
<div class="formula-box">\\[\\boxed{y'=4(x^2+3x+5)^3(2x+3)}\\]</div>`,
`<h3>خطأ شائع</h3><p>لا تتوقف عند مشتقة الخارج؛ يجب ضربها في مشتقة الداخل دائمًا.</p>`,
`<h3>الملخص</h3>
<div class="formula-box">\\[\\text{مشتقة الخارج}\\times\\text{مشتقة الداخل}\\]</div>`
],

logexp:[
`<h3>مقدمة الأسية واللوغاريتمية</h3><p>تظهر في <b>Sheet (4)</b>، ومنها <span dir="ltr">\\(e^x\\)</span> و <span dir="ltr">\\(\\ln x\\)</span> و <span dir="ltr">\\(\\log_a x\\)</span>.</p>`,
`<h3>الفكرة</h3><p>في اللوغاريتم الطبيعي نقسم مشتقة الداخل على الداخل. في الدالة الأسية ذات الأس <span dir="ltr">\\(e\\)</span> نحتفظ بالدالة كما هي ونضرب في مشتقة الأس.</p>`,
`<h3>قوانين اللوغاريتم والأسية</h3>
<div class="formula-box">\\[(\\ln u)'=\\frac{u'}{u}\\]</div>
<div class="formula-box">\\[(\\log_a u)'=\\frac{u'}{u\\ln a}\\]</div>
<div class="formula-box">\\[(e^u)'=u'e^u\\]</div>
<div class="formula-box">\\[(a^u)'=u'a^u\\ln a\\]</div>
<p>قوانين اللوغاريتم: <span dir="ltr">\\(\\ln(ab)=\\ln a+\\ln b\\)</span>، و <span dir="ltr">\\(\\ln(a/b)=\\ln a-\\ln b\\)</span>، و <span dir="ltr">\\(\\ln(a^n)=n\\ln a\\)</span>.</p>`,
`<h3>مثال من Sheet (4)</h3>
<p><span dir="ltr">\\(y=x^3\\ln(\\cos x)\\)</span>. نستخدم قاعدة الضرب. مشتقة <span dir="ltr">\\(x^3\\)</span> هي <span dir="ltr">\\(3x^2\\)</span>، ومشتقة <span dir="ltr">\\(\\ln(\\cos x)\\)</span> هي <span dir="ltr">\\(-\\tan x\\)</span>.</p>
<div class="formula-box">\\[\\boxed{y'=3x^2\\ln(\\cos x)-x^3\\tan x}\\]</div>`,
`<h3>أخطاء شائعة</h3>
<ul>
<li>نسيان مشتقة الداخل في <span dir="ltr">\\(\\ln u\\)</span> و <span dir="ltr">\\(e^u\\)</span>.</li>
<li>الخلط بين <span dir="ltr">\\(\\log\\)</span> العشري و <span dir="ltr">\\(\\ln\\)</span> الطبيعي.</li>
<li>نسيان قاعدة الضرب إذا كان <span dir="ltr">\\(x^3\\)</span> مضروبًا في اللوغاريتم.</li>
</ul>`,
`<h3>ملخص</h3>
<div class="formula-box">\\[\\ln u\\to\\frac{u'}{u},\\qquad e^u\\to u'e^u\\]</div>`
],

hyper:[
`<h3>مقدمة الدوال الزائدية</h3><p>الدوال الزائدية تشبه المثلثية في جدول الاشتقاق، لكنها مرتبطة بالدوال الأسية.</p>`,
`<h3>التعرف على الدوال</h3><p>الدوال الأساسية هي <span dir="ltr">\\(\\sinh\\)</span> و <span dir="ltr">\\(\\cosh\\)</span> و <span dir="ltr">\\(\\tanh\\)</span> و <span dir="ltr">\\(\\coth\\)</span> و <span dir="ltr">\\(\\operatorname{sech}\\)</span> و <span dir="ltr">\\(\\operatorname{csch}\\)</span>. انتبه إلى الإشارات السالبة في مشتقات <span dir="ltr">\\(\\coth\\)</span> و <span dir="ltr">\\(\\operatorname{sech}\\)</span> و <span dir="ltr">\\(\\operatorname{csch}\\)</span>.</p>`,
`<h3>قوانين الاشتقاق</h3>
<div class="formula-box">\\[(\\sinh u)'=u'\\cosh u\\]</div>
<div class="formula-box">\\[(\\cosh u)'=u'\\sinh u\\]</div>
<div class="formula-box">\\[(\\tanh u)'=u'\\operatorname{sech}^2 u\\]</div>
<div class="formula-box">\\[(\\coth u)'=-u'\\operatorname{csch}^2 u\\]</div>
<div class="formula-box">\\[(\\operatorname{sech} u)'=-u'\\operatorname{sech} u\\tanh u\\]</div>
<div class="formula-box">\\[(\\operatorname{csch} u)'=-u'\\operatorname{csch} u\\coth u\\]</div>
<p>هوية أساسية: <span dir="ltr">\\(\\cosh^2 x-\\sinh^2 x=1\\)</span>.</p>`,
`<h3>مثال</h3>
<p>إذا <span dir="ltr">\\(y=\\sinh(3x)\\)</span>، فمشتقة الخارج <span dir="ltr">\\(\\cosh(3x)\\)</span>، ومشتقة الداخل <span dir="ltr">\\(3\\)</span>.</p>
<div class="formula-box">\\[y'=3\\cosh(3x)\\]</div>`,
`<h3>أخطاء شائعة</h3><p>لا تخلط بين <span dir="ltr">\\(\\sinh\\)</span> و <span dir="ltr">\\(\\sin\\)</span>، أو <span dir="ltr">\\(\\cosh\\)</span> و <span dir="ltr">\\(\\cos\\)</span>. الدوال الزائدية ليست الدوال المثلثية نفسها.</p>`,
`<h3>ملخص</h3><p>استخدم جدول الدوال الست، واضرب في مشتقة الداخل إذا كانت الدالة مركبة.</p>`
],

second:[
`<h3>ما المقصود بالمشتقة الثانية؟</h3><p>هي اشتقاق المشتقة الأولى مرة أخرى.</p>`,
`<h3>الخطوات</h3><ol><li>أوجد <span dir="ltr">\\(y'\\)</span> أولًا.</li><li>اشتق الناتج مرة ثانية.</li><li>بسّط الحدود واكتب <span dir="ltr">\\(y''\\)</span> أو <span dir="ltr">\\(\\frac{d^2y}{dx^2}\\)</span>.</li></ol>`,
`<h3>الرموز</h3>
<div class="formula-box">\\[y'=\\frac{dy}{dx},\\qquad y''=\\frac{d^2y}{dx^2}\\]</div>`,
`<h3>مثال</h3>
<p><span dir="ltr">\\(y=x^4-3x^{-2}+15x+10\\)</span>.</p>
<p>أولًا: <span dir="ltr">\\(y'=4x^3+6x^{-3}+15\\)</span>.</p>
<p>ثانيًا: <span dir="ltr">\\(y''=12x^2-18x^{-4}\\)</span>.</p>`,
`<h3>خطأ شائع</h3><p>لا تكتب المشتقة الثانية مباشرة دون إظهار المشتقة الأولى؛ إظهار المرحلتين يقلل أخطاء الأسس والإشارات.</p>`,
`<h3>ملخص</h3><p>اشتق مرتين بالتتابع، مع تطبيق قواعد الاشتقاق نفسها في كل مرة.</p>`
],

proof:[
`<h3>كيف تتعامل مع Show That؟</h3><p>ابدأ من الدالة المعطاة، حدد القاعدة، اشتق، ثم بسّط حتى تصل إلى الطرف المطلوب.</p>`,
`<h3>خطة الإثبات</h3><ol><li>اكتب المعطى كما هو.</li><li>حدد هل تحتاج سلسلة أو ضربًا أو قسمة.</li><li>نفذ الاشتقاق دون القفز على الخطوات.</li><li>استخدم التبسيط الجبري أو الهوية المناسبة.</li><li>قارن الناتج بالمطلوب.</li></ol>`,
`<h3>قواعد مساعدة</h3><p>راجع قواعد القوة والسلسلة والضرب والقسمة والدوال المثلثية والعكسية؛ اختيار القانون يعتمد على شكل المسألة.</p>`,
`<h3>مثال من Sheet (1)</h3>
<p>إذا <span dir="ltr">\\(y=\\frac{2x}{\\sqrt{x^2+4}}\\)</span>، نكتب <span dir="ltr">\\(y=2x(x^2+4)^{-1/2}\\)</span>، ثم نستخدم قاعدة الضرب والسلسلة.</p>
<div class="formula-box">\\[y'=2(x^2+4)^{-1/2}-2x^2(x^2+4)^{-3/2}\\]</div>
<p>بتوحيد المقام:</p>
<div class="formula-box">\\[\\boxed{y'=\\frac{8}{(x^2+4)^{3/2}}}\\]</div>`,
`<h3>أخطاء شائعة</h3><p>لا تبدأ من النتيجة المطلوبة وتفترض صحتها. ابدأ من المعطى، واكتب سبب كل تحويل.</p>`,
`<h3>ملخص</h3><p>المعطى ← اختيار القاعدة ← الاشتقاق ← التبسيط ← النتيجة المطلوبة.</p>`
],

implicit:[
`<h3>أولًا: كيف أعرف أن السؤال اشتقاق ضمني؟</h3>
<p>إذا وجدت <span dir="ltr">\\(x\\)</span> و <span dir="ltr">\\(y\\)</span> في المعادلة نفسها، مثل <span dir="ltr">\\(x^2+xy=10\\)</span>، ولم تكن <span dir="ltr">\\(y\\)</span> مكتوبة وحدها، فهذا غالبًا اشتقاق ضمني. اعتبر <span dir="ltr">\\(y\\)</span> دالة في <span dir="ltr">\\(x\\)</span>؛ لذلك مشتقة <span dir="ltr">\\(y\\)</span> بالنسبة إلى <span dir="ltr">\\(x\\)</span> هي <span dir="ltr">\\(y'\\)</span> وليست صفرًا.</p>
<div class="notice"><b>علامة مهمة:</b> كلما اشتققت حدًا يحتوي على <span dir="ltr">\\(y\\)</span>، اسأل: هل أحتاج قاعدة السلسلة؟ نعم، لأن <span dir="ltr">\\(y\\)</span> متغيرة مع <span dir="ltr">\\(x\\)</span>.</div>`,
`<h3>خطة الحل الثابتة</h3>
<ol>
<li>اشتق طرفي المعادلة بالنسبة إلى <span dir="ltr">\\(x\\)</span>.</li>
<li>اشتق حدود <span dir="ltr">\\(x\\)</span> بالقواعد العادية.</li>
<li>عند اشتقاق <span dir="ltr">\\(y\\)</span> اكتب <span dir="ltr">\\(y'\\)</span>.</li>
<li>عند اشتقاق <span dir="ltr">\\(xy\\)</span> استخدم قاعدة الضرب: مشتقة الأول في الثاني + الأول في مشتقة الثاني.</li>
<li>اجمع كل الحدود التي تحتوي على <span dir="ltr">\\(y'\\)</span> في طرف واحد.</li>
<li>أخرج <span dir="ltr">\\(y'\\)</span> عاملًا مشتركًا، ثم اقسم لعزله.</li>
</ol>
<p>لا تنسَ: <span dir="ltr">\\(\\dfrac{d(y^2)}{dx}=2y\\,y'\\)</span> وليس <span dir="ltr">\\(2y\\)</span> فقط.</p>`,
`<h3>القواعد بالعربي</h3>
<p><b>قاعدة القوة مع y:</b> ننزل الأس، ونطرح واحدًا من الأس، ثم نضرب في مشتقة الداخل <span dir="ltr">\\(y'\\)</span>.</p>
<div class="formula-box">\\[\\frac{d}{dx}(y^n)=n\\,y^{n-1}y'\\]</div>
<p><b>قاعدة الضرب للحد xy:</b> مشتقة <span dir="ltr">\\(x\\)</span> في <span dir="ltr">\\(y\\)</span> + <span dir="ltr">\\(x\\)</span> في مشتقة <span dir="ltr">\\(y\\)</span>.</p>
<div class="formula-box">\\[\\frac{d}{dx}(xy)=y+xy'\\]</div>`,
`<h3>مثال: أوجد y′ إذا كان</h3>
<div class="formula-box">\\[x^2+xy=10\\]</div>
<p><b>الخطوة 1 – اشتق الطرفين:</b></p>
<div class="formula-box">\\[2x+(y+xy')=0\\]</div>
<p><b>الخطوة 2 – اجمع حدود y′ وحدها:</b></p>
<div class="formula-box">\\[xy'=-2x-y\\]</div>
<p><b>الخطوة 3 – اقسم على x:</b></p>
<div class="formula-box">\\[\\boxed{y'=-\\frac{2x+y}{x}}\\]</div>
<hr>
<h3>مثال آخر</h3>
<div class="formula-box">\\[x^2y+y^2x=6\\]</div>
<p>بالتفاضل حدًا حدًا:</p>
<div class="formula-box">\\[2xy+x^2y'+2yy'x+y^2=0\\]</div>
<div class="formula-box">\\[y'(x^2+2xy)=-(2xy+y^2)\\]</div>
<div class="formula-box">\\[\\boxed{y'=-\\frac{2xy+y^2}{x^2+2xy}}\\]</div>`,
`<h3>اختبر نفسك</h3>
<p>إذا كانت <span dir="ltr">\\(x+3y^2=xy\\)</span>، فما أول سطر صحيح بعد الاشتقاق؟</p>
<details class="practice-reveal"><summary>إظهار الحل</summary>
<p><span dir="ltr">\\(1+6yy'=y+xy'\\)</span></p>
<p>لأن مشتقة <span dir="ltr">\\(3y^2\\)</span> هي <span dir="ltr">\\(6yy'\\)</span>، ومشتقة <span dir="ltr">\\(xy\\)</span> هي <span dir="ltr">\\(y+xy'\\)</span>.</p>
<div class="formula-box">\\[\\boxed{y'=\\frac{y-1}{6y-x}}\\]</div>
</details>`,
`<h3>ملخص الاشتقاق الضمني</h3>
<ul>
<li><span dir="ltr">\\(y\\)</span> متغيرة وليست ثابتة.</li>
<li>اشتق <span dir="ltr">\\(y^n\\)</span> إلى <span dir="ltr">\\(ny^{n-1}y'\\)</span>.</li>
<li>اشتق <span dir="ltr">\\(xy\\)</span> بقاعدة الضرب: <span dir="ltr">\\(y+xy'\\)</span>.</li>
<li>اجمع حدود <span dir="ltr">\\(y'\\)</span> ثم اعزلها.</li>
</ul>
<div class="formula-box">\\[\\boxed{\\text{اشتق الطرفين}\\to\\text{اجمع } y'\\to\\text{اعزل } y'}\\]</div>`
],

parametric:[
`<h3>ما معنى التمثيل البارامتري؟</h3>
<p>في هذا النوع لا تكون <span dir="ltr">\\(y\\)</span> معطاة مباشرة بدلالة <span dir="ltr">\\(x\\)</span>. بدلًا من ذلك يعطينا السؤال معادلتين: <span dir="ltr">\\(x=f(t)\\)</span> و <span dir="ltr">\\(y=g(t)\\)</span>. المتغير <span dir="ltr">\\(t\\)</span> يسمى المتغير الوسيط.</p>
<p>المطلوب غالبًا إيجاد ميل المنحنى <span dir="ltr">\\(\\frac{dy}{dx}\\)</span>، وأحيانًا المشتقة الثانية.</p>`,
`<h3>طريقة الحل</h3>
<ol>
<li>احسب <span dir="ltr">\\(\\dfrac{dx}{dt}\\)</span> من معادلة <span dir="ltr">\\(x\\)</span>.</li>
<li>احسب <span dir="ltr">\\(\\dfrac{dy}{dt}\\)</span> من معادلة <span dir="ltr">\\(y\\)</span>.</li>
<li>اقسم مشتقة <span dir="ltr">\\(y\\)</span> على مشتقة <span dir="ltr">\\(x\\)</span>.</li>
<li>إذا طلب قيمة عند <span dir="ltr">\\(t\\)</span> محدد، عوّض في الناتج النهائي.</li>
<li>للمشتقة الثانية: اشتق <span dir="ltr">\\(\\frac{dy}{dx}\\)</span> بالنسبة إلى <span dir="ltr">\\(t\\)</span> ثم اقسم على <span dir="ltr">\\(\\frac{dx}{dt}\\)</span>.</li>
</ol>`,
`<h3>القانون بالعربي</h3>
<p>المشتقة بالنسبة إلى <span dir="ltr">\\(x\\)</span> = مشتقة <span dir="ltr">\\(y\\)</span> بالنسبة إلى <span dir="ltr">\\(t\\)</span> ÷ مشتقة <span dir="ltr">\\(x\\)</span> بالنسبة إلى <span dir="ltr">\\(t\\)</span>.</p>
<div class="formula-box">\\[\\frac{dy}{dx}=\\frac{\\dfrac{dy}{dt}}{\\dfrac{dx}{dt}}\\]</div>
<p>والمشتقة الثانية:</p>
<div class="formula-box">\\[\\frac{d^2y}{dx^2}=\\frac{\\dfrac{d}{dt}\\left(\\dfrac{dy}{dx}\\right)}{\\dfrac{dx}{dt}}\\]</div>`,
`<h3>مثال مطابق</h3>
<div class="formula-box">\\[x=t\\ln t,\\qquad y=\\frac{\\ln t}{t}\\]</div>
<p><b>1) اشتق x:</b></p>
<div class="formula-box">\\[\\frac{dx}{dt}=\\ln t+1\\]</div>
<p><b>2) اشتق y</b> بكتابتها <span dir="ltr">\\(y=(\\ln t)t^{-1}\\)</span> وبقاعدة الضرب:</p>
<div class="formula-box">\\[\\frac{dy}{dt}=\\frac{1-\\ln t}{t^2}\\]</div>
<p><b>3) اقسم المشتقتين:</b></p>
<div class="formula-box">\\[\\boxed{\\frac{dy}{dx}=\\frac{1-\\ln t}{t^2(\\ln t+1)}}\\]</div>
<hr>
<h3>مثال آخر</h3>
<div class="formula-box">\\[x=2t^2+1,\\qquad y=t^3-3t\\]</div>
<div class="formula-box">\\[\\frac{dx}{dt}=4t,\\qquad \\frac{dy}{dt}=3t^2-3\\]</div>
<div class="formula-box">\\[\\boxed{\\frac{dy}{dx}=\\frac{3t^2-3}{4t}=\\frac{3}{4}t-\\frac{3}{4t}}\\]</div>`,
`<h3>المشتقة الثانية في البارامتري</h3>
<p>لا تشتق <span dir="ltr">\\(\\frac{dy}{dx}\\)</span> مباشرة بالنسبة إلى <span dir="ltr">\\(x\\)</span>؛ التعبير ما زال بدلالة <span dir="ltr">\\(t\\)</span>. اشتقه بالنسبة إلى <span dir="ltr">\\(t\\)</span> أولًا ثم اقسم على <span dir="ltr">\\(\\frac{dx}{dt}\\)</span>.</p>
<div class="formula-box">\\[\\frac{d^2y}{dx^2}=\\frac{\\dfrac{d}{dt}\\left(\\dfrac{dy}{dx}\\right)}{\\dfrac{dx}{dt}}\\]</div>
<p>في المثال <span dir="ltr">\\(x=2t^2+1,\\; y=t^3-3t\\)</span>:</p>
<div class="formula-box">\\[\\frac{d}{dt}\\left(\\frac{dy}{dx}\\right)=\\frac{3}{4}+\\frac{3}{4t^2}\\]</div>
<div class="formula-box">\\[\\boxed{\\frac{d^2y}{dx^2}=\\frac{3}{16t}+\\frac{3}{16t^3}}\\]</div>`,
`<h3>ملخص البارامتري</h3>
<div class="formula-box">\\[\\boxed{\\frac{dy}{dx}=\\frac{dy/dt}{dx/dt}}\\]</div>
<div class="formula-box">\\[\\boxed{\\frac{d^2y}{dx^2}=\\frac{d(dy/dx)/dt}{dx/dt}}\\]</div>`
],

logdiff:[
`<h3>متى أستخدم الاشتقاق اللوغاريتمي؟</h3>
<p>عندما تكون الدالة فيها متغير في الأس مثل <span dir="ltr">\\(y=x^{\\sin x}\\)</span>، أو حاصل ضرب وقوى كثيرة يصعب اشتقاقها مباشرة. الفكرة هي أخذ اللوغاريتم الطبيعي للطرفين لتسهيل الأسس والضرب.</p>`,
`<h3>الخطوات بالترتيب</h3>
<ol>
<li>اكتب <span dir="ltr">\\(\\ln y=\\ln(\\text{الدالة})\\)</span>.</li>
<li>استخدم خواص اللوغاريتم لتحويل الأس إلى معامل.</li>
<li>اشتق الطرفين ضمنيًا، وتذكر أن مشتقة <span dir="ltr">\\(\\ln y\\)</span> هي <span dir="ltr">\\(\\frac{y'}{y}\\)</span>.</li>
<li>اضرب في <span dir="ltr">\\(y\\)</span> لعزل <span dir="ltr">\\(y'\\)</span>.</li>
<li>عوّض عن <span dir="ltr">\\(y\\)</span> بالدالة الأصلية.</li>
</ol>`,
`<h3>القانون المفتاح</h3>
<div class="formula-box">\\[\\frac{d}{dx}(\\ln y)=\\frac{1}{y}\\cdot\\frac{dy}{dx}\\]</div>
<p>خواص نحتاجها:</p>
<div class="formula-box">\\[\\ln(ab)=\\ln a+\\ln b,\\qquad \\ln(a^n)=n\\ln a\\]</div>`,
`<h3>مثال</h3>
<div class="formula-box">\\[y=x^{\\sin x}\\]</div>
<p>نأخذ ln للطرفين:</p>
<div class="formula-box">\\[\\ln y=\\sin x\\cdot\\ln x\\]</div>
<p>نشتق الطرفين:</p>
<div class="formula-box">\\[\\frac{y'}{y}=\\cos x\\cdot\\ln x+\\frac{\\sin x}{x}\\]</div>
<p>نضرب في y ثم نعوض:</p>
<div class="formula-box">\\[\\boxed{y'=x^{\\sin x}\\left(\\cos x\\ln x+\\frac{\\sin x}{x}\\right)}\\]</div>`,
`<h3>تأكد من فهمك</h3>
<p>في السطر <span dir="ltr">\\(\\ln y=x\\ln(\\sin x)\\)</span>، مشتقة الطرف الأيسر هي <span dir="ltr">\\(\\frac{y'}{y}\\)</span>، أما الطرف الأيمن فيحتاج قاعدة الضرب.</p>`,
`<h3>ملخص</h3>
<p>خذ ln للطرفين، فك اللوغاريتمات، اشتق ضمنيًا، اضرب في y، ثم عوّض عن y.</p>
<div class="formula-box">\\[\\boxed{y'=y\\cdot\\frac{d}{dx}\\left(\\ln f(x)\\right)}\\]</div>`
],

higher:[
`<h3>ما المقصود بالمشتقات العليا؟</h3><p>المشتقة الثانية هي مشتقة المشتقة الأولى، والثالثة مشتقة الثانية، وهكذا.</p>`,
`<h3>طريقة الحل</h3>
<ol>
<li>أوجد المشتقة الأولى كاملة.</li>
<li>اشتق الناتج مرة ثانية للحصول على <span dir="ltr">\\(y''\\)</span>.</li>
<li>كرر العملية للحصول على <span dir="ltr">\\(y'''\\)</span> أو المشتقة النونية.</li>
</ol>`,
`<h3>الرموز</h3>
<div class="formula-box">\\[y',\\quad y'',\\quad y''',\\quad y^{(n)}\\]</div>
<div class="formula-box">\\[\\frac{dy}{dx},\\quad\\frac{d^2y}{dx^2},\\quad\\frac{d^ny}{dx^n}\\]</div>`,
`<h3>مثال</h3>
<div class="formula-box">\\[y=e^{3x-2}\\]</div>
<p>كل مرة نستخدم قاعدة السلسلة، ومشتقة الأس <span dir="ltr">\\(3x-2\\)</span> هي <span dir="ltr">\\(3\\)</span>.</p>
<div class="formula-box">\\[y'=3e^{3x-2}\\]</div>
<div class="formula-box">\\[y''=9e^{3x-2}\\]</div>
<div class="formula-box">\\[y'''=27e^{3x-2}\\]</div>
<p>النمط العام:</p>
<div class="formula-box">\\[\\boxed{y^{(n)}=3^n e^{3x-2}}\\]</div>`,
`<h3>تدريب سريع</h3>
<p>إذا كانت <span dir="ltr">\\(y=\\cos(4x)\\)</span>:</p>
<div class="formula-box">\\[y'=-4\\sin 4x\\]</div>
<div class="formula-box">\\[y''=-16\\cos 4x\\]</div>
<div class="formula-box">\\[y'''=64\\sin 4x\\]</div>`,
`<h3>ملخص</h3><p>المشتقة العليا تعني تكرار الاشتقاق. اكتب كل مرحلة منفصلة، وراقب معامل السلسلة الذي يتكرر.</p>`
],

lhopital:[
`<h3>مقدمة قاعدة لوبيتال</h3>
<p>تُستخدم القاعدة في حساب بعض النهايات عندما يؤدي التعويض المباشر إلى صورة غير معينة، وأشهرها <span dir="ltr">\\(\\dfrac{0}{0}\\)</span> أو <span dir="ltr">\\(\\dfrac{\\infty}{\\infty}\\)</span>.</p>`,
`<h3>متى أستخدمها؟</h3>
<ol>
<li>احسب النهاية بالتعويض المباشر أولًا.</li>
<li>تأكد أن الصورة <span dir="ltr">\\(\\dfrac{0}{0}\\)</span> أو <span dir="ltr">\\(\\dfrac{\\infty}{\\infty}\\)</span>.</li>
<li>تحقق من شروط النظرية في جوار النقطة.</li>
<li>اشتق البسط وحده والمقام وحده.</li>
</ol>`,
`<h3>القانون</h3>
<div class="formula-box">\\[\\lim_{x\\to a}\\frac{f(x)}{g(x)}=\\lim_{x\\to a}\\frac{f'(x)}{g'(x)}\\]</div>
<p>حيث يجب أن تتحقق شروط لوبيتال، وأن تكون النهاية على الطرف الأيمن موجودة أو لا نهائية.</p>`,
`<h3>مثال تأسيسي</h3>
<p>احسب <span dir="ltr">\\(\\lim_{x\\to 0}\\dfrac{\\sin x}{x}\\)</span>. بالتعويض نحصل على <span dir="ltr">\\(\\dfrac{0}{0}\\)</span>، فنستخدم لوبيتال:</p>
<div class="formula-box">\\[\\lim_{x\\to 0}\\frac{\\cos x}{1}=1\\]</div>`,
`<h3>أخطاء شائعة</h3>
<ul>
<li>استخدام لوبيتال قبل التأكد من الصورة غير المعينة.</li>
<li>اشتقاق الكسر كله بدل اشتقاق البسط والمقام كلٌّ على حدة.</li>
<li>الاعتقاد أن كل صورة غير معينة تُحل مباشرة بلوبيتال؛ بعض الصور تحتاج تحويلًا أولًا.</li>
</ul>`,
`<h3>ملخص</h3><p>التعويض أولًا، تحقق من <span dir="ltr">\\(\\frac{0}{0}\\)</span> أو <span dir="ltr">\\(\\frac{\\infty}{\\infty}\\)</span>، ثم اشتق البسط والمقام واحسب النهاية الجديدة.</p>`
],

maclaurin:[
`<h3>مقدمة متسلسلة ماكلورين</h3><p>ماكلورين هي متسلسلة تايلور عندما يكون مركز التوسع صفرًا.</p>`,
`<h3>طريقة البناء</h3><p>نحسب قيمة الدالة عند صفر، ثم مشتقتها الأولى عند صفر، ثم الثانية، وهكذا.</p>`,
`<h3>القانون</h3>
<div class="formula-box">\\[f(x)=f(0)+\\frac{f'(0)}{1!}x+\\frac{f''(0)}{2!}x^2+\\cdots\\]</div>
<div class="formula-box">\\[f(x)=\\sum_{n=0}^{\\infty}\\frac{f^{(n)}(0)}{n!}x^n\\]</div>`,
`<h3>متسلسلات أساسية</h3>
<div class="formula-box">\\[\\sin x=x-\\frac{x^3}{3!}+\\frac{x^5}{5!}-\\cdots\\]</div>
<div class="formula-box">\\[\\cos x=1-\\frac{x^2}{2!}+\\frac{x^4}{4!}-\\cdots\\]</div>
<div class="formula-box">\\[e^x=1+x+\\frac{x^2}{2!}+\\frac{x^3}{3!}+\\cdots\\]</div>
<div class="formula-box">\\[\\ln(1+x)=x-\\frac{x^2}{2}+\\frac{x^3}{3}-\\cdots\\]</div>`,
`<h3>أخطاء شائعة</h3>
<ul>
<li>نسيان أن مركز ماكلورين هو صفر.</li>
<li>نسيان العامل المضروب في المقام.</li>
<li>إهمال مجال التقارب.</li>
</ul>`,
`<h3>ملخص</h3><p>احسب المشتقات المتتابعة عند صفر، ثم عوض بها في صيغة ماكلورين.</p>`
],

taylor:[
`<h3>مقدمة متسلسلة تايلور</h3><p>متسلسلة تايلور تمثل الدالة حول نقطة عامة <span dir="ltr">\\(a\\)</span>.</p>`,
`<h3>طريقة الحل</h3>
<ol>
<li>حدد مركز التوسع <span dir="ltr">\\(a\\)</span>.</li>
<li>احسب <span dir="ltr">\\(f(a)\\)</span> والمشتقات المتتابعة.</li>
<li>عوّض في القانون.</li>
<li>اكتب الحدود المطلوبة فقط إذا طلب السؤال عددًا محددًا.</li>
</ol>`,
`<h3>القانون العام</h3>
<div class="formula-box">\\[f(x)=f(a)+\\frac{f'(a)}{1!}(x-a)+\\frac{f''(a)}{2!}(x-a)^2+\\cdots\\]</div>
<div class="formula-box">\\[f(x)=\\sum_{n=0}^{\\infty}\\frac{f^{(n)}(a)}{n!}(x-a)^n\\]</div>`,
`<h3>مثال</h3><p>إذا كان <span dir="ltr">\\(a=0\\)</span> تتحول تايلور إلى ماكلورين. إذا كان <span dir="ltr">\\(a=1\\)</span>، تظهر القوى في صورة <span dir="ltr">\\((x-1)\\)</span>.</p>`,
`<h3>أخطاء شائعة</h3>
<ul>
<li>التعويض بالمشتقات عند صفر رغم أن المركز <span dir="ltr">\\(a\\)</span> ليس صفرًا.</li>
<li>كتابة <span dir="ltr">\\(x\\)</span> بدل <span dir="ltr">\\((x-a)\\)</span>.</li>
<li>نسيان <span dir="ltr">\\(n!\\)</span> في المقام.</li>
</ul>`,
`<h3>ملخص</h3><p>تايلور حول <span dir="ltr">\\(a\\)</span>، وماكلورين حالة خاصة عندما <span dir="ltr">\\(a=0\\)</span>.</p>`
]
};

/* ============================================================
   مكتبة القوانين — كلها MathJax
   ============================================================ */
const laws = [
['قاعدة الثابت','Constant Rule','مشتقة أي عدد ثابت تساوي صفرًا.','\\(\\dfrac{d}{dx}(c)=0\\)','عندما يكون الحد رقمًا لا يحتوي على x.'],
['قاعدة القوة','Power Rule','ننزل الأس ليصبح معاملًا، ثم نطرح واحدًا من الأس.','\\(\\dfrac{d}{dx}(x^n)=n\\,x^{n-1}\\)','مع القوى الصحيحة والسالبة والكسرية.'],
['قاعدة الجمع والطرح','Sum & Difference','اشتق كل حد على حدة.','\\((u\\pm v)\'=u\'\\pm v\'\\)','عندما تتكون الدالة من حدود بينها جمع أو طرح.'],
['قاعدة الضرب','Product Rule','مشتقة الأول في الثاني زائد الأول في مشتقة الثاني.','\\((uv)\'=u\'v+uv\'\\)','عندما تكون الدالة حاصل ضرب دالتين.'],
['قاعدة القسمة','Quotient Rule','مشتقة البسط في المقام ناقص البسط في مشتقة المقام، على مربع المقام.','\\(\\left(\\dfrac{u}{v}\\right)\'=\\dfrac{u\'v-uv\'}{v^2}\\)','عندما تكون الدالة كسرًا بين دالتين.'],
['قاعدة السلسلة','Chain Rule','مشتقة الدالة الخارجية مضروبة في مشتقة الدالة الداخلية.','\\(\\dfrac{dy}{dx}=\\dfrac{dy}{du}\\cdot\\dfrac{du}{dx}\\)','عندما تكون هناك دالة داخل دالة.'],

['مشتقة الجيب','Sine','مشتقة الجيب هي جيب التمام مضروبًا في مشتقة الداخل.','\\((\\sin u)\'=u\'\\cos u\\)','في الدوال المثلثية.'],
['مشتقة جيب التمام','Cosine','مشتقة جيب التمام هي سالب الجيب مضروبًا في مشتقة الداخل.','\\((\\cos u)\'=-u\'\\sin u\\)','في الدوال المثلثية.'],
['مشتقة الظل','Tangent','مشتقة الظل هي مربع القاطع مضروبًا في مشتقة الداخل.','\\((\\tan u)\'=u\'\\sec^2 u\\)','في دالة الظل.'],
['مشتقة ظل التمام','Cotangent','سالب مشتقة الداخل مضروبة في مربع قاطع التمام.','\\((\\cot u)\'=-u\'\\csc^2 u\\)','في دالة cot.'],
['مشتقة القاطع','Secant','مشتقة الداخل مضروبة في القاطع والظل.','\\((\\sec u)\'=u\'\\sec u\\tan u\\)','في دالة sec.'],
['مشتقة قاطع التمام','Cosecant','سالب مشتقة الداخل مضروبة في قاطع التمام وظل التمام.','\\((\\csc u)\'=-u\'\\csc u\\cot u\\)','في دالة cosec أو csc.'],

['مشتقة الجيب العكسي','Inverse Sine','مشتقة الداخل على الجذر التربيعي لـ 1 ناقص مربع الداخل.','\\((\\sin^{-1}u)\'=\\dfrac{u\'}{\\sqrt{1-u^2}}\\)','عندما تكون الدالة Arc Sine.'],
['مشتقة جيب التمام العكسي','Inverse Cosine','سالب مشتقة الداخل على الجذر التربيعي لـ 1 ناقص مربع الداخل.','\\((\\cos^{-1}u)\'=-\\dfrac{u\'}{\\sqrt{1-u^2}}\\)','عندما تكون الدالة Arc Cosine.'],
['مشتقة الظل العكسي','Inverse Tangent','مشتقة الداخل على 1 زائد مربع الداخل.','\\((\\tan^{-1}u)\'=\\dfrac{u\'}{1+u^2}\\)','عندما تكون الدالة Arc Tangent.'],
['مشتقة ظل التمام العكسي','Inverse Cotangent','سالب مشتقة الداخل على 1 زائد مربع الداخل.','\\((\\cot^{-1}u)\'=-\\dfrac{u\'}{1+u^2}\\)','عندما تكون الدالة Arc Cotangent.'],
['مشتقة القاطع العكسي','Inverse Secant','مشتقة الداخل على القيمة المطلقة للداخل مضروبة في جذر مربع الداخل ناقص واحد.','\\((\\sec^{-1}u)\'=\\dfrac{u\'}{|u|\\sqrt{u^2-1}}\\)','على المجال المعتاد.'],
['مشتقة قاطع التمام العكسي','Inverse Cosecant','سالب مشتقة الداخل على القيمة المطلقة للداخل مضروبة في جذر مربع الداخل ناقص واحد.','\\((\\csc^{-1}u)\'=-\\dfrac{u\'}{|u|\\sqrt{u^2-1}}\\)','على المجال المعتاد.'],

['مشتقة الجيب الزائدي','Hyperbolic Sine','مشتقة الجيب الزائدي هي جيب التمام الزائدي في مشتقة الداخل.','\\((\\sinh u)\'=u\'\\cosh u\\)','في الدوال الزائدية.'],
['مشتقة جيب التمام الزائدي','Hyperbolic Cosine','مشتقة جيب التمام الزائدي هي الجيب الزائدي في مشتقة الداخل.','\\((\\cosh u)\'=u\'\\sinh u\\)','في الدوال الزائدية.'],
['مشتقة الظل الزائدي','Hyperbolic Tangent','مشتقة الداخل في مربع القاطع الزائدي.','\\((\\tanh u)\'=u\'\\operatorname{sech}^2 u\\)','في الدوال الزائدية.'],
['مشتقة ظل التمام الزائدي','Hyperbolic Cotangent','سالب مشتقة الداخل في مربع قاطع التمام الزائدي.','\\((\\coth u)\'=-u\'\\operatorname{csch}^2 u\\)','في الدوال الزائدية.'],
['مشتقة القاطع الزائدي','Hyperbolic Secant','سالب مشتقة الداخل في القاطع الزائدي والظل الزائدي.','\\((\\operatorname{sech} u)\'=-u\'\\operatorname{sech} u\\tanh u\\)','في الدوال الزائدية.'],
['مشتقة قاطع التمام الزائدي','Hyperbolic Cosecant','سالب مشتقة الداخل في قاطع التمام الزائدي وظل التمام الزائدي.','\\((\\operatorname{csch} u)\'=-u\'\\operatorname{csch} u\\coth u\\)','في الدوال الزائدية.'],

['مشتقة الجيب الزائدي العكسي','Inverse Hyperbolic Sine','مشتقة الداخل على جذر 1 زائد مربع الداخل.','\\((\\sinh^{-1}u)\'=\\dfrac{u\'}{\\sqrt{1+u^2}}\\)','على المجال الحقيقي.'],
['مشتقة جيب التمام الزائدي العكسي','Inverse Hyperbolic Cosine','مشتقة الداخل على جذر مربع الداخل ناقص واحد.','\\((\\cosh^{-1}u)\'=\\dfrac{u\'}{\\sqrt{u^2-1}}\\)','على المجال \\(u>1\\).'],
['مشتقة الظل الزائدي العكسي','Inverse Hyperbolic Tangent','مشتقة الداخل على 1 ناقص مربع الداخل.','\\((\\tanh^{-1}u)\'=\\dfrac{u\'}{1-u^2}\\)','عندما \\(|u|<1\\).'],
['مشتقة ظل التمام الزائدي العكسي','Inverse Hyperbolic Cotangent','مشتقة الداخل على 1 ناقص مربع الداخل.','\\((\\coth^{-1}u)\'=\\dfrac{u\'}{1-u^2}\\)','عندما \\(|u|>1\\).'],
['مشتقة القاطع الزائدي العكسي','Inverse Hyperbolic Secant','سالب مشتقة الداخل على القيمة المطلقة للداخل مضروبة في جذر 1 ناقص مربع الداخل.','\\((\\operatorname{sech}^{-1}u)\'=-\\dfrac{u\'}{|u|\\sqrt{1-u^2}}\\)','على المجال \\(0<u\\le 1\\).'],
['مشتقة قاطع التمام الزائدي العكسي','Inverse Hyperbolic Cosecant','سالب مشتقة الداخل على القيمة المطلقة للداخل مضروبة في جذر 1 زائد مربع الداخل.','\\((\\operatorname{csch}^{-1}u)\'=-\\dfrac{u\'}{|u|\\sqrt{1+u^2}}\\)','على المجال \\(u\\ne 0\\).'],

['مشتقة اللوغاريتم الطبيعي','Natural Log','مشتقة الداخل مقسومة على الداخل.','\\((\\ln u)\'=\\dfrac{u\'}{u}\\)','عندما تكون الدالة ln لداخل موجب.'],
['مشتقة اللوغاريتم لأساس a','Log base a','مشتقة الداخل على (الداخل × ln a).','\\((\\log_a u)\'=\\dfrac{u\'}{u\\ln a}\\)','للأساس \\(a>0, a\\ne 1\\).'],
['مشتقة الدالة الأسية','Exponential','الدالة الأسية e مرفوعة للداخل، مضروبة في مشتقة الأس.','\\((e^u)\'=u\'e^u\\)','عندما تكون الدالة e مرفوعة لقوة.'],
['مشتقة الأساس الأسى a','Power base a','مشتقة الداخل × a^u × ln a.','\\((a^u)\'=u\'a^u\\ln a\\)','للأساس \\(a>0\\).'],

['قاعدة لوبيتال','L’Hôpital','في صورتي 0/0 أو ∞/∞ ومع تحقق الشروط، يمكن اشتقاق البسط والمقام كلٌّ على حدة.','\\(\\lim\\dfrac{f(x)}{g(x)}=\\lim\\dfrac{f\'(x)}{g\'(x)}\\)','بعد التحقق من شروط النظرية.'],
['متسلسلة ماكلورين','Maclaurin','متسلسلة تايلور عندما يكون مركز التوسع صفرًا.','\\(f(x)=\\sum_{n=0}^{\\infty}\\dfrac{f^{(n)}(0)}{n!}\\,x^n\\)','لتقريب الدوال حول x=0.'],
['متسلسلة تايلور','Taylor','توسع الدالة حول نقطة عامة a.','\\(f(x)=\\sum_{n=0}^{\\infty}\\dfrac{f^{(n)}(a)}{n!}\\,(x-a)^n\\)','لتقريب الدوال حول نقطة a.']
];

/* ============================================================
   بنك الأسئلة — كل الخيارات بصيغة MathJax
   كل عنصر: {q: السؤال, o: [خيارات], a: فهرس الصحيح, e: التفسير}
   ============================================================ */
const quizBank = [
{q:'إذا كانت \\(y=x^5+3x^3+8x+7\\)، فما المشتقة؟',o:['\\(5x^4+9x^2+8\\)','\\(5x^4+3x^2+8\\)','\\(x^4+9x^2+7\\)'],a:0,e:'نشتق كل حد: \\(5x^4\\) ثم \\(9x^2\\) ثم \\(8\\)، ومشتقة الثابت صفر.'},
{q:'إذا كانت \\(y=\\tan^{-1}(x^2)\\)، فما المشتقة؟',o:['\\(\\dfrac{2x}{1+x^4}\\)','\\(\\dfrac{1}{1+x^2}\\)','\\(-\\dfrac{2x}{1+x^4}\\)'],a:0,e:'قانون الظل العكسي: مشتقة الداخل على 1 زائد مربع الداخل.'},
{q:'ما الوصف الصحيح لقاعدة السلسلة؟',o:['\\(u\'v+uv\'\\)','مشتقة الخارج × مشتقة الداخل','\\(\\dfrac{u\'v-uv\'}{v^2}\\)'],a:1,e:'قاعدة السلسلة تستخدم مع الدالة داخل الدالة.'},
{q:'مشتقة \\(\\cos(3x)\\) تساوي:',o:['\\(\\sin(3x)\\)','\\(-\\sin(3x)\\)','\\(-3\\sin(3x)\\)'],a:2,e:'مشتقة cos سالبة sin، ونضرب في مشتقة الداخل 3.'},
{q:'مشتقة \\(\\ln(x^2+1)\\) تساوي:',o:['\\(\\dfrac{2x}{x^2+1}\\)','\\(\\dfrac{1}{x^2+1}\\)','\\(2x\\ln(x^2+1)\\)'],a:0,e:'مشتقة ln(u) هي مشتقة الداخل على الداخل.'},
{q:'أي صورة من الصور التالية تسمح بالنظر في تطبيق لوبيتال؟',o:['\\(\\dfrac{1}{0}\\) فقط','\\(\\dfrac{0}{0}\\) أو \\(\\dfrac{\\infty}{\\infty}\\)','أي كسر جبري'],a:1,e:'من أشهر صور لوبيتال غير المعينة صفر/صفر أو ما لا نهاية/ما لا نهاية.'},
{q:'متسلسلة ماكلورين هي متسلسلة تايلور حول:',o:['\\(a=1\\)','\\(a=-1\\)','\\(a=0\\)'],a:2,e:'ماكلورين هي الحالة الخاصة عندما يكون مركز التوسع صفرًا.'},
{q:'مشتقة \\(\\sinh(x)\\) هي:',o:['\\(\\cosh(x)\\)','\\(-\\cosh(x)\\)','\\(\\operatorname{sech}^2(x)\\)'],a:0,e:'مشتقة sinh هي cosh.'},
{q:'إذا كانت \\(y=(3x+1)^5\\)، فما المشتقة؟',o:['\\(15(3x+1)^4\\)','\\(5(3x+1)^4\\)','\\(3(3x+1)^5\\)'],a:0,e:'قاعدة السلسلة: ننزل الأس 5 ثم نضرب في مشتقة الداخل 3.'},
{q:'مشتقة \\(e^{2x}\\) تساوي:',o:['\\(e^{2x}\\)','\\(2e^{2x}\\)','\\(2xe^{2x}\\)'],a:1,e:'مشتقة e^u هي u′e^u، ومشتقة 2x تساوي 2.'},
{q:'مشتقة \\(\\ln(5x)\\) تساوي:',o:['\\(\\dfrac{1}{x}\\)','\\(\\dfrac{5}{x}\\)','\\(\\ln 5\\)'],a:0,e:'مشتقة ln(u) هي u′/u؛ إذن 5/(5x)=1/x.'},
{q:'إذا كانت \\(x=2t\\) و \\(y=t^2\\)، فإن \\(\\dfrac{dy}{dx}\\) تساوي:',o:['\\(t\\)','\\(2t\\)','\\(\\dfrac{t}{2}\\)'],a:0,e:'المشتقة البارامترية = (dy/dt)/(dx/dt)=2t/2=t.'},
{q:'إذا كانت \\(y=\\sin^{-1}(3x)\\)، فالمشتقة:',o:['\\(\\dfrac{3}{\\sqrt{1-9x^2}}\\)','\\(\\dfrac{1}{\\sqrt{1-9x^2}}\\)','\\(-\\dfrac{3}{\\sqrt{1-9x^2}}\\)'],a:0,e:'قانون الجيب العكسي: مشتقة الداخل على جذر 1 ناقص مربع الداخل.'},
{q:'مشتقة \\(\\cosh(x)\\) هي:',o:['\\(\\sinh(x)\\)','\\(-\\sinh(x)\\)','\\(\\operatorname{sech}^2(x)\\)'],a:0,e:'مشتقة جيب التمام الزائدي هي الجيب الزائدي.'},
{q:'مشتقة \\(\\tanh(2x)\\) تساوي:',o:['\\(\\operatorname{sech}^2(2x)\\)','\\(2\\operatorname{sech}^2(2x)\\)','\\(-2\\operatorname{sech}^2(2x)\\)'],a:1,e:'مشتقة الظل الزائدي = مشتقة الداخل × مربع القاطع الزائدي.'},
{q:'إذا كانت \\(y=x^3\\ln x\\)، نستخدم أساسًا:',o:['قاعدة الضرب','قاعدة القسمة فقط','قاعدة القوة فقط'],a:0,e:'الدالة حاصل ضرب x³ في ln x، لذلك نستخدم قاعدة الضرب.'},
{q:'مشتقة \\(\\dfrac{x^2+1}{x}\\) يمكن إيجادها باستخدام:',o:['قاعدة القسمة','قاعدة السلسلة فقط','قاعدة الثابت'],a:0,e:'الصيغة كسر بين دالتين؛ قاعدة القسمة مناسبة.'},
{q:'المشتقة الثانية تعني:',o:['اشتقاق المشتقة الأولى مرة أخرى','تربيع المشتقة الأولى','اشتقاق الدالة مرتين دون ترتيب'],a:0,e:'نوجد y′ أولًا ثم نشتقها لنحصل على y″.'},
{q:'في متسلسلة تايلور حول \\(a\\)، نستخدم القوى:',o:['\\((x-a)^n\\)','\\(x^n\\) فقط دائمًا','\\((x+a)^n\\) دائمًا'],a:0,e:'مركز التوسع a يجعل حدود المتسلسلة على صورة (x−a)^n.'},
{q:'متسلسلة ماكلورين هي تايلور عندما:',o:['\\(a=0\\)','\\(a=1\\)','\\(a\\to\\infty\\)'],a:0,e:'ماكلورين حالة خاصة يكون فيها مركز التوسع صفرًا.'},
{q:'قبل تطبيق قاعدة لوبيتال يجب:',o:['التحقق من صورة غير معينة وشروط النظرية','اشتقاق المقام فقط','تعويض صفر دائمًا'],a:0,e:'لا تطبق القاعدة إلا بعد التأكد من صورة 0/0 أو ∞/∞.'},
{q:'مشتقة \\(\\cot(x)\\) تساوي:',o:['\\(-\\csc^2(x)\\)','\\(\\sec^2(x)\\)','\\(\\csc^2(x)\\)'],a:0,e:'مشتقة ظل التمام سالبة مربع قاطع التمام.'},
{q:'مشتقة \\(\\sec(x)\\) تساوي:',o:['\\(\\sec(x)\\tan(x)\\)','\\(-\\sec(x)\\tan(x)\\)','\\(\\sec^2(x)\\)'],a:0,e:'مشتقة القاطع هي القاطع في الظل.'},
{q:'إذا \\(y=\\cos(x^2)\\)، فالمشتقة:',o:['\\(-2x\\sin(x^2)\\)','\\(-\\sin(x^2)\\)','\\(2x\\cos(x^2)\\)'],a:0,e:'مشتقة cos سالبة sin، ثم نضرب في مشتقة الداخل x² وهي 2x.'},
{q:'مشتقة \\(\\sinh(4x)\\) تساوي:',o:['\\(4\\cosh(4x)\\)','\\(\\cosh(4x)\\)','\\(4\\sinh(4x)\\)'],a:0,e:'مشتقة الجيب الزائدي هي جيب التمام الزائدي في مشتقة الداخل.'},
{q:'مشتقة \\(\\cos^{-1}(x)\\) تساوي:',o:['\\(-\\dfrac{1}{\\sqrt{1-x^2}}\\)','\\(\\dfrac{1}{\\sqrt{1-x^2}}\\)','\\(-\\dfrac{1}{1+x^2}\\)'],a:0,e:'مشتقة جيب التمام العكسي سالبة.'},
{q:'مشتقة \\(\\tan^{-1}(5x)\\) تساوي:',o:['\\(\\dfrac{5}{1+25x^2}\\)','\\(\\dfrac{1}{1+25x^2}\\)','\\(\\dfrac{5}{1+5x^2}\\)'],a:0,e:'مشتقة الظل العكسي: مشتقة الداخل على 1 زائد مربع الداخل.'},
{q:'إذا \\(y=x^4\\)، فإن \\(y\'\'\\) تساوي:',o:['\\(12x^2\\)','\\(4x^3\\)','\\(24x\\)'],a:0,e:'y′=4x³ ثم y″=12x².'},
{q:'مشتقة \\(\\ln(\\sin x)\\) تساوي:',o:['\\(\\cot x\\)','\\(\\tan x\\)','\\(\\cos x\\)'],a:0,e:'مشتقة ln(u)=u′/u؛ cos x/sin x=cot x.'},
{q:'إذا كانت \\(y=e^x\\)، فإن المشتقة الثالثة:',o:['\\(e^x\\)','\\(3e^x\\)','\\(0\\)'],a:0,e:'مشتقة e^x تظل e^x عند كل رتبة.'},
{q:'في الاشتقاق الضمني، عند اشتقاق \\(y^2\\) بالنسبة إلى \\(x\\):',o:['\\(2y\\,y\'\\)','\\(2y\\)','\\(2y\'\\)'],a:0,e:'نعتبر y دالة في x، فنطبق السلسلة.'},
{q:'إذا \\(x=f(t)\\) و \\(y=g(t)\\)، فإن \\(\\dfrac{dy}{dx}\\):',o:['\\(\\dfrac{dy/dt}{dx/dt}\\)','\\(\\dfrac{dx/dt}{dy/dt}\\)','\\(\\dfrac{dx}{dt}+\\dfrac{dy}{dt}\\)'],a:0,e:'هذه قاعدة اشتقاق الدوال البارامترية.'},
{q:'مشتقة \\(\\dfrac{1}{x}\\) تساوي:',o:['\\(-\\dfrac{1}{x^2}\\)','\\(\\dfrac{1}{x^2}\\)','\\(\\ln x\\)'],a:0,e:'نكتبها x⁻¹ ونشتق بقاعدة القوة: −1·x⁻².'},
{q:'مشتقة \\(\\sqrt{x}\\) تساوي:',o:['\\(\\dfrac{1}{2\\sqrt{x}}\\)','\\(\\dfrac{1}{\\sqrt{x}}\\)','\\(2\\sqrt{x}\\)'],a:0,e:'نكتبها x^{1/2}، ثم (1/2)x^{-1/2}.'},
{q:'مشتقة \\(x\\sin x\\) تساوي:',o:['\\(\\sin x+x\\cos x\\)','\\(\\cos x\\)','\\(x\\cos x\\)'],a:0,e:'قاعدة الضرب: مشتقة الأول في الثاني + الأول في مشتقة الثاني.'},
{q:'إذا كانت \\(y=\\log_{10} x\\)، فالمشتقة:',o:['\\(\\dfrac{1}{x\\ln 10}\\)','\\(\\dfrac{1}{x}\\)','\\(\\ln 10\\)'],a:0,e:'مشتقة log_a u = u′/(u ln a).'}
];

/* اختبارات مقترحة */
const tests = [
  {name:'أساسيات الاشتقاق',qIds:[0,8,11,35,36]},
  {name:'قاعدة السلسلة',qIds:[2,3,9,23]},
  {name:'الدوال المثلثية',qIds:[3,21,22,28]},
  {name:'الدوال العكسية',qIds:[1,12,25,26]},
  {name:'الزائدية والأسية',qIds:[7,13,14,24]},
  {name:'الاشتقاق الضمني والبارامتري',qIds:[11,31,32]},
  {name:'لوبيتال والمتسلسلات',qIds:[5,6,18,19,20]},
  {name:'اختبار شامل',qIds:[0,1,2,3,4,5,6,7,8,9]}
];
/* ============================================================
   ربط كل درس بأسئلة اختبار نهائي (10 أسئلة لكل درس)
   ============================================================ */
const lessonQuizzes = {
  basic:      [0,8,11,32,33,34,35,36,16,17],
  trig:       [3,4,21,22,23,28,29,16,17,0],
  inverse:    [1,12,25,26,27,16,17,0,3,9],
  chain:      [2,8,9,23,29,34,35,0,3,16],
  logexp:     [4,10,30,37,31,0,16,17,8,9],
  hyper:      [7,13,14,24,28,29,16,17,0,3],
  second:     [16,17,27,0,8,9,29,34,35,3],
  proof:      [0,2,5,8,9,16,23,34,35,36],
  implicit:   [31,16,17,0,8,9,29,3,32,34],
  parametric: [11,31,32,16,17,29,0,8,9,3],
  logdiff:    [10,4,30,31,0,16,8,9,3,17],
  higher:     [16,17,27,8,9,29,0,3,35,36],
  lhopital:   [5,20,6,19,18,0,2,4,8,16],
  maclaurin:  [6,19,18,5,20,0,2,4,8,16],
  taylor:     [18,19,20,6,5,0,2,4,8,16]
};
/* ============================================================
   فيديوهات قائمة التشغيل — مرتبة بالتسلسل
   ملاحظة مهمة: املأ الحقول title/desc/type من قائمة التشغيل الفعلية.
   كل عنصر: { id, title, desc, type, ytId }
   - ytId = معرف الفيديو على YouTube (الجزء بعد v= أو بعد youtu.be/)
   - type = مفتاح التصنيف من قائمة videoFilter
   ============================================================ */
/* ============================================================
   فيديوهات قائمة التشغيل — العناوين والروابط الفعلية
   الترتيب: ترتيب الشرح المنطقي (من الأساسيات إلى المتسلسلات)
   ============================================================ */
const playlistId = 'PLYvBQARQqTs0xz4oojhdpYwoPEhmJujmM';

const videos = [
  {
    id: 1,
    title: 'قاعدة التفاضل الأساسية',
    desc: 'مقدمة في التفاضل: قاعدة الثابت، قاعدة القوة، وقواعد الجمع والطرح الأساسية.',
    type: 'basic',
    ytId: 'piwOyMxeLDg'
  },
  {
    id: 2,
    title: 'قاعدة قوس مرفوع لأس',
    desc: 'اشتقاق دالة داخل قوس مرفوع لقوة، مع تطبيق قاعدة السلسلة على القوس.',
    type: 'chain',
    ytId: 'W98a11u4dzg'
  },
  {
    id: 3,
    title: 'قاعدة حاصل ضرب دالتين',
    desc: 'تطبيق قاعدة الضرب (u·v)′ = u′v + uv′ على دوال مختلفة.',
    type: 'basic',
    ytId: 'STCiIeY8TZg'
  },
  {
    id: 4,
    title: 'قاعدة خارج قسمة دالتين',
    desc: 'تطبيق قاعدة القسمة (u/v)′ = (u′v − uv′)/v² خطوة بخطوة.',
    type: 'basic',
    ytId: 'j3SvrF67n1c'
  },
  {
    id: 5,
    title: 'قاعدة الجذر التربيعي',
    desc: 'اشتقاق الجذور التربيعية بتحويلها إلى أسس كسرية ثم تطبيق قاعدة القوة.',
    type: 'basic',
    ytId: '_1iwWcV_IWY'
  },
  {
    id: 6,
    title: 'قاعدة أي جذر غير الجذر التربيعي',
    desc: 'اشتقاق الجذور من الرتب الأعلى (التكعيبية والرابعة...) بصيغة الأسس الكسرية.',
    type: 'basic',
    ytId: 'zLlr81BPDug'
  },
  {
    id: 7,
    title: 'قاعدة السلسلة',
    desc: 'شرح قاعدة السلسلة dy/dx = (dy/du)·(du/dx) مع أمثلة متنوعة.',
    type: 'chain',
    ytId: 'DQZV4p36fgU'
  },
  {
    id: 8,
    title: 'حل مسائل على قواعد الدوال الأساسية',
    desc: 'تطبيقات وأمثلة محلولة تجمع بين القواعد الأساسية (القوة والضرب والقسمة والسلسلة).',
    type: 'basic',
    ytId: 'kGv-inVZEvk'
  },
  {
    id: 9,
    title: 'التفاضل الضمني',
    desc: 'اشتقاق المعادلات التي تحتوي x وy معًا، واعتبار y دالة في x.',
    type: 'implicit',
    ytId: '1EGFaOqU328'
  },
  {
    id: 10,
    title: 'قاعدة تفاضل الدوال المثلثية',
    desc: 'مشتقات sin وcos وtan وcot وsec وcsc مع تطبيق قاعدة السلسلة.',
    type: 'trig',
    ytId: 'gj1zZiH0ofE'
  },
  {
    id: 11,
    title: 'قاعدة تفاضل الدوال المثلثية العكسية',
    desc: 'مشتقات الدوال العكسية الست (sin⁻¹, cos⁻¹, tan⁻¹...) وقواعد المقامات والإشارات.',
    type: 'inverse',
    ytId: 'ioC1e77GsXk'
  },
  {
    id: 12,
    title: 'حل مسائل على تفاضل الدوال المثلثية',
    desc: 'تطبيقات محلولة على مشتقات الدوال المثلثية مع السلسلة والضرب.',
    type: 'trig',
    ytId: 'R5rAApGGLwM'
  },
  {
    id: 13,
    title: 'حل مسائل على قواعد الدوال المثلثية العكسية',
    desc: 'أمثلة محلولة على مشتقات الدوال المثلثية العكسية بأنواع مختلفة.',
    type: 'inverse',
    ytId: 'QxcrD1giFEg'
  },
  {
    id: 14,
    title: 'تفاضل الدوال الأسية',
    desc: 'مشتقة e^x والدوال الأسية ذات الأساس a، مع تطبيق قاعدة السلسلة.',
    type: 'logexp',
    ytId: 'FuqoRm6Guag'
  },
  {
    id: 15,
    title: 'تفاضل الدوال اللوغاريتمية',
    desc: 'مشتقة ln(x) وlog_a(x) وتطبيقات قاعدة السلسلة على اللوغاريتمات.',
    type: 'logexp',
    ytId: 'grxzw7H7BWA'
  },
  {
    id: 16,
    title: 'مفكوك تايلور وماكلورين',
    desc: 'شرح متسلسلة تايلور وماكلورين وطريقة بناء المفكوك مع أمثلة.',
    type: 'series',
    ytId: '9usPhNSQihE'
  }
];

/* أسماء الأنواع للعرض */
const videoTypeLabels = {
  all:'كل الأنواع', basic:'تفاضل أساسي', trig:'مثلثي', inverse:'مثلثي عكسي',
  chain:'قاعدة السلسلة', logexp:'أسّي ولوغاريتمي', hyper:'زائدي',
  implicit:'ضمني', parametric:'بارامتري', higher:'مشتقات عليا',
  series:'متسلسلات', limits:'نهايات ولوبيتال'
};
