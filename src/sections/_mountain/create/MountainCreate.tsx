import { useCreateOneMountainMutation } from 'src/generated/graphql';
import MountainCreateEditForm from '../components/MountainCreateEditForm';
import useMountainForm, { MountainInput } from '../hooks/useMountainForm';

export default function MountainCreate() {
  const methods = useMountainForm();

  const [createOneMountain] = useCreateOneMountainMutation();
  const handleReplySubmit = async (params: MountainInput) => {
    const { MountainPeak, hyakumeizanStatus, ...otherParams } = params;

    await createOneMountain({
      variables: {
        data: {
          hyakumeizanStatus: hyakumeizanStatus === 'true',
          MountainPeak: Number(MountainPeak),
          ...otherParams,
        },
      },
    });
  };

  return <MountainCreateEditForm handleReplySubmit={handleReplySubmit} methods={methods} />;
}
