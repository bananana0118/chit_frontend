// 2. 기본 CustomError 클래스 생성
class CustomError extends Error {
  error: string;
  status: number;
  statusCode: number;
  constructor(errorData: { statusCode: number; error: string; status: number }) {
    super(errorData.error);
    this.statusCode = errorData.statusCode;
    this.error = errorData.error;
    this.status = errorData.status;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }
  }
}

export default CustomError;
