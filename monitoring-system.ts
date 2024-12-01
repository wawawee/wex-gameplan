// Advanced monitoring system implementation
class MonitoringSystem {
    private static instance: MonitoringSystem;
    private metrics: Map<string, number[]>;
    private alertThresholds: Map<string, number>;
    private subscribers: Map<string, Function[]>;

    private constructor() {
        this.metrics = new Map();
        this.alertThresholds = new Map();
        this.subscribers = new Map();
        this.initializeDefaultThresholds();
    }

    public static getInstance(): MonitoringSystem {
        if (!MonitoringSystem.instance) {
            MonitoringSystem.instance = new MonitoringSystem();
        }
        return MonitoringSystem.instance;
    }

    private initializeDefaultThresholds() {
        this.alertThresholds.set('cpu_usage', 80);
        this.alertThresholds.set('memory_usage', 85);
        this.alertThresholds.set('order_latency', 100);
        this.alertThresholds.set('error_rate', 0.01);
    }

    public recordMetric(name: string, value: number) {
        if (!this.metrics.has(name)) {
            this.metrics.set(name, []);
        }
        const values = this.metrics.get(name);
        values.push(value);
        // Keep last 1000 values
        if (values.length > 1000) {
            values.shift();
        }
        this.checkThreshold(name, value);
    }

    private checkThreshold(name: string, value: number) {
        const threshold = this.alertThresholds.get(name);
        if (threshold && value > threshold) {
            this.notifySubscribers(name, {
                metric: name,
                value: value,
                threshold: threshold,
                timestamp: new Date()
            });
        }
    }

    public subscribe(metricName: string, callback: Function) {
        if (!this.subscribers.has(metricName)) {
            this.subscribers.set(metricName, []);
        }
        this.subscribers.get(metricName).push(callback);
    }

    private notifySubscribers(metricName: string, alert: any) {
        const callbacks = this.subscribers.get(metricName) || [];
        callbacks.forEach(callback => callback(alert));
    }

    public getMetricStats(name: string) {
        const values = this.metrics.get(name) || [];
        if (values.length === 0) return null;

        return {
            current: values[values.length - 1],
            min: Math.min(...values),
            max: Math.max(...values),
            avg: values.reduce((a, b) => a + b) / values.length,
            count: values.length
        };
    }

    public setThreshold(metricName: string, value: number) {
        this.alertThresholds.set(metricName, value);
    }

    public getThreshold(metricName: string): number | undefined {
        return this.alertThresholds.get(metricName);
    }
}

// Example usage:
const monitoring = MonitoringSystem.getInstance();

// Subscribe to CPU usage alerts
monitoring.subscribe('cpu_usage', (alert: any) => {
    console.log(`Alert: High CPU usage detected!`);
    console.log(`Value: ${alert.value}%, Threshold: ${alert.threshold}%`);
    console.log(`Timestamp: ${alert.timestamp}`);
});

// Record some metrics
monitoring.recordMetric('cpu_usage', 85);  // This will trigger an alert
monitoring.recordMetric('memory_usage', 75);
monitoring.recordMetric('order_latency', 95);

// Get statistics for a metric
const cpuStats = monitoring.getMetricStats('cpu_usage');
console.log('CPU Usage Statistics:', cpuStats);
