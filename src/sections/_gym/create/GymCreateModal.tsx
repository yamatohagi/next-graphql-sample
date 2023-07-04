import { Button, DialogTitle, DialogContent, DialogActions, Grid, Dialog } from '@mui/material';
import { Box } from '@mui/system';
import { RHFSelectBox, RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/FormProvider';
import { ClimbingType } from '@prisma/client';
import { useEffect, useState } from 'react';
import { useCreateOneGymMutation } from 'src/generated/graphql';
import { LoadingButton } from '@mui/lab';
import { ObservableQuery } from '@apollo/client';
import { getImageUrl, uploadImage } from 'src/utils/imageUploader';
import useGymForm, { GymInput } from './hooks/usePostForm';
import { ImageHandle } from './components/ImageHandle';

export default function GymCreateModal({
  open,
  onClose,
  refetch,
  afterSubmit,
  defaultName,
}: {
  open: boolean;
  onClose: () => void;
  refetch: ObservableQuery['refetch'];
  afterSubmit?: (o: any) => void;
  defaultName?: string;
}) {
  const [createOneGymMutation] = useCreateOneGymMutation();
  const methods = useGymForm();

  const [imageBlob, setImageBlob] = useState<Blob | null>(null);

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (!defaultName) return undefined;
    return methods.reset({ ...methods.getValues(), name: defaultName });
  }, [defaultName]);

  const onSubmit = async (params: GymInput) => {
    try {
      const { name, climbingType } = params;
      let imagePath = null;
      let imageUrl;
      if (imageBlob) {
        imagePath = await uploadImage(imageBlob); // ここも同様にimageFileからimageBlobに変更
        imageUrl = await getImageUrl(imagePath!);
      }
      const { data } = await createOneGymMutation({
        variables: {
          data: {
            climbingType,
            name,
            image: imageUrl,
          },
        },
      });
      await refetch();
      if (afterSubmit) afterSubmit(data);
      onClose();
    } catch (error) {
      return undefined;
    }
    return undefined;
  };

  return (
    <Dialog open={open} onClose={onClose} transitionDuration={350}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle id="alert-dialog-title">ガンバ！！</DialogTitle>
        <DialogContent>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <RHFTextField size="small" name="name" label="なまえ" />
              </Grid>
              <Grid item xs={12}>
                <ImageHandle setImageBlob={setImageBlob} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <RHFSelectBox
                  size="small"
                  name="climbingType"
                  label="壁のタイプ"
                  options={[
                    { value: ClimbingType.BOULDER, label: 'BOULDER' },
                    { value: ClimbingType.LEAD, label: 'LEAD' },
                    { value: ClimbingType.BOTH, label: 'BOULDER＆LEAD' },
                  ]}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>キャンセル</Button>
          <LoadingButton variant="contained" type="submit" loading={isSubmitting}>
            投稿！
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
