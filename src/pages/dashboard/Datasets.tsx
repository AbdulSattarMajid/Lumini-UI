import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Files,
  FileJson,
  FileText,
  FileSpreadsheet,
  Search,
  Filter,
  Plus,
  Download,
  Trash2,
  Eye,
  MoreHorizontal,
  HardDrive,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Database,
  Upload,
  RefreshCw,
  Tag,
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

// ─── Dataset data ────────────────────────────────────────────────────────────
interface DatasetData {
  id: string
  name: string
  format: 'CSV' | 'JSON' | 'TXT' | 'Parquet' | 'SQL'
  size: string
  rows: string
  columns: number
  status: 'ready' | 'processing' | 'error' | 'archived'
  lastModified: string
  tags: string[]
  usedByModels: number
  quality: number // 0-100
}

const DATASETS: DatasetData[] = [
  {
    id: 'ds-001',
    name: 'customer_churn_q3.csv',
    format: 'CSV',
    size: '248 MB',
    rows: '1.2M',
    columns: 47,
    status: 'ready',
    lastModified: '2h ago',
    tags: ['production', 'churn', 'q3-2024'],
    usedByModels: 3,
    quality: 98,
  },
  {
    id: 'ds-002',
    name: 'sales_forecast_2024.json',
    format: 'JSON',
    size: '1.8 GB',
    rows: '5.4M',
    columns: 32,
    status: 'processing',
    lastModified: '12m ago',
    tags: ['forecast', 'sales', 'time-series'],
    usedByModels: 1,
    quality: 84,
  },
  {
    id: 'ds-003',
    name: 'user_behavior_logs.parquet',
    format: 'Parquet',
    size: '4.2 GB',
    rows: '12.8M',
    columns: 128,
    status: 'ready',
    lastModified: '1d ago',
    tags: ['analytics', 'user-behavior', 'raw'],
    usedByModels: 5,
    quality: 92,
  },
  {
    id: 'ds-004',
    name: 'product_reviews_sentiment.txt',
    format: 'TXT',
    size: '620 MB',
    rows: '890K',
    columns: 8,
    status: 'ready',
    lastModified: '3d ago',
    tags: ['nlp', 'sentiment', 'reviews'],
    usedByModels: 2,
    quality: 95,
  },
  {
    id: 'ds-005',
    name: 'transactions_raw_dump.sql',
    format: 'SQL',
    size: '12.4 GB',
    rows: '45.2M',
    columns: 64,
    status: 'archived',
    lastModified: '2w ago',
    tags: ['archived', 'transactions', 'legacy'],
    usedByModels: 0,
    quality: 76,
  },
  {
    id: 'ds-006',
    name: 'image_annotations_v2.json',
    format: 'JSON',
    size: '3.1 GB',
    rows: '2.1M',
    columns: 16,
    status: 'error',
    lastModified: '6h ago',
    tags: ['vision', 'annotations', 'v2'],
    usedByModels: 1,
    quality: 45,
  },
]

const formatIcons: Record<string, React.ReactNode> = {
  CSV: <FileSpreadsheet className="w-5 h-5 text-emerald-400" />,
  JSON: <FileJson className="w-5 h-5 text-amber-400" />,
  TXT: <FileText className="w-5 h-5 text-blue-400" />,
  Parquet: <Database className="w-5 h-5 text-purple-400" />,
  SQL: <Database className="w-5 h-5 text-cyan-400" />,
}

const statusConfig = {
  ready: { label: 'Ready', variant: 'success' as const },
  processing: { label: 'Processing', variant: 'warning' as const },
  error: { label: 'Error', variant: 'danger' as const },
  archived: { label: 'Archived', variant: 'default' as const },
}

