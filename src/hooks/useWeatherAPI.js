import { useState, useEffect, useCallback } from 'react';
import { API_GET_WAETHER, API_GET_FORECAST } from '../global/constants';

/**
 * Custom Hook
 * 1. 可以使用 useState, useEffect...
 * 2. 最後回傳的是 資料與改變資料的方法
 * 3. 可帶入參數
 */

const fetchCurrentWeather = async ({ locationName, authorizationKey }) => {
    const res = await fetch(`${API_GET_WAETHER}?Authorization=${authorizationKey}&locationName=${locationName}`)
    const data = await res.json();
    const locationData = data.records.location[0];
    const weatherElements = locationData.weatherElement.reduce((neededItems, item) => {
        if (['WDSD', 'TEMP'].includes(item.elementName)) {
            neededItems[item.elementName] = item.elementValue
        }
        return neededItems;
    }, {});

    return {
        locationName: locationData.locationName,
        observationTime: locationData.time.obsTime,
        windSpeed: weatherElements.WDSD,
        temperature: weatherElements.TEMP
    }
}
const fetchWeatherForecast = async ({ cityName, authorizationKey }) => {
    const res = await fetch(`${API_GET_FORECAST}?Authorization=${authorizationKey}&locationName=${cityName}`)
    const data = await res.json()

    const locationData = data.records.location[0];

    const weatherElements = locationData.weatherElement.reduce((neededItems, item) => {

        if ( ['Wx', 'PoP', 'CI'].includes(item.elementName) ) {
            // 這隻API會回傳未來36小時的資料，這裡只需要取近最近12小時的資料，因此用item.time[0]
            // neededItems[item.elementName] = item.time[0].parameter.parameterName
            neededItems[item.elementName] = item.time[0].parameter
        }
        return neededItems;
    },{})
    return {
        cityName,
        description: weatherElements.Wx.parameterName,
        weatherCode: weatherElements.Wx.parameterValue,
        rainPossibility: weatherElements.PoP.parameterName,
        comfortability: weatherElements.CI.parameterName
    }
}

const useWeatherAPI = ({ locationName, cityName, authorizationKey }) => {

    // useState 定義 weatherElement 的部分
    const [weatherElement, setWeatherElement] = useState({
        locationName: '',
        description: '',
        windSpeed: '0',
        temperature: '0',
        rainPossibility: '0',
        weatherCode: '1',
        comfortability: '',
        observationTime: new Date()
    });

    // 透過 useCallback 來定義fetchData()
    const fetchData = useCallback(async () => {

        const [currentWeather, weatherForecast] = await Promise.all([fetchCurrentWeather({locationName, authorizationKey}), fetchWeatherForecast({cityName, authorizationKey})]);
        
        setWeatherElement({
            ...currentWeather,
            ...weatherForecast
        })
        console.log('combine =>', {...currentWeather, ...weatherForecast})

        // 在 useCallback 中要記得把變數放入 dependency array 中
    }, [locationName, cityName, authorizationKey]);

    useEffect(() => { fetchData(); }, [fetchData]);


    // 回傳要讓其他元件使用的資料和方法
    return [weatherElement, fetchData];

};

export default useWeatherAPI;