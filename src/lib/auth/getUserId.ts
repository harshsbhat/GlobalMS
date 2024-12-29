import { cookies } from "next/headers";
import * as jose from "jose";

const hankoApiUrl = process.env.NEXT_PUBLIC_HANKO_API_URL;

interface JwtPayload {
  sub: string; 
}

interface UserData {
  id: string;
  name: string;
  email: string;
}

export async function getUserData(): Promise<UserData | null> {
  const token = (await cookies()).get("hanko")?.value;

  if (!token) {
    return null; 
  }

  const payload = jose.decodeJwt(token) as JwtPayload;
  const userID = payload.sub;

  const response = await fetch(`${hankoApiUrl}/users/${userID}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const userData: UserData = await response.json(); 
  return userData
}
