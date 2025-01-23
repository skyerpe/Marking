module.exports = (sequelize, DataTypes) => {
	return sequelize.define('stfms', {
    userid:{
      type:DataTypes.INTEGER,
      primaryKey: true,
    },
    nickname:{
      type:DataTypes.STRING,
    },
	}, 
  {
		timestamps: false,
	});
};