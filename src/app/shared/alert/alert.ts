export class Alert{
  constructor(
    public readonly alertType:AlertType,
    public readonly message:string,
    public readonly ping:boolean) {}

}
export enum AlertType{
  SUCCESS,
  WARNING,
  DANGER,
  INFO
}
