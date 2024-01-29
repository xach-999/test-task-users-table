import Chart from "react-apexcharts";
import { useSelector } from "../features/store";
import { memo, useMemo } from "react";
import { formatDateRussian } from "../helpers/helpers";

const ChartSection = () => {
  const { userTransactions } = useSelector((state) => state.transactionsSlice);

  const data = useMemo(() => {
    const currentDate: Date = new Date();
    const twentyFourHoursAgo = currentDate.getTime() - 24 * 60 * 60 * 1000;

    const newData = userTransactions
      ?.map((item) => ({
        x: new Date(item.created_at).getTime(),
        y: item.amount,
      }))
      .filter((item) => twentyFourHoursAgo < item.x)
      .sort((item1, item2) => item1.x - item2.x);

    return newData;
  }, [userTransactions]);

  return (
    <Chart
      options={{
        chart: {
          zoom: {
            type: "x",
            enabled: false,
            autoScaleYaxis: true,
          },
          toolbar: {
            autoSelected: "zoom",
            show: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        title: {
          text: "",
        },
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.5,
            opacityTo: 0,
            stops: [0, 90, 100],
          },
        },
        xaxis: {
          type: "datetime",
          labels: {
            formatter: function (val: any) {
              return formatDateRussian(+val);
            },
          },
        },
        yaxis: {
          opposite: true,
        },
        tooltip: {
          shared: false,
          y: {
            formatter: function (val) {
              return `${val}`;
            },
          },
        },
      }}
      series={[
        {
          name: "AMOUNT",
          data: data,
        },
      ]}
      type="area"
    />
  );
};

export default memo(ChartSection);
