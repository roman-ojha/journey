const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  VALIDATION_ERROR: 422,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
};

type ERROR_TYPES =
  | "VALIDATION_ERROR"
  | "APP_ERROR"
  | "INTERNAL_SERVER_ERROR"
  | "BAD_REQUEST_ERROR"
  | "API_ERROR";

export { STATUS_CODES, ERROR_TYPES };

export default {
  APPLICATION_NAME: "Journey",
  RABBIT_MQ_EXCHANGE_NAME: "JOURNEY",
  MERCHANT_VEHICLE_AND_TRAVEL_SERVICE_RABBIT_MQ_BINDING_KEY:
    "MERCHANT_VEHICLE_AND_TRAVEL_SERVICE",
  QUEUE_NAME: "ADD_TRAVEL_QUEUE",
  USER_VEHICLE_SERVICE_RABBIT_MQ_BINDING_KEY: "USER_VEHICLE_SERVICE",
};