import { SimpleGrid } from '@mantine/core';

type Props = {
  children: React.ReactNode;
};

const FooterGrid = ({ children }: Props) => {
  return (
    <SimpleGrid
      cols={4}
      spacing='lg'
      breakpoints={[
        { maxWidth: 'md', cols: 3, spacing: 'md' },
        { maxWidth: 'sm', cols: 2, spacing: 'sm' },
        { maxWidth: 'xs', cols: 1, spacing: 'sm' },
      ]}
    >
      {children}
    </SimpleGrid>
  );
};

export default FooterGrid;
