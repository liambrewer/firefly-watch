import { Anchor, Breadcrumbs } from '@mantine/core';
import Link from 'next/link';

export type BreadcrumbLink = {
  title: string;
  href: string;
};

type Props = {
  links?: BreadcrumbLink[];
};

const DashboardHeaderBreadcrumbs = ({ links = [] }: Props) => {
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
          <Link href={href} passHref key={index}>
            <Anchor component='a'>{title}</Anchor>
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default DashboardHeaderBreadcrumbs;
