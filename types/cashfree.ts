import { Cashfree, CFEnvironment } from "cashfree-pg"

if (!process.env.CASHFREE_APP_ID || !process.env.CASHFREE_SECRET_KEY) {
  throw new Error("❌ Cashfree ENV variables missing")
}

const cashfree = new Cashfree(
  process.env.CASHFREE_ENV === "production"
    ? CFEnvironment.PRODUCTION
    : CFEnvironment.SANDBOX,
  process.env.CASHFREE_APP_ID!,
  process.env.CASHFREE_SECRET_KEY!
)

export default cashfree