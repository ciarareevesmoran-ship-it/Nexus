import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import AiTutor from '../ai-tutor/AiTutor';

export default function AppLayout() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 min-h-screen overflow-x-hidden pb-20 md:pb-0">
        <Outlet />
      </main>
      <MobileNav />
      <AiTutor />
    </div>
  );
}