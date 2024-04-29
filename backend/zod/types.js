const zod = require('zod');

const userSchema = zod.object({
  fullname: zod.string(),
  username: zod.string(),
  password: zod.string().min(6),
  email: zod.string().email(),
});



module.exports = userSchema;