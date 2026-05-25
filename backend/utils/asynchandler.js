// Uses fn as parameter
// Returns function resolving async promise
// If error occurs, it is sent to middleware global error handler
export const asyncHandler = (fn) => {
  return (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);
};