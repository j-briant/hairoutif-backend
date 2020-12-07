<template>
  <div id="chart">
    <apexchart height=100%  width=95% type="bar" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import { store, utils } from '@/store'
import { bus } from '@/main'

export default {
  name: 'barChart',
  components: {
    apexchart: VueApexCharts
  },
  data () {
    return {
      series: [{
        name: 'Hair',
        data: []
      }, {
        name: 'Tif',
        data: []
      }],
      chartOptions: {
        title: {
          text: 'Plus de Hair ou plus de Tif?',
          align: 'center',
          offsetY: 5,
          style: {
            color: '#FFF'
          }
        },
        xaxis: {
          labels: {
            show: false
          },
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          }
        },
        yaxis: {
          show: false,
          showForNullSeries: false,
          max: 1,
          labels: {
            show: false
          },
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          }
        },
        grid: {
          show: false,
          padding: {
            top: 0,
            bottom: 0,
            right: 0,
            left: 0
          }
        },
        chart: {
          type: 'bar',
          sparkline: {
            enabled: false
          },
          stacked: true,
          stackType: '100%',
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          bar: {
            horizontal: true
          }
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val
            }
          },
          x: {
            show: false
          }
        },
        legend: {
          show: false
        }
      }
    }
  },
  methods: {
    async getDistr (id) {
      const distr = await store.api.getDistribution(id)
      this.series = [{
        name: 'Hair',
        data: [parseInt(distr.haircount)]
      }, {
        name: 'Tif',
        data: [parseInt(distr.tifcount)]
      }]
    }
  },
  created () {
    utils.initializeApi()
    this.getDistr(1)
    bus.$on('regionSelected', e => this.getDistr(e.rid))
  }
}
</script>

<style>
  #chart {
    position: relative;
    padding: 0px;
    margin: 0px;
    width: 100%;
    height: 100%;
    background: #333;
    z-index: 1000;
  }
</style>
