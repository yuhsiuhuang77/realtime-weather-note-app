import { useState } from 'react';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { availableLocations } from '../../../utils/helpers';


const SettingWrapper = styled.div`
    max-width: 300px;
    margin: 0 auto;
    padding: 10px 15px;
`

const WeatherSetting = ({ currentCity, setCurrentCity }) => {


    const handleChange = (event) => {
        setCurrentCity(event.target.value);
        localStorage.setItem('cityName', event.target.value);
        console.log('event.target.value', event.target.value)
    }


    return <SettingWrapper>
        <Box sx={{ maxWidth: 300 }}>
            <FormControl fullWidth>
                <InputLabel id="location-label">地區</InputLabel>
                <Select
                    labelId="location-label"
                    value={currentCity}
                    label="地區"
                    onChange={handleChange}
                >
                    <MenuItem disabled value="">
                        <em>請選擇地區</em>
                    </MenuItem>
                    {
                        availableLocations.map(({ cityName }) => (
                            <MenuItem value={cityName} key={cityName}>{cityName}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        </Box>
    </SettingWrapper>
}


export default WeatherSetting