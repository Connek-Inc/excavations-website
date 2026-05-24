-- ╔════════════════════════════════════════════════════════════════════════════
-- ║ Mini Excavations Érable — Initial data seed
-- ║ Run AFTER schema.sql (only once). Idempotent via INSERT IGNORE.
-- ║
-- ║ Admin password below is a bcrypt hash of 'escavar2026'. To change it,
-- ║ generate a new hash and replace the password_hash column.
-- ╚════════════════════════════════════════════════════════════════════════════

SET NAMES utf8mb4;

-- ─── Initial admin ───────────────────────────────────────────────────────────
-- bcrypt hash for password 'escavar2026' (cost 10)
INSERT IGNORE INTO admins (email, password_hash, name, role, active) VALUES
('miniexcavationerable@gmail.com',
 '$2a$10$DKQzN5dQbgYxL3uF1nDNJ.0LFvJF6kk7yX5fwR8pKlbCK6jBkjMv2',
 'Admin Mini Excavations Érable',
 'superadmin',
 1);

-- ─── Default global settings ─────────────────────────────────────────────────
INSERT IGNORE INTO settings (setting_key, value) VALUES
('site_name',         'Mini Excavations Érable'),
('phone',             '+1 (514) 830-9973'),
('emergency_phone',   '+1 (514) 830-9973'),
('email',             'miniexcavationerable@gmail.com'),
('rbq_license',       '5823-7736-01'),
('address_locality',  'Saint-Hubert-de-Rivière-du-Loup'),
('address_region',    'QC'),
('address_country',   'CA'),
('postal_code',       'G0L 3L0'),
('founding_year',     '2010'),
('opening_hours_weekdays', '07:00-18:00'),
('opening_hours_saturday', '08:00-15:00'),
('opening_hours_sunday',   'Fermé'),
('facebook_url',      'https://www.facebook.com/miniexcavationserable'),
('instagram_url',     'https://www.instagram.com/mini_excavation_erable');

-- ─── Default services (copied from src/lib/seo/services-content.ts) ─────────
INSERT IGNORE INTO services (slug, title_fr, title_en, title_es, description_fr, description_en, description_es, icon, price_from_cad, price_to_cad, featured, active, order_index) VALUES
('drain-francais',
 'Drain Français', 'French Drain', 'Drenaje Francés',
 'Installation, réparation et remplacement de drain français résidentiel et commercial. Garantie 15 ans.',
 'Residential and commercial French drain installation, repair and replacement. 15-year warranty.',
 'Instalación, reparación y reemplazo de drenaje francés residencial y comercial. Garantía 15 años.',
 '💧', 4000, 12000, 1, 1, 1),

('excavation',
 'Excavation', 'Excavation', 'Excavación',
 'Mini-pelles et excavateurs pour terrains restreints et accès difficiles. Service rapide.',
 'Mini-excavators for tight spaces and difficult access. Fast service.',
 'Mini-excavadoras para espacios restringidos y accesos difíciles. Servicio rápido.',
 '🚜', 95, 195, 0, 1, 2),

('reparation-fissures',
 'Réparation de Fissures', 'Crack Repair', 'Reparación de Grietas',
 'Injection époxy ou polyuréthane pour fissures de fondation. Garantie 10 ans.',
 'Epoxy or polyurethane injection for foundation cracks. 10-year warranty.',
 'Inyección epoxi o poliuretano para grietas de cimientos. Garantía 10 años.',
 '🔧', 450, 1200, 0, 1, 3),

('demolition',
 'Démolition', 'Demolition', 'Demolición',
 'Démolition résidentielle, garage, piscine. Tri et recyclage écoresponsable.',
 'Residential demolition, garage, pool. Eco-friendly sorting and recycling.',
 'Demolición residencial, garaje, piscina. Reciclaje ecológico.',
 '🔨', 12000, 35000, 0, 1, 4),

('inspection-camera',
 'Inspection Caméra', 'Camera Inspection', 'Inspección con Cámara',
 'Diagnostic HD de drain et égout sans excavation. Rapport vidéo complet.',
 'HD drain and sewer diagnosis without excavation. Full video report.',
 'Diagnóstico HD sin excavación. Reporte de video completo.',
 '📹', 250, 600, 0, 1, 5);

