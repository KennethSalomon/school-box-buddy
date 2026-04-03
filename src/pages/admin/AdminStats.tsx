import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import AdminLayout from '@/layouts/AdminLayout';

const revenueData = [
  { day: 'Lun', revenue: 45000 },
  { day: 'Mar', revenue: 62000 },
  { day: 'Mer', revenue: 38000 },
  { day: 'Jeu', revenue: 71000 },
  { day: 'Ven', revenue: 55000 },
  { day: 'Sam', revenue: 82000 },
  { day: 'Dim', revenue: 28000 },
];

const ordersPerDay = [
  { day: 'Lun', orders: 8 },
  { day: 'Mar', orders: 12 },
  { day: 'Mer', orders: 6 },
  { day: 'Jeu', orders: 15 },
  { day: 'Ven', orders: 10 },
  { day: 'Sam', orders: 18 },
  { day: 'Dim', orders: 4 },
];

const paymentData = [
  { name: 'MTN MoMo', value: 40 },
  { name: 'Wave', value: 25 },
  { name: 'Cash', value: 20 },
  { name: 'Orange', value: 15 },
];

const COLORS = ['hsl(15, 93%, 51%)', 'hsl(183, 76%, 48%)', 'hsl(238, 100%, 14%)', 'hsl(38, 92%, 50%)'];

const topProducts = [
  { name: 'Cahier grand format 200p', count: 156 },
  { name: 'Stylo bille bleu BIC', count: 234 },
  { name: 'Trousse', count: 89 },
  { name: 'Calculatrice scientifique', count: 45 },
  { name: 'Règle 30cm', count: 120 },
];

const AdminStats = () => {
  const [period, setPeriod] = useState('week');

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Statistiques</h1>
          <div className="flex gap-1 bg-muted rounded-lg p-0.5">
            {[['week', 'Semaine'], ['month', 'Mois'], ['quarter', 'Trimestre'], ['year', 'Année']].map(([k, l]) => (
              <button
                key={k}
                onClick={() => setPeriod(k)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${period === k ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'}`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {/* Revenue */}
          <div className="sb-card p-5">
            <h3 className="font-bold text-foreground mb-4">Revenus</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={revenueData}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} className="text-xs" />
                <YAxis axisLine={false} tickLine={false} className="text-xs" />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="hsl(15, 93%, 51%)" strokeWidth={2} dot={{ fill: 'hsl(15, 93%, 51%)' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Orders per day */}
          <div className="sb-card p-5">
            <h3 className="font-bold text-foreground mb-4">Commandes / jour</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={ordersPerDay}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} className="text-xs" />
                <YAxis axisLine={false} tickLine={false} className="text-xs" />
                <Tooltip />
                <Bar dataKey="orders" fill="hsl(183, 76%, 48%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Payment methods */}
          <div className="sb-card p-5">
            <h3 className="font-bold text-foreground mb-4">Modes de paiement</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={paymentData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {paymentData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Top products */}
          <div className="sb-card p-5">
            <h3 className="font-bold text-foreground mb-4">Top 5 produits</h3>
            <div className="space-y-3">
              {topProducts.sort((a, b) => b.count - a.count).map((p, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-foreground">{i + 1}. {p.name}</span>
                    <span className="text-muted-foreground">{p.count} vendus</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${(p.count / 250) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminStats;
