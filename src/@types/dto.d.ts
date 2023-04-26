export interface Transaction {
  id: string;
  description: string;
  valueInCents: number;
  createdAt: Date;
  scheduledAt: Date;
  observation?: string;
  active: boolean;
  type: 'ENTRADA' | 'SAIDA';
}