module.exports = {
	findOne: `
		SELECT * FROM user
		WHERE email = ?
	`,
	insert: `
		INSERT INTO user (email, password, role)
		VALUES (?, ?, ?)
	`,
}