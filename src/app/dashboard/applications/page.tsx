import { getUserData } from "@/lib/auth/getUserId";
import { db } from "@/server/db";

export default async function Page() {
  const userData = await getUserData();
  const workspace = await db.query.workspaces.findFirst({
    where: (table, { eq }) =>
      eq(table.tenantId, userData!.id),
  });
  
  if (!workspace){
    return (
      <div>
        {userData?.id}
      </div>
    )
  }
  return (
    <div>
      {workspace?.id}
    </div>
  );
}
