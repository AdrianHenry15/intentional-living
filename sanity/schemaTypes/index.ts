import { type SchemaTypeDefinition } from "sanity"

import { blockContentType } from "./blog/blockContentType"
import { categoryType } from "./blog/categoryType"
import { postType } from "./blog/postType"
import { authorType } from "./blog/authorType"

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, postType, authorType],
}
