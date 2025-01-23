module.exports = (sequelize, DataTypes) => {
	return sequelize.define('users', {
		user_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
		},
		user_nick: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	}, {
		timestamps: false,
	});
};