export interface IContent {
  id?: number;
  header?: string | null;
  footer?: string | null;
  paragraph?: string | null;
}

export class Content implements IContent {
  constructor(public id?: number, public header?: string | null, public footer?: string | null, public paragraph?: string | null) {}
}

export function getContentIdentifier(content: IContent): number | undefined {
  return content.id;
}
