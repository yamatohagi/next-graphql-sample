import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { createDefaultValues } from 'src/service/zodHelper';
import { z } from 'zod';

const replySchema = z.object({
  title: z.string(),
  userName: z.string().nonempty({ message: 'なまえは必須です' }),
  content: z.string().nonempty({ message: '内容は必須です' }),
});

export type ReplyInput = z.infer<typeof replySchema>;

export default function useReplyForm() {
  const replyMethods = useForm({
    resolver: zodResolver(replySchema),
    defaultValues: createDefaultValues(replySchema),
  });
  return replyMethods;
}
