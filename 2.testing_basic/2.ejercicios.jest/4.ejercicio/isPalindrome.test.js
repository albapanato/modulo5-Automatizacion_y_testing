import { isPalindrome } from "./isPalindrome";

describe("Check if it is a palindrome", () => {
  it.skip("Should return true for the word ^anilina^", () => {
    expect(isPalindrome("anilina")).toBe(true);
  });
  it.skip("Should return false for the word ^mercedes^", () => {
    expect(isPalindrome("mercedes")).toBe(false);
  });
  it.skip("Should return true for the number ^2332^", () => {
    expect(isPalindrome(2332)).toBe(true);
  });
  it.skip("Should return false for the number ^13^", () => {
    expect(isPalindrome(13)).toBe(false);
  });

  const inputObject = [
    { subject: "anilina", expected: true },
    { subject: "mercedes", expected: false },
    { subject: 2332, expected: true },
    { subject: 13, expected: false },
  ];
  it.each(inputObject)(
    "Should return $expected for the argument $subject",
    ({ subject, expected }) => {
      expect(isPalindrome(subject)).toBe(expected);
    }
  );
});
