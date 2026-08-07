export function formatNumber(value: number, decimals: number = 2): string {
  return new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function formatPercentage(value: number, decimals: number = 2): string {
  return `${formatNumber(value, decimals)}%`;
}

export function formatScore(earned: number, max: number): string {
  return `${formatNumber(earned, 2)} / ${formatNumber(max, 0)}`;
}

export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'long',
  }).format(d);
}

export function formatDateTime(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(d);
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

export function getCategoryColor(code: string): string {
  const colors: Record<string, string> = {
    SI: 'bg-blue-500',
    EC: 'bg-green-500',
    WS: 'bg-yellow-500',
    WR: 'bg-cyan-500',
    TR: 'bg-purple-500',
    ED: 'bg-pink-500',
    GD: 'bg-indigo-500',
  };
  return colors[code] || 'bg-gray-500';
}
