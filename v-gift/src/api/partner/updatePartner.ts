export const updatePartner = (v: string) => {
    return new Promise<void>((res) => {
        window.localStorage.setItem('partner', v);
        res();
    });
}