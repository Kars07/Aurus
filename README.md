# Auris

Auris is an intelligent, voice-first health companion that bridges the gap between home care and the clinic, designed to empower patients with chronic conditions and combat medical gaslighting.


## 🩺 The Problem

Chronic diseases require continuous management, but the current healthcare system relies almost entirely on episodic care. Between sparse appointments, patients struggle to accurately track complex symptoms, identify early warning signs of flare-ups, and effectively communicate their day-to-day lived experiences to their doctors. This disconnect often results in delayed interventions, physicians dismissing invisible symptoms (medical gaslighting), and compromised patient outcomes.

## 💡 The Solution

Auris is a 24/7 advocate and monitor that removes the friction of health tracking. By utilizing passive ambient telemetry and simple voice journaling, Auris continuously monitors patient well-being, predicts flare-ups before they happen, and automatically synthesizes rich, FHIR-approximated clinical reports. This ensures doctors get the objective data they need, and patients get the care they deserve.

## 🚀 What It Does

1. **Passive Ambient Monitoring (Aegis Protocol):** Runs in the background analyzing metrics like vocal cadence and keystroke erraticism to detect hidden neurological stress or pain without requiring manual input.
2. **Voice-First Journaling:** Patients simply hold a button and speak freely about their day. No complex forms, drop-downs, or sliding scales.
3. **Real-time AI Interventions:** Based on telemetry and journal inputs, Auris delivers personalized, real-time nudges to prevent symptom escalation.
4. **Clinical Synthesis:** Transforms messy, emotional daily logs into highly structured, objective clinical reports (HPI, Assessment, Plan) that doctors can instantly review via the secure Doctor Portal.

## ✨ Key Features

- **Flare Radar Predictor:** Predicts the likelihood of an impending symptom flare-up based on real-time biometric and behavioral data streaming.
- **Vagal Tone Biofeedback Widget:** Monitors autonomic nervous system stress and guides patients through real-time interventions (like 4-7-8 breathing) when stress spikes.
- **AI Health Detective:** A conversational interface where patients can ask "What if" queries about their health logs, discovering hidden correlations (e.g., "Does my sleep quality drop on days my keystroke erraticism is high?").
- **Patient Advocate Brief:** Automatically generates assertive, medically sound scripts and test demands to help patients advocate for themselves during appointments, directly combating medical gaslighting.
- **Live Patient-Doctor Chat:** A secure, MongoDB-backed messaging interface allowing direct communication and report sharing between patients and their physicians.

## 📖 Real-World Scenarios (How It Works in Practice)

To help judges visualize the impact of Auris, here are three core use-cases the app addresses:

### Scenario 1: The "Invisible" Flare-Up (Aegis Protocol)

- **The Problem:** Sarah, suffering from Rheumatoid Arthritis, is having a stressful workday. She is hyper-focused on her screen and hasn't realized her physical pain and systemic inflammation are silently escalating.
- **The Auris Action:** Auris detects high keystroke erraticism and a drop in vocal cadence during a morning presentation. The *Flare Radar Predictor* calculates an 85% chance of a severe joint flare by evening. The *Vagal Tone Biofeedback Widget* gently interrupts her screen time, guiding her through a 2-minute breathing exercise and suggesting she take her PRN medication now, completely averting the crisis before the pain becomes unbearable.

### Scenario 2: Defeating Medical Gaslighting (Patient Advocate Brief)

- **The Problem:** David, experiencing chronic fatigue and unexplained nerve pain, has a specialist appointment tomorrow. Historically, doctors have told him "it's just stress," leaving him feeling dismissed and untreated.
- **The Auris Action:** David speaks his unstructured, emotional symptoms into the app all week. Auris's *Clinical Summarizer* structures this into an objective, undeniable report showing his physiological toll over time. More importantly, the *Patient Advocate* persona generates a specific script for David: *"I understand you think this is stress, but my objective telemetry data shows a 45% drop in motor function on high-pain days, and I am formally requesting an EMG nerve conduction study today."*

### Scenario 3: The High-Efficiency Doctor Visit (Clinical Interoperability)

- **The Problem:** Dr. Chambers has only 15 minutes per patient. Usually, she spends 10 chaotic minutes trying to parse a patient's scattershot recounting of the last two months, leaving only 5 to diagnose and treat.
- **The Auris Action:** Dr. Chambers opens the Auris *Doctor Portal*. Instantly, she sees David's AI-generated *Clinical Synthesis Snapshot*. It's pre-formatted with exactly what she wants to see: HPI (History of Present Illness), Objective telemetry data, and a proposed Assessment & Plan. She spends 2 minutes reviewing the undeniable data, and 13 minutes actually treating the patient and answering the *AI-Suggested Collaborative Questions* that Auris pre-prepared for David.

## 🤖 AI Tools Used

- **NVIDIA Llama-3.1-Nemotron-70B-Instruct:** Powers our advanced reasoning agent to execute deep clinical analysis and extract insights from unstructured patient speech.
- **NVIDIA Agentic Tooling (NAT):** Utilized to build a scalable, multi-persona agentic system that intelligently routes tasks.
- **Specialized Agentic Personas:**
  - *Empathetic Ally:* Processes raw patient journaling, providing immediate, emotionally intelligent support.
  - *Clinical Summarizer:* Standardizes unstructured logs into professional medical formats (HPI, Objective, Assessment, Plan).
  - *Flare Predictor & Advocate:* Analyzes multi-modal data streams for predictive modeling and generates self-advocacy scripts.

## 🛠️ Technologies Used

- **Frontend:** React 18, Vite, Tailwind CSS, Lucide React (Icons), Recharts (Data Visualization).
- **Backend (Auth & Data):** Node.js, Express.js, MongoDB + Mongoose, JWT Authentication.
- **Backend (AI & Telemetry):** Python, FastAPI, WebSockets (for real-time Aegis Protocol data streaming).

## 🌟 Why This Project is Unique

1. **Zero-Friction Tracking:** Unlike traditional health apps that demand tedious daily data entry, Auris relies on ambient telemetry and natural voice speech, completely removing the cognitive burden of tracking from chronically ill patients.
2. **Actionable Patient Advocacy:** While most health apps target either the doctor's workflow *or* the patient's wellness, Auris bridges both by empowering the patient with objective data and explicit "Advocate Scripts" designed to ensure their symptoms are taken seriously in clinical settings.
3. **True Clinical Interoperability:** Auris doesn't just summarize text; it strictly translates patient experiences into standard clinical structures (HPI, SOAP notes) making it instantly digestible and useful to a time-starved physician the moment they open the portal.
