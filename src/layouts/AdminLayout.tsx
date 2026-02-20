import { ReactNode, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import { BarChart3, ShoppingCart, Package, GraduationCap, TrendingUp, Users, LogOut, Menu, X } from 'lucide-react';

const navItems = [
  { path: '/admin', label: 'Dashboard', icon: BarChart3 },
  { path: '/admin/orders', label: 'Commandes', icon: ShoppingCart },
  { path: '/admin/catalog', label: 'Catalogue', icon: Package },
  { path: '/admin/schools', label: 'Écoles & Classes', icon: GraduationCap },
  { path: '/admin/stats', label: 'Statistiques', icon: TrendingUp },
  { path: '/admin/users', label: 'Utilisateurs', icon: Users },
];

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { logout } = useStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pendingOrders = useStore(s => s.orders.filter(o => o.status === 'pending').length);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-foreground/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-sidebar text-sidebar-foreground flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
              <Package className="w-4 h-4 text-sidebar-primary-foreground" />
            </div>
            <span className="font-bold text-lg">SB Admin</span>
          </div>
          <button className="lg:hidden text-sidebar-foreground" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {navItems.map(item => {
            const active = pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => { navigate(item.path); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors relative ${
                  active ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
                {item.path === '/admin/orders' && pendingOrders > 0 && (
                  <span className="ml-auto w-5 h-5 bg-sidebar-primary rounded-full text-[10px] font-bold text-sidebar-primary-foreground flex items-center justify-center animate-pulse">
                    {pendingOrders}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-3">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent/50 transition-colors">
            <LogOut className="w-5 h-5" /> Déconnexion
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 bg-card border-b border-border flex items-center px-4 gap-3 lg:px-6">
          <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5 text-foreground" />
          </button>
          <h2 className="font-bold text-foreground text-sm">School Box Admin</h2>
        </header>
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