-- ─── Default reviews (testimonials from src/routes/urgences/+page.svelte) ────
INSERT IGNORE INTO reviews (author_name, author_city, rating, text_fr, text_en, text_es, service_type, featured) VALUES
('Marie Tremblay', 'Montréal', 5,
 "Infiltration d'eau soudaine réglée en urgence! L'équipe s'est déplacée le jour même pour une inspection. Soumission rapide et claire. Drain français réparé parfaitement. Je recommande à 100%.",
 'Sudden water infiltration handled urgently! The team came the same day for inspection. Fast clear quote. French drain repaired perfectly. 100% recommend.',
 '¡Infiltración de agua repentina resuelta de urgencia! El equipo vino el mismo día para inspección. Cotización rápida y clara. Drenaje francés reparado perfectamente. ¡100% recomendado!',
 'Drain Français', 1),
('Jean-François Bélanger', 'Laval', 5,
 "Refoulement d'égout la nuit... Ils ont répondu à l'appel et ont réglé le problème avec une inspection par caméra détaillée. Service impeccable et rassurant dans un moment de stress.",
 'Sewer backup at night... They answered the call and solved the problem with a detailed camera inspection. Impeccable and reassuring service in a stressful moment.',
 'Respaldo de alcantarillado de noche... Respondieron y resolvieron el problema con inspección detallada. Servicio impecable.',
 'Inspection Caméra', 1),
('Sophie Lavoie', 'Saint-Jérôme', 5,
 "Découverte d'une fissure importante. Soumission en moins de 24h et garantie de 15 ans! Travail super propre et prix honnête. Une équipe en qui on peut avoir une confiance absolue.",
 'Discovered a major crack. Quote in less than 24h and 15-year warranty! Super clean work and honest price. A team you can have absolute trust in.',
 'Descubrí una grieta importante. Cotización en menos de 24h y garantía de 15 años. Trabajo super limpio y precio honesto.',
 'Réparation de Fissures', 1);

-- ─── Default blogs (migrated from src/routes/blog/data.js) ──────────────────
INSERT IGNORE INTO blogs (slug, title_fr, title_en, title_es, excerpt_fr, excerpt_en, content_fr, content_en, category, published, published_at) VALUES
('benefits',
 'Les avantages d''un drain français bien installé',
 'The benefits of a properly installed French drain',
 'Las ventajas de un drenaje francés bien instalado',
 'Pourquoi installer un drain français protège votre fondation et augmente la valeur de votre maison.',
 'Why installing a French drain protects your foundation and increases your home value.',
 '<h2>Pourquoi un drain français?</h2><p>Un drain français correctement installé protège la fondation de votre maison contre l''infiltration d''eau...</p>',
 '<h2>Why a French drain?</h2><p>A properly installed French drain protects your home''s foundation from water infiltration...</p>',
 'guide', 1, NOW()),

('importance',
 "L'importance de l'installation du drain français pour votre maison",
 'The Importance of French Drain Installation for Your Home',
 'La importancia del drenaje francés para su casa',
 'Le drain français est essentiel pour protéger votre fondation des dommages causés par l''eau.',
 'A French drain is essential to protect your foundation from water damage.',
 '<h2>Protéger votre investissement</h2><p>Votre maison est probablement votre investissement le plus important...</p>',
 '<h2>Protecting your investment</h2><p>Your home is likely your most important investment...</p>',
 'guide', 1, NOW()),

('waterproofing',
 'Guide complet de l''imperméabilisation des fondations',
 'Complete guide to foundation waterproofing',
 'Guía completa de impermeabilización de cimientos',
 'Tout ce que vous devez savoir sur l''imperméabilisation des fondations résidentielles.',
 'Everything you need to know about residential foundation waterproofing.',
 '<h2>Qu''est-ce que l''imperméabilisation?</h2><p>L''imperméabilisation des fondations consiste à appliquer une barrière étanche...</p>',
 '<h2>What is waterproofing?</h2><p>Foundation waterproofing involves applying a watertight barrier...</p>',
 'guide', 1, NOW());
