import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request: { headers: request.headers } });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.set({ name, value: "", ...options });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;
  const isDashboard = path.startsWith("/dashboard");
  const isOnboarding = path.startsWith("/onboarding");

  // Not logged in and trying to reach a protected area → send to auth.
  if (!user && (isDashboard || isOnboarding)) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  // Logged in: check onboarding completion before allowing the dashboard.
  if (user && isDashboard) {
    const { data: workspace } = await supabase
      .from("workspaces")
      .select("onboarding_completed_at")
      .eq("owner_id", user.id)
      .maybeSingle();

    if (!workspace?.onboarding_completed_at) {
      return NextResponse.redirect(new URL("/onboarding", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/onboarding/:path*"],
};
