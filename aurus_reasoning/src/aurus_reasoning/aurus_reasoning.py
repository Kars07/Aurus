import logging
import json
from pydantic import Field

from nat.builder.builder import Builder
from nat.builder.framework_enum import LLMFrameworkEnum
from nat.builder.function_info import FunctionInfo
from nat.cli.register_workflow import register_function
from nat.data_models.function import FunctionBaseConfig

logger = logging.getLogger(__name__)


class AurusReasoningFunctionConfig(FunctionBaseConfig, name="aurus_reasoning"):
    """
    Configuration for the EmpowerLink reasoning engine tool.
    Allows dynamic threshold adjustment via config.yml if needed.
    """
    stress_threshold: int = Field(default=80, description="Threshold for vocal stress to trigger Aegis (0-100).")
    erraticism_threshold: int = Field(default=75, description="Threshold for keystroke erraticism (0-100).")


@register_function(config_type=AurusReasoningFunctionConfig, framework_wrappers=[LLMFrameworkEnum.LANGCHAIN])
async def aurus_reasoning_function(config: AurusReasoningFunctionConfig, builder: Builder):
    """
    Registers the health evaluation tool for the ReAct agent.
    This replaces the basic echo template with our clinical evaluation logic.
    """

    async def analyze_patient_data(
        mode: str,
        vocal_stress: int = 0,
        keystroke_erraticism: int = 0,
        transcript: str = ""
    ) -> str:
        """
        Analyzes patient telemetry, transcripts, and history to trigger interventions or generate summaries.
        The ReAct agent will call this function to determine the correct JSON payload.

        Args:
            mode (str): The analysis mode: "realtime", "daily", "clinical", "flare_predict", "advocate", or "investigate".
            vocal_stress (int): Current vocal stress score (0-100).
            keystroke_erraticism (int): Current typing erraticism score (0-100).
            transcript (str): The patient's query for investigate mode, or current voice/text journal transcript.

        Returns:
            str: Command sequence for the ReAct LLM or an immediate JSON payload.
        """
        
        # Phase 1: Passive Background Intervention (Aegis Protocol)
        if mode == "realtime":
            if vocal_stress > config.stress_threshold or keystroke_erraticism > config.erraticism_threshold:
                payload = {
                    "type": "aegis_intervention",
                    "data": {
                        "action": "vagal_reset",
                        "message": "Cortisol spike detected based on typing and vocal cadence. Dimming screen and pausing notifications for 5 minutes.",
                        "audio_track": "40hz_binaural.mp3",
                        "slack_status": "DND"
                    }
                }
            else:
                payload = {
                    "type": "telemetry",
                    "data": {
                        "vocal_stress": vocal_stress,
                        "keystroke_erraticism": keystroke_erraticism,
                        "status": "nominal"
                    }
                }
            return json.dumps(payload)

        # Phase 2: Active Daily Check-In (Patient UI)
        elif mode == "daily":
            # Command the LLM to generate a personalized nudge based on the actual transcript
            observation = (
                "Action Required from LLM: Dynamically generate an empathetic prevention nudge JSON for a patient using the EmpowerLink system. "
                f"The patient's current transcript is: '{transcript}'. "
                f"Their current vocal stress is {vocal_stress} and keystroke erraticism is {keystroke_erraticism}. "
                "Do not output conversational text. Generate a highly realistic JSON object matching this exact schema:\n"
                "{\n"
                "  \"status\": \"warning_flagged\" or \"nominal\",\n"
                "  \"patient_facing_nudge\": \"A direct, highly empathetic 2-sentence response directly addressing their transcript. Provide a highly tailored actionable suggestion based on their specific complaint (e.g., eye strain -> 20-20-20 rule, cramps -> magnesium/stretch, back pain -> posture check).\",\n"
                "  \"tts_audio_ready\": true,\n"
                "  \"suggested_action\": \"Short string ID of the suggested action (e.g., 'eye_stretch')\"\n"
                "}\n"
                "Output ONLY the raw JSON object."
            )
            return observation

        # Phase 3: Clinical Translation (Doctor UI)
        elif mode == "clinical":
            # Command the LLM to generate a highly advanced clinical summary dynamically using recent history
            observation = (
                "Action Required from LLM: Dynamically generate an advanced, medical-grade clinical summary JSON for a patient using the EmpowerLink system. "
                "Analyze the recent journal history and vitals logs provided in your system prompt to build the clinical case.\n"
                f"Current vocal stress is {vocal_stress} and keystroke erraticism is {keystroke_erraticism}. "
                "Adopt the persona of a Chief Medical Officer. Use advanced medical terminology. "
                "Ensure your assessment accurately reflects the specific complaints in the history logs (e.g., eye strain, cramps, etc). "
                "Do not output conversational text. Generate a highly realistic JSON object matching this exact schema:\n"
                "{\n"
                "  \"report_date\": \"YYYY-MM-DD\",\n"
                "  \"patient_status\": {\n"
                "    \"hpi\": \"History of Present Illness - detailed paragraph synthesizing the recent logs\",\n"
                "    \"objective\": \"Objective telemetry findings (mention erraticism & stress metrics)\",\n"
                "    \"assessment\": \"Clinical assessment and highly specific, relevant suspected ICD-10 codes based directly on their complaints\",\n"
                "    \"plan\": \"Proposed treatment plan and immediate next steps\"\n"
                "  },\n"
                "  \"prevention_flags\": [\"Flag 1 focusing on specific reported issue\", \"Flag 2 focusing on secondary risk\"],\n"
                "  \"patient_questions_for_doctor\": [\"Relevant question 1\", \"Relevant question 2\"]\n"
                "}\n"
                "Output ONLY the raw JSON object."
            )
            return observation

        # Phase 4: Predict upcoming symptom flares (B2C)
        elif mode == "flare_predict":
            observation = (
                "Action Required from LLM: Analyze the patient's recent journal history provided in the system prompt. "
                f"Current vocal stress is {vocal_stress} and keystroke erraticism is {keystroke_erraticism}. "
                "Based solely on the history's cadence of pain/symptoms, predict the likelihood of an upcoming severe symptom flare-up within the next 24 hours. "
                "Generate a JSON object matching this exact schema:\n"
                "{\n"
                "  \"flare_risk_percentage\": <integer between 0 and 100>,\n"
                "  \"predicted_symptom\": \"Short string of the likely symptom (e.g., 'Migraine', 'Joint Stiffness')\",\n"
                "  \"reasoning\": \"A concise 1-sentence explanation of why the data predicts this (e.g., 'Poor sleep and high erraticism historically precede your migraines.')\",\n"
                "  \"preventative_action\": \"A highly actionable step to take right now to stop the flare.\"\n"
                "}\n"
                "Output ONLY the raw JSON object."
            )
            return observation

        # Phase 5: Investigate patient question against history (B2C)
        elif mode == "investigate":
            observation = (
                "Action Required from LLM: The patient has asked a question about their health history: "
                f"'{transcript}'. "
                "Analyze the patient's recent journal history provided in the system prompt to find the answer. "
                "Act as a hyper-intelligent 'Health Detective'. Correlate their symptoms with their past behaviors or telemetry patterns. "
                "Generate a JSON object matching this exact schema:\n"
                "{\n"
                "  \"answer\": \"A conversational, direct answer to the patient's question citing specific dates/events from their history log.\",\n"
                "  \"confidence\": \"High, Medium, or Low\",\n"
                "  \"detected_pattern\": \"A short title of the behavior pattern discovered.\"\n"
                "}\n"
                "Output ONLY the raw JSON object."
            )
            return observation

        # Phase 6: Patient-Side Gaslighting Advocate (B2C)
        elif mode == "advocate":
            observation = (
                "Action Required from LLM: The patient is preparing to see a potentially skeptical doctor. "
                "Analyze their recent journal history provided in the system prompt. "
                "Generate an unarguable, aggressive, clinical-grade medical brief designed to combat medical gaslighting. "
                "Generate a JSON object matching this exact schema:\n"
                "{\n"
                "  \"advocate_brief\": \"A 3-paragraph defensive brief summarizing the patient's continuous suffering over the log period, using irrefutable telemetry data metrics to prove it isn't 'just anxiety'.\",\n"
                "  \"demanded_tests\": [\"Specific bloodwork, imaging, or specialist referral to demand\"],\n"
                "  \"script\": \"Exact quotes the patient should read aloud to the doctor if dismissed.\"\n"
                "}\n"
                "Output ONLY the raw JSON object."
            )
            return observation

        # Error Handling
        return json.dumps({"error": f"Invalid mode '{mode}' specified."})

    # The docstring of analyze_patient_data is passed to the LLM so it knows exactly how to format its tool call.
    yield FunctionInfo.from_fn(analyze_patient_data, description=analyze_patient_data.__doc__)