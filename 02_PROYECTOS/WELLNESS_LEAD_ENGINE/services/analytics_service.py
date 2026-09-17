from typing import List, Dict, Any, Optional
from schemas.analytics import DashboardKPIs, GeoMetricItem

class AnalyticsService:
    def get_dashboard_kpis(self, leads: List[Dict[str, Any]]) -> DashboardKPIs:
        total = len(leads)
        if total == 0:
            return DashboardKPIs(
                total_leads=0,
                new_leads=0,
                qualified_leads=0,
                meetings_scheduled=0,
                meetings_completed=0,
                conversions=0,
                customers=0,
                qualification_rate=0.0,
                meeting_rate=0.0,
                show_rate=0.0,
                conversion_rate=0.0,
                cpl=0.0,
                cac=0.0
            )

        new_cnt = len([l for l in leads if l.get("status") == "NEW"])
        qual_cnt = len([l for l in leads if l.get("status") in ("QUALIFIED", "MEETING_SCHEDULED", "MEETING_COMPLETED", "CONVERTED", "CUSTOMER")])
        m_sched_cnt = len([l for l in leads if l.get("status") in ("MEETING_SCHEDULED", "MEETING_COMPLETED", "CONVERTED", "CUSTOMER")])
        m_comp_cnt = len([l for l in leads if l.get("status") in ("MEETING_COMPLETED", "CONVERTED", "CUSTOMER")])
        conv_cnt = len([l for l in leads if l.get("status") in ("CONVERTED", "CUSTOMER")])

        qual_rate = round((qual_cnt / total) * 100, 2)
        meet_rate = round((m_sched_cnt / qual_cnt) * 100, 2) if qual_cnt > 0 else 0.0
        show_rate = round((m_comp_cnt / m_sched_cnt) * 100, 2) if m_sched_cnt > 0 else 0.0
        conv_rate = round((conv_cnt / total) * 100, 2)

        return DashboardKPIs(
            total_leads=total,
            new_leads=new_cnt,
            qualified_leads=qual_cnt,
            meetings_scheduled=m_sched_cnt,
            meetings_completed=m_comp_cnt,
            conversions=conv_cnt,
            customers=conv_cnt,
            qualification_rate=qual_rate,
            meeting_rate=meet_rate,
            show_rate=show_rate,
            conversion_rate=conv_rate,
            cpl=0.0,
            cac=0.0
        )

    def get_geo_distribution(self, leads: List[Dict[str, Any]]) -> List[GeoMetricItem]:
        groups: Dict[str, Dict[str, int]] = {}
        for l in leads:
            city = l.get("city") or "Desconocida"
            prov = l.get("province") or ""
            key = f"{city}, {prov}".strip(", ")
            if key not in groups:
                groups[key] = {"total": 0, "qual": 0, "meetings": 0, "conv": 0}
            
            groups[key]["total"] += 1
            st = l.get("status")
            if st in ("QUALIFIED", "MEETING_SCHEDULED", "MEETING_COMPLETED", "CONVERTED", "CUSTOMER"):
                groups[key]["qual"] += 1
            if st in ("MEETING_SCHEDULED", "MEETING_COMPLETED", "CONVERTED", "CUSTOMER"):
                groups[key]["meetings"] += 1
            if st in ("CONVERTED", "CUSTOMER"):
                groups[key]["conv"] += 1

        items = []
        for loc, data in groups.items():
            items.append(GeoMetricItem(
                location=loc,
                leads_count=data["total"],
                qualified_count=data["qual"],
                meetings_count=data["meetings"],
                conversions_count=data["conv"]
            ))
        
        items.sort(key=lambda x: x.leads_count, reverse=True)
        return items
