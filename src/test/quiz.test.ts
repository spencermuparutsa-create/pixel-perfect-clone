import { describe, it, expect } from "vitest";
import { achievement } from "@/lib/quiz";
import { QUIZ } from "@/lib/data";

describe("quiz achievements", () => {
  it("10/10 is Master of Deep Time", () => expect(achievement(10, 10)).toBe("Master of Deep Time"));
  it("7/10 is Evolution Expert", () => expect(achievement(7, 10)).toBe("Evolution Expert"));
  it("4/10 is Fossil Finder", () => expect(achievement(4, 10)).toBe("Fossil Finder"));
  it("2/10 is Curious Explorer", () => expect(achievement(2, 10)).toBe("Curious Explorer"));
  it("has 10 questions with valid answers", () => {
    expect(QUIZ).toHaveLength(10);
    QUIZ.forEach((q) => expect(q.options[q.answer]).toBeDefined());
  });
});
