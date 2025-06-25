import type { TopLevelSpec } from 'vega-lite';
import { inferType } from './fieldKind';
import type { ChartConfig } from './stores';

export function toSpec(config: ChartConfig, data: any[]): TopLevelSpec {
  const enc: any = {
    x: { field: config.x, type: inferType(config.x) }
  };

  if (config.y === 'count') {
    enc.y = { aggregate: 'count', type: 'quantitative' };
  } else {
    enc.y = { field: config.y, type: inferType(config.y) };
  }

  if (config.color) {
    enc.color = { field: config.color, type: inferType(config.color) };
  }

  return {
    data: { values: data },
    mark: config.chart,
    encoding: enc
  };
}
