import Button from '@mui/material/Button';
import '../index.css'

const Item = ({ id, note, date, time, deletData, submitedData }) => {

    function deleteItem() {

        submitedData.current =  true

        // 過濾掉當前ID
        deletData(function(prev) {
            return prev.filter(item => item.id !== id)
        })
    }

    return <div className="item border-bottom">
        <div>
            <p>{note}</p>
            <p>{`${date} ${time}`}</p>
        </div>
        
        <Button onClick={deleteItem} variant="outlined" color="error">刪除</Button>
    </div>
}


export default Item