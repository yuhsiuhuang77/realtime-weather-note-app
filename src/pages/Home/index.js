import { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import Edit from './components/Edit';
import List from './components/List';
import { API_GET_DATA } from '../../global/constants';
import './index.css';
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


async function fetchData(setData) {
    const res = await fetch(API_GET_DATA);
    const { data } = await res.json()
    console.log(data)
    setData(data)
}

async function fetchSetData(data) {
    await fetch(API_GET_DATA, {
        method: "PUT",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ data })
    })
}


const Home = () => {

    const [data, setData] = useState([])
    const submitedData = useRef(false)

    useEffect(() => {
        fetchData(setData)
    }, [])

    // 當資料有變動會去post dtat
    useEffect(() => {
        if (!submitedData.current) return
        fetchSetData(data).then(data => {
            submitedData.current = false
        })
    }, [data])


    // 當data有變動，執行此方法
    // useEffect(() => {
    //     console.log('EFFECT 1')
    //     return () => {
    //         console.log('EFFECT 2')
    //     }
    // }, [data])

    return <div className='container'>
        <Edit add={setData} submitedData={submitedData} />
        <List listData={data} deletData={setData} submitedData={submitedData} />
        <TipsBox>
            <Title>
                <em><TipsAndUpdatesIcon /></em><em>Learninf Tips:</em>
            </Title>
            <ul>
                <li>useState 儲存資料狀態</li>
                <li>useEffect 當 第二的參數為空陣列，只會在 Dom Render 後執行一次</li>
                <li>useEffect 當 第二的參數有值(dependency Array)，並且有更動，重新執行function</li>
                <li>prop 傳遞</li>
                <li>JSX</li>
            </ul>

        </TipsBox>
    </div>
}


export default Home
