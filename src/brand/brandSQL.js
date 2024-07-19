export const insertBrandSql = "INSERT INTO Brand (id, user_id, region_id, name, brand_url, description, brand_image, business_name, business_registration_number, contact) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";

export const getBrandID = "SELECT * FROM Brand WHERE id = ?";

export const upBrandSql = `
    UPDATE Brand
    SET
        region_id = ?,
        name = ?,
        brand_url = ?,
        description = ?,
        brand_image = ?,
        business_name = ?,
        business_registration_number = ?,
        contact = ?
    WHERE
        id = $?
    RETURNING *;
`;
