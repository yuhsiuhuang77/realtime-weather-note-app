import Item from './item'


const List = ({ listData, deletData, submitedData }) => {

    console.log('listData', listData)

    return <div className='list'>
        {
            listData.map((item) => {

                const { note, date, time, id } = item

                return (
                    <Item 
                        key={id} 
                        id={id} 
                        note={note} 
                        date={date} 
                        time={time} 
                        deletData={deletData}
                        submitedData={submitedData} 
                    />
                )
            })
        }
    </div>
}

export default List