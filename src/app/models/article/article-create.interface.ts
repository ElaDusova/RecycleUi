/**
 * Defines the structure for creating a new article.
 */
export interface ArticleCreateModel {
  heading: string;
  authorsName: string;
  annotation: string;
  text: string;
  picturePath: string | null;
}
