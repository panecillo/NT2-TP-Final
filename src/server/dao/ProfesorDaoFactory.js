import ProfesorDaoDb from './ProfesorDaoDb.js'
//import Config from '../../../config.js'


class ProfesorDaoFactory {
    static getDao() {
        //switch (Config.mode) {
        //    case 'dbm': return new ProfesorDaoDb()
        //    default: throw "invalid mode. check system config!"
        //    
        //}
        return new ProfesorDaoDb()
    }
}

export default ProfesorDaoFactory