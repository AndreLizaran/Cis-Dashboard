// Modules
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

// Firebase
import { storage } from '../utils/firebase';

// Hooks
import { useUIContext } from './useCustomContext';

export default function useProcessImage() {

  const { switchAlert } = useUIContext();

  async function saveImageOnFirebase (file:File, title:string) {
    try {
      if (file === undefined) return '';
      const metadata = { contentType: file.type };
      const storageRef = ref(storage, `${title}-portada`);
      await uploadBytes(storageRef, file, metadata);
      const savedImage = await getDownloadURL(storageRef);
      return savedImage;
    } catch (error:any) {
      switchAlert({ 
        alert:'Error subiendo la imagen, inténtalo más tarde', 
        color:'bg-red-600', 
      });
      return '';
    }
  }

  return {
    saveImageOnFirebase
  }
}
