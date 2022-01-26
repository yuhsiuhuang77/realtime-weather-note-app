import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { v4 } from 'uuid';
import '../index.css'

const Edit = ({ add, submitedData }) => {

    const [note, setNote] = useState("")
    function noteChange(e) {
        setNote(e.target.value)
    }

    const [date, setDate] = useState("")
    function dateChange(e) {
        setDate(e.target.value)
    }

    const [time, setTime] = useState("")
    function timeChange(e) {
        setTime(e.target.value)
    }

    function addItem() {

        submitedData.current =  true

        add(function(prevData) {
            return [{
                id: v4(),
                note,
                date,
                time
            },
            ...prevData]
        })
    }

    return <div>
        <h1>備忘錄</h1>
        <Box sx={{mb: "20px"}}>
            <input type="text" placeholder="記事" value={note} onChange={noteChange} />
        </Box>
        <Box sx={{mb: "20px"}}>
            <input type="date"  placeholder="日期" value={date} onChange={dateChange} />
        </Box>
        <Box sx={{mb: "20px"}}>
            <input type="time"  placeholder="時間" value={time} onChange={timeChange} />
        </Box>
        <Box sx={{mb: "20px"}}>
            <Button onClick={addItem} variant="contained">新增</Button>
        </Box>
        
    </div>
}

export default Edit