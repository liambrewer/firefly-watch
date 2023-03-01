import { Anchor, Breadcrumbs, DefaultMantineColor } from '@mantine/core';
import Link from 'next/link';

export type BreadcrumbLink = {
  title: string;
  href: string;
};

type Props = {
  links?: BreadcrumbLink[];
  color?: DefaultMantineColor;
};

const DashboardHeaderBreadcrumbs = ({ links = [], color = 'blue' }: Props) => {
  const breadcrumbLinks: BreadcrumbLink[] = [
    {
      title: 'Dashboard',
      href: '/dashboard',
    },
    ...links,
  ];

  return (
    <Breadcrumbs>
      {breadcrumbLinks.map(({ title, href }, index) => {
        return (
          <Link href={href} key={index} passHref legacyBehavior>
            <Anchor component='a' color={color}>
              {title}
            </Anchor>
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default DashboardHeaderBreadcrumbs;
