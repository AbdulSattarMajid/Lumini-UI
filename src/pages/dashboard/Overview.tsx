import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { UploadCloud, Activity, CheckCircle2, Zap, Clock } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

export const Overview: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        
        {/* Left Column: Upload & Processing Area */}
        <div className="flex-1 space-y-8">
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-200">Data Ingestion</h2>
              <Badge variant="outline" size="sm">Supports CSV, JSON, TXT</Badge>
            </div>
            
            {/* Drag and Drop Zone */}
            <motion.div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={`relative flex flex-col items-center justify-center w-full h-64 p-6 border-2 border-dashed rounded-2xl transition-colors duration-200 cursor-pointer ${
                isDragging 
                  ? 'border-indigo-500 bg-indigo-500/10' 
                  : 'border-slate-700 hover:border-slate-500 bg-slate-900/50 hover:bg-slate-900'
              }`}
            >
              <div className="w-16 h-16 mb-4 rounded-full bg-slate-800 flex items-center justify-center">
                <UploadCloud className={`w-8 h-8 ${isDragging ? 'text-indigo-400' : 'text-slate-400'}`} />
              </div>
              <p className="mb-2 text-sm text-slate-300 font-medium">
                <span className="text-indigo-400">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-slate-500">Maximum file size 50MB</p>
            </motion.div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-200 mb-4">Recent Jobs</h2>
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-400 bg-slate-900/80 border-b border-slate-800">
                  <tr>
                    <th className="px-6 py-3 font-medium">Dataset Name</th>
                    <th className="px-6 py-3 font-medium">Model</th>
                    <th className="px-6 py-3 font-medium">Status</th>
                    <th className="px-6 py-3 font-medium">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60">
                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-200">customer_churn_q3.csv</td>
                    <td className="px-6 py-4 text-slate-400">Predictive v2.4</td>
                    <td className="px-6 py-4"><Badge variant="success" size="sm">Completed</Badge></td>
                    <td className="px-6 py-4 text-slate-400">2m ago</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-200">sales_forecast_2024.json</td>
                    <td className="px-6 py-4 text-slate-400">Time-Series Llama</td>
                    <td className="px-6 py-4"><Badge variant="warning" size="sm">Processing (84%)</Badge></td>
                    <td className="px-6 py-4 text-slate-400">12m ago</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-200">raw_feedback_logs.txt</td>
                    <td className="px-6 py-4 text-slate-400">NLP Sentiment Base</td>
                    <td className="px-6 py-4"><Badge variant="danger" size="sm">Failed</Badge></td>
                    <td className="px-6 py-4 text-slate-400">1h ago</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Right Column: Metrics Panel */}
        <div className="w-full lg:w-80 space-y-4 flex-shrink-0">
          <h2 className="text-lg font-semibold text-slate-200 mb-4">Live Metrics</h2>
          
          <Card hoverEffect className="bg-slate-900/60 border-slate-800 shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-slate-400">Processing Speed</CardTitle>
                <Zap className="w-4 h-4 text-amber-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-white">12.4</span>
                <span className="text-sm text-slate-400">GB/s</span>
              </div>
              <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-400">
                <Activity className="w-3 h-3" />
                <span>+14% from last week</span>
              </div>
            </CardContent>
          </Card>

          <Card hoverEffect className="bg-slate-900/60 border-slate-800 shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-slate-400">Accuracy Score</CardTitle>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-white">99.2</span>
                <span className="text-sm text-slate-400">%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 mt-4">
                <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '99.2%' }}></div>
              </div>
            </CardContent>
          </Card>

          <Card hoverEffect className="bg-slate-900/60 border-slate-800 shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-slate-400">Avg. Latency</CardTitle>
                <Clock className="w-4 h-4 text-indigo-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-white">42</span>
                <span className="text-sm text-slate-400">ms</span>
              </div>
              <div className="mt-3 flex items-center gap-1.5 text-xs text-rose-400">
                <Activity className="w-3 h-3" />
                <span>-2ms slower than average</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
      </div>
    </div>
  )
}

export default Overview
