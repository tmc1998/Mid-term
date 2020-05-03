import React, {useEffect, useState} from 'react';
import {LineChart, Line,XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import { Container} from 'react-bootstrap';
const CovidChart = () => {
    const [list, setList] = useState([]);
    const [totalList, setTotalList] = useState([]);
    let keys = [];
    let totalKeys = [];
    let data = [];
    let totalData = [];
    useEffect(() => {
        fetch('https://td.fpt.ai/corona/corona-chart-vn.json')
            .then(res => res.json())
            .then(
                (result) => {
                    setList(result);       
                },
            )
        fetch('https://td.fpt.ai/corona/corona-total.json')
        .then(res => res.json())
        .then(
            (result) => {
                setTotalList(result);       
            },
        )
    }, [])

    

    keys = Object.keys(list);
    data = keys.map(key => {
        let tmp = {ngay: null,nhiembenh: null,nghinhiem:null,khoibenh: null}
        tmp.ngay = key;
        tmp.nhiembenh = list[key][0];
        tmp.nghinhiem = list[key][1];
        tmp.khoibenh = list[key][2];
        return tmp; 
    })

    totalKeys = Object.keys(totalList);
    totalData = totalKeys.map(key => {
        let tmp = {ngay: null,nhiembenh: null,nghinhiem:null,khoibenh: null}
        tmp.ngay = key;
        tmp.nhiembenh = totalList[key][0];
        tmp.nghinhiem = totalList[key][1];
        tmp.khoibenh = totalList[key][2];
        return tmp; 
    })

    return (
        <Container>
                <h1>Việt Nam</h1>
                <div className = "chart-wrapper">
                    <LineChart
                        width = {1000}
                        height = {380}
                        data={data}
                        margin= {{ top: 0, right: 0, bottom: 0, left: 60 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="ngay" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="nhiembenh" stroke="#d88484" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="nghinhiem" stroke="#cfb000" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="khoibenh" stroke="#00ff33" activeDot={{ r: 8 }} />
                    </LineChart>
                </div>
                <h1>Thế giới</h1>
                    <div className = "chart-wrapper">
                        <LineChart
                            width = {1000}
                            height = {380}
                            data={totalData}
                            margin= {{ top: 0, right: 0, bottom: 0, left: 60 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="ngay" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="nhiembenh" stroke="#d88484" activeDot={{ r: 8 }} />
                            <Line type="monotone" dataKey="nghinhiem" stroke="#cfb000" activeDot={{ r: 8 }} />
                            <Line type="monotone" dataKey="khoibenh" stroke="#00ff33" activeDot={{ r: 8 }} />
                        </LineChart>
                    </div>
        </Container>
    )
}


export default CovidChart;