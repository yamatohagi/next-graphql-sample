import { Grid, Typography } from '@mui/material';
import FormProvider from 'src/components/hook-form/FormProvider';
import { RHFRadioGroup, RHFSelectBox, RHFTextArea, RHFTextField } from 'src/components/hook-form';
import { LoadingButton } from '@mui/lab';
import useResponsive from 'src/hooks/useResponsive';
import RequiredTag from 'src/components/ui/RequiredTag';

const prefectures = [
  '北海道',
  '青森県',
  '岩手県',
  '宮城県',
  '秋田県',
  '山形県',
  '福島県',
  '茨城県',
  '栃木県',
  '群馬県',
  '埼玉県',
  '千葉県',
  '東京都',
  '神奈川県',
  '新潟県',
  '富山県',
  '石川県',
  '福井県',
  '山梨県',
  '長野県',
  '岐阜県',
  '静岡県',
  '愛知県',
  '三重県',
  '滋賀県',
  '京都府',
  '大阪府',
  '兵庫県',
  '奈良県',
  '和歌山県',
  '鳥取県',
  '島根県',
  '岡山県',
  '広島県',
  '山口県',
  '徳島県',
  '香川県',
  '愛媛県',
  '高知県',
  '福岡県',
  '佐賀県',
  '長崎県',
  '熊本県',
  '大分県',
  '宮崎県',
  '鹿児島県',
  '沖縄県',
];

export default function MountainCreateEditForm({ handleReplySubmit, methods }: any) {
  const {
    handleSubmit,
    formState: { isSubmitting, errors: formErrors },
  } = methods;
  const isMdUp = useResponsive('up', 'md');

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(handleReplySubmit)}>
      <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
        山情報を登録
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        山情報の登録の協力をお願いします。 入力項目が多数あるので、可能な範囲で構いません。
        <br /> <br />
        一度登録した後は、山イキタイのユーザーなら誰でも編集することができます。
        <br /> <br />
        既に同じ山が登録されている場合は後から登録したページは削除されますのでご注意ください。
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <Typography
            variant={isMdUp ? 'subtitle1' : 'subtitle2'}
            color="#212121"
            align="left"
            sx={{ pl: 0.5, mb: 0.5 }}
          >
            <RequiredTag /> 名称
          </Typography>
          <RHFTextField size="small" name="name" placeholder="例：富士山 " />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography
            variant={isMdUp ? 'subtitle1' : 'subtitle2'}
            color="#212121"
            align="left"
            sx={{ pl: 0.5, mb: 0.5 }}
          >
            <RequiredTag /> 名称（ふりがな）
          </Typography>
          <RHFTextField size="small" name="nameKana" placeholder="例：ふじさん" />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography
            variant={isMdUp ? 'subtitle1' : 'subtitle2'}
            color="#212121"
            align="left"
            sx={{ pl: 0.5, mb: 0.5 }}
          >
            郵便番号
          </Typography>
          <RHFTextField size="small" name="postalCode" placeholder="ハイフンなしで入力" />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography
            variant={isMdUp ? 'subtitle1' : 'subtitle2'}
            color="#212121"
            align="left"
            sx={{ pl: 0.5, mb: 0.5 }}
          >
            都道府県
          </Typography>
          <Grid item xs={12} sm={6}>
            <RHFSelectBox
              size="small"
              name="prefecture"
              options={prefectures.map((prefecture) => ({
                label: prefecture,
                value: prefecture,
              }))}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography
            variant={isMdUp ? 'subtitle1' : 'subtitle2'}
            color="#212121"
            align="left"
            sx={{ pl: 0.5, mb: 0.5 }}
          >
            住所1
          </Typography>
          <RHFTextField size="small" name="address1" placeholder="市区町村" />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography
            variant={isMdUp ? 'subtitle1' : 'subtitle2'}
            color="#212121"
            align="left"
            sx={{ pl: 0.5, mb: 0.5 }}
          >
            住所2
          </Typography>
          <RHFTextField size="small" name="address2" placeholder="市区町村以降" />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography
            variant={isMdUp ? 'subtitle1' : 'subtitle2'}
            color="#212121"
            align="left"
            sx={{ pl: 0.5, mb: 0.5 }}
          >
            住所3
          </Typography>
          <RHFTextField size="small" name="address3" placeholder="" />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography
            variant={isMdUp ? 'subtitle1' : 'subtitle2'}
            color="#212121"
            align="left"
            sx={{ pl: 0.5, mb: 0.5 }}
          >
            <RequiredTag /> 百名山
          </Typography>
          <RHFRadioGroup
            name="hyakumeizanStatus"
            options={[
              { label: 'はい', value: true },
              { label: 'いいえ', value: false },
            ]}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography
            variant={isMdUp ? 'subtitle1' : 'subtitle2'}
            color="#212121"
            align="left"
            sx={{ pl: 0.5, mb: 0.5 }}
          >
            標高
          </Typography>
          <RHFTextField size="small" name="MountainPeak" placeholder="----m" />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography
            variant={isMdUp ? 'subtitle1' : 'subtitle2'}
            color="#212121"
            align="left"
            sx={{ pl: 0.5, mb: 0.5 }}
          >
            一言コメント
          </Typography>
          <RHFTextField size="small" name="appealPoint" placeholder="" />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography
            variant={isMdUp ? 'subtitle1' : 'subtitle2'}
            color="#212121"
            align="left"
            sx={{ pl: 0.5, mb: 0.5 }}
          >
            説明文
          </Typography>
          <RHFTextArea size="small" name="description" />
        </Grid>
      </Grid>
      <LoadingButton
        loading={isSubmitting}
        type="submit"
        variant="contained"
        color="primary"
        sx={{ mt: 3 }}
        disabled={Object.keys(formErrors).length > 0}
      >
        送信
      </LoadingButton>
    </FormProvider>
  );
}
