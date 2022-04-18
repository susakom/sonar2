import EventsExpressService from './EventsExpressService';

const baseService = new EventsExpressService();

export default class PhotoService {
    getPreviewEventPhoto = id => baseService.getPhoto(`photo/GetPreviewEventPhoto/${id}`);

    getFullEventPhoto = id => baseService.getPhoto(`photo/GetFullEventPhoto/${id}`);

    getUserPhoto = id => baseService.getPhoto(`photo/GetUserPhoto/${id}`);

    setEventTempPhoto = async (id, data) => {
        let photo = new FormData();
        photo.append(`Photo`, data);
        return baseService.setResourceWithData(`event/SetEventTempPhoto/${id}`, photo)
    };

    deleteUserPhoto = id => baseService.setResource(`photo/DeleteUserPhoto/${id}`)
}