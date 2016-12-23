import React,{Component} from 'react';

import Grid from '../../Grid';
import vipTableConfig,{style} from './vipTableConfig';

class Basic extends Component{
    getWidget(details){
        const {element, data} = details;
        if(element.widget === "button"){
            return (<input type="button" style={{"background": data.buttonColor}} value={data[element.options.valueParam]}/>  )
        }

        return (<div>
            {data[element.options.valueParam]}
        </div>)
    }

    render(){
        var data = [{"port":27770,"buttonColor":"green" ,"machineStatus":true ,"connections":59,"otherInfo":{"avg1m":18,"avg5m":21,"avg15m":22,"text":"Moving Avg of connections per second","servicePackage":"fk-cs-platform","currentInstalledVersion":"53"}},
            {"port":27770,"buttonColor":"yellow" ,"machineStatus":false ,"connections":5,"otherInfo":{"avg1m":18,"avg5m":21,"avg15m":22,"text":"Moving Avg of connections per second","servicePackage":"fk-cs-platform","currentInstalledVersion":"53"}},
            {"port":27770,"buttonColor":"yellow" ,"machineStatus":false ,"connections":5,"otherInfo":{"avg1m":18,"avg5m":21,"avg15m":22,"text":"Moving Avg of connections per second","servicePackage":"fk-cs-platform","currentInstalledVersion":"53"}},
            {"port":27770,"buttonColor":"yellow" ,"machineStatus":false ,"connections":5,"otherInfo":{"avg1m":18,"avg5m":21,"avg15m":22,"text":"Moving Avg of connections per second","servicePackage":"fk-cs-platform","currentInstalledVersion":"53"}},
            {"port":27770,"buttonColor":"yellow" ,"machineStatus":false ,"connections":5,"otherInfo":{"avg1m":18,"avg5m":21,"avg15m":22,"text":"Moving Avg of connections per second","servicePackage":"fk-cs-platform","currentInstalledVersion":"53"}},
            {"port":27770,"buttonColor":"yellow" ,"machineStatus":false ,"connections":5,"otherInfo":{"avg1m":18,"avg5m":21,"avg15m":22,"text":"Moving Avg of connections per second","servicePackage":"fk-cs-platform","currentInstalledVersion":"53"}},
            {"port":27770,"buttonColor":"yellow" ,"machineStatus":false ,"connections":5,"otherInfo":{"avg1m":18,"avg5m":21,"avg15m":22,"text":"Moving Avg of connections per second","servicePackage":"fk-cs-platform","currentInstalledVersion":"53"}},
            {"port":27770,"buttonColor":"yellow" ,"machineStatus":false ,"connections":5,"otherInfo":{"avg1m":18,"avg5m":21,"avg15m":22,"text":"Moving Avg of connections per second","servicePackage":"fk-cs-platform","currentInstalledVersion":"53"}},
            {"port":27770,"buttonColor":"yellow" ,"machineStatus":false ,"connections":5,"otherInfo":{"avg1m":18,"avg5m":21,"avg15m":22,"text":"Moving Avg of connections per second","servicePackage":"fk-cs-platform","currentInstalledVersion":"53"}},
            {"port":27770,"buttonColor":"yellow" ,"machineStatus":false ,"connections":5,"otherInfo":{"avg1m":18,"avg5m":21,"avg15m":22,"text":"Moving Avg of connections per second","servicePackage":"fk-cs-platform","currentInstalledVersion":"53"}},
            {"port":27770,"buttonColor":"yellow" ,"machineStatus":false ,"connections":5,"otherInfo":{"avg1m":18,"avg5m":21,"avg15m":22,"text":"Moving Avg of connections per second","servicePackage":"fk-cs-platform","currentInstalledVersion":"53"}},
            {"port":27770,"buttonColor":"yellow" ,"machineStatus":false ,"connections":5,"otherInfo":{"avg1m":18,"avg5m":21,"avg15m":22,"text":"Moving Avg of connections per second","servicePackage":"fk-cs-platform","currentInstalledVersion":"53"}},
            {"port":27770,"buttonColor":"yellow" ,"machineStatus":false ,"connections":5,"otherInfo":{"avg1m":18,"avg5m":21,"avg15m":22,"text":"Moving Avg of connections per second","servicePackage":"fk-cs-platform","currentInstalledVersion":"53"}},
            {"port":27770,"buttonColor":"yellow" ,"machineStatus":false ,"connections":5,"otherInfo":{"avg1m":18,"avg5m":21,"avg15m":22,"text":"Moving Avg of connections per second","servicePackage":"fk-cs-platform","currentInstalledVersion":"53"}},
            {"port":27770,"buttonColor":"yellow" ,"machineStatus":false ,"connections":5,"otherInfo":{"avg1m":18,"avg5m":21,"avg15m":22,"text":"Moving Avg of connections per second","servicePackage":"fk-cs-platform","currentInstalledVersion":"53"}},
            {"port":27770,"buttonColor":"yellow" ,"machineStatus":false ,"connections":5,"otherInfo":{"avg1m":18,"avg5m":21,"avg15m":22,"text":"Moving Avg of connections per second","servicePackage":"fk-cs-platform","currentInstalledVersion":"53"}},
            {"port":27770,"buttonColor":"yellow" ,"machineStatus":false ,"connections":5,"otherInfo":{"avg1m":18,"avg5m":21,"avg15m":22,"text":"Moving Avg of connections per second","servicePackage":"fk-cs-platform","currentInstalledVersion":"53"}},
            {"port":27770,"buttonColor":"yellow" ,"machineStatus":false ,"connections":5,"otherInfo":{"avg1m":18,"avg5m":21,"avg15m":22,"text":"Moving Avg of connections per second","servicePackage":"fk-cs-platform","currentInstalledVersion":"53"}},
            {"port":27770,"buttonColor":"yellow" ,"machineStatus":false ,"connections":5,"otherInfo":{"avg1m":18,"avg5m":21,"avg15m":22,"text":"Moving Avg of connections per second","servicePackage":"fk-cs-platform","currentInstalledVersion":"53"}},
            {"port":27770,"buttonColor":"yellow" ,"machineStatus":false ,"connections":5,"otherInfo":{"avg1m":18,"avg5m":21,"avg15m":22,"text":"Moving Avg of connections per second","servicePackage":"fk-cs-platform","currentInstalledVersion":"53"}},
            {"port":27770,"buttonColor":"yellow" ,"machineStatus":false ,"connections":5,"otherInfo":{"avg1m":18,"avg5m":21,"avg15m":22,"text":"Moving Avg of connections per second","servicePackage":"fk-cs-platform","currentInstalledVersion":"53"}},
            {"port":27770,"buttonColor":"yellow" ,"machineStatus":false ,"connections":5,"otherInfo":{"avg1m":18,"avg5m":21,"avg15m":22,"text":"Moving Avg of connections per second","servicePackage":"fk-cs-platform","currentInstalledVersion":"53"}},
            {"port":27770,"buttonColor":"yellow" ,"machineStatus":false ,"connections":5,"otherInfo":{"avg1m":18,"avg5m":21,"avg15m":22,"text":"Moving Avg of connections per second","servicePackage":"fk-cs-platform","currentInstalledVersion":"53"}},
            {"port":27770,"buttonColor":"yellow" ,"machineStatus":false ,"connections":5,"otherInfo":{"avg1m":18,"avg5m":21,"avg15m":22,"text":"Moving Avg of connections per second","servicePackage":"fk-cs-platform","currentInstalledVersion":"53"}},
            {"port":27770,"buttonColor":"yellow" ,"machineStatus":false ,"connections":5,"otherInfo":{"avg1m":18,"avg5m":21,"avg15m":22,"text":"Moving Avg of connections per second","servicePackage":"fk-cs-platform","currentInstalledVersion":"53"}},
            {"port":27770,"buttonColor":"yellow" ,"machineStatus":false ,"connections":5,"otherInfo":{"avg1m":18,"avg5m":21,"avg15m":22,"text":"Moving Avg of connections per second","servicePackage":"fk-cs-platform","currentInstalledVersion":"53"}},
            {"port":27770,"buttonColor":"yellow" ,"machineStatus":false ,"connections":5,"otherInfo":{"avg1m":18,"avg5m":21,"avg15m":22,"text":"Moving Avg of connections per second","servicePackage":"fk-cs-platform","currentInstalledVersion":"53"}},
            {"port":27770,"buttonColor":"yellow" ,"machineStatus":false ,"connections":5,"otherInfo":{"avg1m":18,"avg5m":21,"avg15m":22,"text":"Moving Avg of connections per second","servicePackage":"fk-cs-platform","currentInstalledVersion":"53"}},
            {"port":27770,"buttonColor":"yellow" ,"machineStatus":false ,"connections":5,"otherInfo":{"avg1m":18,"avg5m":21,"avg15m":22,"text":"Moving Avg of connections per second","servicePackage":"fk-cs-platform","currentInstalledVersion":"53"}},
            {"port":27770,"buttonColor":"yellow" ,"machineStatus":false ,"connections":5,"otherInfo":{"avg1m":18,"avg5m":21,"avg15m":22,"text":"Moving Avg of connections per second","servicePackage":"fk-cs-platform","currentInstalledVersion":"53"}},
            {"port":27770,"buttonColor":"yellow" ,"machineStatus":false ,"connections":5,"otherInfo":{"avg1m":18,"avg5m":21,"avg15m":22,"text":"Moving Avg of connections per second","servicePackage":"fk-cs-platform","currentInstalledVersion":"53"}},
            {"port":27770,"buttonColor":"yellow" ,"machineStatus":false ,"connections":5,"otherInfo":{"avg1m":18,"avg5m":21,"avg15m":22,"text":"Moving Avg of connections per second","servicePackage":"fk-cs-platform","currentInstalledVersion":"53"}},
            {"port":27770,"buttonColor":"yellow" ,"machineStatus":false ,"connections":5,"otherInfo":{"avg1m":18,"avg5m":21,"avg15m":22,"text":"Moving Avg of connections per second","servicePackage":"fk-cs-platform","currentInstalledVersion":"53"}},
            {"port":27770,"buttonColor":"yellow" ,"machineStatus":false ,"connections":5,"otherInfo":{"avg1m":18,"avg5m":21,"avg15m":22,"text":"Moving Avg of connections per second","servicePackage":"fk-cs-platform","currentInstalledVersion":"53"}},
            {"port":27770,"buttonColor":"yellow" ,"machineStatus":false ,"connections":5,"otherInfo":{"avg1m":18,"avg5m":21,"avg15m":22,"text":"Moving Avg of connections per second","servicePackage":"fk-cs-platform","currentInstalledVersion":"53"}},
            {"port":27770,"buttonColor":"yellow" ,"machineStatus":false ,"connections":5,"otherInfo":{"avg1m":18,"avg5m":21,"avg15m":22,"text":"Moving Avg of connections per second","servicePackage":"fk-cs-platform","currentInstalledVersion":"53"}},
            {"port":27770,"buttonColor":"yellow" ,"machineStatus":false ,"connections":5,"otherInfo":{"avg1m":18,"avg5m":21,"avg15m":22,"text":"Moving Avg of connections per second","servicePackage":"fk-cs-platform","currentInstalledVersion":"53"}},
            {"port":27770,"buttonColor":"yellow" ,"machineStatus":false ,"connections":5,"otherInfo":{"avg1m":18,"avg5m":21,"avg15m":22,"text":"Moving Avg of connections per second","servicePackage":"fk-cs-platform","currentInstalledVersion":"53"}},
            {"port":27770,"buttonColor":"yellow" ,"machineStatus":false ,"connections":5,"otherInfo":{"avg1m":18,"avg5m":21,"avg15m":22,"text":"Moving Avg of connections per second","servicePackage":"fk-cs-platform","currentInstalledVersion":"53"}},
            {"port":27770,"buttonColor":"red" ,"machineStatus":true ,"connections":10,"otherInfo":{"avg1m":18,"avg5m":21,"avg15m":22,"text":"Moving Avg of connections per second","servicePackage":"fk-cs-platform","currentInstalledVersion":"53"}},
            {"port":27770,"buttonColor":"blue" ,"machineStatus":false ,"connections":90,"otherInfo":{"avg1m":18,"avg5m":21,"avg15m":22,"text":"Moving Avg of connections per second","servicePackage":"fk-cs-platform","currentInstalledVersion":"53"}}];
        return (
            <div>
                Basic component
                <Grid
                    key="gridDetails"
                    showLoader={false}
                    style={style}
                    getWidget={this.getWidget}
                    options={vipTableConfig}
                    data={data? data: []}/>
            </div>
        )
    }
}


export default Basic;
