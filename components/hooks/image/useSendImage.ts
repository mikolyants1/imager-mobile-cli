import { ImageApi } from '@/api/image/ImageApi';
import { useFile } from '@/store/file/useFile';
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

type TFunc = (args?: any) => void;

interface IArgs {
  path: string;
  success: string;
  req: {
    [i: string]: any;
  };
  resFuncs?: Array<TFunc>;
}

export const useSendImage = ({ req, resFuncs, path, success }: IArgs) => {
  const { file, setFileData } = useFile();
  const [loading, setLoading] = useState<boolean>(false);

  const send = useCallback(async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('image', file)
    for (const [key, value] of Object.entries(req)) {
      formData.append(key, value);
    }
    await ImageApi.actionWithImage(formData, path)
      .then(data => {
        setFileData('src', data);
        if (resFuncs) {
          for (const func of resFuncs) func();
        }
        toast.success(success);
      })
      .catch(() => {
        toast.error('Something go wrong!');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [file]);

  return {
    send,
    loading,
  };
};
