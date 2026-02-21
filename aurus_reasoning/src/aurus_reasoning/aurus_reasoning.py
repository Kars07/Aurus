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
        wheelchair_rolls: int = 0,
        transcript: str = ""
    ) -> str:
        """
        Analyzes patient telemetry and transcripts to trigger interventions or generate summaries.
        The ReAct agent will call this function to determine the correct JSON payload.

        Args:
            mode (str): The analysis mode: "realtime" (for Aegis triggers), "daily" (for patient nudges), or "clinical" (for doctor snapshots).
            vocal_stress (int): Current vocal stress score (0-100).
            keystroke_erraticism (int): Current typing erraticism score (0-100).
            wheelchair_rolls (int): Number of wheelchair rolls today.
            transcript (str): The patient's voice journal transcript.

        Returns:
            str: A JSON formatted string containing the necessary intervention or summary payload to be sent to the frontend.
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
            # Determine risk based on accessibility metrics
            is_at_risk = wheelchair_rolls < 500
            
            payload = {
                "status": "warning_flagged" if is_at_risk else "nominal",
                "patient_facing_nudge": f"I noticed your activity is at {wheelchair_rolls} rolls today, and you mentioned: '{transcript}'. This increases pressure sore risk. Let's do 3 gentle seated torso twists right now.",
                "tts_audio_ready": True,
                "suggested_action": "seated_stretches"
            }
            return json.dumps(payload)

        # Phase 3: Clinical Translation (Doctor UI)
        elif mode == "clinical":
            # For the hackathon, we output the strict mock FHIR JSON here.
            # The ReAct agent realizes it needs a doctor summary and triggers this mode.
            payload = {
                "report_date": "2026-02-21",
                "clinical_summary": "Patient exhibits a 4-day trend of decreasing mobility correlating with reported joint stiffness and high erraticism scores.",
                "prevention_flags": [
                    "High risk of pressure sores due to immobility.",
                    "Potential medication tolerance building for evening pain management."
                ],
                "patient_questions_for_doctor": [
                    "Should we adjust my evening pain medication before this flare-up gets worse?",
                    "Are there specific seated physical therapy exercises I should add to my routine?"
                ]
            }
            return json.dumps(payload)

        # Error Handling
        return json.dumps({"error": f"Invalid mode '{mode}' specified. Must be realtime, daily, or clinical."})

    # The docstring of analyze_patient_data is passed to the LLM so it knows exactly how to format its tool call.
    yield FunctionInfo.from_fn(analyze_patient_data, description=analyze_patient_data.__doc__)