import connectToDatabase from "@/lib/mongodb"
import User from "@/models/User"
import Membership from "@/models/Membership"
import { getSession } from "@/utils/sesion"
import Donation from "@/models/Donation";

export default async function Page() {
  //  Get session
  const session = await getSession();

  if (!session) {
    return <div>Unauthorized</div>
  }

  const userId = session.userId

  //  Connect DB
  await connectToDatabase()

  //  Fetch user
  const user = await User.findById(userId)

  if (!user) {
    return <div>User not found</div>
  }

  // ── Fetch donations of user ──
  const donations = await Donation.find({
    user: userId,
  }).sort({ createdAt: -1 })

  //stats
  const successfulDonations = donations.filter(
    (d) => d.paymentStatus === "success"
  )

  // ── Calculate total amount ──
  const totalDonation = donations.reduce(
    (sum, d) => sum + d.amount,
    0
  )

  // ── Total transactions ──
  const totalTransactions = donations.length


  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Total Donation */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <p className="text-xs text-gray-400 uppercase tracking-wider">
            Total Donation
          </p>
          <h2 className="text-2xl font-semibold text-gray-800 mt-2">
            ₹{totalDonation}
          </h2>
        </div>

        {/* Total Transactions */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <p className="text-xs text-gray-400 uppercase tracking-wider">
            Transactions
          </p>
          <h2 className="text-2xl font-semibold text-gray-800 mt-2">
            {totalTransactions}
          </h2>
        </div>

        {/* Last Donation */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <p className="text-xs text-gray-400 uppercase tracking-wider">
            Last Donation
          </p>
          <h2 className="text-2xl font-semibold text-gray-800 mt-2">
            {donations[0]
              ? `₹${donations[0].amount}`
              : "—"}
          </h2>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm mt-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">
          All Transactions
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="text-gray-400 border-b">
                <th className="py-2">Amount</th>
                <th className="py-2">Status</th>
                <th className="py-2">Date</th>
                <th className="py-2">Order ID</th>
              </tr>
            </thead>

            <tbody>
              {donations.map((d) => (
                <tr key={d._id.toString()} className="border-b last:border-0">

                  {/* Amount */}
                  <td className="py-2 font-medium">
                    ₹{d.amount}
                  </td>

                  {/* Status */}
                  <td className="py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${d.paymentStatus === "success"
                        ? "bg-green-100 text-green-600"
                        : d.paymentStatus === "pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-red-100 text-red-600"
                        }`}
                    >
                      {d.paymentStatus}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="py-2 text-gray-500">
                    {new Date(d.createdAt!).toLocaleDateString("en-IN")}
                  </td>

                  {/* Order ID */}
                  <td className="py-2 text-gray-400 text-xs">
                    {d.cashfreeOrderId || "—"}
                  </td>

                </tr>
              ))}

              {donations.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-gray-400">
                    No transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </>
  )
}