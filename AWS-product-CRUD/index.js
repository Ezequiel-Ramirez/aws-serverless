
export const handler = async (event) => {
    console.log("Event:", JSON.stringify(event, undefined, 2));

    // TODO: Add your business logic here
    
    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            message: "Hello World",
        }),
    };
};