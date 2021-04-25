import React, { useEffect } from "react"
import { FlatList, TextStyle, View, ViewStyle } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Header, Screen, Text, Wallpaper } from "../../components"
import { color, spacing } from "../../theme"
import { useStores } from "../../models"

const FULL: ViewStyle = {
  flex: 1,
}
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
}
const HEADER: TextStyle = {
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: spacing[4],
  paddingTop: spacing[3],
}
const HEADER_TITLE: TextStyle = {
  fontSize: 12,
  fontWeight: "bold",
  letterSpacing: 1.5,
  lineHeight: 15,
  textAlign: "center",
}
const LIST_CONTAINER: ViewStyle = {
  alignItems: "center",
  flexDirection: "row",
  padding: 10,
}
const LIST_TEXT: TextStyle = {
  marginLeft: 10,
}
const FLAT_LIST: ViewStyle = {
  paddingHorizontal: spacing[4],
}

export const DemoListScreen = observer(function DemoListScreen() {
  const navigation = useNavigation()
  const goBack = () => navigation.goBack()

  const { categoryStore } = useStores()
  const { categories } = categoryStore

  useEffect(() => {
    async function fetchData() {
      await categoryStore.getCategories()
    }

    fetchData()
  }, [])

  return (
    <View testID="DemoListScreen" style={FULL}>
      <Wallpaper />
      <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
        <Header
          headerTx="demoListScreen.title"
          leftIcon="back"
          onLeftPress={goBack}
          style={HEADER}
          titleStyle={HEADER_TITLE}
        />
        <FlatList
          contentContainerStyle={FLAT_LIST}
          data={categories}
          keyExtractor={(item) => String(item)}
          renderItem={({ item }) => (
            <View style={LIST_CONTAINER}>
              <Text style={LIST_TEXT}>
                {item.title}
              </Text>
            </View>
          )}
        />
      </Screen>
    </View>
  )
})
