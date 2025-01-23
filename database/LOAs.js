module.exports = (sequelize, DataTypes) => {
	return sequelize.define('loas', {
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
		},
		loastart: {
			type: DataTypes.DATE,
		},
    loastop: {
			type: DataTypes.DATE,
		},
    acceptstatus: {
			type: DataTypes.BOOLEAN,
		},
	}, {
		timestamps: false,
	});
};
