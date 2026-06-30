import { describe, it, expect, vi, beforeEach } from "vitest";
import { proxy } from "../src/proxy";
import { NextRequest } from "next/server";
import * as jose from "jose";

vi.mock("jose", () => ({
  jwtVerify: vi.fn(),
}));

describe("Proxy Route Protection", () => {
  const mockJwtVerify = jose.jwtVerify as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    process.env.JWT_SECRET = "test-secret";
  });

  it("should allow unauthenticated access to public routes", async () => {
    const req = new NextRequest("http://localhost:3000/");
    const res = await proxy(req);
    expect(res?.headers.get("x-middleware-next")).toBe("1");
  });

  it("should redirect to /admin/login for unauthenticated access to /admin", async () => {
    const req = new NextRequest("http://localhost:3000/admin");
    const res = await proxy(req);
    expect(res).toBeDefined();
    expect(res?.status).toBe(307);
    expect(res?.headers.get("location")).toBe("http://localhost:3000/admin/login");
  });

  it("should allow authenticated access to /admin", async () => {
    mockJwtVerify.mockResolvedValueOnce({ payload: { userId: 1, role: "admin", type: "access" } });
    
    const req = new NextRequest("http://localhost:3000/admin");
    req.cookies.set("accessToken", "fake-valid-token");
    
    const res = await proxy(req);
    expect(res?.headers.get("x-middleware-next")).toBe("1");
  });

  it("should redirect to /admin/login if token verification fails", async () => {
    mockJwtVerify.mockRejectedValueOnce(new Error("Invalid token"));
    
    const req = new NextRequest("http://localhost:3000/admin/settings");
    req.cookies.set("accessToken", "fake-invalid-token");
    
    const res = await proxy(req);
    expect(res).toBeDefined();
    expect(res?.status).toBe(307);
    expect(res?.headers.get("location")).toBe("http://localhost:3000/admin/login");
  });
});
