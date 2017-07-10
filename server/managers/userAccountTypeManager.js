// libs
import UserAccountType from '../models/UserAccountType';

export const findUserAccountTypeById = (id): Promise<any> =>
  UserAccountType.findOne(Object.assign({
    where: {
      id
    }
  }))
  .then(obj => {
    console.log('obj : ' + obj)
    return obj
  })