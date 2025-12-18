import { AlertTriangle, AlertCircle } from 'lucide-react';
import { CompatibilityIssue } from '../types';

interface CompatibilityIssuesProps {
  issues: CompatibilityIssue[];
}

export function CompatibilityIssues({ issues }: CompatibilityIssuesProps) {
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-6 sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-2xl">⚠️</span>
        <h2 className="font-semibold text-white text-xl">Compatibility Issues</h2>
      </div>

      {issues.length === 0 ? (
        <div className="bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-xl p-4 text-center">
          <p className="text-green-100 font-medium">✓ All checks passed!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {issues.map((issue, index) => (
            <div
              key={index}
              className={`rounded-xl p-4 flex items-start gap-3 backdrop-blur-sm shadow-lg ${
                issue.type === 'critical'
                  ? 'bg-red-500/20 border border-red-400/30 text-red-100'
                  : 'bg-orange-500/20 border border-orange-400/30 text-orange-100'
              }`}
            >
              {issue.type === 'critical' ? (
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              )}
              <span className="flex-1">{issue.message}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}