import { v4 } from 'uuid';

// gestInfoをlocalStorageから取得する

export const login = () => {
  const gestInfo = JSON.parse(localStorage.getItem('gestInfo') || 'null');
  // gestInfoをlocalStorageに保存する
  const saveGestInfo = (info: { key: string; name: string }) => {
    localStorage.setItem('gestInfo', JSON.stringify(info));
  };

  // gestInfoが存在しない場合は保存する
  if (!gestInfo || gestInfo === 'null') {
    const newGestInfo = { key: v4(), name: 'some_name' };
    saveGestInfo(newGestInfo);
  }
};
