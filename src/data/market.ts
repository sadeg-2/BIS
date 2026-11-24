// Labour-market figures used in the curriculum report (22 Nov 2026). Each block names its source.
export const SOURCES = {
  so25: { name: 'Stack Overflow Developer Survey 2025', url: 'https://survey.stackoverflow.co/2025/developers/' },
  so26: { name: 'Stack Overflow Developer Survey 2026', url: 'https://survey.stackoverflow.co/2026/technology' },
  bls: { name: 'US BLS Employment Projections 2025–35', url: 'https://www.bls.gov/emp/tables/occupational-projections-and-characteristics.htm' },
  etf: { name: 'European Training Foundation 2026', url: 'https://www.etf.europa.eu/sites/default/files/2026-06/Employment%20Prospects%20for%20Palestinians%20in%20Europe%20and%20the%20Gulf_%20Insights%20from%20Online%20Labour%20Market%20Data_final.pdf' },
  ai: { name: 'Stanford AI Index 2026, Economy', url: 'https://hai.stanford.edu/assets/files/ai_index_report_2026_chapter_4_economy.pdf' },
  uae: { name: 'LinkedIn UAE via MENAFN', url: 'https://menafn.com/1111967459/UAE-Job-Hiring-Recovers-From-40-Slump-As-Demand-For-AI-Engineers-Surges-232' },
  pcbs: { name: 'PCBS Labour Force Survey Q2 2026', url: 'https://www.pcbs.gov.ps/en/post-details/?postId=26648' },
  trade: { name: 'trade.gov', url: 'https://www.trade.gov/market-intelligence/west-banks-palestinian-tech-sector' },
  pt: { name: 'Portland Trust 2022', url: 'https://www.digitaldevelopment.org/wp-content/uploads/2023/08/Palestinian-Tech-Ecosystem-Portland-Trust.pdf' },
  spark: { name: 'SPARK 2025', url: 'https://hub.spark.ngo/blogs/101/Market-Research-Assessment-Palestine-Launchpad-with-Google' },
} as const

export type SourceId = keyof typeof SOURCES

export interface Headline {
  value: string
  label: string
  src: SourceId
}

export interface Wave {
  name: string
  months: string
  wave?: 1 | 2 | 3
  items?: string
  extra?: string
  gate: string
}

export const HEADLINES: Headline[] = [
  { value: '41.2%', label: 'من المطورين يعملون في Full Stack وBackend', src: 'so25' },
  { value: '+34.6%', label: 'النمو المتوقع لعلماء البيانات حتى 2035', src: 'bls' },
  { value: '+232%', label: 'زيادة الطلب على مهندسي AI في الإمارات خلال سنة', src: 'uae' },
  { value: '38.3%', label: 'بطالة الخريجين بعمر 19–29 في الضفة', src: 'pcbs' },
]

export const PALESTINE: { k: string; v: string; note: string; src: SourceId }[] = [
  { k: 'البطالة العامة', v: '27.9%', note: 'الربع الثاني 2026، الضفة', src: 'pcbs' },
  { k: 'بطالة الخريجين 19–29', v: '38.3%', note: 'ذكور 23.1%، إناث 51.2%', src: 'pcbs' },
  { k: 'مساهمة قطاع التقنية', v: '3.1% من الناتج', note: '482 مليون دولار، 2022', src: 'trade' },
  { k: 'العاملون في القطاع', v: '9,558', note: 'في 450 شركة، 2022', src: 'trade' },
  { k: 'خريجو التقنية سنوياً', v: '+2,500', note: 'من 13 جامعة', src: 'trade' },
  { k: 'خريجو التقنية في وظيفة رسمية', v: '24.7%', note: 'خلال عقد، 2022', src: 'pt' },
  { k: 'العمل الحر', v: '31.8%', note: 'من مجموع الكفاءات على المنصات', src: 'pt' },
  { k: 'بطالة خريجي التقنية', v: '+50%', note: 'منهجية غير معلنة', src: 'spark' },
]

export const ROLES: [string, number][] = [
  ['Full-stack developer', 27], ['Back-end developer', 14.2], ['Architect', 6.1], ['Front-end developer', 4.3],
  ['Mobile developer', 3], ['Embedded developer', 2.8], ['DevOps engineer', 2.3], ['Data engineer', 1.7],
  ['AI/ML engineer', 1.4], ['Data scientist', 1.2], ['Cybersecurity', 1.1], ['Cloud infrastructure', 1],
  ['Data or business analyst', 0.9], ['QA or test developer', 0.8],
]

