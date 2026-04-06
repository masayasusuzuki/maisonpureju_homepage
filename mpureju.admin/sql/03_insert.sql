INSERT INTO instagram_posts (url, shortcode, source, caption, posted_at, classification, status, fetched_at)
VALUES
('https://www.instagram.com/p/DVSZ9uEEi3m/', 'DVSZ9uEEi3m', 'doctor', '先日、神戸大学でCST(解剖トレーニング)に参加してきました。', '2026-02-28', 'staff_blog', 'published', NOW()),
('https://www.instagram.com/p/DPOD7zgkx75/', 'DPOD7zgkx75', 'doctor', '第48回美容外科学会(JSAPS)で外側人中、口角挙上の発表', '2025-09-30', 'staff_blog', 'published', NOW()),
('https://www.instagram.com/p/DOS2Oz5kz4D/', 'DOS2Oz5kz4D', 'doctor', 'ブレッシングKOL就任', '2025-09-07', 'staff_blog', 'published', NOW()),
('https://www.instagram.com/p/DMfITRwTOHQ/', 'DMfITRwTOHQ', 'doctor', 'サーマハンドとは', '2025-07-24', 'staff_blog', 'published', NOW()),
('https://www.instagram.com/p/DMZpYjOuxfd/', 'DMZpYjOuxfd', 'doctor', 'レカルカの新製品大量入荷', '2025-07-22', 'staff_blog', 'published', NOW()),
('https://www.instagram.com/p/DIa7IH_T5zb/', 'DIa7IH_T5zb', 'doctor', 'ボトックス後の調整', '2025-04-14', 'staff_blog', 'published', NOW()),
('https://www.instagram.com/p/DDi0d1xyh4g/', 'DDi0d1xyh4g', 'doctor', 'メンズノンノ1.2月号に化粧品成分の話が掲載', '2024-12-14', 'staff_blog', 'published', NOW()),
('https://www.instagram.com/p/C1RAc2fSoyl/', 'C1RAc2fSoyl', 'doctor', '友人の岡幸二郎さんがクリニックに来てくれた', '2023-12-25', 'staff_blog', 'published', NOW()),
('https://www.instagram.com/p/Cza1ExES0HL/', 'Cza1ExES0HL', 'doctor', 'メンズノンノ12月号掲載', '2023-11-09', 'staff_blog', 'published', NOW()),
('https://www.instagram.com/p/Cn-7_blyxRZ/', 'Cn-7_blyxRZ', 'doctor', 'シミに対するケアは機械を使う治療やホームケアがあります', '2023-01-29', 'staff_blog', 'published', NOW()),
('https://www.instagram.com/p/CmVjGZsy9yk/', 'CmVjGZsy9yk', 'doctor', '美容医療 ✖︎ MBA 卒業して半年以上経っています', '2022-12-19', 'staff_blog', 'published', NOW()),
('https://www.instagram.com/p/Ck51etuyASj/', 'Ck51etuyASj', 'doctor', '韓国形成外科学会 この3日間は韓国ソウルで行われていた', '2022-11-13', 'staff_blog', 'published', NOW())
ON CONFLICT (shortcode) DO NOTHING;
