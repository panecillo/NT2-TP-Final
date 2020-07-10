import CursoDaoDb from './CursoDaoDb.js'
//import Config from '../../../config.js'


class CursoDaoFactory {
    static getDao() {
        //switch (Config.mode) {
        //    case 'dbm': return new ProfesorDaoDb()
        //    default: throw "invalid mode. check system config!"
        //    
        //}
        return new CursoDaoDb()
    }
}

export default CursoDaoFactory