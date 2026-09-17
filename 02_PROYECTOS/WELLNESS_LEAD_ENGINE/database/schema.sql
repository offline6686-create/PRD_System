-- =============================================================================
-- WELLNESS LEAD ENGINE - DATABASE SCHEMA (POSTGRESQL 16+)
-- Project: PRD-FORGE (02_PROYECTOS/WELLNESS_LEAD_ENGINE)
-- =============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. DYNAMIC LOCATION ENTITY (GLOBAL GEOGRAPHY)
CREATE TABLE IF NOT EXISTS locations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    country VARCHAR(100) NOT NULL,
    province_state VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20),
    timezone VARCHAR(50) DEFAULT 'UTC',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_geo_location UNIQUE (country, province_state, city)
);

CREATE INDEX IF NOT EXISTS idx_locations_country ON locations(country);
CREATE INDEX IF NOT EXISTS idx_locations_province ON locations(province_state);
CREATE INDEX IF NOT EXISTS idx_locations_city ON locations(city);
CREATE INDEX IF NOT EXISTS idx_locations_composite ON locations(country, province_state, city);

-- 2. MARKETING CAMPAIGNS ENTITY
CREATE TABLE IF NOT EXISTS campaigns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    platform VARCHAR(50) NOT NULL, -- META_ADS, GOOGLE, LINKEDIN, TIKTOK, WEBSITE, etc.
    objective VARCHAR(100),
    status VARCHAR(50) DEFAULT 'ACTIVE', -- DRAFT, ACTIVE, PAUSED, COMPLETED
    budget NUMERIC(12, 2) DEFAULT 0.00,
    start_date TIMESTAMP WITH TIME ZONE,
    end_date TIMESTAMP WITH TIME ZONE,
    utm_source VARCHAR(100),
    utm_medium VARCHAR(100),
    utm_campaign VARCHAR(100),
    utm_content VARCHAR(100),
    utm_term VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_campaigns_platform ON campaigns(platform);
CREATE INDEX IF NOT EXISTS idx_campaigns_status ON campaigns(status);

-- 3. LANDING PAGES ENTITY
CREATE TABLE IF NOT EXISTS landing_pages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    campaign_id UUID REFERENCES campaigns(id) ON DELETE SET NULL,
    source VARCHAR(50),
    utm_default JSONB DEFAULT '{}'::jsonb,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. FORMS CONFIGURATION ENTITY
CREATE TABLE IF NOT EXISTS forms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    landing_page_id UUID REFERENCES landing_pages(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    fields_config JSONB NOT NULL, -- Array of field objects {name, label, required, type}
    consent_text TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. DISTRIBUTORS / REGIONAL OPERATORS ENTITY
CREATE TABLE IF NOT EXISTS distributors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    whatsapp VARCHAR(50),
    location_id UUID REFERENCES locations(id) ON DELETE SET NULL,
    level VARCHAR(50) DEFAULT 'DISTRIBUTOR', -- DISTRIBUTOR, SUPERVISOR, WORLD_TEAM, GET_TEAM, MILLIONAIRE_TEAM, PRESIDENT_TEAM
    trainings_completed INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_distributors_location ON distributors(location_id);

-- 6. MASTER LEADS ENTITY
CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100),
    email VARCHAR(255),
    phone VARCHAR(50),
    whatsapp VARCHAR(50),
    location_id UUID REFERENCES locations(id) ON DELETE SET NULL,
    country VARCHAR(100),
    province VARCHAR(100),
    city VARCHAR(100),
    postal_code VARCHAR(20),
    timezone VARCHAR(50) DEFAULT 'UTC',
    source VARCHAR(50) NOT NULL, -- FACEBOOK, INSTAGRAM, META_ADS, GOOGLE, LINKEDIN, TIKTOK, WEBSITE, LANDING, ORGANIC, REFERRAL, WHATSAPP, EMAIL, MANUAL, CSV, API, OTHER
    source_detail VARCHAR(255),
    campaign_id UUID REFERENCES campaigns(id) ON DELETE SET NULL,
    landing_page_id UUID REFERENCES landing_pages(id) ON DELETE SET NULL,
    form_id UUID REFERENCES forms(id) ON DELETE SET NULL,
    interest VARCHAR(50) NOT NULL, -- HEALTHY_HABITS, WELLNESS, GENERAL_NUTRITION, PERSONAL_ORGANIZATION, PERSONAL_DEVELOPMENT, PROFESSIONAL_DEVELOPMENT, BUSINESS_OPPORTUNITY, OTHER
    objective VARCHAR(100), -- LOSE_WEIGHT, GAIN_WEIGHT, HABITS, SPORTS, ENERGY, BUSINESS
    status VARCHAR(50) NOT NULL DEFAULT 'NEW', -- NEW, CONTACTED, QUALIFIED, UNQUALIFIED, MEETING_PENDING, MEETING_SCHEDULED, MEETING_COMPLETED, FOLLOW_UP, CONVERTED, CUSTOMER, NOT_INTERESTED, LOST, ARCHIVED
    lead_score INT DEFAULT 10,
    assigned_distributor_id UUID REFERENCES distributors(id) ON DELETE SET NULL,
    consent_given BOOLEAN DEFAULT TRUE,
    privacy_accepted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_contact_at TIMESTAMP WITH TIME ZONE,
    next_follow_up_at TIMESTAMP WITH TIME ZONE,
    converted_at TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- OPTIMIZED B-TREE INDEXES FOR SCALABILITY (10k, 100k, 1M+ LEADS)
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_phone ON leads(phone);
CREATE INDEX IF NOT EXISTS idx_leads_whatsapp ON leads(whatsapp);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_source ON leads(source);
CREATE INDEX IF NOT EXISTS idx_leads_campaign ON leads(campaign_id);
CREATE INDEX IF NOT EXISTS idx_leads_geo ON leads(country, province, city);
CREATE INDEX IF NOT EXISTS idx_leads_location_id ON leads(location_id);
CREATE INDEX IF NOT EXISTS idx_leads_created ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_next_follow_up ON leads(next_follow_up_at) WHERE next_follow_up_at IS NOT NULL;

