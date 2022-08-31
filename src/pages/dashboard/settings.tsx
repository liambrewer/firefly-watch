import { NextPageWithAuth } from '../../components/auth-guard';
import DashboardHeader from '../../components/dashboard/header';

const Settings: NextPageWithAuth = () => {
  return <DashboardHeader title='Settings' color='orange' />;
};

export default Settings;

Settings.requireAuth = true;
