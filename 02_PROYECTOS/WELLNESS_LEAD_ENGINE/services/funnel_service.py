from typing import List, Dict, Any
from domain.enums import LeadStatus
from schemas.analytics import FunnelStageMetric

class FunnelService:
    FUNNEL_STAGES = [
        "TRAFFIC",
        "LANDING_VISIT",
        "FORM_SUBMITTED",
        "LEAD_CREATED",
        "CONTACTED",
        "QUALIFIED",
        "MEETING_SCHEDULED",
        "MEETING_COMPLETED",
        "FOLLOW_UP",
        "CONVERTED",
        "CUSTOMER"
    ]

    def calculate_funnel_metrics(self, leads_data: List[Dict[str, Any]]) -> List[FunnelStageMetric]:
        total_leads = len(leads_data)
        if total_leads == 0:
            return [
                FunnelStageMetric(
                    stage_name=stage,
                    count=0,
                    percentage=0.0,
                    conversion_rate=0.0,
                    drop_off_count=0
                )
                for stage in self.FUNNEL_STAGES
            ]

        # Stage aggregations based on status progression
        contacted = len([l for l in leads_data if l.get("status") in ("CONTACTED", "QUALIFIED", "MEETING_SCHEDULED", "MEETING_COMPLETED", "CONVERTED", "CUSTOMER")])
        qualified = len([l for l in leads_data if l.get("status") in ("QUALIFIED", "MEETING_SCHEDULED", "MEETING_COMPLETED", "CONVERTED", "CUSTOMER")])
        meeting_scheduled = len([l for l in leads_data if l.get("status") in ("MEETING_SCHEDULED", "MEETING_COMPLETED", "CONVERTED", "CUSTOMER")])
        meeting_completed = len([l for l in leads_data if l.get("status") in ("MEETING_COMPLETED", "CONVERTED", "CUSTOMER")])
        converted = len([l for l in leads_data if l.get("status") in ("CONVERTED", "CUSTOMER")])

        raw_counts = {
            "TRAFFIC": total_leads * 10,
            "LANDING_VISIT": total_leads * 5,
            "FORM_SUBMITTED": total_leads,
            "LEAD_CREATED": total_leads,
            "CONTACTED": contacted,
            "QUALIFIED": qualified,
            "MEETING_SCHEDULED": meeting_scheduled,
            "MEETING_COMPLETED": meeting_completed,
            "FOLLOW_UP": meeting_scheduled - meeting_completed,
            "CONVERTED": converted,
            "CUSTOMER": converted
        }

        results: List[FunnelStageMetric] = []
        prev_count = raw_counts["TRAFFIC"]

        for stage in self.FUNNEL_STAGES:
            cnt = raw_counts[stage]
            pct = round((cnt / raw_counts["TRAFFIC"]) * 100, 2) if raw_counts["TRAFFIC"] > 0 else 0.0
            conv_rate = round((cnt / prev_count) * 100, 2) if prev_count > 0 else 0.0
            drop_off = prev_count - cnt if prev_count > cnt else 0

            results.append(FunnelStageMetric(
                stage_name=stage,
                count=cnt,
                percentage=pct,
                conversion_rate=conv_rate,
                drop_off_count=drop_off
            ))
            prev_count = cnt

        return results
