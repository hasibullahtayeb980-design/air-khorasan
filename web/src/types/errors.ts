export class RequestError extends Error {
  public statusCode: number;
  public statusText: string;

  constructor(
    message: string,
    statusCode: number,
    statusText: string
  ) {
    super(message);
    this.name = "RequestError";
    this.statusCode = statusCode;
    this.statusText = statusText;

    // Set the prototype explicitly to maintain the correct prototype chain
    Object.setPrototypeOf(this, RequestError.prototype);
  }

  formatMessage = (): string => {
    const formattedStatusText =
      this.statusText && this.statusText.length > 0
        ? `: ${this.statusText}`
        : "";

    return `HTTP Status Code ${this.statusCode}${formattedStatusText}`;
  };
}