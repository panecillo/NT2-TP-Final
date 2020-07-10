import CoordinadorDaoDb from './CoordinadorDaoDb.js'
//import Config from '../../../config.js'


class CoordinadorDaoFactory {
    static getDao() {
        //switch (Config.mode) {
        //    case 'dbm': return new CoordinadorDaoDb()
        //    default: throw "invalid mode. check system config!"
        //    
        //}
        return new CoordinadorDaoDb()
    }
}

export default CoordinadorDaoFactory