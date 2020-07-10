import AlumnoDaoDb from './AlumnoDaoDb.js'
//import Config from '../../../config.js'


class AlumnoDaoFactory {
    static getDao() {
        //switch (Config.mode) {
        //    case 'dbm': return new AlumnoDaoDb()
        //    default: throw "invalid mode. check system config!"
        //    
        //}
        return new AlumnoDaoDb()
    }
}

export default AlumnoDaoFactory