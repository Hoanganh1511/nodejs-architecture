import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "@/app.js";

describe("app", () => {
  describe("GET /", () => {
    it("returns 200 with welcome message", async () => {
      const res = await request(app).get("/");

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ message: "welcome to nodejs architecture" });
    });

    it("returns JSON content-type", async () => {
      const res = await request(app).get("/");

      expect(res.headers["content-type"]).toMatch(/application\/json/);
    });
  });

  describe("unknown routes", () => {
    it("returns 404 for an unknown GET route", async () => {
      const res = await request(app).get("/does-not-exist");

      expect(res.status).toBe(404);
    });

    it("returns 404 for an unknown POST route", async () => {
      const res = await request(app).post("/does-not-exist");

      expect(res.status).toBe(404);
    });

    it("returns 404 for nested unknown paths", async () => {
      const res = await request(app).get("/api/v1/missing");

      expect(res.status).toBe(404);
    });
  });

  describe("module export", () => {
    it("exports a valid Express app", () => {
      expect(app).toBeDefined();
      expect(typeof app).toBe("function");
    });

    it("exposes a listen method", () => {
      expect(typeof app.listen).toBe("function");
    });
  });
});
