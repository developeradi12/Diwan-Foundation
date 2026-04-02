import { getSession } from "@/utils/sesion";
import MembershipCard from "./_components/Membershipcard";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import Membership from "@/models/Membership";

export default async function Page() {
  const session = await getSession();

  if (!session) {
    return <div>Unauthorized</div>;
  }

  const userId = session?.userId;

  await connectToDatabase();

  const user = await User.findById(userId);

  if (!user) {
    return <div>User not found</div>;
  }

  const membership = JSON.parse(JSON.stringify(
    await Membership.findById(user?.membershipPlan)
  ))

  //  START DATE
  const startDate = user?.membershipStartDate;

  //  END DATE LOGIC (fallback)
  let endDate = user?.membershipEndDate;

  if (!endDate && startDate && membership?.membershipDuration) {
    const start = new Date(startDate);

    const calculatedEnd = new Date(start);
    calculatedEnd.setMonth(
      calculatedEnd.getMonth() + membership.membershipDuration
    );

    endDate = calculatedEnd;
  }

  return (
    <MembershipCard
      membership={membership}
      startDate={startDate}
      endDate={endDate}
    />
  );
}