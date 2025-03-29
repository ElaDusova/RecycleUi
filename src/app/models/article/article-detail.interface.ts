/**
 * Defines the structure for detail of article.
 */
export interface ArticleDetail {
  id: string;
  heading: string;
  authorsName: string;
  annotation: string;
  text: string;
  picturePath: string | null;
  createdAt: string;
}
