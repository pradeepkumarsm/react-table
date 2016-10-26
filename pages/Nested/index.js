import React from 'react';
import Grid from '../../Grid';
import Button from './button';


export default (props) => {



    const tableConfig = {
        classNames: {
            headerRowClass: "tableHeading",
            tbodyRowClass: "tableRow",
            tbodyColClass: "tableCol",
            tableName: "Flex_Table"
        },
        nestedElements : [
            {
                widget: Button
            }
        ],

        columns: [
            {
                "id": "ipAddress",
                "name": "IP Address",
                "options": {
                    "valueParam": "ipAddress"
                },
                "style": {
                    "columnStyle": {
                        "width": 100
                    },
                    "headerStyle": {},
                    "dataStyle": {}
                }
            },
            {
                "id": "installedVersion",
                "name": "Installed Version",
                "options": {
                    "valueParam": ["otherInfo", "version"]
                },
                "sortData":true,
                "columnType": "Number",
                "style": {
                    "columnStyle": {},
                    "headerStyle": {},
                    "dataStyle": {}
                }
            },
            {
                "id": "machineDetails",
                "name": "Machine Details",
                "options": {
                    "valueParam": ["machineDetails", "displayText"],
                    "sortingKey": ["machineDetails", "value"]
                },
                "sortData":true,
                "columnType": "Number", //By default it will take "String" type for sorting
                "style": {
                    "columnStyle": {},
                    "headerStyle": {},
                    "dataStyle": {}
                }
            }
        ]
    };


    const tableStyle = {
        "table": {},
        "trStyle": {
            "borderBottom": "1px solid #cccccc",
            "padding": "10px 0"
        },
        "tBodyRowstyle": {
            "fontSize": "13px",
            "alignItems": "center"

        },
        "tHeadRowStyle": {},
        "thStyle": {
            "textAlign": "left"
        },
        "tdStyle": {
            "textAlign": "left"
        },
        "nestedElementStyle" :{
            background: "white",
            padding:"10px",
            border: "1px solid black"
        }
    };

    const tableData = [{"ipAddress": "192.168.1.1", "otherInfo": {"version": "53"},"machineDetails":{"displayText": "machine 1","value":4}},
        {"ipAddress": "192.168.1.3", "otherInfo": {"version": "45"}, "machineDetails":{"displayText": "machine 2","value":60}}];


    function getWidget(){
        return <div>
            Widget
        </div>
    }

    return (
        <div style={{width:800}}>
            <Grid
                options={tableConfig}
                keyForRowSelect = {"ipAddress"}//Consider unique column key
                showNestedElement = {{"192.168.1.3": true,"192.168.1.1":true}}
                getWidget = {getWidget}
                style={tableStyle}
                data={tableData}/>
        </div>
    )
}