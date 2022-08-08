/**
 * Created by jack on 2019/10/15.
 */

/**
 * 用来转换坐标 wgs84/gcj02/bd09
 * */
let convert=(function () {
    //定义一些常量
    let x_PI = 3.14159265358979324 * 3000.0 / 180.0;
    let PI = 3.1415926535897932384626;
    let a = 6378245.0;
    let ee = 0.00669342162296594323;

    /**
     　　* 百度坐标系 (BD-09) 与 火星坐标系 (GCJ-02)的转换
     　　* 即 百度 转 谷歌、高德
     　　* @param bd_lon
     　　* @param bd_lat
     　　* @returns {*[]}
     　　*/
    function bd09togcj02(bd_lon, bd_lat) {
        let x_pi = 3.14159265358979324 * 3000.0 / 180.0;
        let x = bd_lon - 0.0065;
        let y = bd_lat - 0.006;
        let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
        let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
        let gg_lng = z * Math.cos(theta);
        let gg_lat = z * Math.sin(theta);
        return [gg_lng, gg_lat]
    }

    /**
     * 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换
     * 即谷歌、高德 转 百度
     * @param lng
     * @param lat
     * @returns {*[]}
     */
    function gcj02tobd09(lng, lat) {
        let z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * x_PI);
        let theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * x_PI);
        let bd_lng = z * Math.cos(theta) + 0.0065;
        let bd_lat = z * Math.sin(theta) + 0.006;
        return [bd_lng, bd_lat]
    }

    /**
     * WGS84转GCj02
     * @param lng
     * @param lat
     * @returns {*[]}
     */
    function wgs84togcj02(lng, lat) {
        if (out_of_china(lng, lat)) {
            return [lng, lat]
        }
        else {
            let dlat = transformlat(lng - 105.0, lat - 35.0);
            let dlng = transformlng(lng - 105.0, lat - 35.0);
            let radlat = lat / 180.0 * PI;
            let magic = Math.sin(radlat);
            magic = 1 - ee * magic * magic;
            let sqrtmagic = Math.sqrt(magic);
            dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
            dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
            let mglat = lat + dlat;
            let mglng = lng + dlng;
            return [mglng, mglat]
        }
    }

    /**
     * GCJ02 转换为 WGS84
     * @param lng
     * @param lat
     * @returns {*[]}
     */
    function gcj02towgs84(lng, lat) {
        if (out_of_china(lng, lat)) {
            return [lng, lat]
        }
        else {
            let dlat = transformlat(lng - 105.0, lat - 35.0);
            let dlng = transformlng(lng - 105.0, lat - 35.0);
            let radlat = lat / 180.0 * PI;
            let magic = Math.sin(radlat);
            magic = 1 - ee * magic * magic;
            let sqrtmagic = Math.sqrt(magic);
            dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
            dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
            mglat = lat + dlat;
            mglng = lng + dlng;
            return [lng * 2 - mglng, lat * 2 - mglat]
        }
    }

    function transformlat(lng, lat) {
        let ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
        ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0;
        ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0;
        return ret
    }

    function transformlng(lng, lat) {
        let ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
        ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0;
        ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0;
        return ret
    }

    /**
     * 判断是否在国内，不在国内则不做偏移
     * @param lng
     * @param lat
     * @returns {boolean}
     */
    function out_of_china(lng, lat) {
        return (lng < 72.004 || lng > 137.8347) || ((lat < 0.8293 || lat > 55.8271) || false);
    }

    return {
        wgs84ToGcj: wgs84togcj02,
        wgs84ToBd: function (lng, lat) {
            let p = wgs84togcj02(lng, lat);
            return gcj02tobd09(p[0], p[1]);
        },
        gcjToBd: gcj02tobd09,
        gcjToWgs84: gcj02towgs84,
        bdToGcj: bd09togcj02,
        bdToWgs84: function (lng, lat) {
            let p = bd09togcj02(lng, lat);
            return gcj02towgs84(p[0], p[1]);
        }
    };
})();
let projector=(function () {
    let obj = {
        /**
         * @constructor
         * 构建墨卡托投影
         * @param projCode {String}
         * @param [options] {Object}]
         */
        tileSize: 256,
        datum: {
            /* 半轴值 */
            semiMajorAxis: 6378137,
            /* 地理坐标最小范围 */
            minExtent: { lng: -180, lat: -85.0511287798 },
            /* 地理坐标最大范围 */
            maxExtent: { lng: 180, lat: 85.0511287798 }
        },
        /**
         * 经纬度坐标转换屏幕像素坐标
         * @param lngLat {lng:Number,lat:Number} 经纬度
         * @param zoom {int} 缩放等级
         * @return {x:Number,y:Number} 像素坐标
         */
        lngLatToPixel: function (lngLat, zoom) {
            let self = this;
            let lat = self._clip(lngLat.lat, self.datum.minExtent.lat, self.datum.maxExtent.lat);
            let lng = self._clip(lngLat.lng, self.datum.minExtent.lng, self.datum.maxExtent.lng);

            let x = (lng + 180) / 360;
            let sinLatitude = Math.sin(lat * Math.PI / 180);
            let y = 0.5 - Math.log((1 + sinLatitude) / (1 - sinLatitude)) / (4 * Math.PI);

            let mapSize = self._mapSize(zoom);

            let pixelX = parseInt(self._clip(x * mapSize + 0.5, 0, mapSize - 1));
            let pixelY = parseInt(self._clip(y * mapSize + 0.5, 0, mapSize - 1));

            return { x: pixelX, y: pixelY };
        },
        /**
         * 屏幕像素坐标转换经纬度坐标
         * @param pixel {x:Number,y:Number} 像素坐标
         * @return {lng:Number,lat:Number} 经纬度
         */
        pixelToLngLat: function (pixel, zoom) {
            let self = this;
            let mapSize = self._mapSize(zoom);
            let x = (self._clip(pixel.x, 0, mapSize - 1) / mapSize) - 0.5;
            let y = 0.5 - (self._clip(pixel.y, 0, mapSize - 1) / mapSize);
            let latitude = 90 - 360 * Math.atan(Math.exp(-y * 2 * Math.PI)) / Math.PI;
            let longitude = 360 * x;
            return { lng: longitude, lat: latitude };
        },
        /**
         * 返回指定地图级别的比分辨率
         * @param zoom {Number} 地图级比例尺级别
         * @param lnglat {TM.LngLat} 地图中心点
         */
        getResolution: function (zoom, lnglat) {
            let self = this;
            lnglat = self._clip(lnglat.lat, self.datum.minExtent.lat, self.datum.maxExtent.lat);
            return (Math.cos(lnglat * Math.PI / 180) * 2 * Math.PI * 6378137) / self._mapSize(zoom);
        },
        /**
         * 返回指定地图分辨率对应的地图比例尺
         * @param resolution {Number} 指定分辨率
         */
        getScale: function (resolution) {
            return parseInt((resolution * 96) / 0.0254);
        },
        /**
         * 比较取值
         * @param n {Number}
         * @param minValue {Number}
         * @param maxValue {Number}
         * @return {Number}
         **/
        _clip: function (n, minValue, maxValue) {
            return Math.min(Math.max(n, minValue), maxValue);
        },
        _mapSize: function (zoom) {
            return this.tileSize * Math.pow(2, zoom);
        }
    };
    return obj;
})();
//计算两个经纬度点 之间的距离
function distance(lnglat1, lnglat2) {
    let c = lnglat1.lat * Math.PI / 180.0;
    let d = lnglat2.lat * Math.PI / 180.0;
    let a = c - d;
    let b = (lnglat1.lng - lnglat2.lng) * Math.PI / 180.0;
    let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2)
        + Math.cos(c) * Math.cos(d) * Math.pow(Math.sin(b / 2), 2))) * 6378137.0;
    return s;
}

export {convert,distance,projector};
export default {convert,distance,projector};