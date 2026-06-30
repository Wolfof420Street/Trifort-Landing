import { describe, it, expect } from "vitest";
import { signToken, verifyToken } from "../src/lib/auth";

describe("Auth Utilities", () => {
  const mockPayload = { userId: "test-id", role: "admin", name: "Admin", type: "access" as const };

  it("should sign and verify a token successfully", async () => {
    // We need to set JWT_SECRET for the test environment
    process.env.JWT_SECRET = "test_super_secret_key_that_is_long_enough";

    const token = await signToken(mockPayload, "15m");
    expect(typeof token).toBe("string");

    const decoded = await verifyToken(token);
    expect(decoded).not.toBeNull();
    expect(decoded?.userId).toBe(mockPayload.userId);
    expect(decoded?.role).toBe(mockPayload.role);
    expect(decoded?.type).toBe(mockPayload.type);
  });

  it("should return null for an invalid token", async () => {
    process.env.JWT_SECRET = "test_super_secret_key_that_is_long_enough";
    const decoded = await verifyToken("invalid.token.string");
    expect(decoded).toBeNull();
  });

  it("should return null for an expired token", async () => {
    process.env.JWT_SECRET = "test_super_secret_key_that_is_long_enough";
    
    // Create a token that expires immediately (-1ms)
    const token = await signToken(mockPayload, -1);
    
    // It should fail verification because it's expired
    const decoded = await verifyToken(token);
    expect(decoded).toBeNull();
  });
});
