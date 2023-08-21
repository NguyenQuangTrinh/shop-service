import express, { Express, Request, Response } from "express"
import {
    createProductHandler,
    getProductHandler,
    updateProductHandler,
    deleteProductHandler,
  } from "../controllers/product.controller";
import validateResource from "../middleware/validateResource";
import requireUser from "../middleware/requireUser";
import { createProductSchema, deleteProductSchema, getProductSchema, updateProductSchema } from "../schema/product.schema";

const ProductRouter = express.Router();

ProductRouter.route("/").post(
  [requireUser, validateResource(createProductSchema)],
  createProductHandler
)

ProductRouter.route("/:productId").get(
    validateResource(getProductSchema),
    getProductHandler
)

ProductRouter.route("/:productId").put(
  [requireUser, validateResource(updateProductSchema)],
  updateProductHandler
)

ProductRouter.route("/:productId").delete(
  [requireUser, validateResource(deleteProductSchema)],
  deleteProductHandler
)

export default ProductRouter;
