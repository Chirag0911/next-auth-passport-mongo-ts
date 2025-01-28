import bcrypt from "bcryptjs";

export async function encryptPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

export async function comparePassword(
  userPassword: string,
  dbPassword: string
) {
  return await bcrypt.compare(userPassword, dbPassword);
}
