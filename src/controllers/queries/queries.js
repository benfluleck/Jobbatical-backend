export default {
  topActiveUsersQuery: `SELECT aggr.*,appl.created_at, appl.id AS application_id, l.name AS listing_name
    FROM (SELECT u.id AS user_id, u.name AS user_name, COUNT(a.id) AS number_of_applications
    FROM users u
    INNER JOIN applications a
    ON u.id=a.user_id
    WHERE a.created_at > current_date - interval '7' day
    GROUP BY u.id, u.name
    ORDER BY COUNT(a.id) DESC ) aggr
    INNER JOIN applications AS appl ON appl.id
    IN (SELECT id FROM applications WHERE applications.user_id=aggr.user_id LIMIT 3)
    INNER JOIN listings AS l ON l.id=appl.listing_id
    LIMIT $1 OFFSET $2
`,
  getUserInfo: `SELECT users.id AS user_id,
    users.name AS user_name,
    companies.id AS company_id,
    companies.name AS company_name,
    companies.created_at AS companies_created_at,
    teams.contact_user as isContact,
    l.id AS listing_id,
    l.created_at,
    l.name AS listing_name,
    l.description AS listing_description,
    app.id AS application_id,
    app.created_at AS app_created_at,
    app.cover_letter,
    app_lis.id AS applistings_id,
    app_lis.name AS applistnames,
    app_lis.created_at AS applist_created_at,
    app_lis.description As applistdescription
    FROM teams
    INNER JOIN companies ON companies.id=teams.company_id
    RIGHT JOIN users ON teams.user_id=users.id
    LEFT JOIN listings l ON l.created_by=users.id
    LEFT JOIN applications AS app ON app.user_id=users.id
    LEFT JOIN listings app_lis  ON app.listing_id=app_lis.id
    WHERE users.id = $1`,
}
