import React, {
  useRef,
  useLayoutEffect,
  useState,
  useEffect,
  useCallback,
} from 'react';
import Chart from 'chart.js/auto';
import Tooltip from './components/Tooltip';

const DEFAULT_OPTIONS = {
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
      position: 'customTooltip',
      enabled: false,
    },
  },
};

const DEFAULT_DATA = {
  mode: 'single',
};

const tooltipPlugin = Chart.registry.getPlugin('tooltip');

tooltipPlugin.positioners.customTooltip = (elements, ep) => {
  return {
    x: ep.x,
    y: ep.y + 16,
  };
};

const type = 'bar';

const StackedBarChart = (props) => {
  const [chart, setChart] = useState(null);
  const [context, setContext] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [renderOption, setRenderOption] = useState(DEFAULT_OPTIONS);
  const [renderData, setRenderData] = useState(DEFAULT_DATA);

  const { options = {}, data } = props;

  const formatData = (data) => {
    const { datasets, title, ...rest } = data;

    const total = datasets.reduce((acc, { value }) => acc + value, 0);

    const mappedData = datasets.map((dataset) => {
      const data = (dataset.value / total).toFixed(2) * 100;

      return {
        ...dataset,
        data: [data],
      };
    });

    return {
      labels: [title],
      datasets: mappedData,
    };
  };

  useEffect(() => {
    const formattedData = formatData(data);

    setRenderData((currentData) => ({ ...currentData, ...formattedData }));
  }, []);

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

  const applyExternalTooltip = useCallback((options) => {
    options.plugins.tooltip.external = renderTooltip;

    setRenderOption(options);
  }, []);

  useEffect(() => {
    applyExternalTooltip(renderOption);
  }, []);

  useEffect(() => {
    setRenderOption((currentOption) => ({
      ...currentOption,
      ...options,
    }));
  }, []);

  const canvas = useRef(null);

  const { height, width, id, className, onClick, ...rest } = props;

  const renderChart = () => {
    if (!canvas.current) return;

    destroyChart();

    const newChart = new Chart(canvas.current, {
      type,
      data: renderData,
      options: renderOption,
    });

    setChart(newChart);
  };

  const destroyChart = () => {
    if (chart) chart.destroy();
  };

  useLayoutEffect(() => {
    renderChart();

    return () => destroyChart();
  }, [renderData]);

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
