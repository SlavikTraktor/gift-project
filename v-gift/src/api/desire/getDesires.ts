export const getDesires = (): Promise<string[]> => {
  return new Promise((res, rej) => {
    const desires = ["Велосипед", "Арбуз", "Велоцираптор", "Пушка"];
    res(desires);
  });
};
