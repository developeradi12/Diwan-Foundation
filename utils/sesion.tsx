import { cookies } from "next/headers";
import {  verifyAccessToken} from "./jwt";

export async function getSession() {
    const cookieStore = await cookies();

    const access = cookieStore.get("accessToken")?.value;

    if (!access) return null;

    try {
        // Try normal access
        const payload = await verifyAccessToken(access!);
        return {
            userId: payload.userId,
            role: payload.role,
            email: payload.email,
        }
    } catch {

        return null;

    }
}