// ─── Quality bar ─────────────────────────────────────────────────────────────
const QualityBar: React.FC<{ score: number }> = ({ score }) => {
  const color =
    score >= 90 ? 'bg-emerald-500' :
    score >= 70 ? 'bg-amber-500' :
    'bg-rose-500'

  return (
    <div className="flex items-center gap-2">
      <div className="w-16 bg-slate-800 rounded-full h-1.5">
        <motion.div
          className={`h-1.5 rounded-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
      </div>
      <span className="text-[10px] text-slate-400 font-medium tabular-nums">{score}%</span>
    </div>
  )
}

// ─── Storage distribution visual ─────────────────────────────────────────────
const StorageBar: React.FC = () => {
  const segments = [
    { label: 'CSV', pct: 12, color: 'bg-emerald-500' },
    { label: 'JSON', pct: 24, color: 'bg-amber-500' },
    { label: 'Parquet', pct: 20, color: 'bg-purple-500' },
    { label: 'SQL', pct: 38, color: 'bg-cyan-500' },
    { label: 'Other', pct: 6, color: 'bg-slate-600' },
  ]
  return (
    <div>
      <div className="flex rounded-full h-2 overflow-hidden">
        {segments.map((seg) => (
          <motion.div
            key={seg.label}
            className={seg.color}
            initial={{ width: 0 }}
            animate={{ width: `${seg.pct}%` }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
        ))}
      </div>
      <div className="flex items-center gap-4 mt-2.5">
        {segments.map((seg) => (
          <div key={seg.label} className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full ${seg.color}`} />
            <span className="text-[10px] text-slate-500">{seg.label} ({seg.pct}%)</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ═════════════════════════════════════════════════════════════════════════════
export const Datasets: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table')

  const filtered = DATASETS.filter(
    (d) =>
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const totalSize = '22.4 GB'
  const totalRows = '67.5M'
  const readyCount = DATASETS.filter((d) => d.status === 'ready').length

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">

        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Datasets</h2>
            <p className="text-sm text-slate-400">Browse, upload, and manage your training and inference datasets.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" leftIcon={<RefreshCw className="w-3.5 h-3.5" />}>
              Sync
            </Button>
            <Button variant="glow" size="sm" leftIcon={<Upload className="w-4 h-4" />}>
              Upload Dataset
            </Button>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Datasets', value: String(DATASETS.length), icon: <Files className="w-4 h-4 text-indigo-400" />, sub: '+1 this week', positive: true },
            { label: 'Total Storage', value: totalSize, icon: <HardDrive className="w-4 h-4 text-purple-400" />, sub: '78% of quota', positive: false },
            { label: 'Total Rows', value: totalRows, icon: <Database className="w-4 h-4 text-cyan-400" />, sub: 'Across all sets', positive: true },
            { label: 'Ready to Use', value: `${readyCount}/${DATASETS.length}`, icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />, sub: `${Math.round((readyCount / DATASETS.length) * 100)}% available`, positive: true },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <Card hoverEffect className="bg-slate-900/60 border-slate-800 shadow-sm !p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-500 font-medium">{stat.label}</span>
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className={`text-[10px] flex items-center gap-1 ${stat.positive ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {stat.positive ? <ArrowUpRight className="w-2.5 h-2.5" /> : <ArrowDownRight className="w-2.5 h-2.5" />}
                  {stat.sub}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Storage distribution */}
        <Card hoverEffect={false} className="bg-slate-900/60 border-slate-800 shadow-sm !p-5 mb-8">
          <div className="flex items-center justify-between mb-3">
            <CardTitle className="!text-sm !text-slate-300">Storage Distribution</CardTitle>
            <Badge variant="outline" size="sm">22.4 / 30 GB used</Badge>
          </div>
          <StorageBar />
        </Card>

        {/* Search + filter */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search datasets or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl bg-slate-900/80 border border-slate-800 pl-10 pr-4 py-2 text-sm text-slate-100 placeholder:text-slate-500 transition-all duration-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
        </div>

        {/* Datasets table */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-400 bg-slate-900/80 border-b border-slate-800">
                <tr>
                  <th className="px-5 py-3 font-medium">Dataset</th>
                  <th className="px-5 py-3 font-medium">Format</th>
                  <th className="px-5 py-3 font-medium">Size</th>
                  <th className="px-5 py-3 font-medium hidden lg:table-cell">Rows</th>
                  <th className="px-5 py-3 font-medium hidden xl:table-cell">Quality</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium hidden lg:table-cell">Tags</th>
                  <th className="px-5 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filtered.map((ds, i) => {
                  const status = statusConfig[ds.status]
                  return (
                    <motion.tr
                      key={ds.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.25, delay: i * 0.04 }}
                      className="hover:bg-slate-800/30 transition-colors group"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center justify-center flex-shrink-0">
                            {formatIcons[ds.format]}
                          </div>
                          <div>
                            <div className="font-medium text-slate-200 text-xs">{ds.name}</div>
                            <div className="text-[10px] text-slate-500 mt-0.5">
                              {ds.columns} columns · Used by {ds.usedByModels} model{ds.usedByModels !== 1 ? 's' : ''}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <Badge variant="outline" size="sm">{ds.format}</Badge>
                      </td>
                      <td className="px-5 py-4 text-slate-300 text-xs font-mono">{ds.size}</td>
                      <td className="px-5 py-4 text-slate-400 text-xs hidden lg:table-cell">{ds.rows}</td>
                      <td className="px-5 py-4 hidden xl:table-cell">
                        <QualityBar score={ds.quality} />
                      </td>
                      <td className="px-5 py-4">
                        <Badge variant={status.variant} size="sm">{status.label}</Badge>
                      </td>
                      <td className="px-5 py-4 hidden lg:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {ds.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] bg-slate-800/60 text-slate-400 border border-slate-700/40">
                              <Tag className="w-2.5 h-2.5" />
                              {tag}
                            </span>
                          ))}
                          {ds.tags.length > 2 && (
                            <span className="text-[10px] text-slate-600 px-1">+{ds.tags.length - 2}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-500 hover:text-slate-200 transition-colors" title="Preview">
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-500 hover:text-slate-200 transition-colors" title="Download">
                            <Download className="w-3.5 h-3.5" />
                          </button>
                          <button className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-500 hover:text-rose-400 transition-colors" title="Delete">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  )
                })}
              </tbody>
            </table>

            {filtered.length === 0 && (
              <div className="text-center py-16">
                <Files className="w-10 h-10 text-slate-700 mx-auto mb-3" />
                <p className="text-sm text-slate-500">No datasets match your search.</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Table footer */}
        <div className="flex items-center justify-between mt-4 px-1">
          <span className="text-xs text-slate-500">
            Showing {filtered.length} of {DATASETS.length} datasets
          </span>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white transition-colors">
              Previous
            </button>
            <button className="px-3 py-1.5 rounded-lg text-xs font-medium bg-indigo-500/15 border border-indigo-500/30 text-indigo-400">
              1
            </button>
            <button className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Datasets
