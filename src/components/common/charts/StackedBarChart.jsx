import React, { useRef, useLayoutEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import Tooltip from './components/Tooltip';

const StackedBarChart = (props) => {
  const [chart, setChart] = useState(null);
  const [context, setContext] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);

  const renderTooltip = (context) => {
    if (context.tooltip.opacity === 0) {
      setShowTooltip(false);
      return;
    }

    setShowTooltip(true);

    const data = context.tooltip.dataPoints;

    const position = context.chart.canvas.getBoundingClientRect();

    const x = position.left + window.pageXOffset + context.tooltip.caretX;
    const y = position.top + window.pageYOffset + context.tooltip.caretY;

    const mappedData =
      data &&
      data.map((d) => {
        const chartTitle = d.label;
        const percentageValue = d.formattedValue;
        const label = d.dataset.label;
        const value = d.dataset.value;

        return {
          chartTitle,
          value,
          label,
          percentageValue,
        };
      });

    setContext({ data: mappedData, position: { x, y } });
  };

  const canvas = useRef(null);

  const type = 'bar';

  const data = {
    mode: 'single',
    labels: ['JUMP score'],
    datasets: [
      {
        label: '1',
        backgroundColor: 'rgba(235, 29, 29, 0.7)',
        value: 30,
        data: [30],
      },
      {
        label: '2',
        backgroundColor: 'rgba(79, 143, 15, 0.7)',
        value: 40,
        data: [40],
      },
      {
        label: '3',
        backgroundColor: 'rgba(16, 94, 172, 0.7)',
        value: 20,
        data: [20],
      },
      {
        label: '4',
        backgroundColor: 'rgba(247, 127, 7, 0.7)',
        value: 5,
        data: [5],
      },
      {
        label: 'NA',
        backgroundColor: '#efefef',
        value: 5,
        data: [5],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    axes: {
      display: false,
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          min: 0,
          max: 100,
          display: false,
        },
        display: false,
      },
      y: {
        stacked: true,
        barPercentage: 0.5,
        display: false,
      },
      grid: {
        borderColor: '#fff',
        display: false,
        drawBorder: false,
      },
    },
    interaction: {
      intersect: true,
      mode: 'point',
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        position: 'myCustomPositioner',
        enabled: false,
        external: renderTooltip,
      },
    },
  };

  const plugins = {};

  const tooltipPlugin = Chart.registry.getPlugin('tooltip');

  tooltipPlugin.positioners.myCustomPositioner = (elements, ep) => {
    return {
      x: ep.x,
      y: ep.y + 16,
    };
  };

  const { height, width, id, className, onClick, ...rest } = props;

  const renderChart = () => {
    if (!canvas.current) return;

    destroyChart();

    const newChart = new Chart(canvas.current, {
      type,
      data,
      options,
      plugins,
    });

    setChart(newChart);
  };

  const destroyChart = () => {
    if (chart) chart.destroy();
  };

  useLayoutEffect(() => {
    renderChart();

    return () => destroyChart();
  }, []);

  return (
    <>
      <canvas
        {...rest}
        height={height}
        width={width}
        ref={canvas}
        id={id}
        className={className}
        onClick={onClick}
        data-testid="canvas"
        role="img"
      ></canvas>

      {showTooltip && context?.position && context?.data && (
        <Tooltip position={context.position} data={context.data} />
      )}
    </>
  );
};

export default StackedBarChart;
