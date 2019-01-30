import { dateToStr, isDateStr, formatTime, normalizeInputTime } from './misc';

describe('formatTime', () => {
  it('correct formatting', () => {
    expect(formatTime("0000")).toBe("00:00");
    expect(formatTime("1200")).toBe("12:00");
    expect(formatTime("1315")).toBe("13:15");
  });
});

describe('normalizeInputTime', () => {
  it('correct formatting', () => {
    expect(normalizeInputTime("12:30")).toBe("1230");
  });
  it('adds zero at the begining', () => {
    expect(normalizeInputTime("8:20")).toBe("0820");
  });
});

describe('dateToStr', () => {
  it('correct formatting', () => {
    const date = new Date(1546026491368);
    expect(dateToStr(date)).toBe("28. 12.");
  });
});

describe('isDateStr', () => {
  it('is date', () => {
    expect(isDateStr("1.1.")).toEqual(true);
    expect(isDateStr("10. 12.")).toEqual(true);
    expect(isDateStr("24. 12. ")).toEqual(true);
  });
  it('is not date', () => {
    expect(isDateStr("abc")).toEqual(false);
    expect(isDateStr("10. 12.a")).toEqual(false);
    expect(isDateStr("  24.   12. ")).toEqual(false);
  });
});
