module.exports = (sequelize, DataTypes) => {
	return sequelize.define('events', {
		event_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
		},
		event_name: {
			type: DataTypes.STRING,
		},
        event_timest: {
			type: DataTypes.DATE,
		},
        event_timemt: {
			type: DataTypes.DATE,
		},
        event_dep: {
			type: DataTypes.STRING,
		},
        event_des: {
			type: DataTypes.STRING,
		},
        event_server: {
			type: DataTypes.STRING,
		},
	}, {
		timestamps: false,
	});
};
