import { SaleReport } from '../sale-reports';

export interface ChartSeries {
  arg: string[];
  val: number[];
}

export interface DateRange {
  start: Date;
  end: Date;
}

export function createChartSeries(reports: readonly SaleReport[], range: DateRange | null = null): ChartSeries {
  const counts = new Map<string, number>();

  for (const report of reports) {
    const label = formatDay(report.dateAccIn);
    if (!label) {
      continue;
    }

    counts.set(label, (counts.get(label) ?? 0) + 1);
  }

  const arg: string[] = [];
  const val: number[] = [];

  for (const label of [...counts.keys()].sort()) {
    if (range && !isInsideRange(label, range)) {
      continue;
    }

    arg.push(label);
    val.push(counts.get(label) ?? 0);
  }

  return { arg, val };
}

export function toDate(value: unknown): Date | null {
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }

  if (typeof value === 'string' || typeof value === 'number') {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  return null;
}

function formatDay(iso: string): string | null {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${day}-${month}-${date.getFullYear()}`;
}

function isInsideRange(label: string, range: DateRange): boolean {
  const time = labelToTime(label);
  return time >= startOfDay(range.start) && time <= startOfDay(range.end);
}

function labelToTime(label: string): number {
  const [day, month, year] = label.split('-').map(Number);
  return new Date(year, month - 1, day).getTime();
}

function startOfDay(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
}
