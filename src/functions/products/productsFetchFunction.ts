import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";

export async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
  const lambdaRequestId = context.awsRequestId
  const apiRequestId = event.requestContext.requestId
  const method = event.httpMethod

  console.log(`Lambda RequestId: ${lambdaRequestId} - API Gateway RequestId: ${apiRequestId}`)

  if (event.resource === "/products" && method === "GET") {
    console.log("GET /products")
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "GET /products"
      })
    }
  }

  return {
    statusCode: 400,
    body: JSON.stringify({
      message: "Bad Request"
    })
  }
}