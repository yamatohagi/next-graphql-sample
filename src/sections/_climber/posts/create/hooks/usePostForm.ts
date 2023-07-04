import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';
import { ClimbingType } from 'src/generated/graphql';
import { createDefaultValues } from 'src/service/zodHelper';
import { z } from 'zod';

const postSchema = z.object({
  title: z.string().nonempty({ message: '何でもいいよ！' }),
  climbingType: z.nativeEnum(ClimbingType, { required_error: '好きな方を入れてね' }),
  gymId: z.string().nonempty({ message: '何でもいいよ！(一覧になかったら作って欲しいな🙂)' }),
  experienceMonths: z.number().min(0, { message: '覚えてる範囲で大丈夫！' }),
  belayMonths: z.number().min(0, { message: '0でも大丈夫！' }),
  grade: z.string().nonempty({ message: '何でもいいよ！' }),
  content: z.string(),
  preferredDayAndTimes: z.array(z.string()),
});

export type PostInput = z.infer<typeof postSchema>;

export default function usePostForm() {
  const postMethods = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: createDefaultValues(postSchema),
  });
  return postMethods;
}
