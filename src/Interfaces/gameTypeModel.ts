export default interface gameTypeModel {
  id: string;
  titleGame : string;
  description: string;
  category?: string;             // жанр игры
  imageId: string;
}
