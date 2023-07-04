import { Button, DialogTitle, DialogContent, DialogActions, Grid, Dialog } from '@mui/material';
import { Box } from '@mui/system';
import {
  RHFMultiCheckboxAddGrid,
  RHFSelectBox,
  RHFTextArea,
  RHFTextField,
} from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/FormProvider';
import { ClimbingType } from '@prisma/client';
import Iconify from 'src/components/iconify/Iconify';
import {
  CreateOneGymMutation,
  useCreateOnePostMutation,
  useGymOptionsQuery,
  SortOrder,
} from 'src/generated/graphql';
import { LoadingButton } from '@mui/lab';
import { GymSelectInput } from './gym-select/GymSelectInput';
import usePostForm, { PostInput } from './hooks/usePostForm';

export default function ClimberPostCreateModal({
  open,
  onClose,
  refetch,
}: {
  open: boolean;
  onClose: () => void;
  refetch: () => void;
}) {
  const [createOnePostMutation] = useCreateOnePostMutation();
  const methods = usePostForm();

  const { data, refetch: gymsOptionsRefetch } = useGymOptionsQuery({
    variables: { orderBy: [{ name: SortOrder.Asc }] },
    skip: !open,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (params: PostInput) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { gymId, ...otherParams } = params;
    const { errors } = await createOnePostMutation({
      variables: {
        data: {
          ...otherParams,
          gym: { connect: { id: Number(params.gymId) } },
          preferredDayAndTimes: {
            create: params.preferredDayAndTimes.map((dayAndTime) => ({
              dayAndTime,
            })),
          },
        },
      },
    });
    if (errors) return;
    refetch();
    methods.reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} transitionDuration={350}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle id="alert-dialog-title">ガンバ！！</DialogTitle>
        <DialogContent>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <RHFTextField size="small" name="title" label="タイトル" />
              </Grid>
              <Grid item xs={12} sm={12}>
                <RHFTextArea size="small" name="content" label="本文" />
              </Grid>
              {/* <Grid item xs={12}>
                    <RHFTextField name="content" label="Content" multiline rows={4} required />
                  </Grid> */}
              <Grid item xs={12} sm={12}>
                <RHFSelectBox
                  size="small"
                  name="climbingType"
                  label="好きな壁"
                  options={[
                    { value: ClimbingType.BOULDER, label: 'BOULDER' },
                    { value: ClimbingType.LEAD, label: 'LEAD' },
                    { value: ClimbingType.BOTH, label: 'BOULDER＆LEAD' },
                  ]}
                />
              </Grid>

              {data && (
                <GymSelectInput
                  gyms={data.gyms}
                  refetch={gymsOptionsRefetch}
                  setFormValue={(value: CreateOneGymMutation) => {
                    methods.setValue('gymId', value.createOneGym.id.toString(), {
                      shouldValidate: true,
                    });
                  }}
                />
              )}

              <Grid item xs={6} sm={6}>
                <RHFSelectBox
                  size="small"
                  name="experienceMonths"
                  label="クライミング歴"
                  options={generateMonths()}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <RHFSelectBox
                  size="small"
                  name="belayMonths"
                  label="ビレイ歴"
                  options={generateMonths()}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <RHFSelectBox
                  size="small"
                  name="grade"
                  label="頑張ってるグレード"
                  options={generateGrades()}
                />
              </Grid>
              <Grid item xs={12}>
                <RHFMultiCheckboxAddGrid
                  name="preferredDayAndTimes"
                  label="よく行く日時"
                  options={options}
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

const generateGrades = () => {
  const mainGrades = Array.from({ length: 8 }, (_, i) => i + 8);
  const subGrades = ['a', 'b', 'c', 'd'];

  const grades: { value: string; label: string }[] = [];

  mainGrades.forEach((mainGrade) => {
    if (mainGrade > 9) {
      subGrades.forEach((subGrade) => {
        grades.push({ value: `5.${mainGrade}${subGrade}`, label: `5.${mainGrade}${subGrade}` });
      });
    } else {
      grades.push({ value: `5.${mainGrade}`, label: `5.${mainGrade}` });
    }
  });

  return grades;
};

function generateMonths() {
  const months = [];
  for (let i = 0; i <= 11; i++) {
    months.push({ value: i, label: `${i}ヶ月` });
  }
  for (let i = 1; i < 2; i += 0.5) {
    months.push({ value: i * 12, label: `${i}年` });
  }

  for (let i = 2; i <= 10; i++) {
    months.push({ value: i * 12, label: `${i}年` });
  }
  return months;
}

const generateLabelWithIcon = (label: string, icon: string) => (
  <>
    {label}
    <Iconify icon={icon} sx={{ height: '1.5em', verticalAlign: 'middle', pb: 0.5, pl: 0.5 }} />
  </>
);

const options = [
  {
    value: '01',
    label: generateLabelWithIcon('月曜', 'ph:sun-bold'),
  },
  {
    value: '02',
    label: generateLabelWithIcon('月曜', 'icon-park-solid:moon'),
  },
  {
    value: '11',
    label: generateLabelWithIcon('火曜', 'ph:sun-bold'),
  },
  {
    value: '12',
    label: generateLabelWithIcon('火曜', 'icon-park-solid:moon'),
  },
  {
    value: '21',
    label: generateLabelWithIcon('水曜', 'ph:sun-bold'),
  },
  {
    value: '22',
    label: generateLabelWithIcon('水曜', 'icon-park-solid:moon'),
  },
  {
    value: '31',
    label: generateLabelWithIcon('木曜', 'ph:sun-bold'),
  },
  {
    value: '32',
    label: generateLabelWithIcon('木曜', 'icon-park-solid:moon'),
  },
  {
    value: '41',
    label: generateLabelWithIcon('金曜', 'ph:sun-bold'),
  },
  {
    value: '42',
    label: generateLabelWithIcon('金曜', 'icon-park-solid:moon'),
  },
  {
    value: '51',
    label: generateLabelWithIcon('土曜', 'ph:sun-bold'),
  },
  {
    value: '52',
    label: generateLabelWithIcon('土曜', 'icon-park-solid:moon'),
  },
  {
    value: '61',
    label: generateLabelWithIcon('日曜', 'ph:sun-bold'),
  },
  {
    value: '62',
    label: generateLabelWithIcon('日曜', 'icon-park-solid:moon'),
  },
];
