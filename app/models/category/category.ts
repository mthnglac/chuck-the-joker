import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const CategoryModel = types.model("Category").props({
	title: types.string,
})

/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
 */

type CategoryType = Instance<typeof CategoryModel>
export interface Category extends CategoryType {}
type CategorySnapshotType = SnapshotOut<typeof CategoryModel>
export interface CategorySnapshot extends CategorySnapshotType {}
export const createCategoryDefaultModel = () => types.optional(CategoryModel, {})
