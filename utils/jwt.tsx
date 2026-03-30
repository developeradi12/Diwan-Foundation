import { SignJWT, jwtVerify } from "jose"

const accessSecret = new TextEncoder().encode(
    process.env.ACCESS_TOKEN_SECRET!
)

export type JWTPayload = {
  userId: string
  email?: string
  role: string
}

// SIGN ACCESS

export async function signAccessToken(payload: JWTPayload) {
    return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("5d")
    .sign(accessSecret)
}


//verify access token
export async function verifyAccessToken(token: string) {
  const { payload } = await jwtVerify(token, accessSecret)
  return payload as JWTPayload
}
