<template>
  <div id="chart">
    <apexchart height=100px type="bar" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import { ApiService } from './ApiService'

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
          text: 'Plus de Tif ou plus de Hair?',
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
    initializeApi: function () {
      // Initialize API service
      if (window.location.hostname === 'localhost') {
        this.api = new ApiService('http://localhost:5000/')
      } else {
        this.api = new ApiService('http://localhost:5000/')
      }
    },
    async getDistr () {
      const distr = await this.api.getDistribution()
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
    this.initializeApi()
    this.getDistr()
  }
}
</script>

<style>
  #chart {
    position: absolute;
    top: 0px;
    right: 10px;
    padding: 0px;
    margin: 0px;
    width: 50%;
    background: transparent;
    z-index: 1000;
  }
</style>
