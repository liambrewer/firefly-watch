import { NextPageWithAuth } from '../../components/auth-guard';
import DashboardHeader from '../../components/dashboard/header';

const Dashboard: NextPageWithAuth = () => {
  return (
    <DashboardHeader
      title='Dashboard'
      color='blue'
      links={[
        {
          title: 'Home',
          href: '/dashboard',
        },
      ]}
    />
  );
};

export default Dashboard;

Dashboard.requireAuth = true;
