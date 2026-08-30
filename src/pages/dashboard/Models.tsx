import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BrainCircuit,
  Cpu,
  Download,
  MoreHorizontal,
  Play,
  Pause,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  Search,
  Filter,
  Plus,
  Layers,
  Activity,
  GitBranch,
} from 'lucide-react'
import { Card,  CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

// ─── Model data ──────────────────────────────────────────────────────────────
interface ModelData {
  id: string
  name: string
  type: string
  version: string
  status: 'deployed' | 'training' | 'stopped' | 'error'
  accuracy: number
  latency: number
  parameters: string
  lastTrained: string
  trainingProgress?: number
  requests24h: string
  description: string
  framework: string
}

const MODELS: ModelData[] = [
  {
    id: 'mdl-001',
    name: 'Predictive Analytics v2.4',
    type: 'Regression',
    version: 'v2.4.1',
    status: 'deployed',
    accuracy: 99.2,
    latency: 42,
    parameters: '1.2B',
    lastTrained: '2h ago',
    requests24h: '124,892',
    description: 'Enterprise-grade time-series forecasting model optimized for financial data streams.',
    framework: 'PyTorch',
  },
  {
    id: 'mdl-002',
    name: 'NLP Sentiment Engine',
    type: 'Classification',
    version: 'v3.1.0',
    status: 'training',
    accuracy: 97.8,
    latency: 28,
    parameters: '780M',
    lastTrained: 'Training...',
    trainingProgress: 67,
    requests24h: '0',
    description: 'Multi-language sentiment analysis with context-aware emotion detection.',
    framework: 'TensorFlow',
  },
  {
    id: 'mdl-003',
    name: 'Vision Transformer XL',
    type: 'Image Classification',
    version: 'v1.8.3',
    status: 'deployed',
    accuracy: 98.5,
    latency: 85,
    parameters: '3.4B',
    lastTrained: '1d ago',
    requests24h: '56,234',
    description: 'High-resolution image classification supporting 10,000+ object categories.',
    framework: 'JAX',
  },
  {
    id: 'mdl-004',
    name: 'Anomaly Detector Pro',
    type: 'Anomaly Detection',
    version: 'v4.0.2',
    status: 'deployed',
    accuracy: 96.7,
    latency: 15,
    parameters: '340M',
    lastTrained: '5h ago',
    requests24h: '892,341',
    description: 'Real-time anomaly detection for infrastructure monitoring and security alerts.',
    framework: 'PyTorch',
  },
  {
    id: 'mdl-005',
    name: 'Recommendation Engine',
    type: 'Collaborative Filtering',
    version: 'v2.0.0',
    status: 'stopped',
    accuracy: 94.1,
    latency: 35,
    parameters: '560M',
    lastTrained: '3d ago',
    requests24h: '0',
    description: 'Hybrid recommendation system combining content-based and collaborative filtering.',
    framework: 'TensorFlow',
  },
  {
    id: 'mdl-006',
    name: 'Speech-to-Text Ultra',
    type: 'ASR',
    version: 'v1.2.0',
    status: 'error',
    accuracy: 95.3,
    latency: 120,
    parameters: '2.1B',
    lastTrained: '12h ago',
    requests24h: '0',
    description: 'Low-latency automatic speech recognition with 40+ language support.',
    framework: 'PyTorch',
  },
]

const statusConfig = {
  deployed: { label: 'Deployed', variant: 'success' as const, icon: <CheckCircle2 className="w-3 h-3" /> },
  training: { label: 'Training', variant: 'warning' as const, icon: <Activity className="w-3 h-3 animate-pulse" /> },
  stopped: { label: 'Stopped', variant: 'default' as const, icon: <Pause className="w-3 h-3" /> },
  error: { label: 'Error', variant: 'danger' as const, icon: <AlertTriangle className="w-3 h-3" /> },
}



// ─── Expandable model card ───────────────────────────────────────────────────
const ModelCard: React.FC<{ model: ModelData; index: number }> = ({ model, index }) => {
  const [expanded, setExpanded] = useState(false)
  const status = statusConfig[model.status]

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
    >
      <Card
        hoverEffect
        className="bg-slate-900/60 border-slate-800 shadow-sm cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <CardContent className="!space-y-0">
          {/* Main row */}
          <div className="flex items-start gap-4">
            {/* Icon */}
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/20 flex items-center justify-center flex-shrink-0">
              <BrainCircuit className="w-5 h-5 text-indigo-400" />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-sm font-semibold text-white truncate">{model.name}</h3>
                <Badge variant="outline" size="sm">{model.version}</Badge>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Layers className="w-3 h-3" />
                  {model.type}
                </span>
                <span className="flex items-center gap-1">
                  <Cpu className="w-3 h-3" />
                  {model.parameters} params
                </span>
                <span className="flex items-center gap-1">
                  <GitBranch className="w-3 h-3" />
                  {model.framework}
                </span>
              </div>
            </div>

            {/* Status + expand */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <Badge variant={status.variant} size="sm" className="gap-1">
                {status.icon}
                {status.label}
              </Badge>
              <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown className="w-4 h-4 text-slate-500" />
              </motion.div>
            </div>
          </div>

          {/* Training progress bar (only for training models) */}
          {model.status === 'training' && model.trainingProgress !== undefined && (
            <div className="mt-3">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] text-slate-500 font-medium">Training Progress</span>
                <span className="text-[10px] text-amber-400 font-semibold">{model.trainingProgress}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5">
                <motion.div
                  className="bg-gradient-to-r from-amber-500 to-amber-400 h-1.5 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${model.trainingProgress}%` }}
                  transition={{ duration: 1, delay: 0.3 }}
                />
              </div>
            </div>
          )}

          {/* Expanded details */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="pt-4 mt-4 border-t border-slate-800/60">
                  <p className="text-xs text-slate-400 mb-4 leading-relaxed">{model.description}</p>

                  {/* Metrics grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-slate-800/40 rounded-lg p-3 border border-slate-800/60">
                      <div className="text-[10px] text-slate-500 mb-1 font-medium">Accuracy</div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-lg font-bold text-emerald-400">{model.accuracy}</span>
                        <span className="text-[10px] text-slate-500">%</span>
                      </div>
                    </div>
                    <div className="bg-slate-800/40 rounded-lg p-3 border border-slate-800/60">
                      <div className="text-[10px] text-slate-500 mb-1 font-medium">Avg Latency</div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-lg font-bold text-indigo-400">{model.latency}</span>
                        <span className="text-[10px] text-slate-500">ms</span>
                      </div>
                    </div>
                    <div className="bg-slate-800/40 rounded-lg p-3 border border-slate-800/60">
                      <div className="text-[10px] text-slate-500 mb-1 font-medium">24h Requests</div>
                      <div className="text-lg font-bold text-white">{model.requests24h}</div>
                    </div>
                    <div className="bg-slate-800/40 rounded-lg p-3 border border-slate-800/60">
                      <div className="text-[10px] text-slate-500 mb-1 font-medium">Last Trained</div>
                      <div className="text-lg font-bold text-slate-300">{model.lastTrained}</div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-2 mt-4">
                    {model.status === 'deployed' && (
                      <Button variant="outline" size="sm" leftIcon={<Pause className="w-3.5 h-3.5" />}>
                        Pause
                      </Button>
                    )}
                    {(model.status === 'stopped' || model.status === 'error') && (
                      <Button variant="primary" size="sm" leftIcon={<Play className="w-3.5 h-3.5" />}>
                        Deploy
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" leftIcon={<Download className="w-3.5 h-3.5" />}>
                      Export
                    </Button>
                    <Button variant="ghost" size="sm" leftIcon={<MoreHorizontal className="w-3.5 h-3.5" />}>
                      More
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// ═════════════════════════════════════════════════════════════════════════════
export const Models: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const filtered = MODELS.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.type.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || m.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const deployedCount = MODELS.filter(m => m.status === 'deployed').length
  const trainingCount = MODELS.filter(m => m.status === 'training').length
  const totalParams = '8.4B'

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">

        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">AI Models</h2>
            <p className="text-sm text-slate-400">Manage, monitor, and deploy your machine learning models.</p>
          </div>
          <Button variant="glow" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
            New Model
          </Button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Models', value: String(MODELS.length), icon: <BrainCircuit className="w-4 h-4 text-indigo-400" />, change: '+2 this week' },
            { label: 'Deployed', value: String(deployedCount), icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />, change: 'Active now' },
            { label: 'In Training', value: String(trainingCount), icon: <Activity className="w-4 h-4 text-amber-400" />, change: 'ETA: 2h 15m' },
            { label: 'Total Parameters', value: totalParams, icon: <Cpu className="w-4 h-4 text-purple-400" />, change: 'Across all models' },
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
                <div className="text-[10px] text-slate-500">{stat.change}</div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Search + filter bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search models..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl bg-slate-900/80 border border-slate-800 pl-10 pr-4 py-2 text-sm text-slate-100 placeholder:text-slate-500 transition-all duration-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-500" />
            {['all', 'deployed', 'training', 'stopped', 'error'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                  statusFilter === status
                    ? 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/30'
                    : 'text-slate-500 hover:text-slate-300 border border-transparent'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Model cards list */}
        <div className="space-y-3">
          {filtered.map((model, i) => (
            <ModelCard key={model.id} model={model} index={i} />
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <BrainCircuit className="w-10 h-10 text-slate-700 mx-auto mb-3" />
              <p className="text-sm text-slate-500">No models match your search criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Models
