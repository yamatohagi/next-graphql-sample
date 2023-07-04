import { v4 as uuidv4 } from 'uuid';
import { supabase } from 'src/lib/supabase/supabaseClient';
import { snackbarStore } from 'src/components/provider/snackbarStore';

// 画像アップロード機能
export const uploadImage = async (imageBlob: Blob) => {
  try {
    const filePath = `topImages/${uuidv4()}`;
    const { data } = await supabase.storage.from('gymImages').upload(filePath, imageBlob, {
      contentType: 'image/jpeg', // 画像のフォーマットに合わせて変更してください
    });
    return data && data.path;
  } catch (error) {
    snackbarStore.dispatch.snackbar.handleOpen({
      message: '画像のアップロードに失敗しました',
      color: 'error',
    });
    throw error;
  }
};

// 画像表示機能
export const getImageUrl = async (path: string) => {
  const { data } = supabase.storage.from('gymImages').getPublicUrl(path);
  return data.publicUrl;
};
