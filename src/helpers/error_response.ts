import { HttpException, HttpStatus } from '@nestjs/common';

export const ErrorResponse = {
  conflict: (errorMessage: string, statusCode?: number) => {
    throw new HttpException(
      {
        status: statusCode || HttpStatus.CONFLICT,
        error: errorMessage,
      },
      HttpStatus.CONFLICT,
    );
  },

  badRequest: (errorMessage: string, statusCode?: number) => {
    throw new HttpException(
      {
        status: statusCode || HttpStatus.BAD_REQUEST,
        error: errorMessage,
      },
      HttpStatus.BAD_REQUEST,
    );
  },
};
