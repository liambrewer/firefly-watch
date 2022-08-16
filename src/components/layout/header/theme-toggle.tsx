import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { IconMoonStars, IconSun } from '@tabler/icons';

const HeaderThemeToggle = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <ActionIcon
      variant='subtle'
      // color={dark ? 'yellow' : 'blue'}
      onClick={() => toggleColorScheme()}
      title={dark ? 'Light mode' : 'Dark mode'}
      size='lg'
    >
      {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
    </ActionIcon>
  );
};

export default HeaderThemeToggle;
