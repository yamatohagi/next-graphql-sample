import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';
import { ClimbingType } from 'src/generated/graphql';
import { createDefaultValues } from 'src/service/zodHelper';
import { z } from 'zod';

const gymSchema = z.object({
  name: z.string().nonempty({ message: '何でもいいよ！' }),
  climbingType: z.nativeEnum(ClimbingType, { required_error: '好きな方を入れてね' }),
  imageFile: z.any(),
});

export type GymInput = z.infer<typeof gymSchema>;

export default function useGymForm() {
  const gymMethods = useForm({
    resolver: zodResolver(gymSchema),
    defaultValues: createDefaultValues(gymSchema),
  });
  return gymMethods;
}
