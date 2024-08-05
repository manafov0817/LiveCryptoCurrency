export class TableEvent {
  constructor(
    public currency: string = 'USD',
    public skip: number = 0,
    public take: number = 10
  ) {}
}
