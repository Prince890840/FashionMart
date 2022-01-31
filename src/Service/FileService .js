import service from './Service'

export class FileService {
    uploadFileToServer(data){
        //returns Promise object
        return service.getRestClient().post('/api/product', data);
    }
}