import React,{Component} from 'react';

import Grid from '../../Grid';
import vipTableConfig,{style} from './vipTableConfig';

class Basic extends Component{
    constructor(){
        super();
        this.state = {
            defaultValue : {},
            selectAll: false,
            getSelectedDataOnSelectAll: false
        };
        this.keyForRowSelect = "ipAddress";
        this.onRowSelect = this.onRowSelect.bind(this);
        this.onSelectAll = this.onSelectAll.bind(this);

    }
    getWidget(details){
        const {element, data} = details;
        if(element.widget === "button"){
            return (<input type="button" style={{"background": data.buttonColor}} value={data[element.options.valueParam]}/>  )
        }

        return (<div>
            {data[element.options.valueParam]}
        </div>)
    }

  selectedRowsOnSelectAll(dataToSelect){
        debugger;
    }

    onSelectAll(event){
        const {defaultValue} = this.state;
        this.setState({
            selectAll : event.currentTarget.checked,
            defaultValue: event.currentTarget.checked ? defaultValue : {}
        })
    }

    onRowClick(rowValue, index){
        debugger;
    }

    onRowSelect(data){
        debugger;
        this.setState({
            defaultValue : data,
            selectAll: false
        })
    }

    render(){
        var data = [{"ipAddress":"172.12.134.1" ,"port":27770,"buttonColor":"green" ,"machineStatus":true ,"connections":59,"otherInfo":{"avg1m":18,"avg5m":21,"avg15m":22,"text":"Moving Avg of connections per second","servicePackage":"fk-cs-platform","currentInstalledVersion":"53"}},
            {"ipAddress":"172.12.134.2" ,"port":27770,"buttonColor":"yellow" ,"machineStatus":false ,"connections":5,"otherInfo":{"avg1m":18,"avg5m":21,"avg15m":22,"text":"Moving Avg of connections per second","servicePackage":"fk-cs-platform","currentInstalledVersion":"53"}},
            {"ipAddress":"172.12.134.3" ,"port":27770,"buttonColor":"yellow" ,"machineStatus":false ,"connections":5,"otherInfo":{"avg1m":18,"avg5m":21,"avg15m":22,"text":"Moving Avg of connections per second","servicePackage":"fk-cs-platform","currentInstalledVersion":"53"}},
            {"ipAddress":"172.12.134.4" ,"port":27770,"buttonColor":"yellow" ,"machineStatus":false ,"connections":5,"otherInfo":{"avg1m":18,"avg5m":21,"avg15m":22,"text":"Moving Avg of connections per second","servicePackage":"fk-cs-platform","currentInstalledVersion":"53"}},
            {"ipAddress":"172.12.134.5" ,"port":27770,"buttonColor":"yellow" ,"machineStatus":false ,"connections":5,"otherInfo":{"avg1m":18,"avg5m":21,"avg15m":22,"text":"Moving Avg of connections per second","servicePackage":"fk-cs-platform","currentInstalledVersion":"53"}},
            {"ipAddress":"172.12.134.6" ,"port":27770,"buttonColor":"yellow" ,"machineStatus":false ,"connections":5,"otherInfo":{"avg1m":18,"avg5m":21,"avg15m":22,"text":"Moving Avg of connections per second","servicePackage":"fk-cs-platform","currentInstalledVersion":"53"}},
            {"ipAddress":"172.12.134.7" ,"port":27770,"buttonColor":"yellow" ,"machineStatus":false ,"connections":5,"otherInfo":{"avg1m":18,"avg5m":21,"avg15m":22,"text":"Moving Avg of connections per second","servicePackage":"fk-cs-platform","currentInstalledVersion":"53"}}];
        return (
            <div>
                Basic component
                <Grid
                    key="gridDetails"
                    showLoader={false}
                    style={style}
                    onRowSelect={this.onRowSelect}
                    selectAll = {this.state.selectAll}
                    selectedRowsOnSelectAll = {this.selectedRowsOnSelectAll}
                    defaultValue = {this.state.defaultValue}
                    keyForRowSelect = "ipAddress"
                    getWidget={this.getWidget}
                    options={vipTableConfig}
                    data={data? data: []}
                    rowEvents = {{
                      onClick : this.onRowClick
                    }}
                    onSelectAll = {this.onSelectAll}/>
            </div>
        )
    }
}


export default Basic;
