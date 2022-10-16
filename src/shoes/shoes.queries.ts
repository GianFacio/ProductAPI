export const shoeQueries = {
    readShoes: `
        SELECT
            id as shoeId, name AS name, color AS color, 
                size AS size, price AS price
        FROM product.shoes
    `,
    readShoesByShoeId: `
        SELECT
            id as shoeId, name AS name, color AS color, 
            size AS size, price AS price
        FROM product.shoes
        WHERE product.shoes.id = ?
    `,
    createShoe: `
        INSERT INTO SHOES(name, color, size, price) VALUES(?,?,?,?) 
    `,
    updateShoe: `
        UPDATE product.shoes
        SET name = ?, color = ?, size = ?, price = ?
        WHERE id = ?
    `,
    deleteShoe: `
        DELETE FROM product.shoes
        WHERE id = ?
    `,
}