-- ╔════════════════════════════════════════════════════════════════════════════
-- ║ Mini Excavations Érable — MySQL schema for Hostinger
-- ║ Database: u274996454_excerable
-- ║
-- ║ Run this ONCE in phpMyAdmin (Hostinger panel → MySQL → phpMyAdmin):
-- ║   1. Select database u274996454_excerable
-- ║   2. Tab "SQL"
-- ║   3. Paste this entire file → Go
-- ║
-- ║ Idempotent: every statement uses IF NOT EXISTS so you can re-run safely.
-- ╚════════════════════════════════════════════════════════════════════════════

SET NAMES utf8mb4;
SET time_zone = '+00:00';

-- ─── admins ──────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS admins (
  id              INT UNSIGNED NOT NULL AUTO_INCREMENT,
  email           VARCHAR(255) NOT NULL,
  password_hash   VARCHAR(255) NOT NULL,
  name            VARCHAR(100) NOT NULL,
  role            ENUM('superadmin','admin','editor') NOT NULL DEFAULT 'admin',
  active          TINYINT(1) NOT NULL DEFAULT 1,
  last_login_at   DATETIME NULL,
  created_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uniq_admins_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── sessions (JWT refresh tokens or session IDs) ───────────────────────────
CREATE TABLE IF NOT EXISTS sessions (
  id          VARCHAR(64) NOT NULL,
  admin_id    INT UNSIGNED NOT NULL,
  expires_at  DATETIME NOT NULL,
  user_agent  VARCHAR(500) NULL,
  ip_address  VARCHAR(45) NULL,
  created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_sessions_admin (admin_id),
  KEY idx_sessions_expires (expires_at),
  CONSTRAINT fk_sessions_admin FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── contacts (leads from public forms) ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS contacts (
  id              INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name            VARCHAR(100) NOT NULL,
  email           VARCHAR(255) NOT NULL,
  phone           VARCHAR(50) NULL,
  subject         VARCHAR(200) NULL,
  message         TEXT NOT NULL,
  service_type    VARCHAR(100) NULL,
  preferred_date  DATETIME NULL,
  language        VARCHAR(5) NULL DEFAULT 'fr',
  source          VARCHAR(50) NULL DEFAULT 'website',
  status          ENUM('new','contacted','quoted','won','lost','archived') NOT NULL DEFAULT 'new',
  notes           TEXT NULL,
  ip_address      VARCHAR(45) NULL,
  user_agent      VARCHAR(500) NULL,
  created_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_contacts_status (status),
  KEY idx_contacts_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── blogs ──────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS blogs (
  id                INT UNSIGNED NOT NULL AUTO_INCREMENT,
  slug              VARCHAR(200) NOT NULL,
  title_fr          VARCHAR(200) NOT NULL,
  title_en          VARCHAR(200) NULL,
  title_es          VARCHAR(200) NULL,
  excerpt_fr        TEXT NULL,
  excerpt_en        TEXT NULL,
  excerpt_es        TEXT NULL,
  content_fr        MEDIUMTEXT NOT NULL,
  content_en        MEDIUMTEXT NULL,
  content_es        MEDIUMTEXT NULL,
  cover_image       VARCHAR(500) NULL,
  meta_title        VARCHAR(200) NULL,
  meta_description  VARCHAR(500) NULL,
  meta_keywords     TEXT NULL,
  category          VARCHAR(100) NULL,
  tags              JSON NULL,
  published         TINYINT(1) NOT NULL DEFAULT 0,
  published_at      DATETIME NULL,
  views             INT UNSIGNED NOT NULL DEFAULT 0,
  author_id         INT UNSIGNED NULL,
  created_at        DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at        DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uniq_blogs_slug (slug),
  KEY idx_blogs_published (published),
  CONSTRAINT fk_blogs_author FOREIGN KEY (author_id) REFERENCES admins(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── services ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS services (
  id              INT UNSIGNED NOT NULL AUTO_INCREMENT,
  slug            VARCHAR(100) NOT NULL,
  title_fr        VARCHAR(100) NOT NULL,
  title_en        VARCHAR(100) NULL,
  title_es        VARCHAR(100) NULL,
  description_fr  TEXT NOT NULL,
  description_en  TEXT NULL,
  description_es  TEXT NULL,
  icon            VARCHAR(50) NULL,
  image           VARCHAR(500) NULL,
  price_from_cad  INT NULL,
  price_to_cad    INT NULL,
  featured        TINYINT(1) NOT NULL DEFAULT 0,
  active          TINYINT(1) NOT NULL DEFAULT 1,
  order_index     INT NOT NULL DEFAULT 0,
  created_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uniq_services_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── reviews (testimonials) ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS reviews (
  id            INT UNSIGNED NOT NULL AUTO_INCREMENT,
  author_name   VARCHAR(100) NOT NULL,
  author_city   VARCHAR(100) NULL,
  rating        TINYINT NOT NULL DEFAULT 5,
  text_fr       TEXT NOT NULL,
  text_en       TEXT NULL,
  text_es       TEXT NULL,
  service_type  VARCHAR(100) NULL,
  published_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  verified      TINYINT(1) NOT NULL DEFAULT 0,
  featured      TINYINT(1) NOT NULL DEFAULT 0,
  created_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_reviews_featured (featured)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── settings (key-value) ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS settings (
  id           INT UNSIGNED NOT NULL AUTO_INCREMENT,
  setting_key  VARCHAR(100) NOT NULL,
  value        TEXT NULL,
  value_json   JSON NULL,
  updated_at   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uniq_settings_key (setting_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── soumissions (quotes) ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS soumissions (
  id                  CHAR(36) NOT NULL,
  client_token        VARCHAR(64) NOT NULL,
  client_nom          VARCHAR(200) NOT NULL,
  client_email        VARCHAR(255) NOT NULL,
  client_telephone    VARCHAR(50) NULL,
  client_adresse      VARCHAR(255) NULL,
  projet_adresse      VARCHAR(255) NULL,
  projet_type         VARCHAR(100) NULL,
  projet_description  TEXT NOT NULL,
  notes_client        TEXT NULL,
  status              ENUM('nouvelle','en_revision','offerte','contre_offre','acceptee','signee_par_les_deux','rejetee','archivee','expiree') NOT NULL DEFAULT 'nouvelle',
  source              ENUM('public-form','urgences-form','manual') NOT NULL DEFAULT 'public-form',
  lang                VARCHAR(5) NOT NULL DEFAULT 'fr',
  admin_notes         TEXT NULL,
  numero              VARCHAR(50) NULL,
  date_soumission     DATE NULL,
  sous_total_cents    INT NOT NULL DEFAULT 0,
  tps_cents           INT NOT NULL DEFAULT 0,
  tvq_cents           INT NOT NULL DEFAULT 0,
  total_cents         INT NOT NULL DEFAULT 0,
  articles            JSON NULL,
  modalites           JSON NULL,
  sections            JSON NULL,
  signature_client      TEXT NULL,
  signature_client_at   DATETIME NULL,
  signature_client_nom  VARCHAR(200) NULL,
  signature_admin       TEXT NULL,
  signature_admin_at    DATETIME NULL,
  signature_admin_nom   VARCHAR(200) NULL,
  expire_le           DATE NULL,
  ip_address          VARCHAR(45) NULL,
  user_agent          VARCHAR(500) NULL,
  created_at          DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at          DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uniq_soumissions_token (client_token),
  KEY idx_soumissions_status (status),
  KEY idx_soumissions_email (client_email),
  KEY idx_soumissions_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── soumission_offers (offer + counter-offer history) ──────────────────────
CREATE TABLE IF NOT EXISTS soumission_offers (
  id             INT UNSIGNED NOT NULL AUTO_INCREMENT,
  soumission_id  CHAR(36) NOT NULL,
  version_num    INT NOT NULL,
  from_role      ENUM('admin','client') NOT NULL,
  offer_type     ENUM('offer','counter-offer','accept','reject') NOT NULL,
  amount_cents   INT NULL,
  payment_terms  VARCHAR(255) NULL,
  deadline       DATE NULL,
  notes          TEXT NULL,
  articles       JSON NULL,
  created_at     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_offers_soumission (soumission_id),
  CONSTRAINT fk_offers_soumission FOREIGN KEY (soumission_id) REFERENCES soumissions(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── page_views (custom analytics) ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS page_views (
  id              BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  path            VARCHAR(500) NOT NULL,
  referrer        VARCHAR(500) NULL,
  user_agent_hash CHAR(40) NULL,           -- SHA1 of UA, for "unique visitors" rough count
  visitor_id      CHAR(40) NULL,           -- cookie-set anon id, for unique-visitor counting
  language        VARCHAR(5) NULL,
  country_code    CHAR(2) NULL,
  device          ENUM('mobile','tablet','desktop','bot','other') NULL,
  created_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_pv_path (path),
  KEY idx_pv_created (created_at),
  KEY idx_pv_visitor (visitor_id),
  KEY idx_pv_country (country_code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── daily_stats (precomputed rollups for dashboard) ────────────────────────
CREATE TABLE IF NOT EXISTS daily_stats (
  day                 DATE NOT NULL,
  pageviews           INT UNSIGNED NOT NULL DEFAULT 0,
  unique_visitors     INT UNSIGNED NOT NULL DEFAULT 0,
  soumissions_count   INT UNSIGNED NOT NULL DEFAULT 0,
  contacts_count      INT UNSIGNED NOT NULL DEFAULT 0,
  top_pages           JSON NULL,
  top_referrers       JSON NULL,
  top_countries       JSON NULL,
  updated_at          DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (day)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
