export interface CpuData {
  load: number;
  cores: number;
  temperature: number;
}

export interface MemoryData {
  total: number;
  used: number;
  available: number;
}

export interface DiskData {
  total: number;
  used: number;
  available: number;
}

export interface Process {
  name: string;
  cpu: number;
  memory: number;
}

export interface ServerData {
  cpu: CpuData;
  memory: MemoryData;
  disk: DiskData;
  processes: Process[];
  uptime: number;
  os: string;
  timestamp: Date | string;
} 