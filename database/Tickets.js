module.exports = (sequelize, DataTypes) => {
	return sequelize.define('tickets', {
		channel_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
		},
		channel_name: {
			type: DataTypes.STRING,
		},
		opener_id: {
			type: DataTypes.INTEGER,
		},
    claim_id: {
			type: DataTypes.INTEGER,
		},
    open_time: {
			type: DataTypes.DATE,
		},
		ticket_status: {
			type: DataTypes.INTEGER,
		},
	}, {
		timestamps: false,
	});
};
