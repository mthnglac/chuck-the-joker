import React, { useEffect, useState } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Picker } from '@react-native-picker/picker';
import { observer } from "mobx-react-lite"
import { Header, Screen, Wallpaper } from "../../components"
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
const PICKER_TEXT: TextStyle = {
  color: "white"
}

export const DemoListScreen = observer(function DemoListScreen() {
  const navigation = useNavigation()
  const goBack = () => navigation.goBack()

  const [selectedCategory, setSelectedCategory] = useState()
  const { categoryStore } = useStores()
  const { categories } = categoryStore

  useEffect(() => {
    ;(async () => {
      await categoryStore.getCategories()
    })()
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
        <Picker selectedValue={selectedCategory} onValueChange={(itemValue) => {
          setSelectedCategory(itemValue)
        }}>
          {categories.map((currentValue, currentIndex) => (
            <Picker.Item label={currentValue.title} key={currentIndex} value={currentValue.title} style={PICKER_TEXT} />
          ))}
        </Picker>
      </Screen>
    </View>
  )
})
