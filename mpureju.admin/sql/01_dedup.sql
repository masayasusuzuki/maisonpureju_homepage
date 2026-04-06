DELETE FROM instagram_posts a
USING instagram_posts b
WHERE a.id > b.id AND a.shortcode = b.shortcode;
