# Infrastructure Design Rationale

## 1. Hardware Choices

### AMD EPYC 7763 for Primary Nodes
- Rationale: Selected for three critical reasons:
  1. High core count (64) enables parallel transaction processing and signature verification
  2. Large L3 cache (256MB) significantly improves smart contract execution performance
  3. PCIe 4.0 support enables faster NVMe storage access, critical for blockchain state management

### Memory Configuration (512GB ECC)
- Why this matters:
  1. Large memory allows caching of hot blockchain state data
  2. ECC memory prevents bit flips which could cause consensus issues
  3. 8-channel configuration maximizes memory bandwidth for state lookups
  4. Overprovisioned to handle future state growth

### Storage Architecture (NVMe RAID Configuration)
Key considerations:
1. Separate system and blockchain storage:
   - System on RAID1 for reliability
   - Blockchain on RAID10 for both performance and redundancy
2. Intel Optane choice:
   - Lower latency than traditional NAND
   - Higher endurance for continuous write operations
   - Better random access performance for state lookups

## 2. Network Architecture

### Dual Network Stack (25GbE + 10GbE)
Rationale:
1. Primary 25GbE:
   - Handles high-throughput blockchain synchronization
   - Supports future network growth
   - Low latency for order execution
2. Backup 10GbE:
   - Dedicated failover path
   - Separate physical network for redundancy
   - Still sufficient for full operation

### BGP Configuration Choices
Design considerations:
1. Multiple peers for redundancy
2. Local preference settings:
   - Higher preference (200) for primary connection
   - Lower preference (100) for backup
3. Conservative route advertisements:
   - Limited to owned prefixes
   - No-export community to prevent transit

## 3. Database Design

### PostgreSQL Configuration Rationale

1. Memory Settings:
   ```yaml
   shared_buffers: 128GB
   effective_cache_size: 384GB
   ```
   - 25% of RAM for shared_buffers (optimal for write-heavy workloads)
   - 75% left for OS page cache
   - Balances between PostgreSQL and OS caching

2. Partitioning Strategy:
   - Orders: Monthly partitions
     - Balances partition size with query performance
     - Matches financial reporting periods
   - Trades: Weekly partitions
     - Smaller chunks for high-volume data
     - Faster partition pruning during queries

3. Index Choices:
   - B-tree for exact lookups (order_id, user_id)
   - BRIN for timestamp ranges (efficient for time-series data)
   - Hash for equality comparisons (user_id lookups)

## 4. Security Architecture

### HSM Implementation Rationale

1. Partition Design:
   - Separate partitions for trading vs authentication
     - Limits blast radius of potential compromise
     - Different access requirements
     - Separate audit trails

2. M of N Access Control:
   - Trading Operations (3 of 5):
     - Higher security for financial operations
     - Tolerates two person unavailability
     - Requires consensus for critical changes
   - User Authentication (2 of 3):
     - Lower threshold for routine operations
     - Still maintains dual control principle
     - Better availability for user operations

## 5. Monitoring Architecture

### Prometheus Configuration Rationale

1. Scrape Intervals:
   ```yaml
   scrape_interval: 15s
   evaluation_interval: 15s
   ```
   - 15-second intervals balance between:
     - Real-time monitoring needs
     - System overhead
     - Storage requirements
     - Alert responsiveness

2. Alert Design:
   - CPU alerts at 80%:
     - Allows time for human intervention
     - Prevents false positives from short spikes
   - Disk space at 10%:
     - Conservative threshold for critical infrastructure
     - Accounts for sudden growth scenarios

## 6. Log Management

### ELK Stack Configuration Rationale

1. Index Lifecycle:
   - Hot (2 days):
     - Recent data on fastest storage
     - Highest query volume period
   - Warm (7 days):
     - Balance between performance and cost
     - Covers typical investigation periods
   - Cold (30 days):
     - Compressed storage for regulatory needs
     - Infrequent access pattern
   - Delete (90 days):
     - Meets regulatory requirements
     - Manages storage costs
     - Maintains system performance

2. Logstash Pipeline:
   ```yaml
   Workers: 4
   Batch Size: 1000
   ```
   - Worker count matches available CPU cores
   - Batch size optimizes between:
     - Processing latency
     - System resource usage
     - Message ordering requirements