-- 7. DUPLICATE DETECTION ENTITY
CREATE TABLE IF NOT EXISTS lead_duplicates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
    duplicate_of_lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
    match_type VARCHAR(50) NOT NULL, -- EMAIL_EXACT, WHATSAPP_EXACT, PHONE_EXACT, NAME_PHONE_COMBINATION
    status VARCHAR(50) DEFAULT 'POSSIBLE_DUPLICATE', -- POSSIBLE_DUPLICATE, RESOLVED_MERGED, RESOLVED_IGNORED
    detected_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_lead_duplicates_lead ON lead_duplicates(lead_id);

-- 8. INTERACTIONS HISTORY ENTITY
CREATE TABLE IF NOT EXISTS interactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL, -- FORM_SUBMISSION, WHATSAPP, EMAIL, PHONE, ZOOM, CALENDLY, NOTE, SYSTEM, STATUS_CHANGE, FOLLOW_UP, OTHER
    direction VARCHAR(20) NOT NULL DEFAULT 'OUTBOUND', -- INBOUND, OUTBOUND, SYSTEM
    content TEXT NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    external_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_interactions_lead ON interactions(lead_id, created_at DESC);

-- 9. MEETINGS ENTITY (CALENDLY & ZOOM INTEGRATION)
CREATE TABLE IF NOT EXISTS meetings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
    provider VARCHAR(50) NOT NULL DEFAULT 'ZOOM', -- CALENDLY, ZOOM, JITSI, MANUAL
    external_id VARCHAR(255),
    scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
    duration INT DEFAULT 30, -- Duration in minutes
    timezone VARCHAR(50) DEFAULT 'UTC',
    meeting_url VARCHAR(500),
    status VARCHAR(50) DEFAULT 'SCHEDULED', -- SCHEDULED, CONFIRMED, COMPLETED, NO_SHOW, CANCELLED, RESCHEDULED
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_meetings_lead ON meetings(lead_id);
CREATE INDEX IF NOT EXISTS idx_meetings_scheduled ON meetings(scheduled_at);
CREATE INDEX IF NOT EXISTS idx_meetings_status ON meetings(status);

-- 10. FOLLOW-UPS SCHEDULED TASKS ENTITY
CREATE TABLE IF NOT EXISTS follow_ups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
    scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
    type VARCHAR(50) DEFAULT 'GENERAL', -- DAY_1_WELCOME, DAY_3_GOAL_CHECK, DAY_7_ZOOM_INVITE, DAY_14_FOLLOW_UP, DAY_30_RECONTACT, CUSTOM
    status VARCHAR(50) DEFAULT 'PENDING', -- PENDING, COMPLETED, SKIPPED, CANCELLED
    notes TEXT,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_followups_lead ON follow_ups(lead_id);
CREATE INDEX IF NOT EXISTS idx_followups_scheduled ON follow_ups(scheduled_at, status);

-- 11. AUTOMATION RULES & EXECUTION LOGS
CREATE TABLE IF NOT EXISTS automation_rules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    trigger_event VARCHAR(100) NOT NULL, -- LEAD_CREATED, LEAD_CONTACTED, LEAD_QUALIFIED, MEETING_SCHEDULED, MEETING_COMPLETED, NO_SHOW, FOLLOW_UP_DUE, LEAD_CONVERTED
    conditions JSONB DEFAULT '[]'::jsonb,
    actions JSONB DEFAULT '[]'::jsonb,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS automation_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    rule_id UUID REFERENCES automation_rules(id) ON DELETE SET NULL,
    event_type VARCHAR(100) NOT NULL,
    lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
    status VARCHAR(50) NOT NULL, -- SUCCESS, FAILED, RETRYING
    details JSONB DEFAULT '{}'::jsonb,
    error_message TEXT,
    executed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_automation_logs_event ON automation_logs(event_type, executed_at DESC);

-- 12. ACADEMY & KNOWLEDGE BASE ENTITY
CREATE TABLE IF NOT EXISTS academy_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL, -- PRODUCTS, NUTRITION, FAQ, OBJECTIONS, ZOOM_SCRIPTS, MARKETING, TESTIMONIALS, FOLLOW_UP, LEGAL, SOCIAL_MEDIA
    content_type VARCHAR(50) NOT NULL, -- PDF, VIDEO, MANUAL, PROCEDURE, TRAINING, SCRIPT
    file_url VARCHAR(500),
    description TEXT,
    target_role VARCHAR(50) DEFAULT 'ALL', -- ADMINISTRATOR, DISTRIBUTOR, CLIENT, ALUMNO, ALL
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_academy_category ON academy_items(category, target_role);
