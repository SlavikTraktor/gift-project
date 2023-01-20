export const getDesires = async (): Promise<string[]> => {
  return await new Promise((res, rej) => {
    const desires = ["Велосипед", "Арбуз", "Велоцираптор", "Пушка"];
    res(desires);
  });
};
