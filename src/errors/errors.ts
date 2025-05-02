// 2. 기본 CustomError 클래스 생성
class CustomError extends Error {
  message: string;
  status: number;
  code: number;

  constructor(errorData: { code: number; status: number; message: string }) {
    super(errorData.message);

    this.code = errorData.code;
    this.message = errorData.message;
    this.status = errorData.status;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }
  }
}

export default CustomError;
