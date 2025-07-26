// Using promises
const asycnHandler = (reqHandler) => {
   (req, res, next) => {
      Promise.resolve(reqHandler(req, res, next)).catch((err) => next(err))
   }
}

export {asycnHandler}


// Using try catch block
// Higher Order Functions in JS
// const asycnHandler = (fun) => {async () => {}}
// const asycnHandler = (fun) => async (req, res, next) => {
//    try {
//       await fun(req, res, next);
//    } catch (error) {
//       console.error(error.code || 500).json({
//          success: false,
//          message: error.message
//       })
//    }
// }