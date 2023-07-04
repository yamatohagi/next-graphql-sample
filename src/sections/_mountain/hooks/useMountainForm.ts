import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { createDefaultValues } from 'src/service/zodHelper';
import { z } from 'zod';

const MountainSchema = z.object({
  name: z.string().nonempty({ message: '名称は必須です' }),
  nameKana: z.string().nonempty({ message: 'ふりがなは必須です' }),
  postalCode: z.number(),
  prefecture: z.string(),
  address1: z.string(),
  address2: z.string(),
  address3: z.string(),
  hyakumeizanStatus: z.string(),
  MountainPeak: z.string(),
  appealPoint: z.string(),
  description: z.string(),
});

export type MountainInput = z.infer<typeof MountainSchema>;

export default function useMountainForm() {
  const mountainFormMethods = useForm({
    resolver: zodResolver(MountainSchema),
    defaultValues: createDefaultValues(MountainSchema),
  });
  return mountainFormMethods;
}
