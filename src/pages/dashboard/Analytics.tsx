import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Users,
  Globe,
  Zap,
  Activity,
  Layers,
  Server,
  Wifi,
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

// ─── Chart components ────────────────────────────────────────────────────────
/** Area chart with gradient fill */
const AreaChart: React.FC<{
  data: number[]
  color: string
  height?: number
  width?: number
  labels?: string[]
}> = ({ data, color, height = 140, width = 480, labels }) => {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const padding = 8

  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * (width - padding * 2) + padding
      const y = height - ((v - min) / range) * (height - padding * 2) - padding
      return `${x},${y}`
    })
    .join(' ')

  const areaPoints = `${padding},${height - padding} ${points} ${width - padding},${height - padding}`
  const gradId = `area-grad-${color.replace('#', '')}`

  return (
    <div className="relative">
      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="overflow-visible">
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.25" />
            <stop offset="100%" stopColor={color} stopOpacity="0.02" />
          </linearGradient>
        </defs>
        {/* Horizontal guide lines */}
        {[0.25, 0.5, 0.75].map((pct) => (
          <line
            key={pct}
            x1={padding}
            y1={height - padding - pct * (height - padding * 2)}
            x2={width - padding}
            y2={height - padding - pct * (height - padding * 2)}
            stroke="rgba(148,163,184,0.08)"
            strokeDasharray="4 4"
          />
        ))}
        <polygon points={areaPoints} fill={`url(#${gradId})`} />
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Data points */}
        {data.map((v, i) => {
          const x = (i / (data.length - 1)) * (width - padding * 2) + padding
          const y = height - ((v - min) / range) * (height - padding * 2) - padding
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="3"
              fill={color}
              opacity="0.6"
              className="hover:opacity-100 transition-opacity"
            />
          )
        })}
      </svg>
      {/* X-axis labels */}
      {labels && (
        <div className="flex justify-between px-2 mt-1">
          {labels.map((l) => (
            <span key={l} className="text-[9px] text-slate-600">
              {l}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

/** Horizontal bar chart */
const HBarChart: React.FC<{ data: { label: string; value: number; color: string }[] }> = ({ data }) => {
  const max = Math.max(...data.map((d) => d.value))
  return (
    <div className="space-y-3">
      {data.map((item, i) => (
        <div key={item.label}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-slate-400">{item.label}</span>
            <span className="text-xs text-slate-300 font-semibold tabular-nums">{item.value.toLocaleString()}</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1.5">
            <motion.div
              className="h-1.5 rounded-full"
              style={{ backgroundColor: item.color }}
              initial={{ width: 0 }}
              animate={{ width: `${(item.value / max) * 100}%` }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.08 }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

/** Donut chart */
const DonutChart: React.FC<{
  segments: { label: string; value: number; color: string }[]
  centerLabel?: string
  centerValue?: string
}> = ({ segments, centerLabel, centerValue }) => {
  const total = segments.reduce((sum, s) => sum + s.value, 0)
  const radius = 48
  const stroke = 10
  const circumference = 2 * Math.PI * radius
  let offset = 0

  return (
    <div className="flex items-center gap-6">
      <svg width="120" height="120" viewBox="0 0 120 120">
        {segments.map((seg) => {
          const dashLen = (seg.value / total) * circumference
          const dashOff = -offset
          offset += dashLen
          return (
            <circle
              key={seg.label}
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth={stroke}
              strokeDasharray={`${dashLen} ${circumference - dashLen}`}
              strokeDashoffset={dashOff}
              strokeLinecap="round"
              transform="rotate(-90 60 60)"
              opacity="0.85"
            />
          )
        })}
        {centerValue && (
          <>
            <text x="60" y="55" textAnchor="middle" fill="white" fontSize="18" fontWeight="700">
              {centerValue}
            </text>
            {centerLabel && (
              <text x="60" y="72" textAnchor="middle" fill="#94a3b8" fontSize="9">
                {centerLabel}
              </text>
            )}
          </>
        )}
      </svg>
      <div className="space-y-2">
        {segments.map((seg) => (
          <div key={seg.label} className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: seg.color }} />
            <span className="text-xs text-slate-400">{seg.label}</span>
            <span className="text-xs text-slate-300 font-semibold ml-auto tabular-nums">
              {Math.round((seg.value / total) * 100)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Metric card ─────────────────────────────────────────────────────────────
const MetricCard: React.FC<{
  label: string
  value: string
  change: string
  positive: boolean
  icon: React.ReactNode
  index: number
}> = ({ label, value, change, positive, icon, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: index * 0.05 }}
  >
    <Card hoverEffect className="bg-slate-900/60 border-slate-800 shadow-sm !p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-slate-500 font-medium">{label}</span>
        {icon}
      </div>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className={`text-[10px] flex items-center gap-1 font-medium ${positive ? 'text-emerald-400' : 'text-rose-400'}`}>
        {positive ? <ArrowUpRight className="w-2.5 h-2.5" /> : <ArrowDownRight className="w-2.5 h-2.5" />}
        {change}
      </div>
    </Card>
  </motion.div>
)

// ─── Live activity feed ──────────────────────────────────────────────────────
const ACTIVITY_FEED = [
  { type: 'success', message: 'Model "Predictive v2.4" served 1,000th request', time: '2m ago' },
  { type: 'info', message: 'New dataset "user_signals_aug.csv" uploaded (450 MB)', time: '8m ago' },
  { type: 'warning', message: 'API latency spike detected on /v2/predict endpoint', time: '15m ago' },
  { type: 'success', message: 'Training job "NLP Sentiment v3.1" reached 67% completion', time: '22m ago' },
  { type: 'info', message: 'Scheduled backup completed successfully', time: '45m ago' },
  { type: 'error', message: 'WebSocket connection dropped for real-time dashboard', time: '1h ago' },
]

const activityColors = {
  success: 'bg-emerald-500',
  info: 'bg-indigo-500',
  warning: 'bg-amber-500',
  error: 'bg-rose-500',
}

// ═════════════════════════════════════════════════════════════════════════════
export const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d' | '90d'>('7d')

  // Mock data sets
  const requestsData = [12000, 15000, 13500, 18000, 16500, 21000, 19500, 23000, 22000, 26000, 24500, 28000]
  const latencyData = [42, 38, 45, 35, 40, 32, 44, 36, 30, 38, 34, 28]
  const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">

        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Analytics</h2>
            <p className="text-sm text-slate-400">Monitor platform performance, usage trends, and system health.</p>
          </div>
          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-900/90 border border-slate-800">
            {(['24h', '7d', '30d', '90d'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${timeRange === range
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200'
                  }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* KPI row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <MetricCard label="Total Requests" value="284K" change="+18.2% vs last period" positive index={0} icon={<Globe className="w-4 h-4 text-indigo-400" />} />
          <MetricCard label="Active Users" value="2,847" change="+23.5% growth" positive index={1} icon={<Users className="w-4 h-4 text-purple-400" />} />
          <MetricCard label="Avg Latency" value="34ms" change="-12ms improvement" positive index={2} icon={<Zap className="w-4 h-4 text-amber-400" />} />
          <MetricCard label="Error Rate" value="0.12%" change="+0.03% from baseline" positive={false} index={3} icon={<Activity className="w-4 h-4 text-rose-400" />} />
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Main area chart (2 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card hoverEffect={false} className="bg-slate-900/60 border-slate-800 shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="!text-sm !text-slate-300">API Request Volume</CardTitle>
                    <p className="text-[10px] text-slate-500 mt-1">Monthly trend analysis</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="success" size="sm" className="gap-1">
                      <TrendingUp className="w-3 h-3" />
                      +32%
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <AreaChart data={requestsData} color="#6366f1" height={160} labels={monthLabels} />
              </CardContent>
            </Card>
          </motion.div>

          {/* Donut chart (1 col) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <Card hoverEffect={false} className="bg-slate-900/60 border-slate-800 shadow-sm h-full">
              <CardHeader className="pb-2">
                <CardTitle className="!text-sm !text-slate-300">Traffic Sources</CardTitle>
                <p className="text-[10px] text-slate-500 mt-1">By API consumer type</p>
              </CardHeader>
              <CardContent>
                <DonutChart
                  segments={[
                    { label: 'Web App', value: 42, color: '#6366f1' },
                    { label: 'Mobile SDK', value: 28, color: '#a855f7' },
                    { label: 'Direct API', value: 18, color: '#ec4899' },
                    { label: 'Webhooks', value: 12, color: '#818cf8' },
                  ]}
                  centerValue="284K"
                  centerLabel="Total"
                />
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Second row: Latency chart + Top endpoints */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Latency trend */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.35 }}
          >
            <Card hoverEffect={false} className="bg-slate-900/60 border-slate-800 shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="!text-sm !text-slate-300">Latency Trend</CardTitle>
                    <p className="text-[10px] text-slate-500 mt-1">P95 response time (ms)</p>
                  </div>
                  <Badge variant="success" size="sm" className="gap-1">
                    <TrendingDown className="w-3 h-3" />
                    -33%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <AreaChart data={latencyData} color="#22d3ee" height={130} labels={monthLabels} />
              </CardContent>
            </Card>
          </motion.div>

          {/* Top endpoints */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <Card hoverEffect={false} className="bg-slate-900/60 border-slate-800 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="!text-sm !text-slate-300">Top Endpoints</CardTitle>
                <p className="text-[10px] text-slate-500 mt-1">Requests by endpoint (last {timeRange})</p>
              </CardHeader>
              <CardContent>
                <HBarChart
                  data={[
                    { label: '/v2/predict', value: 84200, color: '#6366f1' },
                    { label: '/v2/analyze', value: 62100, color: '#a855f7' },
                    { label: '/v1/classify', value: 45800, color: '#ec4899' },
                    { label: '/v2/recommend', value: 38400, color: '#818cf8' },
                    { label: '/v1/embed', value: 21500, color: '#c084fc' },
                  ]}
                />
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Third row: Infrastructure + Activity feed */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* System health monitors */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.45 }}
            className="lg:col-span-1"
          >
            <Card hoverEffect={false} className="bg-slate-900/60 border-slate-800 shadow-sm h-full">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="!text-sm !text-slate-300">System Health</CardTitle>
                  <Badge variant="success" size="sm" dot>All Systems Operational</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { label: 'API Gateway', uptime: '99.99%', icon: <Globe className="w-3.5 h-3.5 text-emerald-400" />, status: 'healthy' },
                    { label: 'ML Pipeline', uptime: '99.95%', icon: <Layers className="w-3.5 h-3.5 text-emerald-400" />, status: 'healthy' },
                    { label: 'GPU Cluster', uptime: '99.87%', icon: <Server className="w-3.5 h-3.5 text-amber-400" />, status: 'degraded' },
                    { label: 'CDN Network', uptime: '100%', icon: <Wifi className="w-3.5 h-3.5 text-emerald-400" />, status: 'healthy' },
                    { label: 'Data Pipeline', uptime: '99.92%', icon: <Activity className="w-3.5 h-3.5 text-emerald-400" />, status: 'healthy' },
                  ].map((service) => (
                    <div key={service.label} className="flex items-center justify-between py-2 px-3 rounded-lg bg-slate-800/30 border border-slate-800/40">
                      <div className="flex items-center gap-2.5">
                        {service.icon}
                        <span className="text-xs text-slate-300 font-medium">{service.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-slate-500 tabular-nums">{service.uptime}</span>
                        <div className={`w-2 h-2 rounded-full ${service.status === 'healthy' ? 'bg-emerald-400' : 'bg-amber-400'} shadow-sm`} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Live activity feed */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="lg:col-span-2"
          >
            <Card hoverEffect={false} className="bg-slate-900/60 border-slate-800 shadow-sm h-full">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="!text-sm !text-slate-300">Live Activity Feed</CardTitle>
                    <p className="text-[10px] text-slate-500 mt-1">Recent system events and notifications</p>
                  </div>
                  <Badge variant="primary" size="sm" dot>{ACTIVITY_FEED.length} events</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {ACTIVITY_FEED.map((event, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25, delay: 0.5 + i * 0.06 }}
                      className="flex items-start gap-3 py-2.5 px-3 rounded-lg hover:bg-slate-800/30 transition-colors"
                    >
                      <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${activityColors[event.type as keyof typeof activityColors]}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-slate-300 leading-relaxed">{event.message}</p>
                      </div>
                      <span className="text-[10px] text-slate-600 flex-shrink-0 tabular-nums">{event.time}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Analytics
