import { createChartSeries } from './chart-series';
import { SaleReport } from '../sale-reports';

function report(dateAccIn: string): SaleReport {
  return {
    type: 'saleReport',
    id: 1,
    currency: { code: 'РУБ', name: 'Российский рубль' },
    dateAccIn,
    pkind: 0,
    agent: { code: '02МИР', name: 'АО АК АЛРОСА' },
    pointOfSale: { code: 'ЯМ678170', name: 'ЯМ678170' },
    attrClose: 0,
    dts: { code: 'SIR_2000', name: 'SIR_2000' },
    userId: 1,
    datInp: dateAccIn,
    storno: 0,
  };
}

describe('createChartSeries', () => {
  it('counts reports by local calendar day', () => {
    const series = createChartSeries([
      report('2022-01-02T00:00:00+03:00'),
      report('2022-01-02T00:00:00+03:00'),
      report('2022-01-01T00:00:00+03:00'),
    ]);

    expect(series).toEqual({
      arg: ['01-01-2022', '02-01-2022'],
      val: [1, 2],
    });
  });

  it('includes both ends of the selected range', () => {
    const series = createChartSeries(
      [
        report('2022-01-01T00:00:00+03:00'),
        report('2022-01-02T00:00:00+03:00'),
        report('2022-01-03T00:00:00+03:00'),
      ],
      {
        start: new Date(2022, 0, 2),
        end: new Date(2022, 0, 2),
      },
    );

    expect(series).toEqual({
      arg: ['02-01-2022'],
      val: [1],
    });
  });
});
