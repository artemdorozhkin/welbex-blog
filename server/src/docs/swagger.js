import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import projPackage from "../../package.json";
import log from "../common/logging.js";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "REST API Docs",
      version: projPackage.version,
    },
    components: {
      securitySchemas: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.js", "./src/models/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app, port) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.get("/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  log.info(`Docs available at http://localhost:${port}/api-docs`);
}

export default swaggerDocs;
