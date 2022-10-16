export const materialQueries= {
    createMaterial: `
    INSERT INTO materials (shoe_id, name) VALUES(?,?)
    `,
    readMaterials: `
    SELECT name AS name
    FROM product.materials
    WHERE shoe_id = ?
    `,
    updateMaterial: `
    UPDATE product.materials
    SET name = ?
    WHERE id = ?;
    `,
}