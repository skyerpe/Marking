module.exports = (sequelize, DataTypes) => {
	return sequelize.define('roles', {
		role_name: {
			type: DataTypes.STRING,
			unique: true,
		},
		role_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	}, {
		timestamps: false,
	});
};
