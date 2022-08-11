import { createNodeDescriptor, INodeFunctionBaseParams } from "@cognigy/extension-tools";
import axios from "axios";
import { parseString } from "xml2js";

export interface IGetCustomerParams extends INodeFunctionBaseParams {
    config: {
        connection: {
            username: string;
            password: string;
            tenant: string;
        };
        email: string;
        storeLocation: string;
        contextKey: string;
        inputKey: string;
    };
}

export const getCustomerNode = createNodeDescriptor({
    type: "getCustomer",
    defaultLabel: "Get Customer",
    summary: "Retrieves customer details from 8x8 CRM",
    fields: [
        {
            key: "connection",
            label: "8x8 CRM Connection",
            type: "connection",
            params: {
                connectionType: "eightbyeight-crm",
                required: true
            }
        },
        {
            key: "email",
            label: "E-Mail Address",
            type: "cognigyText",
            description: "The customer's email addres",
            params: {
                required: true
            }
        },
        {
            key: "storeLocation",
            type: "select",
            label: "Where to store the result",
            defaultValue: "input",
            params: {
                options: [
                    {
                        label: "Input",
                        value: "input"
                    },
                    {
                        label: "Context",
                        value: "context"
                    }
                ],
                required: true
            },
        },
        {
            key: "inputKey",
            type: "cognigyText",
            label: "Input Key to store Result",
            defaultValue: "customer",
            condition: {
                key: "storeLocation",
                value: "input",
            }
        },
        {
            key: "contextKey",
            type: "cognigyText",
            label: {
                default: "Context Key to store Result"
            },
            defaultValue: "customer",
            condition: {
                key: "storeLocation",
                value: "context",
            }
        }
    ],
    sections: [
        {
            key: "storage",
            label: "Storage Option",
            defaultCollapsed: true,
            fields: [
                "storeLocation",
                "inputKey",
                "contextKey"
            ]
        }
    ],
    form: [
        { type: "field", key: "connection" },
        { type: "field", key: "option" },
        { type: "field", key: "email" },
        { type: "section", key: "storage" }
    ],
    appearance: {
        color: "#ff0050"
    },
    dependencies: {
        children: [
            "onFoundCustomer",
            "onNotFoundCustomer"
        ]
    },
    function: async ({ cognigy, config, childConfigs }: IGetCustomerParams) => {
        const { api, input } = cognigy;
        const { connection, email, storeLocation, contextKey, inputKey } = config;
        const { username, password, tenant } = connection;

        try {

            const response = await axios({
                method: "POST",
                url: 'https://vcc-eu3.8x8.com/WAPI/wapi.php',
                data: `xml_query=<WAPI>    <TENANT>${tenant}</TENANT>    <USERNAME>${username}</USERNAME>    <PASSWORD>${password}</PASSWORD>    <COMMAND OBJECT="Customer" ACTION="GET">        <EMAIL>${email}</EMAIL>    </COMMAND></WAPI>`,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            parseString(response.data, (error: any, result: any) => {
                if (error) {
                    api.log("error", error.message);
                }

                if (result[username.toUpperCase()]["REPLY"][0]["ITEM"]) {
                    const onFoundCustomer = childConfigs.find(child => child.type === 'onFoundCustomer');
                    api.setNextNode(onFoundCustomer.id);

                    if (storeLocation === "context") {
                        api.addToContext(contextKey, result[username.toUpperCase()]["REPLY"][0]["ITEM"], "simple");
                    } else {
                        // @ts-ignore
                        api.addToInput(inputKey, result[username.toUpperCase()]["REPLY"][0]["ITEM"]);
                    }
                } else {
                    const onNotFoundCustomer = childConfigs.find(child => child.type === 'onNotFoundCustomer');
                    api.setNextNode(onNotFoundCustomer.id);
                }
            });



        } catch (error) {
            api.log("error", error.message);
            const onNotFoundCustomer = childConfigs.find(child => child.type === 'onNotFoundCustomer');
            api.setNextNode(onNotFoundCustomer.id);
        }
    }
});



export const onFoundCustomer = createNodeDescriptor({
    type: 'onFoundCustomer',
    parentType: 'getCustomer',
    defaultLabel: "On Found Customer",
    constraints: {
        editable: false,
        deletable: false,
        creatable: false,
        movable: false,
        placement: {
            predecessor: {
                whitelist: []
            }
        }
    },
    appearance: {
        color: '#61d188',
        textColor: 'white',
        variant: 'mini'
    }
});

export const onNotFoundCustomer = createNodeDescriptor({
    type: 'onNotFoundCustomer',
    parentType: 'getCustomer',
    defaultLabel: "On Not Found Customer",
    constraints: {
        editable: false,
        deletable: false,
        creatable: false,
        movable: false,
        placement: {
            predecessor: {
                whitelist: []
            }
        }
    },
    appearance: {
        color: '#61d188',
        textColor: 'white',
        variant: 'mini'
    }
});