export const readFile = (file: File) => {
  return new Promise<string | ArrayBuffer | null>((res) => {
    const fr = new FileReader();
    fr.addEventListener('load', () => {
      console.log('들어옴?', fr.result);
      res(fr.result);
    });
    console.log(1);
    fr.readAsDataURL(file);
  });
};
