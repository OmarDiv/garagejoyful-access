
import DashboardContent from '@/components/dashboard/DashboardContent';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DashboardHeader from '@/components/dashboard/DashboardHeader';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <DashboardHeader />
      <DashboardContent />
    </DashboardLayout>
  );
};

export default Dashboard;
