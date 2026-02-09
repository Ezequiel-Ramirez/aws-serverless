import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { ddbClient } from "./ddbClient.js";
import { GetItemCommand } from "@aws-sdk/client-dynamodb";

export const handler = async (event) => {
    console.log("Event:", JSON.stringify(event, undefined, 2));

    // TODO: Add your business logic here
    switch (event.httpMethod) {
        case "GET":
            // Handle GET request
            if (event.pathParameters !== null) {
                body = await getProduct(event.pathParameters.id);
            } else {
                body = await getAllProducts();
            }
            break;
        case "POST":
            // Handle POST request
            break;
        case "PUT":
            // Handle PUT request
            break;
        case "DELETE":
            // Handle DELETE request
            break;
        default:
            break;
    }
    
    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json",
        },
        body: `Hello from Product ! You 've hit ${event.httpMethod} ${event.path}`,
    };
};

async function getProduct(id) {
    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json",
        },
        body: `Get product by ID: ${id}`,
    };
}

async function getAllProducts() {
    try {
        const params = {
            TableName: process.env.DYNAMODB_TABLE_NAME,
            Key: marshall({id: "1"})
        };
        const {Item} = await ddbClient.send(new GetItemCommand(params));
        return (Item) ? unmarshall(Item) : {
            message: "No product found",
};
    } catch (error) {
        return {
            statusCode: 500,
            headers: {
                "Content-Type": "application/json",
            },
            body: `Error getting all products: ${error.message}`,
        };
    }
    
}
