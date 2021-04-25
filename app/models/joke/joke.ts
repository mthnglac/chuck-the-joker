import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"

/**
 * Model description here for TypeScript hints.
 */
export const JokeModel = types
	.model("Joke")
	.props({
		id: types.identifier,
		value: types.string,
	})
	.extend(withEnvironment)
	.views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
	.actions((self) => ({
		getJoke: async () => {
			const result = await self.environment.api.getJoke()

			if (result.kind === "ok") {
				self.value = result.joke.value
			} else {
				__DEV__ && console.tron.log(result.kind)
			}
		},
	})) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
 */

type JokeType = Instance<typeof JokeModel>
export interface Joke extends JokeType {}
type JokeSnapshotType = SnapshotOut<typeof JokeModel>
export interface JokeSnapshot extends JokeSnapshotType {}
export const createJokeDefaultModel = () => types.optional(JokeModel, {})
