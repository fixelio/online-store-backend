module.exports = {
	findAll: `
		SELECT * FROM product
	`,
	findOne: `
		SELECT * FROM product
		WHERE
			code = ?
		OR
			productId = ?
	`,
	findByUser: `
		SELECT * FROM product
		WHERE userId = ?
	`,
	insert: `
		INSERT INTO product
		(
			userId,
			code,
			name,
			price,
			category,
			description
		)

		VALUES (?, ?, ?, ?, ?, ?)
	`,
}