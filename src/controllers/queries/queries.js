export default {
  topActiveUsersQuery: `SELECT aggr.*,appl.created_at, appl.id AS application_id, l.name AS listing_name
    FROM (SELECT u.id AS user_id, u.name AS user_name, COUNT(a.id) AS number_of_applications
    FROM users u
    INNER JOIN applications a
    ON u.id=a.user_id
    WHERE a.created_at > current_date - interval '7' day
    GROUP BY u.id, u.name
    ORDER BY COUNT(a.id) DESC ) aggr
    INNER JOIN applications AS appl ON appl.id IN (SELECT id FROM applications WHERE applications.user_id=aggr.user_id LIMIT 3)
    INNER JOIN listings AS l ON l.id=appl.listing_id
    LIMIT $1 OFFSET $2
`,

}
