import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  const expectedSecret = process.env.REVALIDATION_SECRET;

  if (expectedSecret && secret !== expectedSecret) {
    return Response.json({ message: "Invalid secret" }, { status: 401 });
  }

  revalidateTag("github", "max");

  return Response.json({
    revalidated: true,
    tag: "github",
    timestamp: new Date().toISOString(),
  });
}