export const GROWTH: [string, number, number][] = [
  ['Data scientists', 34.6, 24800], ['Computer research scientists', 21.8, 2900], ['Information security analysts', 21.0, 14100],
  ['IT managers', 15.8, 53500], ['Software developers', 10.2, 95300], ['Database architects', 9.4, 3900],
  ['Systems analysts', 7.9, 32900], ['Network architects', 7.7, 9600], ['Project management specialists', 6.7, 76500],
  ['Web and interface designers', 6.0, 8300], ['QA analysts and testers', 5.7, 10700], ['Web developers', 3.8, 5300],
  ['Database administrators', -0.1, 3300], ['IT support specialists', -3.5, 39700], ['Network and system administrators', -4.1, 13400],
  ['Computer programmers', -7.3, 4400],
]

export const ETF_JOBS: [string, number][] = [
  ['Programme funding manager', 2172], ['Project manager', 1770], ['Business analyst', 1519], ['Financial auditor', 1202],
  ['HR manager', 1080], ['Software developer', 929], ['Investment manager', 878], ['ICT system analyst', 678], ['Accountant', 590],
]

export const ETF_SKILLS: [string, number][] = [
  ['Communication', 1153], ['Project Management', 495], ['English Language', 468], ['Microsoft Excel', 392],
  ['Computer Science', 297], ['SQL', 243], ['Agile Methodology', 229], ['Data Analysis', 222], ['Python', 221], ['Arabic Language', 40],
]

export const TECH: [string, number][] = [
  ['JavaScript', 62.0], ['SQL', 58.4], ['HTML/CSS', 58.2], ['Python', 58.0], ['PostgreSQL', 57.9], ['Bash/Shell', 51.3],
  ['TypeScript', 43.8], ['Java', 27.6], ['C#', 27.1], ['C++', 24.3],
]

export const AI_SKILLS: [string, number, string][] = [
  ['Generative AI', 138188, '+111%'], ['Large language modeling', 38526, '+102%'], ['Prompt engineering', 22227, '+261%'],
  ['Retrieval augmented generation', 12609, '+337%'], ['Multimodal models', 1459, '+137%'], ['Context engineering', 703, '+7,711%'],
]

export const AI_USE: Headline[] = [
  { value: '66%', label: 'يستخدمون مساعدات أو وكلاء البرمجة', src: 'so26' },
  { value: '48%', label: 'يثقون بمخرجات AI فقط عندما يسهل التحقق منها', src: 'so26' },
  { value: '18.9%', label: 'من إعلانات AI الأمريكية تذكر Agentic AI في 2025', src: 'ai' },
  { value: '~20%', label: 'انخفاض عدد المطورين العاملين بعمر 22–25 في أمريكا منذ 2024', src: 'ai' },
]

export const SCORING: string[][] = [
  ['الحصة العالمية (Stack Overflow 2025)', '10% فأكثر', 'من 2% إلى أقل من 10%', 'أقل من 2% أو غير مقاسة'],
  ['الفرص السنوية (BLS)', '50,000 فأكثر', 'من 10,000 إلى أقل من 50,000', 'أقل من 10,000'],
  ['النمو (BLS)', '15% فأكثر', 'أعلى من 5.7%', '5.7% فأقل'],
  ['دليل فلسطيني أو خليجي', 'المهنة مذكورة برقم', 'مهاراتها فقط مذكورة', 'لم نجد دليلاً'],
]

export const WAVES: Wave[] = [
  { name: 'التحضير', months: '1–3', items: 'إعداد المواد، واختيار المدربين، وتجهيز المختبر', gate: 'مناهج الموجة الأولى مراجعة والمدربون جاهزون' },
  { wave: 1, name: 'الموجة الأولى', months: '4–9', extra: 'ومعها أربع مواد: Python وSQL وDSA والإنجليزية التقنية', gate: 'استمرار 80% من الطلاب في الشهر الثامن، وخمسة شركاء مشاريع' },
  { wave: 2, name: 'الموجة الثانية', months: '10–17', gate: 'إكمال 75% من المسارات المنتهية، وبيانات أولية عن عمل خريجيها' },
  { wave: 3, name: 'الموجة الثالثة', months: '18–24', gate: 'مراجعة سنوية للأرقام والمناهج' },
]

export const KPIS: [string, string][] = [['إكمال المسار', '75%'], ['نجاح اختبار المستوى من أول مرة', '70%'], ['مشروع لجهة حقيقية', '100%'], ['عمل أو دخل حر بعد 6 أشهر', '60%'], ['رضا جهة المشروع', '4/5']]

export const LIMITS: string[] = [
  'لم نجد إحصائية منشورة لحصة كل تخصص داخل فلسطين. الترتيب مبني على مؤشرات بديلة، أغلبها عالمي أو أمريكي.',
  'أرقام BLS أمريكية، واستطلاع Stack Overflow عينة اختيارية من المبرمجين، وعينة ETF مجمعة بكلمات مرتبطة بفلسطين.',
  'الدرجات والساعات والمناهج وخطة استخدام AI تصميم مهني من معدّ التقرير، وتحتاج مراجعة مختصين قبل التدريس.',
  'أرقام PCBS من مقتطف بيان رسمي، لأن موقعه لم يفتح أثناء البحث.',
]
