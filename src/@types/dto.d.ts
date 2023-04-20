export interface Transaction {
  id: string;
  description: string;
  valueInCents: number;
  createdAt: Date;
  scheduledAt: Date;
  type: 'ENTRADA' | 'SAIDA';
}