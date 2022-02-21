export default function useProcessImage() {

  async function getImageFromFileInput (event:any) {
    const file = event.target.files[0];
    if (!file) return '';
    const base64 = await parseImageToBase64(file)
    return base64;
  }  

  function parseImageToBase64 (file:any) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result);
      }
      fileReader.onerror = (error) => {
        reject(error);
      }
    });
  }

  function parseBase64ToImage () {

  }

  return {
    getImageFromFileInput,
    parseImageToBase64,
    parseBase64ToImage
  }
}
