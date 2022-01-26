import { useState, useEffect, useMemo, useRef } from 'react';
import dayjs from 'dayjs';
import styled from '@emotion/styled';
import { ThemeProvider } from '@emotion/react';
import WeatherCard from './components/WeatherCard';
import useWeatherAPI from '../../hooks/useWeatherAPI';
import WeatherSetting from './components/WeatherSetting';
import { findLocation } from '../../utils/helpers';
import { API_GET_DAYNNiGHT, WEATHER_AUTH_KEY } from '../../global/constants';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';


const TipsBox = styled.div`
    margin-top: 150px;
    border-top: 1px solid #e9e9e9;
    padding-top: 20px;

    li {
        margin-bottom: 5px;
    }
`

const Title = styled.p`
    display: flex;
    flex-direction: row;
    align-items: center;
    em {
        padding-left: 5px;
    }
`

// 主題配色
const theme = {
    light: {
        backgroundColor: '#ededed',
        foregroundColor: '#f9f9f9',
        boxShadow: '0 1px 3px 0 #999999',
        titleColor: '#212121',
        temperatureColor: '#757575',
        textColor: '#828282',
    },
    dark: {
        backgroundColor: '#1F2022',
        foregroundColor: '#121416',
        boxShadow:
        '0 1px 4px 0 rgba(12, 12, 13, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.15)',
        titleColor: '#f9f9fa',
        temperatureColor: '#dddddd',
        textColor: '#cccccc',
    },
};


/**
 * 大寫駝峰
 * 定義 style-component 並當成元件
 * 套用 ThemeProvider 後的 Styled Components
 */
const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

/**
 * 取得日出日落時間
 */
const getMoment = async (locationName) => {
    const currentDate = dayjs().format('YYYY-MM-DD');
    const tomorrowDate = dayjs().add(1, 'day').format('YYYY-MM-DD');

    const res = await fetch(`${API_GET_DAYNNiGHT}?Authorization=${WEATHER_AUTH_KEY}&locationName=${locationName}&sort=dataTime&timeFrom=${currentDate}&timeTo=${tomorrowDate}`)
    const data = await res.json();

    const locationData = data.records.locations.location[0].time[0];

    const daySunsetSunrise = locationData.parameter.reduce((neededItems, item) => {
        if (['日出時刻'].includes(item.parameterName)) {
            neededItems.sunrise = item.parameterValue
        }
        if (['日沒時刻'].includes(item.parameterName)) {
            neededItems.sunset = item.parameterValue
        }
        return neededItems;
    }, {});
    // return daySunsetSunrise;

    const nowTimeStamp = dayjs().format('HH:mm');
    const stause = daySunsetSunrise.sunrise <= nowTimeStamp && nowTimeStamp <= daySunsetSunrise.sunset ? 'day' : 'night';
    return stause
}


const Weather = () => {

    const momentStatus = useRef('day');

    const [isLoading, setIsLoading] = useState(false);

    const [currentTheme, setCurrentTheme] = useState('light');

    // // 目前地區
    const storageCity = localStorage.getItem('cityName') || '臺北市';
    const [currentCity, setCurrentCity] = useState(storageCity);
    
    // 依照地區下拉改動才會觸發
    const currentLocation = useMemo(()=> findLocation(currentCity), [currentCity]);
    const { cityName, locationName, sunriseCityName } = currentLocation;

    const [weatherElement, fetchData] = useWeatherAPI({
        locationName,
        cityName,
        authorizationKey: WEATHER_AUTH_KEY
    });

    // 當sunriseCityName有更動，重新取得日出／日落時間
    useMemo(() => {
        console.log('市區變更，取得日出/日落時間')
        getMoment(sunriseCityName).then((status)=> {
            momentStatus.current = status;
        });
    }, [sunriseCityName])

    // 當下主題有更動
    useMemo(() => {
        console.log('日出/日落時間變更，改變主題狀態')
        setCurrentTheme(momentStatus.current === 'day' ? 'light' : 'dark');
    }, [momentStatus])

    useEffect(() => {
        setIsLoading(true);
        fetchData();
        setIsLoading(false);
    }, []);


    return <div className='container'>
        <WeatherSetting currentCity={currentCity} setCurrentCity={setCurrentCity} />
        {
            // 主題配色透過 props 傳入 ThemeProvider 
        }
        <ThemeProvider theme={theme[currentTheme]}>
            <Container>
                <WeatherCard 
                    weatherElement={weatherElement}
                    moment={momentStatus.current}
                    fetchData={fetchData}
                    isLoading={isLoading}
                    />
            </Container>
        </ThemeProvider>



        <TipsBox>
            <Title>
                <em><TipsAndUpdatesIcon /></em><em>Learninf Tips:</em>
            </Title>
            <ul>
                <li><a target="blank" href="https://opendata.cwb.gov.tw/dist/opendata-swagger.html#/%E8%A7%80%E6%B8%AC/get_v1_rest_datastore_O_A0003_001">中央氣象局開放資料平臺之資料擷取API</a></li>
                <li>使用 <a target="blank" href="https://www.npmjs.com/package/@emotion/react">@emotion/react</a> 套件，將配色當作 props 傳入各個 Styled Components 內</li>
                <li>useState 儲存深淺主題變數（依照API回傳目前縣市日出/日落時間）</li>
                <li>useMemo 當dependency有更動，才會再次執行（優化效能）</li>
                <li>Custom Hook 自定義Hook</li>
                <li>套用 material UI</li>
            </ul>

        </TipsBox>
    </div>
}


export default Weather