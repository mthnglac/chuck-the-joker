import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { CategoryModel, CategorySnapshot } from "../category/category"
import { withEnvironment } from "../extensions/with-environment"

/**
 * Model description here for TypeScript hints.
 */
export const CategoryStoreModel = types
  .model("CategoryStore")
  .props({
    categories: types.optional(types.array(CategoryModel), []),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .extend(withEnvironment)
  .actions((self) => ({
    saveCategories: (categorySnapshots: CategorySnapshot[]) => {
      self.categories.replace(categorySnapshots)
    },
  }))
  .actions((self) => ({
    getCategories: async () => {
      const result = await self.environment.api.getCategories()

      if (result.kind === "ok") {
        self.saveCategories(result.categories)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    },
  }))

/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
 */

type CategoryStoreType = Instance<typeof CategoryStoreModel>
export interface CategoryStore extends CategoryStoreType {}
type CategoryStoreSnapshotType = SnapshotOut<typeof CategoryStoreModel>
export interface CategoryStoreSnapshot extends CategoryStoreSnapshotType {}
export const createCategoryStoreDefaultModel = () => types.optional(CategoryStoreModel, {})
