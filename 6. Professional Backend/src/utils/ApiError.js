class ApiError extends Error {
   constructor(
      statusCode,
      message= "Some unknown error has occurred",
      errors=[],
      stack=""
   ){
      super(message)
      this.statusCode = statusCode
      this.message = message
      this.errors = errors
      this.date = null
      if(stack) {
         this.stack = stack
      } else {
         Error.captureStackTrace(this, this.constructor)
      }
   }

}
