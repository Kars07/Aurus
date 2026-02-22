export const doctorPatients = [
  {
    id: 'p001',
    name: 'Marcus Reid',
    age: 42,
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    condition: 'Chronic Pain Management',
    conditionTag: 'Musculoskeletal',
    conditionColor: 'bg-amber-100 text-amber-700',
    reportDate: 'Feb 21, 2026',
    reportStatus: 'unread',
    riskLevel: 'High',
    riskColor: 'bg-red-100 text-red-700',
    report: {
      hpi: "Patient Marcus Reid, 42M, presents with an 8-month history of progressive lower back and hip pain following a workplace injury. Pain rated 7/10 on the NRS, worse with prolonged sitting and ambulation. Patient reports disrupted sleep patterns and emotional distress secondary to pain. Current medications include NSAIDs with partial relief.",
      assessment: [
        "Chronic lumbar radiculopathy with secondary myofascial involvement",
        "Sleep disturbance secondary to chronic pain – moderate severity",
        "Elevated acute stress markers (keystroke erraticism pattern detected by Auris telemetry)",
        "Reduced mobility index – 53% upper limb, 43% lower extremity"
      ],
      plan: [
        "Refer to Pain Management Specialist for interventional review",
        "Initiate physical therapy – core stabilization and mobility program",
        "Consider gabapentinoids for neuropathic component",
        "Schedule Auris telemetry review in 72 hours",
        "Psychological support referral – cognitive behavioral therapy for chronic pain"
      ],
      suggestedQuestions: [
        "Has your pain changed in character recently?",
        "Are you experiencing any new neurological symptoms (tingling, numbness)?",
        "How is your sleep quality affecting your daily function?"
      ],
      aurisInsight: "Auris telemetry detected elevated vocal cadence stress markers over the past 5 sessions. Flare risk index is currently 82% – high probability of exacerbation within 72 hours without intervention."
    },
    messages: [
      { id: 1, from: 'patient', text: "Dr. Chambers, I've been getting more headaches this week on top of the back pain. Should I be worried?", time: '9:15 AM', date: 'Feb 21' },
      { id: 2, from: 'doctor', text: "Thanks for flagging that, Marcus. Headaches can sometimes be tension-related given your pain levels. I'd like to see you this week. Can you come in Thursday?", time: '10:02 AM', date: 'Feb 21' },
      { id: 3, from: 'patient', text: "Thursday works. Should I bring my medication list?", time: '10:30 AM', date: 'Feb 21' },
    ]
  },
  {
    id: 'p002',
    name: 'Aisha Okonkwo',
    age: 35,
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    condition: 'Hypertension & Fatigue',
    conditionTag: 'Cardiovascular',
    conditionColor: 'bg-rose-100 text-rose-700',
    reportDate: 'Feb 20, 2026',
    reportStatus: 'read',
    riskLevel: 'Medium',
    riskColor: 'bg-amber-100 text-amber-700',
    report: {
      hpi: "Ms. Aisha Okonkwo, 35F, presents with a 3-month history of persistent fatigue, occasional palpitations, and elevated blood pressure readings averaging 138/92 mmHg at home. Patient reports high occupational stress and reduced physical activity. Sleep quality has been poor. No chest pain or dyspnea reported.",
      assessment: [
        "Stage 1 Hypertension – likely stress-potentiated",
        "Chronic fatigue syndrome – contributing factors include sleep deprivation and high cortisol",
        "Vagal tone index below baseline – Auris HRV data shows parasympathetic suppression",
        "No acute cardiac findings – however warrants monitoring"
      ],
      plan: [
        "Initiate low-dose antihypertensive therapy if lifestyle measures fail at 4-week review",
        "Structured sleep hygiene programme",
        "Daily HRV monitoring via Auris – alert threshold set at 35ms",
        "Nutritional consult – DASH diet recommendation",
        "Counselling for occupational stress – EAP referral"
      ],
      suggestedQuestions: [
        "How many hours of uninterrupted sleep are you getting per night?",
        "Have your palpitation episodes increased in frequency?",
        "Are you actively monitoring your blood pressure at home?"
      ],
      aurisInsight: "Auris HRV analysis shows vagal tone consistently below baseline (avg RMSSD: 28ms, target >45ms). Stress-induced hypertension is likely contributing. Recommend biofeedback breathing protocol as adjunct therapy."
    },
    messages: [
      { id: 1, from: 'patient', text: "Doctor, my BP was 142/94 this morning. Should I start the medication now or wait?", time: '7:40 AM', date: 'Feb 20' },
    ]
  },
  {
    id: 'p003',
    name: 'Jerome Akintola',
    age: 58,
    avatar: 'https://randomuser.me/api/portraits/men/68.jpg',
    condition: 'Diabetes & Joint Pain',
    conditionTag: 'Metabolic',
    conditionColor: 'bg-blue-100 text-blue-700',
    reportDate: 'Feb 19, 2026',
    reportStatus: 'read',
    riskLevel: 'Low',
    riskColor: 'bg-emerald-100 text-emerald-700',
    report: {
      hpi: "Mr. Jerome Akintola, 58M, with known Type 2 Diabetes (HbA1c 7.4% at last check) and osteoarthritis of the bilateral knees. Patient reports improved glycaemic control since dietary changes 3 months ago. Knee pain is 4/10 but limits stair climbing. No new symptoms.",
      assessment: [
        "Type 2 Diabetes – well-controlled on current regimen",
        "Bilateral knee osteoarthritis – moderate, non-surgical at this stage",
        "Walking steps trending upward per Auris data – positive lifestyle progression",
        "No acute complications identified"
      ],
      plan: [
        "Continue current diabetic medication regimen",
        "Physiotherapy for knee strengthening exercises",
        "HbA1c recheck in 3 months",
        "Maintain 7000+ daily step target via Auris tracking",
        "Annual retinal and foot exam due next month"
      ],
      suggestedQuestions: [
        "How are your blood sugar readings looking day-to-day?",
        "Is the knee pain affecting your walking programme?",
        "Any new symptoms since your last visit?"
      ],
      aurisInsight: "Auris step tracking shows 23% improvement over 6 weeks (avg 7,200 steps/day). Flare risk index is low at 18%. Patient is responding well to lifestyle intervention. Monitor for potential HbA1c improvement at next check."
    },
    messages: [
      { id: 1, from: 'patient', text: "My knee has been feeling slightly better after the exercises you recommended. Blood sugar was 6.2 this morning!", time: '8:10 AM', date: 'Feb 19' },
      { id: 2, from: 'doctor', text: "Excellent news, Jerome! That's a fantastic reading. Keep up with the exercises and check in on Friday with your week's readings.", time: '9:00 AM', date: 'Feb 19' },
    ]
  },
];
