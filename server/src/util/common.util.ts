export class Common {

    static isExist(param: any) {
        if (typeof param === undefined || param == '' || param == null || param == false) {     // not exist
            return false;
        }
        return true;
    }
}