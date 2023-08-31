import jwt from 'jsonwebtoken'

export const generateAccessToken = (
  id: string,
  roles: string,
  username: string
): string => {
  const payload = { id, roles, username }
  return jwt.sign(payload, process.env.SECRET_KEY as string, {
    expiresIn: '24h',
  })
}
