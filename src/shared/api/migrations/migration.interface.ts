export interface Migration {
  run(): Promise<void>;
}
