#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib'
import { ProductsAppStack } from '../lib/productsApp-stack'
import { EcommerceApiStack } from '../lib/ecommerceApi-stack' //dependency on productsApp-stack
import * as dotenv from 'dotenv'
dotenv.config()

const app = new cdk.App()

const env: cdk.Environment = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.AWS_REGION
}

const tags = {
  cost: "ecommerce",
  project: "mercurio"
}

const productsAppStack = new ProductsAppStack(app, "ProductsApp", { env: env, tags: tags })
const ecommerceApiStack = new EcommerceApiStack(app, "EcommerceApi", { env: env, tags: tags, productsFetchHandler: productsAppStack.productsFetchHandler })

ecommerceApiStack.addDependency(productsAppStack)