import {
  ActionIcon,
  Center,
  Group,
  Stack,
  Title,
  Tooltip,
} from '@mantine/core';
import { IconBrandDiscord, IconBrandGithub } from '@tabler/icons-react';

type IconLinkProps = {
  icon: React.ReactNode;
  title: string;
  href: string;
};

const IconLink = ({ icon, title, href }: IconLinkProps) => {
  return (
    <Tooltip label={title} position='top' withArrow>
      <ActionIcon
        size='lg'
        variant='default'
        component='a'
        href={href}
        target='_blank'
        referrerPolicy='no-referrer'
      >
        {icon}
      </ActionIcon>
    </Tooltip>
  );
};

const FooterGridHero = () => {
  return (
    <Center>
      <Stack align='center' spacing='xs'>
        <Title order={3}>Firefly Watch</Title>
        <Group spacing='xs'>
          <IconLink
            icon={<IconBrandGithub />}
            title='GitHub'
            href='https://github.com/stevharve/firefly-watch'
          />
          <IconLink
            icon={<IconBrandDiscord />}
            title='Discord'
            href='https://discord.gg/replace-me'
          />
        </Group>
      </Stack>
    </Center>
  );
};

export default FooterGridHero;
