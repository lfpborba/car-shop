enum ErrorTypes {
  EntityNotFound = 'EntityNotFound',
  InvalidMongoId = 'InvalidMongoId',
}

type ErrorResponseObject = {
  message: string,
  httpStatus: number
};

type ErrorCatalog = Record<ErrorTypes, ErrorResponseObject>;

const errorCatalog: ErrorCatalog = {
  EntityNotFound: {
    message: 'Entity Not Found',
    httpStatus: 404,
  },
  InvalidMongoId: {
    message: 'Id must be a 24 characters hexadecimal',
    httpStatus: 400,
  },
};

export { ErrorTypes, errorCatalog };