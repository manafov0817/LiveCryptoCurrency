export class ChartOptions {
  chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2.5,
    plugins: {
      legend: {
        display: false, // Completely hide the legend
      },
      title: {
        display: false, // Ensure title is also hidden if present
      },
      tooltip: {
        mode: 'nearest',
        intersect: false,
        enabled: true,
        backgroundColor: 'rgba(255, 255, 255, 1)', // White background
        titleColor: '#333', // Darker title color
        bodyColor: '#666', // Lighter body color
        borderColor: 'rgba(0, 0, 0, 0.1)', // Light border for the tooltip
        borderWidth: 1,
        cornerRadius: 8, // Smooth rounded corners
        caretSize: 6, // Tooltip arrow size
        padding: 12, // Padding inside the tooltip
        displayColors: false, // No dataset color box
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow for the tooltip
        callbacks: {
          title: function () {
            return 'Bitcoin BTC';
          },
          label: function (tooltipItem: any) {
            const price = tooltipItem.raw;

            // Add the decimal point
            const decimalPart = (price % 1).toFixed(2).split('.')[1]; // Get the decimal part
            const integerPart = Math.floor(price).toString(); // Get the integer part
            const formattedIntegerPart = integerPart.replace(
              /\B(?=(\d{3})+(?!\d))/g,
              '.'
            );

            const res = `$${formattedIntegerPart}.${decimalPart}`;

            return res;
          },
        },
        bodyFont: {
          size: 14,
          weight: 500,
        },
        titleFont: {
          size: 14,
          weight: 600,
        },
        titleAlign: 'center', // Center align the price
        bodyAlign: 'center', // Center align the coin name
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
        },
      },
      y: {
        ticks: {
          callback: (value: number) => {
            return '$' + value.toLocaleString(); // Format as currency with commas
          },
          font: {
            weight: 'bold',
          },
        },
      },
    },
  };
}
