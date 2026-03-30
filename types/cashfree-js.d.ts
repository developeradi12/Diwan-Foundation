declare module "@cashfreepayments/cashfree-js" {
  export function load(config: { mode: "sandbox" | "production" }): Promise<{
    checkout: (options: {
      paymentSessionId: string
      redirectTarget?: "_self" | "_blank" | "_top"
    }) => Promise<void>
  } | null>
}