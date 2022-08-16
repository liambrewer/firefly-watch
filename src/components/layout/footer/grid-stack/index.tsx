import { Stack, Title } from '@mantine/core';

type Props = {
  title: string;
  children: React.ReactNode;
};

const FooterGridStack = ({ title, children }: Props) => {
  return (
    <Stack align='center' spacing='xs'>
      <Title order={4}>{title}</Title>
      {children}
    </Stack>
  );
};

export default FooterGridStack;
