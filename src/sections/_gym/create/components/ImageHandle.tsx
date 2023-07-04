import { useState } from 'react';
import { Dialog, Stack } from '@mui/material';
import { Area } from 'react-easy-crop';
import { CropModal } from 'src/components/crop-modal';
import { ImageDisplay } from 'src/components/image-display';
import { ImageInput } from 'src/components/image-input';
import { getCroppedImg } from 'src/utils/cropImage';

// 画像のプレビューURLを生成する関数
const generatePreviewUrl = (imageFile: File) => URL.createObjectURL(imageFile);

export const ImageHandle = ({ setImageBlob }: any) => {
  const [openCrop, setOpenCrop] = useState<boolean>(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [cropPreviewUrl, setCropPreviewUrl] = useState<string | null>(null);

  const closeCrop = () => {
    setOpenCrop(false);
  };

  const handleImageSave = async (croppedAreaPixels: Area, rotation: number) => {
    const blob = await getCroppedImg(cropPreviewUrl || '', croppedAreaPixels, rotation, 'test');
    const url = URL.createObjectURL(blob);
    setPreviewUrl(url);
    setImageBlob(blob); // useStateでblobを管理してください
    closeCrop();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setOpenCrop(true);
      const file: File = e.target.files[0];
      setCropPreviewUrl(generatePreviewUrl(file));
    }
  };

  return (
    <>
      {previewUrl ? (
        <Stack direction="column" justifyContent="center" alignItems="center" spacing={0.5}>
          <ImageDisplay
            orderNumber={0}
            width={300}
            height={300}
            photoImageId={previewUrl}
            photoURL={previewUrl}
            handleChange={handleChange}
          />
        </Stack>
      ) : (
        <ImageInput orderNumber={0} width={300} height={300} handleChange={handleChange} />
      )}
      <Dialog maxWidth="sm" open={openCrop}>
        {cropPreviewUrl && (
          <CropModal
            width={300}
            height={300}
            photoURL={cropPreviewUrl}
            disabled={false}
            closeCrop={closeCrop}
            saveImage={handleImageSave}
          />
        )}
      </Dialog>
    </>
  );
};
