import Checkbox from '../../Components/Checkbox';

export default {
    classNames: {
        headerRowClass: "heading",
        tbodyRowClass: "AHTRow",
        tbodyColClass: "AHTRowCol",
        tableName: "QueueGrid"
    },

    columns:[
        {
            "id":"check",
            "name":"",
            "widget": Checkbox,
            "options":{
                "valueParam":"ipAddress"
            },
            "style":{
                "columnStyle":{
                },
                "headerStyle":{
                },
                "dataStyle":{

                }
            }
        },
        {
            "id":"ipAddress",
            "name":"IP Address",
            "options":{
                "valueParam":"ipAddress"
            },
            "style":{
                "columnStyle":{
                },
                "headerStyle":{
                },
                "dataStyle":{

                }
            }
        },
        {
            "id":"installedVersion",
            "name":"Installed Version",
            "options":{
                "valueParam":["otherInfo", "currentInstalledVersion"]
            },
            "style":{
                "columnStyle":{
                },
                "headerStyle":{
                },
                "dataStyle":{

                }
            }
        },
        {
            "id":"connections",
            "name":"Connections",
            "options":{
                "valueParam":"connections"
            },
            "sortData": true,
            "columnType": "Number",
            "style":{
                "columnStyle":{
                },
                "headerStyle":{
                },
                "dataStyle":{

                }
            }
        },
        {
            "id":"servicePackage",
            "name":"Service Pack",
            "options":{
                "valueParam":["otherInfo", "servicePackage"]
            },
            "style":{
                "columnStyle":{
                },
                "headerStyle":{
                },
                "dataStyle":{

                }
            }
        },
        {
            "id":"port",
            "name":"Port",
            "options":{
                "valueParam":"port"
            },
            "style":{
                "columnStyle":{
                },
                "headerStyle":{
                },
                "dataStyle":{

                }
            }
        },
        {
            "id":"machineStatus",
            "name":"Status",
            "options":{
                "valueParam":"machineStatus",
                "sortingKey": "buttonColor" //This value will be used for sorting
            },
            "sortData": true,
            "widget":"button",
            "style":{
                "columnStyle":{
                },
                "headerStyle":{
                },
                "dataStyle":{

                }
            }
        },
        {
            "id":"errorDetails",
            "name":"Error Details",
            "options":{
                "valueParam":"errorDetails"
            },
            "style":{
                "columnStyle":{
                },
                "headerStyle":{
                },
                "dataStyle":{

                }
            }
        },
        {
            "id":"changeStatus",
            "name":"Toggle Machine Status",
            "options":{
                "valueParam":"machineStatus"
            },
            "style":{
                "columnStyle":{
                },
                "headerStyle":{
                },
                "dataStyle":{

                }
            }
        }
    ]
}


export const style = {
    "table":{

    },
    "trStyle":{
    },
    "tBodyRowstyle":{

    },
    "tHeadRowStyle":{

    },
    "thStyle": {
    },
    "tdStyle":{
    }

};
