import React from "react";
import styles from "./index.module.css";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    ChartData,
    ChartOptions
} from "chart.js";

// Register chart.js modules
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const ActivityChart: React.FC = ()=> {

    // chart data
    const data: ChartData<'line'> = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: "Documents Created",
                data: [12, 19, 3, 5, 2, 10],
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                tension: 0.4,
                fill: true,
                pointRadius: 5,
                pointBackgroundColor: "#4bc0c0",
                pointBorderWidth: 2,
            },
        ] 
    };

    // chart options
    const options: ChartOptions<'line'> = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
                labels: {
                    color: "#333",
                    font: {
                        size: 14,
                        weight: "bold",
                    },
                },
            },
            tooltip :{
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                titleColor: "#fff",
                bodyColor: "#fff",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: "#666",
                    font: {
                        size: 12,
                    },
                },
            },
            y: {
                grid: {
                    color: "rgba(200, 200, 200, 0.3)",
                    borderDash: [5, 5],
                },
                ticks: {
                    color: "#666",
                    font: {
                        size: 12,
                    },
                },
            },
        },
        animations: {
            tension: {
                duration: 2000,
                easing: "easeInOutQuad",
                from: 0.4,
                to: 0.8,
                loop: true,
            },
        },
    };

    return (
        <section className={styles.analytics}>
            <h3>Document Activity</h3>
            <div className={styles.chart}>
                <Line data={data} options={options} />
            </div>
        </section>
    );
}

export default ActivityChart;