class Utility {
    constructor() {
        this.typeChecker = require('javascript-type-checker');
        this.internalErrors = require('../constants/internalErrors');
        this.axios = require('axios');
        this.config = require('../config');
        this.cityList = require('../city.list.json')
        this.idList = require('../cityid.list.json')
        this.getCurrentWeatherByLatLong = this.getCurrentWeatherByLatLong.bind(this);
        this.getCurrentWeatherByCityId = this.getCurrentWeatherByCityId.bind(this);
        this.getCurrentWeatherByCityName = this.getCurrentWeatherByCityName.bind(this);
    }
    
    getCurrentWeatherByLatLong(latitude, longitude) {
        if(!this.isValidLatitude(latitude)) throw this.internalErrors.ERR_LAT_INVALID;
        if(!this.isValidLongitude(longitude)) throw this.internalErrors.ERR_LONG_INVALID;
        const url = `${this.config.BASE_URL}?appid=${this.config.API_KEY}&lat=${latitude}&lon=${longitude}`;
        return this.axios.default.get(url);
    }

    getCurrentWeatherByCityName(city) {
        const url = `${this.config.BASE_URL}?appid=${this.config.API_KEY}&q=${city}`;
        return this.axios.default.get(url);
    }

    getCurrentWeatherByCityId(cityId) {
        let pt = Date.now();
        if(!this.isCityIdValid(cityId)) throw this.internalErrors.ERR_CITYID_INVALID;
        console.log(Date.now()-pt)
        const url = `${this.config.BASE_URL}?appid=${this.config.API_KEY}&id=${cityId}`;
        return this.axios.default.get(url);
    }

    isValidLatitude(latitude) {
        return (this.typeChecker.isNumber(latitude) && latitude >= -90 && latitude <=90);
    }

    isValidLongitude(longitude) {
        return (this.typeChecker.isNumber(longitude) && longitude >= -180 && longitude <= 180);
    }

    isCityIdValid(cityId) {
        return this.idList.indexOf(cityId) >= 0;
    }

    getCityList() {
        return this.cityList;
    }
}

module.exports = new Utility();