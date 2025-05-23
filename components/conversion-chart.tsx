"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

interface ConversionChartProps {
  data: {
    labels: string[]
    datasets: {
      label: string
      data: number[]
      backgroundColor: string
      borderColor: string
      borderWidth: number
    }[]
  }
}

export default function ConversionChart({ data }: ConversionChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current || !data) return

    // Destroy previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    // Create new chart
    const ctx = chartRef.current.getContext("2d")
    if (ctx) {
      const isDarkMode = document.documentElement.classList.contains("dark")

      chartInstance.current = new Chart(ctx, {
        type: "bar",
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                color: isDarkMode ? "#fff" : "#000",
              },
              grid: {
                color: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
              },
            },
            x: {
              ticks: {
                color: isDarkMode ? "#fff" : "#000",
              },
              grid: {
                color: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
              },
            },
          },
          plugins: {
            legend: {
              labels: {
                color: isDarkMode ? "#fff" : "#000",
              },
            },
            tooltip: {
              backgroundColor: isDarkMode ? "rgba(0, 0, 0, 0.8)" : "rgba(255, 255, 255, 0.8)",
              titleColor: isDarkMode ? "#fff" : "#000",
              bodyColor: isDarkMode ? "#fff" : "#000",
              borderColor: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
              borderWidth: 1,
            },
          },
        },
      })
    }

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [data])

  // Add an effect to update chart colors when theme changes
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.attributeName === "class" && chartInstance.current) {
          const isDarkMode = document.documentElement.classList.contains("dark")

          // Update chart colors
          if (chartInstance.current.options.scales?.y?.ticks) {
            chartInstance.current.options.scales.y.ticks.color = isDarkMode ? "#fff" : "#000"
            if (chartInstance.current.options.scales.y.grid) {
              chartInstance.current.options.scales.y.grid.color = isDarkMode
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(0, 0, 0, 0.1)"
            }
          }

          if (chartInstance.current.options.scales?.x?.ticks) {
            chartInstance.current.options.scales.x.ticks.color = isDarkMode ? "#fff" : "#000"
            if (chartInstance.current.options.scales.x.grid) {
              chartInstance.current.options.scales.x.grid.color = isDarkMode
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(0, 0, 0, 0.1)"
            }
          }

          if (chartInstance.current.options.plugins?.legend?.labels) {
            chartInstance.current.options.plugins.legend.labels.color = isDarkMode ? "#fff" : "#000"
          }

          chartInstance.current.update()
        }
      })
    })

    observer.observe(document.documentElement, { attributes: true })

    return () => {
      observer.disconnect()
    }
  }, [])

  return <canvas ref={chartRef} />
}
