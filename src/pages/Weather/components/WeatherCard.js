import dayjs from 'dayjs';
import styled from '@emotion/styled';

import WeatherIcon from './WeatherIcon'
import { ReactComponent as AirFlowIcon } from '../../../assets/images/airFlow.svg';
import { ReactComponent as RainIcon } from '../../../assets/images/rain.svg';
import { ReactComponent as RefreshIcon } from '../../../assets/images/refresh.svg';
import { ReactComponent as LoadingIcon } from '../../../assets/images/loading.svg';



const WeathercardWrapper = styled.div`
    position: relative;
    max-width: 360px;
    box-shadow: ${ ({theme}) => theme.boxShadow };
    background-color: ${ ({theme}) => theme.backgroundColor };
    box-sizing: border-box;
    padding: 30px 15px;
`

// {theme: 'dark', children: '台北市'}
const Location = styled.div`
    ${props => console.log(props)}
    font-size: 28px;
    color: ${({ theme }) => theme.titleColor};
    margin-bottom: 20px;
`

const Description = styled.div`
    font-size: 16px;
    color: ${({ theme }) => theme.textColor};
    margin-bottom: 30px;
`;

const CurrentWeather = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
`;

const Temperature = styled.div`
    color: ${({ theme }) => theme.temperatureColor};
    font-size: 96px;
    font-weight: 300;
    display: flex;
`;

const Celsius = styled.div`
    font-weight: normal;
    font-size: 42px;
`;

const AirFlow = styled.div`
    display: flex;
    align-items: center;
    font-size: 16x;
    font-weight: 300;
    color: ${({ theme }) => theme.textColor};
    margin-bottom: 20px;

    svg {
        width: 25px;
        height: auto;
        margin-right: 30px;
    }
`;

const Rain = styled.div`
    display: flex;
    align-items: center;
    font-size: 16x;
    font-weight: 300;
    color: ${({ theme }) => theme.textColor};

    svg {
        width: 25px;
        height: auto;
        margin-right: 30px;
    }
`;

// const DayCloudy = styled(DayCloudyIcon)`
//     flex-basis: 30%;
// `;

const Refresh = styled.div`
    position: absolute;
    right: 15px;
    bottom: 15px;
    font-size: 12px;
    display: inline-flex;
    align-items: flex-end;
    color: #828282;

    svg {
        width: 15px;
        height: 15px;
        margin-left: 10px;
        cursor: pointer;
        animation: rotate infinite 1.5s linear;
        animation-duration: ${({isLoading}) => isLoading ? '1.5s' : '0s'}
    }
    
    @keyframes rotate {
        from { transform: rotate(360deg) }
        to { transform: rotate(0deg) }
    }
`;


const WeatherCard = ({ weatherElement, moment, fetchData, isLoading }) => {

    const {
        observationTime,
        description,
        windSpeed,
        weatherCode,
        temperature,
        rainPossibility,
        cityName,
        comfortability
    } = weatherElement;

    return <WeathercardWrapper >
        <Location>{cityName}</Location>
        <Description>{description}-{comfortability}</Description>
        <CurrentWeather>
            <WeatherIcon weatherCode={weatherCode} moment={moment} />
            <Temperature>
                {Math.round(temperature)} <Celsius>°C</Celsius>
            </Temperature>
        </CurrentWeather>
        <AirFlow> 
            <AirFlowIcon></AirFlowIcon>
            {windSpeed} m/h 
        </AirFlow>
        <Rain> 
            <RainIcon></RainIcon>
            {rainPossibility} % 
        </Rain>
        <Refresh 
            onClick={fetchData}
            isLoading={isLoading}>
            最後觀測時間: 
            {
                new Intl.DateTimeFormat('zh-tw', {
                    hour: 'numeric',
                    minute: 'numeric'
                }).format(dayjs(observationTime))
            }
            {
                isLoading ? <LoadingIcon/> : <RefreshIcon/>
            }
        </Refresh>
    </WeathercardWrapper>
}


export default WeatherCard