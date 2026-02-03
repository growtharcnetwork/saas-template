'use client'

export default function OverviewPage() {
  const stats = [
    { name: 'Total Users', value: '2,651', change: '+12.5%', trend: 'up' },
    { name: 'Active Now', value: '145', change: '+3.2%', trend: 'up' },
    { name: 'Revenue', value: '$45,231', change: '+8.1%', trend: 'up' },
    { name: 'Growth', value: '24.5%', change: '-2.3%', trend: 'down' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-fg-primary">Dashboard</h1>
        <p className="text-fg-tertiary mt-1">Welcome back! Here's what's happening.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div 
            key={stat.name}
            className="bg-bg-primary border border-border-secondary rounded-xl p-6 shadow-sm"
          >
            <p className="text-sm text-fg-tertiary mb-1">{stat.name}</p>
            <p className="text-2xl font-bold text-fg-primary">{stat.value}</p>
            <p className={`text-sm mt-2 ${
              stat.trend === 'up' ? 'text-fg-success-primary' : 'text-fg-error-primary'
            }`}>
              {stat.change} from last month
            </p>
          </div>
        ))}
      </div>

      {/* Placeholder for charts/content */}
      <div className="bg-bg-primary border border-border-secondary rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-fg-primary mb-4">Recent Activity</h2>
        <div className="text-fg-tertiary text-center py-12">
          <p>📈 Charts and activity feed go here</p>
          <p className="text-sm mt-2">This is where you'd show usage data, recent actions, etc.</p>
        </div>
      </div>
    </div>
  )
}
