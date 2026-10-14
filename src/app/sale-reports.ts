import { httpResource } from '@angular/common/http';
import { computed, Injectable } from '@angular/core';

export interface NamedCode {
  code: string;
  name: string;
}

export interface SaleReport {
  type: string;
  id: number;
  currency: NamedCode;
  dateAccIn: string;
  pkind: number;
  agent: NamedCode;
  pointOfSale: NamedCode;
  attrClose: number;
  dts: NamedCode;
  userId: number;
  datInp: string;
  storno: number;
}

export interface SaleReportPage {
  count: number;
  limit: number;
  offset: number;
  hasMore: boolean;
  items: SaleReport[];
}

export interface AgentDirectory {
  agents: NamedCode[];
}

const emptyPage: SaleReportPage = {
  count: 0,
  limit: 0,
  offset: 0,
  hasMore: false,
  items: [],
};

@Injectable({ providedIn: 'root' })
export class SaleReports {
  private readonly reportsResource = httpResource<SaleReportPage>(() => '/assets/salereports.json', {
    defaultValue: emptyPage,
  });

  private readonly agentsResource = httpResource<AgentDirectory>(() => '/assets/agents.json', {
    defaultValue: { agents: [] },
  });

  readonly reports = computed(() => this.reportsResource.value().items);

  readonly reportsLoading = computed(() => this.reportsResource.isLoading());

  readonly agentCodes = computed((): string[] | undefined => {
    const status = this.agentsResource.status();
    if (status === 'loading' || status === 'idle') {
      return undefined;
    }

    return this.agentsResource.value().agents.map((agent) => agent.code);
  });
}
