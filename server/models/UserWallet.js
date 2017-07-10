// libs
import Sequelize from "sequelize"
import sequelize from './../utils/sequelize';
import UserProvider from './UserProvider';

const UserWallet = sequelize.define(
  "userwallet",
  {
    walletType: { type: Sequelize.STRING(128), field: "wallet_type" },
    balance: { type: Sequelize.STRING(128), field: "balance" }
  },
  {
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: true,
    // disable the modification of table names
    freezeTableName: true,
    // don't use camelcase for automatically added attributes but underscore style
    // so updatedAt will be updated_at
    underscored: true
  }
)
UserWallet.belongsTo(UserProvider);

export default UserWallet