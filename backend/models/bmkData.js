// const { DataTypes, Model } = require("sequelize");

// let dbConnect = require("../dbConnect");

// const sequelizeInstance = dbConnect.Sequelize;

// class bmkData extends Model {}
// bmkData.init({
//     bmkDescription: { type: DataTypes.STRING, allowNull: false, required: true },
//     bmkLink: { type: DataTypes.STRING, allowNull: false, required: false },
//     bmkComments: { type: DataTypes.STRING, allowNull: false, required: false, unique: false },
//     bmkKeywords: { type: DataTypes.STRING, allowNull: false, required: true},
//     bmkEditDate: {type: DataTypes.DATE, allowNull: false, required: true},
// }, {sequelize: sequelizeInstance, modelName: 'bmkData', timestamps: true, freezeTableName: true})

// module.exports = bmkData;