import _ from 'lodash';

const sortData = {
	getSortedData : function(data, sortType, sortOrder, key){
        var actualKey = key;
        if(Array.isArray(key)){
            var cloneKey = key.slice();
            actualKey = cloneKey.pop();
        }

		data.sort((param1, param2) => {
            if(Array.isArray(key)){
               param1 = _.get(param1, cloneKey)
               param2 = _.get(param2, cloneKey)
            }
            switch(sortType){
                case "Number":
                    return ((param1 && param1[actualKey])? param1[actualKey] : 0) - ((param2 && param2[actualKey])? param2[actualKey] : 0);
                    break;
                default:
                    return ((param1 && param1[actualKey])? param1[actualKey] : "") .localeCompare((param2 && param2[actualKey])? param2[actualKey] : "");    
                break;
            }
        });

        if(sortOrder === "DSC") {
            data.reverse();
        }
        return data;
	}
}


export default sortData;