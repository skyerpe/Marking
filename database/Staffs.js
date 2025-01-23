module.exports = (sequelize, DataTypes) => {
	return sequelize.define('staffs', {
		user_id: DataTypes.INTEGER,
		role_id: DataTypes.INTEGER,
		amount: {
			type: DataTypes.INTEGER,
			allowNull: false,
			'default': 0,
		},
	}, {
		timestamps: false,
	});
};